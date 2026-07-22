# MQTT / IoT Guide

Real-time IoT integration via MQTT. RhamaaCMS ships with a full MQTT module (`apps/mqtt`) that connects to any MQTT broker, manages topic subscriptions, persists message history, and streams data live to the browser via WebSocket.

## Runtime modes

| Mode | Use |
|---|---|
| `disabled` | Tests and projects without MQTT |
| `embedded` | Single-process development; ASGI lifespan owns MQTT |
| `worker` | Production; run one `python manage.py mqtt_worker` process |

Production web workers never connect directly to broker. Dedicated worker owns MQTT; Redis carries dashboard broadcasts. Installed apps register worker extensions through `apps.mqtt.worker_registry.register_worker_task()`; `Apps/IoT` uses this to drain its durable outbox.

---

## Architecture Overview

```
EMQX Broker (or any MQTT broker)
        │
        │  aiomqtt (async)
        ▼
┌────────────────────────────────────────────────────────┐
│  MQTTClientManager  (singleton, ASGI lifespan)         │
│  ─ connects on startup, reconnects automatically       │
│  ─ publishes & receives messages                       │
│  ─ saves history → MQTTMessage (DB)                    │
│  ─ broadcasts to Channels group "mqtt_dashboard"       │
└──────────────────────┬─────────────────────────────────┘
                       │  Django Channels (InMemoryChannelLayer)
                       ▼
┌────────────────────────────────────────────────────────┐
│  MQTTDashboardConsumer  (WebSocket /ws/mqtt/dashboard/)│
│  ─ forwards broker messages → browser                  │
│  ─ handles browser commands (publish, reload_subs …)   │
└──────────────────────┬─────────────────────────────────┘
                       │  WebSocket
                       ▼
              Browser Dashboard
```

---

## File Layout

```
apps/mqtt/
├── __init__.py
├── apps.py
├── client.py          # AsyncMQTTClient singleton
├── consumers.py       # WebSocket consumer
├── middleware.py      # ASGI lifespan wrapper
├── models.py          # MQTTMessage + MQTTSettings + MQTTTopic
├── routing.py         # WebSocket URL patterns
├── signals.py         # mqtt_message_received / published / connection_changed
├── urls.py            # Admin HTTP endpoints
├── views.py           # Dashboard view + REST publish API
├── wagtail_hooks.py   # Sidebar menu + admin URL registration
└── templates/mqtt/
    └── dashboard.html
```

---

## Configuration

### 1. Broker (environment variables)

Set these in your `.env` (or server environment):

```env
MQTT_RUN_MODE=embedded
MQTT_BROKER_HOST=localhost
MQTT_BROKER_PORT=1883
MQTT_CLIENT_ID=rhamaacms-dev
MQTT_DEFAULT_TOPICS=iot/v1/+/+/up/#
```

No fallback subscription is created. Empty configuration subscribes to nothing; global `#` is never enabled implicitly.

These are read in `settings/base.py` via `os.getenv`.

### 2. Topic Subscriptions (Wagtail Admin)

Topics are managed in the admin UI, not in code:

1. Go to **Settings → MQTT Settings** in the Wagtail sidebar.
2. Under **Subscribed Topics**, add one row per topic:

   | Field | Example | Notes |
   |---|---|---|
   | **Topic** | `sensors/#` | MQTT pattern — required |
   | **Name** | All Sensors | Optional display label |
   | **Description** | Receives all sensor data | Optional |

3. **Save**.
4. In the **MQTT Dashboard → ⊕ Subscriptions** tab, click **↺ Reload from Settings** to apply changes without restarting the server.

### Wildcard reference

| Pattern | Meaning |
|---|---|
| `#` | All topics |
| `sensors/#` | All topics under `sensors/` |
| `devices/+/temp` | Any single-level `devices/<x>/temp` |

---

## MQTT Dashboard

Access at **Wagtail Admin → MQTT** (sidebar).

### Live Feed
Streams every incoming and outgoing message in real time via WebSocket. Auto-prepends to the top of the feed. Can be cleared without affecting history.

### ▶ Publish Tab
Send a message to any topic directly from the browser:
- **Topic** — MQTT topic string (required)
- **Payload** — message content (free text or JSON)
- **QoS** — 0 (fire & forget), 1 (at least once), 2 (exactly once)

### ⊕ Subscriptions Tab
Quick view of configured topics (from Settings). Each topic shows:
- Green dot `●` if currently subscribed on the broker
- Display name and description from Settings
- **↺ Reload from Settings** — re-syncs without server restart
- **⚙ Manage in Settings** — opens the Wagtail Settings edit page

### Message History Table
Paginated history of all received/sent messages with:
- Direction (IN / OUT)
- Topic
- Payload
- Timestamp
- Per-row delete

---

## Publishing from Another App

### Option A — `mqtt_client` directly (async context)

```python
from apps.mqtt.client import mqtt_client

# Inside an async view / consumer / task:
await mqtt_client.publish("devices/room1/cmd", '{"relay": true}', qos=1)
```

### Option B — `async_to_sync` from sync code

```python
from apps.mqtt.client import mqtt_client
from asgiref.sync import async_to_sync

async_to_sync(mqtt_client.publish)("devices/room1/cmd", '{"relay": true}')
```

### Option C — REST API (HTTP POST)

```http
POST /admin/mqtt/publish/
Content-Type: application/json
Authorization: (session cookie / staff login required)

{"topic": "devices/room1/cmd", "payload": "{\"relay\": true}", "qos": 1}
```

Response:
```json
{"ok": true, "topic": "devices/room1/cmd"}
```

---

## Signals

Other apps can react to MQTT events without importing `client.py`:

```python
from apps.mqtt.signals import mqtt_message_received, mqtt_message_published

@receiver(mqtt_message_received)
def on_sensor_data(sender, topic, payload, qos, **kwargs):
    if topic.startswith("sensors/"):
        # parse payload, update a model, trigger alert, etc.
        pass

@receiver(mqtt_message_published)
def on_publish(sender, topic, payload, qos, **kwargs):
    pass
```

Available signals:

| Signal | When fired | Extra kwargs |
|---|---|---|
| `mqtt_message_received` | Broker delivers a message to a subscribed topic | `topic, payload, qos` |
| `mqtt_message_published` | `mqtt_client.publish()` completes | `topic, payload, qos` |
| `mqtt_connection_changed` | Broker connect / disconnect | `connected: bool` |

---

## Message History Model

```python
from apps.mqtt.models import MQTTMessage

# Query received messages
MQTTMessage.objects.filter(direction="in", topic__startswith="sensors/")

# Query sent messages
MQTTMessage.objects.filter(direction="out")
```

Fields:

| Field | Type | Notes |
|---|---|---|
| `topic` | CharField | MQTT topic string |
| `payload` | TextField | Raw message content |
| `direction` | CharField | `"in"` or `"out"` |
| `qos` | IntegerField | 0, 1, or 2 |
| `retained` | BooleanField | Broker retained flag |
| `received_at` | DateTimeField | Auto-set on save |

### Auto-purge (retention policy)

Configure in **Settings → MQTT Settings → Message Retention**:

- **Auto-delete enabled** — toggle on/off
- **Auto-delete after N days** — default 7

Purge runs automatically every hour. Manual purge: **Dashboard → History → Purge Old Messages**.

---

## WebSocket Protocol

Clients connect to `ws://<host>/ws/mqtt/dashboard/`.

### Browser → Server commands

```jsonc
// Publish a message
{"type": "publish", "topic": "test/hello", "payload": "world", "qos": 0}

// Re-sync subscriptions from Settings (no restart needed)
{"type": "reload_subscriptions"}

// Request current subscription list
{"type": "get_subscriptions"}

// Keepalive
{"type": "ping"}
```

### Server → Browser events

```jsonc
// Initial status on connect + pong reply
{"type": "status",   "broker_connected": true, "topics": ["sensors/#", "devices/+"]}
{"type": "pong",     "broker_connected": true, "topics": [...]}

// Incoming or outgoing MQTT message
{"type": "message",  "direction": "in", "topic": "sensors/temp", "payload": "22.5",
 "qos": 0, "retained": false, "ts": "2026-03-27T10:00:00Z"}

// Subscription list updated (broadcast to all dashboard tabs)
{"type": "subscriptions", "topics": ["sensors/#"]}

// Reload result
{"type": "reload_result", "ok": true, "topics": ["sensors/#"]}

// Publish confirmed
{"type": "publish_ok", "topic": "test/hello"}
```

---

## Development Tips

- **Public sandbox**: only opt in for development. Never use a shared public broker for production or sensitive telemetry.
- **Local broker**: install Mosquitto (`choco install mosquitto`) and set `MQTT_BROKER_HOST=localhost`.
- **MQTT Explorer** (desktop app) is useful for monitoring topics in real time alongside the dashboard.
- Hot-reload: the server auto-reloads on file changes. After reload, MQTT reconnects automatically within a few seconds.
- If subscriptions show grey dots after reload, click **↺ Reload from Settings** to re-sync the active topic list.
