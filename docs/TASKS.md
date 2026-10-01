# ✅ Project Tasks

## Craftathon – Task Breakdown & Development Plan

This document contains the complete list of tasks for building the Craftathon application. Tasks are divided into phases with clear deliverables, priorities and status tracking.

---

## 📊 Progress Overview

| 📋 Total Tasks | ✅ Completed | 🔄 In Progress | ⬜ Not Started |
|:---:|:---:|:---:|:---:|
| **41** | **33** | **5** | **3** |
| | 80% ▓▓▓▓▓▓▓▓░░ | 12% ▓░░░░░░░░░ | 7% ▓░░░░░░░░░ |

---

## ✅ Phase 1: Project Setup

Set up the development environment, repository and core configuration.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 1.1 | Initialize repository & folder structure | 🔴 High | ✅ Completed | backend/ + Frontend/ monorepo layout |
| 1.2 | Set up backend (Express, Prisma, PostgreSQL) | 🔴 High | ✅ Completed | Port 5000, API at `/api/v1` |
| 1.3 | Set up frontend (Vite, React, Tailwind) | 🔴 High | ✅ Completed | Port 5173, clay design tokens |
| 1.4 | Environment variables & `.env.example` | 🟡 Medium | ✅ Completed | DB URL, JWT, SMTP, frontend URL |
| 1.5 | Health check endpoint | 🟢 Low | ✅ Completed | `GET /api/v1/health` |

## 👥 Phase 2: Authentication & Users

Implement user authentication and protected routes.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 2.1 | Design database schema (User, Profile, RefreshToken) | 🔴 High | ✅ Completed | Prisma schema + enums |
| 2.2 | Register & login APIs with JWT | 🔴 High | ✅ Completed | Access + refresh tokens |
| 2.3 | Password hashing & refresh token rotation | 🔴 High | ✅ Completed | bcryptjs |
| 2.4 | Email verification & password reset flow | 🟡 Medium | ✅ Completed | Nodemailer tokens |
| 2.5 | Login / Signup / Forgot / Reset pages | 🔴 High | ✅ Completed | `(auth)` pages + Landing |
| 2.6 | Role-based route guards (Patient/Caregiver/Doctor/Admin) | 🔴 High | ✅ Completed | Redirects by role |

## 💊 Phase 3: Medication Management

Allow users to add, edit, delete and schedule medications.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 3.1 | Medication CRUD APIs | 🔴 High | ✅ Completed | `medication.routes.js` |
| 3.2 | Dose schedule generation from frequency/times | 🔴 High | ✅ Completed | `DoseSchedule` model |
| 3.3 | Add / Edit medication pages | 🔴 High | ✅ Completed | AddMedication, EditMedication |
| 3.4 | Schedule view (today's doses) | 🔴 High | ✅ Completed | Schedule.jsx |
| 3.5 | Medication history page | 🟡 Medium | ✅ Completed | MedicationHistory.jsx |

## 📈 Phase 4: Dose Tracking & Adherence

Track dose check-ins and calculate adherence metrics.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 4.1 | Dose check-in APIs (taken / late / skipped / missed) | 🔴 High | ✅ Completed | `dose.routes.js` |
| 4.2 | Adherence score & daily stats service | 🔴 High | ✅ Completed | `adherence.service.js` |
| 4.3 | Streak tracking (current & longest) | 🟡 Medium | ✅ Completed | `Streak` model |
| 4.4 | Patient adherence dashboard (circle progress) | 🔴 High | ✅ Completed | Adherence.jsx |
| 4.5 | Adherence report page (weekly breakdown) | 🟡 Medium | ✅ Completed | AdherenceReport.jsx |

## 🤝 Phase 5: Caregiver Linking & Alerts

Connect caregivers to patients and notify on missed doses.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 5.1 | Caregiver ↔ patient linking APIs | 🔴 High | ✅ Completed | `CaregiverLink.isAccepted` |
| 5.2 | Caregiver dashboard & patient list | 🔴 High | ✅ Completed | CaregiverPatientsList.jsx |
| 5.3 | Caregiver alerts (missed dose, low adherence) | 🔴 High | ✅ Completed | `CaregiverAlert` model |
| 5.4 | Caregiver reports page | 🟡 Medium | ✅ Completed | CaregiverReports.jsx |
| 5.5 | Patient detail view for caregivers/doctors | 🟡 Medium | ✅ Completed | PatientDetail.jsx |

## 🔔 Phase 6: Notifications & Reminders

Reminder engine, email and push notification delivery.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 6.1 | In-app notification service | 🔴 High | ✅ Completed | `notification.service.js` |
| 6.2 | Email notifications (reminders, reports) | 🟡 Medium | ✅ Completed | Nodemailer |
| 6.3 | Cron jobs (dose reminders, missed detection, weekly reports) | 🔴 High | ✅ Completed | `src/jobs/` with node-cron |
| 6.4 | Push notifications (FCM device tokens) | 🟡 Medium | 🔄 In Progress | Schema ready, delivery pending |

## 💬 Phase 7: Realtime Chat

Patient ↔ caregiver/doctor messaging over WebSockets.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 7.1 | Conversation & message models + APIs | 🔴 High | ✅ Completed | `chat.routes.js` |
| 7.2 | Socket.IO integration (rooms, auth handshake) | 🔴 High | 🔄 In Progress | `socket.io-client` installed |
| 7.3 | Chat UI (Patient / Caregiver / Doctor) | 🔴 High | ✅ Completed | ChatUI.jsx + 3 chat pages |
| 7.4 | Doctor role dashboard & flows | 🟡 Medium | 🔄 In Progress | DoctorDashboard.jsx |

## 🛠️ Phase 8: Admin & Settings

Platform administration, analytics and configuration.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 8.1 | Admin dashboard & user management | 🔴 High | ✅ Completed | AdminUsers.jsx |
| 8.2 | Analytics page (adherence trends, active users) | 🟡 Medium | ✅ Completed | AdminAnalytics.jsx |
| 8.3 | Admin settings & broadcast notifications | 🟢 Low | ⬜ Not Started | AdminSettings.jsx scaffold |

## 🚀 Phase 9: Testing & Deployment

Quality assurance, CI and production launch.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 9.1 | API testing collection (Postman) | 🟡 Medium | 🔄 In Progress | `Frontend/postman/` exists |
| 9.2 | Automated tests (unit + integration) | 🔴 High | ⬜ Not Started | No test suite yet |
| 9.3 | CI/CD pipeline (lint, test, build) | 🟡 Medium | ⬜ Not Started | GitHub Actions planned |
| 9.4 | Production deployment (Vercel + backend host) | 🔴 High | 🔄 In Progress | `vercel.json` configured |

---

## 📌 Legend

| Symbol | Meaning |
|---|---|
| 🔴 High | Must be done for MVP / blocks other work |
| 🟡 Medium | Important but not blocking |
| 🟢 Low | Nice to have / polish |
| ✅ Completed | Done and verified |
| 🔄 In Progress | Actively being worked on |
| ⬜ Not Started | Planned, not yet begun |
