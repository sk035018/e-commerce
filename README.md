# Kafka Learning with NestJS Microservices

This repository contains a hands-on Kafka learning project built using NestJS microservices.

## Services
- `api-gateway`: HTTP producer service
- `order-service`: Kafka consumer service

## Tech Stack
- NestJS
- Kafka
- Docker Compose
- KafkaJS

## Flow
POST `/orders` → Kafka topic `orders` → consumer processes event

## Run

```bash
docker compose up -d
```

```bash
cd api-gateway && npm install && npm run start:dev
```

```bash
cd order-service && npm install && npm run start:dev
```
