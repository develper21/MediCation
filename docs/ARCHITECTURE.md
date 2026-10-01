# 🏛️ System Architecture

## Craftathon – Medication Adherence Platform

This document describes the overall system architecture, technology stack, folder structure, data flow, and key design decisions for the Craftathon application.

---

## 1. High-Level Architecture

Craftathon follows a full-stack client-server architecture using React and Node.js/Express with Prisma + PostgreSQL.

```
┌──────────┐       HTTPS        ┌─────────────────┐       REST / WS       ┌──────────────────┐       SQL       ┌──────────────┐
│   User   │ ◄───────────────►  │ React Frontend  │ ◄───────────────────► │ Express Backend  │ ◄────────────► │  PostgreSQL  │
│(Browser) │                    │   (Vite SPA)    │                       │ (API / Cron Jobs)│                │   (Prisma)   │
└──────────┘                    └─────────────────┘                       └────────┬─────────┘                └──────────────┘
                                                                                  │
                                                            ┌─────────────────────┼─────────────────────┐
                                                            ▼                     ▼                     ▼
                                                      ┌──────────┐        ┌─────────────┐       ┌──────────────┐
                                                      │  Socket  │        │ SMTP Email  │       │ Cron Jobs    │
                                                      │    .IO   │        │ (Nodemailer)│       │ (node-cron)  │
                                                      │  (Chat)  │        └─────────────┘       └──────────────┘
                                                      └──────────┘
```

## 2. Technology Stack

Technologies used in the project and their purpose:

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 18 + Vite | SPA framework and fast dev experience |
| Language | JavaScript (ES6+) | Frontend & backend language |
| Styling | Tailwind CSS | Utility-first styling with claymorphism design |
| Routing | React Router DOM v6 | Client-side routing & protected routes |
| State | Context API | Auth state and global data |
| Backend | Node.js + Express.js | REST API and business logic |
| Database | PostgreSQL | Relational data storage |
| ORM | Prisma | Type-safe database access & migrations |
| Authentication | JWT (access + refresh) | User authentication and authorization |
| Realtime | Socket.IO | Patient ↔ caregiver/doctor chat |
| Background Jobs | node-cron | Dose scheduling, missed-dose detection, weekly reports |
| Email | Nodemailer | Verification, reminders, reports |
| Icons | Lucide React | Consistent iconography |
| Version Control | Git + GitHub | Source code management |

## 3. Folder Structure

The project follows a layered full-stack folder structure to keep the code organized and scalable.

```
craftathon/
├── docs/                    # Project documentation (PRD, Architecture, etc.)
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma    # Database models & enums
│   │   └── seed.js          # Demo data seeder
│   ├── src/
│   │   ├── index.js         # Server entry point (HTTP + Socket.IO)
│   │   ├── app.js           # Express app (routes, middleware)
│   │   ├── config/          # Prisma client config
│   │   ├── routes/          # API route definitions
│   │   ├── controllers/     # Request handlers (auth, medication, ...)
│   │   ├── services/        # Business logic (adherence, notifications)
│   │   ├── middlewares/     # Auth, validation, error handlers
│   │   ├── jobs/            # Cron jobs (schedules, alerts, reports)
│   │   └── utils/           # Helpers (JWT, email, date utils)
│   ├── .env.example         # Environment variable template
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── main.jsx         # App entry point
│   │   ├── App.jsx          # Router setup
│   │   ├── components/      # Reusable UI (Button, Card, Sidebar, ...)
│   │   ├── pages/           # Screen components per role
│   │   ├── context/         # AuthContext & global state
│   │   ├── services/        # API client (axios wrapper)
│   │   ├── routes/          # Route guards / protected routes
│   │   └── utils/           # Frontend helpers
│   ├── tailwind.config.js   # Design tokens (colors, shadows)
│   └── package.json
└── README.md
```

## 4. Backend Layered Flow

Every API request follows the same predictable path:

```
Request → Route → Middleware (auth → validation → rate limit) → Controller → Service (logic) → Prisma → PostgreSQL
                                                                                    │
Response ◄────────────────── JSON ◄────────── errorHandler ◄────────────────────────┘
```

- **Routes** (`src/routes/*`) — map URLs to controllers, e.g. `medication.routes.js`
- **Controllers** (`src/controllers/*`) — parse requests, call services, send responses
- **Services** (`src/services/*`) — business logic like adherence score calculation
- **Middlewares** (`src/middlewares/*`) — JWT auth, role checks, express-validator, error handler
- **Jobs** (`src/jobs/*`) — node-cron tasks that generate dose schedules, detect missed doses, fire caregiver alerts, and email weekly reports

## 5. Data Model Overview

Core Prisma models and how they relate:

```
User (PATIENT | CAREGIVER | DOCTOR | ADMIN)
 │
 ├── Profile                  # DOB, blood group, allergies, conditions
 ├── Medication               # name, dosage, frequency, times[], refill
 │     └── DoseSchedule       # upcoming dose slots (windowStart/windowEnd)
 │           └── DoseLog      # actual check-in (TAKEN / LATE / SKIPPED / MISSED)
 ├── AdherenceStat            # cached daily adherence score
 ├── Streak                   # current & longest streak
 ├── CaregiverLink            # patient ↔ caregiver connection (isAccepted)
 ├── CaregiverAlert           # missed-dose / low-adherence alerts
 ├── Notification             # reminders, milestones (push/email/in-app)
 ├── WeeklyReport             # aggregated week summary
 ├── Conversation ── Message  # realtime chat
 └── DeviceToken              # push notification tokens
```

Key design decisions:

- **DoseSchedule vs DoseLog separation** — schedules are the "plan", logs are the "reality". This makes adherence math simple and auditable.
- **AdherenceStat cache per day** — avoids recomputing scores from raw logs on every dashboard load.
- **Soft-linking caregivers** — `CaregiverLink.isAccepted` creates a consent-based connection before any data is shared.
- **UUID primary keys** — safe for distributed IDs and avoids enumeration attacks on URLs.

## 6. Adherence Calculation Flow

```
Cron (per minute) ──► Scan DoseSchedule where windowEnd < now & status = PENDING
        │
        ├─► Mark schedule MISSED
        ├─► Create/Update DoseLog (MISSED)
        ├─► Create CaregiverAlert for linked caregivers
        └─► Send in-app/email notification

Dose taken ──► DoseLog (TAKEN or LATE + minutesLate)
        └─► Recompute AdherenceStat for the day → (taken + late) / scheduled × 100
```

## 7. Authentication & Authorization

- `POST /api/v1/auth/register` → hash password (bcrypt), create user, send verification email
- `POST /api/v1/auth/login` → verify credentials, issue **access token** (short-lived) + **refresh token** (stored in `refresh_tokens` table)
- `GET /api/v1/auth/me` → return current user profile
- Middleware `requireAuth` protects all private routes; `requireRole('ADMIN')` etc. gates role-specific endpoints
- Frontend stores tokens and attaches them via the axios interceptor in `src/services/api.js`
- React Router guards in `src/routes/` redirect unauthenticated users to `/login`

## 8. Realtime Chat Architecture

```
Patient Browser ◄──── Socket.IO (WebSocket) ────► Server ◄──── Socket.IO ────► Caregiver/Doctor Browser
                                                       │
                                                       ▼
                                                 PostgreSQL
                                            (Conversation / Message)
```

- Each patient–caregiver pair maps to a unique `Conversation` (unique constraint on pair)
- Messages are persisted first, then emitted to the room — so history survives reconnects
- `socket.io-client` connects only after successful auth

## 9. Deployment Architecture

| Component | Hosting | Notes |
|---|---|---|
| Frontend | Vercel | Static build from `Frontend/` (`vercel.json` present) |
| Backend API | Render / Railway | Node process on port 5000 |
| Database | Managed PostgreSQL | via `DATABASE_URL` |
| Cron/Background | Same Node process | node-cron inside the API server |

## 10. Security Considerations

- Passwords hashed with bcrypt (never stored plain)
- JWT secrets and DB credentials only via environment variables
- Rate limiting + centralized `errorHandler` middleware
- Role-based access control on all sensitive endpoints (users, reports, analytics)
- Input validation on every route using express-validator
- CORS restricted to `FRONTEND_URL`
