# Portfolio Architecture

A full-stack portfolio system featuring a dark-mode, glassmorphism-inspired React frontend and a robust Spring Boot PostgreSQL backend. Built for scalability and performance.

## Tech Stack
* **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion
* **Backend:** Java 21, Spring Boot 3.2, Spring Data JPA
* **Database:** PostgreSQL (Neon Serverless / Local Docker)

## Local Development

### Prerequisites
* Java 21+
* Node.js 20+
* Docker & Docker Compose

### Infrastructure Setup
Start the local PostgreSQL database using Docker:
```bash
docker-compose up -d
```

### Backend Startup
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend Startup
```bash
cd frontend
npm install
npm run dev
```
The application will be available at `http://localhost:5173`.
