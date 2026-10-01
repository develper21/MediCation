# 🧠 Project Memory

## Craftathon – Context, Progress & Important Notes

This document keeps track of the current state of the project, important decisions, and things to remember. It helps maintain continuity across development sessions, AI agents, or new contributors.

---

| 📅 Last Updated | 👤 Current Phase | 📊 Overall Progress |
|:---:|:---:|:---:|
| **Oct 1, 2026** | **Phase 7** | **~80%** |
| 10:30 AM | Realtime Chat & Polish | 33 / 41 tasks done |

---

## 🎯 Current Status

- ✅ Project setup completed (Express + Prisma + PostgreSQL, React + Vite + Tailwind)
- ✅ Git repository initialized and pushed to GitHub
- ✅ PostgreSQL database configured with full Prisma schema (15 models)
- ✅ Authentication (signup, login, email verification, password reset, role guards) completed
- ✅ Medication management (CRUD, schedules, history) completed
- ✅ Dose tracking & adherence engine (stats, streaks, reports) completed
- ✅ Caregiver linking, alerts and reports completed
- ✅ Notifications (in-app + email) and cron jobs (reminders, missed doses, weekly reports) completed
- ✅ Patient / Caregiver / Admin dashboards completed
- 🟡 Working on Realtime Chat (Socket.IO integration in progress)

## ✅ Completed Tasks

| # | Task | Completed On |
|---|---|---|
| 1.1 | Initialize repository & folder structure | Apr 3, 2026 |
| 1.2 | Set up backend (Express, Prisma, PostgreSQL) | Apr 6, 2026 |
| 1.3 | Set up frontend (Vite, React, Tailwind) | Apr 8, 2026 |
| 2.1 | Design database schema (User, Profile, RefreshToken) | Apr 12, 2026 |
| 2.2 | Implement register & login APIs with JWT | Apr 16, 2026 |
| 2.4 | Email verification & password reset flow | Apr 22, 2026 |
| 2.5 | Login / Signup / Forgot / Reset pages | Apr 26, 2026 |
| 2.6 | Role-based route guards | May 2, 2026 |
| 3.1 | Medication CRUD APIs | May 8, 2026 |
| 3.2 | Dose schedule generation | May 13, 2026 |
| 3.3 | Add / Edit medication pages | May 19, 2026 |
| 3.4 | Schedule view (today's doses) | May 24, 2026 |
| 4.1 | Dose check-in APIs | Jun 2, 2026 |
| 4.2 | Adherence score & daily stats service | Jun 9, 2026 |
| 4.3 | Streak tracking | Jun 14, 2026 |
| 4.4 | Patient adherence dashboard | Jun 20, 2026 |
| 5.1 | Caregiver ↔ patient linking APIs | Jul 4, 2026 |
| 5.3 | Caregiver alerts (missed dose, low adherence) | Jul 12, 2026 |
| 5.4 | Caregiver reports page | Jul 20, 2026 |
| 6.1 | In-app notification service | Aug 3, 2026 |
| 6.3 | Cron jobs (reminders, missed detection, weekly reports) | Aug 15, 2026 |
| 7.1 | Conversation & message models + APIs | Sep 2, 2026 |
| 7.3 | Chat UI (Patient / Caregiver / Doctor) | Sep 18, 2026 |
| 8.1 | Admin dashboard & user management | Sep 24, 2026 |
| 8.2 | Analytics page | Sep 28, 2026 |

## 🔄 In Progress

| # | Task | Notes |
|---|---|---|
| 6.4 | Push notifications (FCM device tokens) | DeviceToken model ready; delivery wiring pending |
| 7.2 | Socket.IO integration | `socket.io-client` installed; room auth + emit flow being tested |
| 7.4 | Doctor role dashboard & flows | DoctorDashboard/DoctorChat pages exist, polishing |
| 9.1 | API testing collection (Postman) | Collection started in `Frontend/postman/` |
| 9.4 | Production deployment | `vercel.json` configured for frontend; backend host pending |

## 📌 Important Notes

- **Stack:** Node.js + Express + Prisma + PostgreSQL (backend), React 18 + Vite + Tailwind (frontend). No TypeScript — plain JavaScript with ES modules on frontend.
- **Roles:** `PATIENT`, `CAREGIVER`, `DOCTOR`, `ADMIN` — each has its own layout (`DashboardLayout`, `CaregiverLayout`, `AdminLayout`) and route guard.
- **Auth flow:** short-lived access token + refresh token stored in `refresh_tokens` table; axios interceptor in `Frontend/src/services/api.js` attaches the token.
- **Adherence logic:** score = `(taken + late) / scheduled × 100`, cached per day in `AdherenceStat`; `DoseSchedule` = plan, `DoseLog` = reality.
- **Cron engine:** `backend/src/jobs/` runs dose reminders, missed-dose detection (creates `CaregiverAlert`), and weekly report emails.
- **Design language:** claymorphism — `rounded-clay` (20px), soft dual shadows, tokens `#0066FC` (primary), `#205658` (dark teal), gradient background `#ACD8FF → #E8F2FF`.
- **Realtime:** Socket.IO rooms per `Conversation`; messages persisted before emit so history survives reconnects.
- **Demo data:** `npx prisma db seed` seeds users for all 4 roles (see `backend/prisma/seed.js`).
- **Docs to read first:** [PRD.md](PRD.md) → [ARCHITECTURE.md](ARCHITECTURE.md) → [RULES.md](RULES.md) → [DESIGN.md](DESIGN.md) → [TASKS.md](TASKS.md).

## 🔮 Next Steps

1. Finish Socket.IO integration and verify realtime chat end-to-end (7.2)
2. Complete push notification delivery with FCM (6.4)
3. Polish doctor dashboard flows (7.4)
4. Add automated tests and CI pipeline (9.2, 9.3)
5. Deploy backend and connect production database (9.4)
6. Update this file whenever a phase completes or a key decision changes
