# Twitter Thread Manager — Finance Templates & Scheduler

Full-stack Twitter threads manager with FastAPI backend, Next.js + Tailwind frontend, MySQL database, and Docker setup for easy deployment.

**Stack:** Next.js (app), TailwindCSS, Shadcn, Framer Motion · FastAPI · MySQL (SQLAlchemy) · Pydantic · Docker

## What it does

A small SaaS to create, edit and schedule Twitter threads focused on finance. Supports:

- User authentication
- Create and schedule multi-tweet threads
- Reusable thread templates
- Dockerized dev + prod setup

## Tech highlights

- Frontend: Next.js + Tailwind + shadcn UI + Framer Motion for micro-interactions
- Backend: FastAPI, SQLAlchemy, Pydantic models, MySQL
- Deployment: Docker / docker-compose

## Project status

> - Prototype / MVP — core flows implemented: Auth, Thread creation/Edit/Deletion, Template system,
> - In Progress : Scheduling worker (celery/asyncio).
> - Not yet production hardened.

## Quick start (development)

1. Start Backend:
   ```bash
   cd backend
   docker compose up --build
   ```
2. Start Frontend:
   ```
   cd frontend
   npm install
   npm run dev
   ```
