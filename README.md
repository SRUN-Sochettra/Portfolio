<div align="center">

```
╔══════════════════════════════════════════════════════╗
║                                                      ║
║          S R U N   S O C H E T T R A                 ║
║          ─────────────────────────                   ║
║          P O R T F O L I O                           ║
║                                                      ║
║          full-stack  ·  engineered  ·  deployed      ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
```

[![CI Pipeline](https://github.com/SRUN-Sochettra/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/SRUN-Sochettra/Portfolio/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-00ff41.svg?style=flat-square)](./LICENSE)
[![Version](https://img.shields.io/badge/version-0.1.0-00d4ff.svg?style=flat-square)](#)
[![Java](https://img.shields.io/badge/Java-21-ed8b00.svg?style=flat-square&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-6db33f.svg?style=flat-square&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-61dafb.svg?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169e1.svg?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

</div>

---

## `> SYSTEM.overview`

Personal full-stack portfolio of **Srun Sochettra**. Engineered with Java Spring Boot, React, and PostgreSQL. Features a dark-mode glassmorphism UI, a production-grade REST API, and a serverless database layer.

---

## `> ARCH.system_architecture`

```
┌─────────────────────────────────────────────────────────────────────┐
│                          C L I E N T                                │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  React 19  ·  TypeScript  ·  Vite 7  ·  Tailwind CSS v4       │  │
│  │  Framer Motion  ·  Lucide Icons  ·  React Router v7           │  │
│  └──────────────────────────┬────────────────────────────────────┘  │
│                             │ HTTPS / JSON                          │
│                             ▼                                       │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    S E R V E R                                │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │  Spring Boot 3.2  ·  Java 21  ·  Spring MVC             │  │  │
│  │  │  Spring Data JPA  ·  Lombok  ·  Jakarta Validation      │  │  │
│  │  │  OpenAPI / Swagger UI  ·  Global Exception Handler      │  │  │
│  │  └────────────────────────┬────────────────────────────────┘  │  │
│  │                           │ JDBC / HikariCP                   │  │
│  │                           ▼                                   │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │  PostgreSQL 16  (Neon Serverless / Local Docker)        │  │  │
│  │  │  Tables: profiles · projects · skills · contact_messages│  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

**Data Flow:**
```
[Browser] ──GET/POST──▶ [React SPA] ──fetch()──▶ [Spring Boot REST API]
                                                         │
                                                         ▼
                                                 [Service Layer]
                                                         │
                                                         ▼
                                                [JPA Repository] ──▶ [PostgreSQL]
```

---

## `> API.endpoints`

All endpoints are prefixed with `/api`. Interactive documentation is available via **Swagger UI** at `/swagger-ui.html` when the backend is running.

| Method | Endpoint                | Description                                 | Status Codes  |
|--------|-------------------------|---------------------------------------------|---------------|
| `GET`  | `/api/profile`          | Retrieve portfolio owner's profile          | `200` · `404` |
| `GET`  | `/api/projects`         | List all projects (sorted by display order) | `200`         |
| `GET`  | `/api/skills`           | List all skills (sorted by display order)   | `200`         |
| `POST` | `/api/contact_messages` | Submit a visitor contact message            | `201` · `400` |

**Request Example — Submit Contact Message:**
```json
POST /api/contact_messages
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Great portfolio! Let's connect."
}
```

---

## `> DIR.project_structure`

```
Portfolio/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
│       └── ci.yml
├── backend/
│   ├── src/main/java/com/portfolio/
│   │   ├── config/          # CORS configuration
│   │   ├── controller/      # REST API controllers
│   │   ├── exception/       # Global exception handler
│   │   ├── model/           # JPA entities
│   │   ├── repository/      # Spring Data repositories
│   │   └── service/         # Business logic layer
│   ├── Dockerfile
│   └── pom.xml
├── frontend/
│   ├── src/                 # React components & pages
│   ├── public/              # Static assets
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
├── docker-compose.yml       # Local PostgreSQL
├── CONTRIBUTING.md
├── LICENSE                  # MIT
└── README.md
```

---

## `> SETUP.local_development`

### Prerequisites

| Tool    | Version | Purpose            |
|---------|---------|--------------------|
| Java    | 21+     | Backend runtime    |
| Node.js | 20+     | Frontend toolchain |
| Docker  | Latest  | Local PostgreSQL   |

### 1. Clone & Configure

```bash
git clone https://github.com/SRUN-Sochettra/Portfolio.git
cd Portfolio
cp .env.example .env    # Configure database credentials
```

### 2. Start Infrastructure

```bash
docker-compose up -d    # PostgreSQL on localhost:5432
```

### 3. Launch Backend

```bash
cd backend
./mvnw spring-boot:run
# API available at http://localhost:8080
# Swagger UI at http://localhost:8080/swagger-ui.html
```

### 4. Launch Frontend

```bash
cd frontend
npm install
npm run dev
# Application at http://localhost:5173
```

---

## `> UI.screenshots`

<!-- 
  ┌──────────────────────────────────────────────────────┐
  │  SCREENSHOT PLACEHOLDERS                             │
  │  Replace the paths below with actual screenshots     │
  │  after capturing them from the running application.  │
  └──────────────────────────────────────────────────────┘
-->

### Landing / Hero Section
> _Screenshot pending — capture the hero section with glassmorphism terminal effect._

### Projects Gallery
> _Screenshot pending — capture the project cards grid with hover animations._

### Skills Matrix
> _Screenshot pending — capture the skills section with category grouping._

### Contact Form
> _Screenshot pending — capture the contact form with validation states._

### Mobile Responsive View
> _Screenshot pending — capture mobile viewport rendering._

---

## `> STACK.tech_breakdown`

| Layer               | Technology              | Version |
|---------------------|-------------------------|---------|
| **Language**        | Java                    | 21      |
| **Framework**       | Spring Boot             | 3.2.4   |
| **ORM**             | Spring Data JPA         | —       |
| **Validation**      | Jakarta Bean Validation | —       |
| **API Docs**        | SpringDoc OpenAPI       | 2.5.0   |
| **Frontend**        | React                   | 19      |
| **Build Tool**      | Vite                    | 7       |
| **Styling**         | Tailwind CSS            | v4      |
| **Animation**       | Framer Motion           | 12      |
| **Routing**         | React Router            | v7      |
| **Database**        | PostgreSQL              | 16      |
| **Cloud DB**        | Neon Serverless         | —       |
| **CI/CD**           | GitHub Actions          | —       |
| **Frontend Deploy** | Vercel                  | —       |
| **Backend Deploy**  | Render                  | —       |

---

## `> SYS.contributing`

Contributions are welcome. Please read the [Contributing Guide](./CONTRIBUTING.md) before submitting changes.

---

## `> SYS.license`

This project is licensed under the **MIT License**. See [LICENSE](./LICENSE) for details.

```
Copyright (c) 2026 Srun Sochettra
```

---

<div align="center">

```
[ ENGINEERED WITH PRECISION · DEPLOYED WITH PURPOSE ]
```

</div>

