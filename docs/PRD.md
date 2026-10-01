# 📋 Product Requirements Document (PRD)

## Craftathon – Your Medication Adherence Companion

| | |
|---|---|
| **Version:** | 2.0 |
| **Date:** | Oct 1, 2026 |
| **Author:** | Team Craftathon |
| **Status:** | In Development |
| **Target Launch:** | MVP (v2.0) |

---

## 1. Product Overview

Craftathon is a web application designed to help patients, caregivers, doctors, and admins manage medication schedules, track adherence, and stay connected. Reminders, dose tracking, adherence reports, and caregiver alerts — all in one platform.

## 2. Problem Statement

Patients with complex medication routines often miss doses due to forgetfulness, complicated schedules, and lack of visibility for their family caregivers. Caregivers have no centralized way to monitor adherence or get alerted when a loved one misses critical medication.

## 3. Goals

- Provide a simple, reliable platform for medication scheduling and dose tracking
- Help patients build consistent medication habits with streaks and reminders
- Give caregivers real-time visibility into patient adherence with alerts
- Offer a clean, modern, and accessible user experience for all age groups
- Enable doctors to communicate directly with patients through in-app chat

## 4. Target Users

- **Patients** – managing daily medication routines
- **Caregivers** – family members monitoring patient adherence
- **Doctors** – overseeing treatment and communicating with patients
- **Admins** – platform management, users, and analytics
- Tech-savvy as well as elderly users; laptops and smartphones

## 5. Core Features (MVP)

1. **User Authentication** (Signup / Login / Email verification)
2. **Medication Management** (Add, edit, delete, schedules)
3. **Dose Tracking** (Taken, skipped, missed, late)
4. **Adherence Reports** (Daily, weekly, streaks)
5. **Caregiver Linking** (Connect caregiver to patient)
6. **Notifications & Alerts** (Reminders, missed dose alerts)
7. **Chat** (Patient ↔ Caregiver/Doctor messaging)
8. **Admin Dashboard** (Users, analytics, settings)

## 6. Out of Scope (v1)

- Mobile native apps (iOS/Android)
- Pharmacy integration / e-prescriptions
- Payment / subscription billing
- Telemedicine video calls
- AI-based dosage recommendations

## 7. User Stories

### Patient
- As a patient, I want to add my medications with dosage and frequency so the app can remind me on time.
- As a patient, I want to mark doses as taken so my streak and adherence stay accurate.
- As a patient, I want to see my adherence score so I know how well I'm following my plan.

### Caregiver
- As a caregiver, I want to link with a patient so I can monitor their medication schedule.
- As a caregiver, I want alerts when a dose is missed so I can follow up immediately.
- As a caregiver, I want weekly adherence reports so I can support the patient better.

### Doctor
- As a doctor, I want to view patient details and adherence so I can adjust treatment.
- As a doctor, I want to chat with patients to answer medication questions.

### Admin
- As an admin, I want to manage users and view platform analytics.
- As an admin, I want to configure system settings and broadcast notifications.

## 8. Success Metrics

| Metric | Target |
|---|---|
| Dose adherence improvement | +25% within 30 days |
| Weekly active patients | 60% of signups |
| Missed dose alert delivery | < 1 min |
| Caregiver alert open rate | > 70% |
| Crash-free sessions | > 99.5% |

## 9. Technical Requirements

- **Backend:** Node.js, Express.js, Prisma ORM, PostgreSQL
- **Frontend:** React 18 (Vite), Tailwind CSS, React Router
- **Auth:** JWT (access + refresh tokens), bcrypt password hashing
- **Realtime:** Socket.IO for chat
- **Notifications:** Email (Nodemailer), push (Firebase tokens), cron jobs
- **API Style:** REST, versioned at `/api/v1`

## 10. Assumptions & Constraints

- Users have reliable internet for realtime features
- Email delivery configured via SMTP for verification and reports
- One patient can have multiple caregivers; one caregiver can monitor multiple patients
- Medical advice is out of scope; platform only tracks and reminds

## 11. Release Criteria

- All core MVP features complete and tested
- Auth flows (signup, login, verify, reset) working end-to-end
- Adherence calculation accurate and verified against dose logs
- Caregiver alerts delivered within 1 minute of missed dose
- No critical/high severity bugs open
