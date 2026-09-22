# Rejig Post Manager — Interview Exercise

A mini SaaS platform that manages social media posts for real estate agents.
It mirrors the patterns of the real Rejig codebase: **Node.js / Express** backend with an **Angular 14** frontend.

---

## Quick Start

### 1. Backend (port 3000)

```bash
cd backend
npm install
npm start
```

Verify it's running:

```bash
curl http://localhost:3000/health
# {"status":"ok"}
```

### 2. Frontend (port 4200)

In a second terminal:

```bash
cd frontend
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200) in your browser.
The frontend proxies all `/api` requests to `http://localhost:3000`.

---

## Test Credentials

| User  | Email          | Password    | Domain     |
| ----- | -------------- | ----------- | ---------- |
| Alice | alice@rejig.ai | password123 | domain-001 |
| Bob   | bob@rejig.ai   | password123 | domain-002 |

Alice has **15 posts**. Bob has **5 posts**. Log in as Alice for the full experience.

---

## API Reference

| Method | Path              | Auth? | Description                             |
| ------ | ----------------- | ----- | --------------------------------------- |
| GET    | /health           | No    | Health check                            |
| POST   | /auth/login       | No    | Login — returns JWT                     |
| GET    | /posts            | Yes   | Paginated posts list (`?page=&status=`) |
| POST   | /posts            | Yes   | Create a new post                       |
| GET    | /posts/:id        | Yes   | Get a single post                       |
| PATCH  | /posts/:id/status | Yes   | Toggle draft/published                  |

All authenticated responses follow the envelope:

```json
{ "status": true, "message": "...", "data": { ... } }
```
