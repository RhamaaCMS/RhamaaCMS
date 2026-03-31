# IoT / MQTT Template

Real-time dashboards for IoT devices and sensors.

---

## What Makes This Different?

The IoT Template extends the Base Template with real-time capabilities for connecting to and displaying data from IoT devices.

### Key Additions to Base Template

| Feature | Purpose |
|---------|---------|
| Django Channels | WebSocket support |
| MQTT Client | Connect to MQTT brokers |
| ASGI Server | Async request handling |
| Real-time Models | Sensor data storage |
| Dashboard Components | Live data visualization |

---

## The Stack

```
Base Template (unchanged):
├── Wagtail 7.3
├── Django 6.0
└── Tailwind CSS v4

IoT Additions:
├── Django Channels 4.0
├── MQTT Client (paho-mqtt)
├── ASGI (Daphne/Uvicorn)
├── Redis (channel layer)
└── WebSocket consumers
```

---

## How It Works

```
IoT Device (Sensor)
    │
    ▼ (MQTT Publish)
MQTT Broker (Mosquitto/AWS IoT)
    │
    ▼ (MQTT Subscribe)
RhamaaCMS (MQTT Consumer)
    │
    ├── Store in Database
    └── Broadcast via WebSocket
              │
              ▼
       Browser (Live Dashboard)
```

---

## Project Structure

```
myproject/
├── apps/
│   ├── home/                  # Standard pages
│   └── mqtt/                  # NEW: IoT functionality
│       ├── models.py          # Sensor, Reading models
│       ├── consumers.py       # WebSocket consumers
│       ├── mqtt_client.py     # MQTT connection
│       └── templates/
│           └── mqtt/
│               └── dashboard.html
├── utils/
│   └── models.py              # BasePage (unchanged)
├── myproject/
│   ├── asgi.py                # NEW: ASGI application
│   └── settings/base.py       # MQTT settings
└── templates/
```

---

## Key Components

### MQTT Client

```python
# apps/mqtt/mqtt_client.py
import paho.mqtt.client as mqtt
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

class MQTTClient:
    def __init__(self):
        self.client = mqtt.Client()
        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
    
    def on_connect(self, client, userdata, flags, rc):
        client.subscribe("sensors/+/data")
    
    def on_message(self, client, userdata, msg):
        # Broadcast to WebSocket
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "sensors",
            {
                "type": "sensor_data",
                "data": msg.payload.decode(),
            }
        )
```

### WebSocket Consumer

```python
# apps/mqtt/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class SensorConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("sensors", self.channel_name)
        await self.accept()
    
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("sensors", self.channel_name)
    
    async def sensor_data(self, event):
        await self.send(text_data=json.dumps(event))
```

### Sensor Models

```python
# apps/mqtt/models.py
from django.db import models

class Sensor(models.Model):
    name = models.CharField(max_length=100)
    device_id = models.CharField(max_length=50, unique=True)
    location = models.CharField(max_length=200)
    sensor_type = models.CharField(
        max_length=50,
        choices=[
            ('temperature', 'Temperature'),
            ('humidity', 'Humidity'),
            ('pressure', 'Pressure'),
        ]
    )
    
    def __str__(self):
        return f"{self.name} ({self.device_id})"

class Reading(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    value = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-timestamp']
```

---

## Running the Server

The IoT Template requires ASGI instead of WSGI:

```bash
# Development
python manage.py runserver

# Production (with WebSocket support)
daphne -p 8000 myproject.asgi:application

# Or with uvicorn
uvicorn myproject.asgi:application --reload --lifespan on --port 8000
```

---

## MQTT Dashboard

A built-in dashboard for monitoring sensors:

```
http://127.0.0.1:8000/admin/mqtt/
```

Features:
- Real-time sensor readings
- Historical data charts
- Device status overview
- MQTT connection status

---

## Configuration

### Environment Variables

```python
# .env or settings/local.py
MQTT_BROKER_HOST = "localhost"
MQTT_BROKER_PORT = 1883
MQTT_USERNAME = "your_username"
MQTT_PASSWORD = "your_password"
MQTT_USE_TLS = True  # For production

# For AWS IoT
MQTT_BROKER_HOST = "your-endpoint.iot.region.amazonaws.com"
MQTT_USE_TLS = True
MQTT_CLIENT_CERT = "/path/to/cert.pem"
MQTT_CLIENT_KEY = "/path/to/private.key"
```

### ASGI Configuration

```python
# myproject/asgi.py
import os
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "myproject.settings.production")

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": URLRouter(
        # WebSocket routes
    ),
})
```

---

## When to Choose This Template

✅ **Good for:**
- IoT device dashboards
- Real-time monitoring systems
- Sensor data visualization
- Smart home interfaces
- Industrial monitoring

❌ **Not ideal for:**
- Simple content websites (use Base)
- SPAs (use React template)
- Sites without real-time needs

---

## Full Documentation

Complete IoT template docs are in the `docs/` folder of the `base-iot` branch, including:
- MQTT broker setup
- WebSocket security
- Data visualization
- Production deployment

---

## Next Steps

- [Base Template Docs](../core/index.md)
- [React + Inertia Template](react-inertia.md)
