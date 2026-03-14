# Tracpy Platform

A scalable, event-driven **website analytics SaaS platform** designed to collect, process, and visualize website traffic data in real time.
The platform enables businesses to track visitor behavior, traffic sources, device usage, and performance metrics through a lightweight tracking script and a modern analytics dashboard.

This project demonstrates **production-grade full-stack architecture**, including event ingestion pipelines, analytics processing, microservices, and a multi-tenant SaaS system.

---

# Features

• Website traffic analytics
• Page view and unique visitor tracking
• Traffic source and referrer analysis
• Device and browser analytics
• Country-level visitor insights
• Real-time visitor monitoring
• Multi-website project management
• Event-driven analytics processing
• Scalable SaaS architecture

---

# Architecture Overview

The platform is built using a **modular microservice architecture** designed for scalability and high-volume event ingestion.

```
Client Website
      │
Tracking SDK
      │
Event Ingestion Service
      │
Event Queue / Stream
      │
Event Processor
      │
Analytics Database
      │
Analytics API
      │
Dashboard Application
```

Each component can scale independently to support high traffic workloads.

---

# Tech Stack

### Frontend

- Next.js
- React
- Tailwind CSS

### Backend

- Node.js
- Express
- TypeScript

### Infrastructure

- Docker
- NGINX
- Kubernetes
- Terraform

### Data Layer

- PostgreSQL
- Redis

### Monorepo Management

- Turborepo

---

# Repository Structure

```
tracpy
│
├── apps
│   ├── dashboard          # Next.js analytics dashboard
│   ├── ingestion-service  # Event collection API
│   ├── analytics-api      # Analytics query service
│   ├── event-processor    # Background event processing worker
│   ├── auth-service       # Authentication & user management
│   └── billing-service    # Subscription and billing system
│
├── packages
│   ├── database           # Database schemas and ORM
│   ├── ui                 # Shared UI components
│   ├── sdk                # Client tracking SDK
│   ├── logger             # Centralized logging utilities
│   ├── config             # Environment configuration
│   └── types              # Shared TypeScript types
│
├── infrastructure
│   ├── docker             # Container configuration
│   ├── nginx              # Reverse proxy configuration
│   ├── terraform          # Infrastructure as code
│   └── kubernetes         # Deployment configuration
│
├── scripts                # Automation scripts
├── docs                   # Architecture and design documentation
├── .github                # GitHub workflows and issue templates
└── turbo.json             # Turborepo configuration
```

---

# Core Services

### Dashboard

Provides the user interface where website owners can view analytics insights, traffic trends, and visitor data.

### Ingestion Service

Handles incoming analytics events from client websites and pushes them into the processing pipeline.

### Analytics API

Serves processed analytics data to the dashboard with optimized queries.

### Event Processor

Processes queued events, performs aggregations, and prepares data for analytics queries.

### Authentication Service

Manages user authentication, authorization, and multi-tenant access control.

### Billing Service

Handles subscription plans, payment processing, and usage limits.

---

# Tracking Script Example

Websites can integrate analytics by embedding the tracking SDK.

```
<script src="https://cdn.analytics-saas.com/script.js"></script>
<script>
analytics.init("SITE_API_KEY")
</script>
```

This script sends visitor events to the ingestion service.

---

# Development Setup

Clone the repository:

```
git clone https://github.com/yourusername/analytics-saas.git
```

Install dependencies:

```
npm install
```

Start development environment:

```
npm run dev
```

---

# Roadmap

### Phase 1 — Foundation

- Monorepo setup
- Core service scaffolding
- Environment configuration

### Phase 2 — Tracking System

- Tracking SDK
- Event ingestion API
- Session tracking

### Phase 3 — Analytics Engine

- Visitor aggregation
- Traffic source analysis
- Device and location analytics

### Phase 4 — Dashboard

- Analytics visualization
- Traffic charts
- Page performance insights

### Phase 5 — Real-time Analytics

- Active visitor tracking
- Live event streaming

---

# Project Goals

This project demonstrates:

- scalable SaaS system design
- event-driven analytics pipelines
- microservice architecture
- real-time data processing
- modern full-stack development practices

---

# License

MIT License
