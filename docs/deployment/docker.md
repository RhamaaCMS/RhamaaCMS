# Docker Deployment

Deploy RhamaaCMS using Docker containers.

---

## Overview

Docker provides:

- **Consistency** — Same environment everywhere
- **Isolation** — Dependencies bundled
- **Scalability** — Easy horizontal scaling
- **Portability** — Run anywhere Docker is supported

---

## Dockerfile

```dockerfile
# Dockerfile
FROM python:3.11-slim

# Environment
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DJANGO_SETTINGS_MODULE=myproject.settings.production

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js (for asset building)
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Set work directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Node dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy project
COPY . .

# Build static assets
RUN npm run build

# Collect static files
RUN python manage.py collectstatic --noinput

# Create non-root user
RUN useradd -m wagtail && chown -R wagtail:wagtail /app
USER wagtail

# Run
CMD ["gunicorn", "myproject.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "4"]
```

---

## docker-compose.yml

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8000:8000"
    environment:
      - SECRET_KEY=${SECRET_KEY}
      - DEBUG=False
      - DATABASE_URL=postgres://postgres:postgres@db:5432/rhamaacms
      - ALLOWED_HOSTS=localhost,127.0.0.1
    depends_on:
      - db
      - redis
    volumes:
      - media:/app/media
    command: >
      sh -c "python manage.py migrate --noinput &&
             python manage.py collectstatic --noinput &&
             gunicorn myproject.wsgi:application --bind 0.0.0.0:8000 --workers 4"

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=rhamaacms
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  # Optional: Celery worker for async tasks
  # worker:
  #   build: .
  #   command: celery -A myproject worker -l info
  #   environment:
  #     - SECRET_KEY=${SECRET_KEY}
  #     - DATABASE_URL=postgres://postgres:postgres@db:5432/rhamaacms
  #   depends_on:
  #     - db
  #     - redis

volumes:
  postgres_data:
  redis_data:
  media:
```

---

## Environment File

Create `.env`:

```bash
# .env (gitignored)
SECRET_KEY=your-secure-secret-key-here
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1,yourdomain.com
DATABASE_URL=postgres://postgres:postgres@db:5432/rhamaacms
```

---

## Local Development with Docker

```bash
# Build and start
docker-compose up --build

# Run migrations
docker-compose exec web python manage.py migrate

# Create superuser
docker-compose exec web python manage.py createsuperuser

# View logs
docker-compose logs -f web

# Stop
docker-compose down
```

---

## Production Deployment

### Build for Production

```bash
# Build image
docker build -t rhamaacms:latest .

# Or with docker-compose
docker-compose -f docker-compose.prod.yml up --build
```

### Docker Compose (Production)

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  web:
    build: .
    restart: always
    environment:
      - SECRET_KEY=${SECRET_KEY}
      - DEBUG=False
      - DATABASE_URL=${DATABASE_URL}
      - ALLOWED_HOSTS=${ALLOWED_HOSTS}
    depends_on:
      - db
    volumes:
      - media:/app/media
    command: >
      sh -c "python manage.py migrate --noinput &&
             python manage.py collectstatic --noinput &&
             gunicorn myproject.wsgi:application --bind 0.0.0.0:8000 --workers 4"
    networks:
      - rhamaacms

  db:
    image: postgres:15
    restart: always
    environment:
      - POSTGRES_DB=${DB_NAME}
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - rhamaacms

  nginx:
    image: nginx:alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - static:/app/static:ro
      - media:/app/media:ro
    depends_on:
      - web
    networks:
      - rhamaacms

volumes:
  postgres_data:
  static:
  media:

networks:
  rhamaacms:
    driver: bridge
```

### Nginx Configuration

```nginx
# nginx.conf
upstream django {
    server web:8000;
}

server {
    listen 80;
    server_name yourdomain.com;

    location /static/ {
        alias /app/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /media/ {
        alias /app/media/;
    }

    location / {
        proxy_pass http://django;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Cloud Deployment

### AWS ECS / Fargate

1. Push image to ECR
2. Create ECS cluster
3. Define task with web + db containers
4. Configure load balancer

### Google Cloud Run

```bash
# Build and push
gcloud builds submit --tag gcr.io/PROJECT/rhamaacms

# Deploy
gcloud run deploy rhamaacms \
    --image gcr.io/PROJECT/rhamaacms \
    --platform managed \
    --region asia-southeast1 \
    --allow-unauthenticated \
    --set-env-vars="SECRET_KEY=...,DATABASE_URL=..."
```

### DigitalOcean App Platform

```bash
# Deploy with doctl
doctl apps create --spec .do/app.yaml
```

---

## Useful Commands

```bash
# Clean build
docker-compose down -v
docker-compose up --build

# Shell into container
docker-compose exec web bash

# Run management command
docker-compose exec web python manage.py shell

# View running containers
docker-compose ps

# Scale web service
docker-compose up --scale web=3
```

---

## Next Steps

- [Production Checklist](production-checklist.md)
- [Fly.io Deployment](flyio.md)
