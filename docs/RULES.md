# 📘 Development Rules

## Craftathon – Project Guidelines for AI & Human Collaboration

This document defines the development rules, coding standards, and best practices for the Craftathon application. These rules ensure consistency, maintainability, security, and quality across the codebase. Both AI assistants and human contributors must follow these guidelines.

---

## 1 General Principles

These rules apply to the entire project.

- ✅ Follow the project documentation (PRD, ARCHITECTURE, DESIGN) before making changes.
- ✅ Keep the code clean, readable and well-structured.
- ✅ Prioritize simplicity and maintainability.
- ✅ Do not duplicate logic. Reuse existing components, utilities or services.
- ✅ Make small, focused changes instead of large, risky edits.
- ✅ Do not modify unrelated files.
- ✅ Write self-explanatory code with meaningful variable and function names.

## 2 Technology & Coding Standards

Rules related to the tech stack and coding style:

| | Standard | Rule |
|---|---|---|
| 🌐 | **Language** | Use JavaScript (ES6+). Avoid `any`-style looseness — use JSDoc where types help. Backend uses CommonJS as per existing code. |
| ⚛️ | **Frontend** | Follow React best practices — functional components + hooks, Context API for global state. |
| 🧭 | **Routing** | React Router v6 with nested layouts per role (`DashboardLayout`, `AdminLayout`, `CaregiverLayout`). |
| 🎨 | **Styling** | Use Tailwind CSS and follow the design system in [DESIGN.md](DESIGN.md). Use existing clay classes (`clay-card`, `clay-button`) before adding new ones. |
| 🧹 | **Linting** | Follow ESLint conventions; no unused variables or dead code in commits. |
| 📐 | **Formatting** | Use Prettier defaults — 2-space indent, double quotes in backend, consistent style. |
| 📦 | **Dependencies** | Use stable, well-maintained packages. Do not add a dependency without strong justification. |
| 📄 | **File Naming** | Use clear and consistent names — components/pages in PascalCase (`PatientDashboard.jsx`), backend modules in camelCase (`medication.controller.js`). |

## 3 Project Structure

Follow the defined folder structure in [ARCHITECTURE.md](ARCHITECTURE.md) to keep the codebase organized:

- ✅ Place reusable UI components in `Frontend/src/components/`.
- ✅ Feature screens should be in `Frontend/src/pages/`, grouped by role (Patient, Caregiver, Doctor, Admin).
- ✅ Database and external service logic should live in backend `src/services/` or `src/utils/` — never inside controllers.
- ✅ Common utilities should be in `backend/src/utils/` or `Frontend/src/utils/`.
- ✅ API endpoints must be registered in `backend/src/routes/` and mounted in `app.js` under `/api/v1`.
- ✅ Do not create new folders without a clear reason described in ARCHITECTURE.md.

## 4 API & Backend Rules

- ✅ Controllers only handle request/response — business logic goes to services.
- ✅ Every route must validate input using `express-validator` chains.
- ✅ Protect every private route with the auth middleware; add role checks where needed (`PATIENT`, `CAREGIVER`, `DOCTOR`, `ADMIN`).
- ✅ Never trust client-sent user IDs — always derive `userId` from the authenticated JWT.
- ✅ Return consistent error shapes via the shared `errorHandler` middleware.
- ✅ Keep Prisma queries efficient — select only needed fields, paginate list endpoints.
- ✅ Never log or expose passwords, tokens, or personal health data.

## 5 Frontend Rules

- ✅ Use the shared axios instance in `src/services/api.js` — never call `fetch`/axios directly with hardcoded URLs.
- ✅ Protect routes with the route guards in `src/routes/`; redirect unauthenticated users to login.
- ✅ Keep components small and focused; extract repeated UI into `src/components/`.
- ✅ Use Lucide icons consistently — no mixing of icon libraries.
- ✅ Handle loading, error, and empty states in every data-driven screen.
- ✅ Keep forms validated on both client and server side.

## 6 Database Rules

- ✅ Every schema change must go through `prisma/schema.prisma` with a migration (`prisma migrate dev`), not manual SQL.
- ✅ Use enums already defined in the schema (`Role`, `DoseStatus`, `NotificationType`) instead of free-text status strings.
- ✅ Cascade deletes intentionally: user deletion must clean up medications, logs, tokens.
- ✅ Add indexes for query-heavy columns (already used for `dose_schedules`, `dose_logs`, `notifications`).
- ✅ Never run destructive commands (`db push --force-reset`) against shared/production data.

## 7 Git & Collaboration Rules

- ✅ Use clear branch names: `feature/`, `fix/`, `chore/` (e.g. `feature/adherence-reports`).
- ✅ Write meaningful commit messages in present tense ("Add caregiver alert cron job").
- ✅ One logical change per commit; do not mix refactors with features.
- ✅ Never commit `.env`, secrets, or `node_modules`. Use `.env.example` as the template.
- ✅ Push to feature branches and open PRs; do not push directly to `main`.
- ✅ Review your own diff before requesting review.

## 8 Security & Privacy Rules

- ✅ Treat all health-related data as sensitive (PHI mindset) — encrypt in transit (HTTPS) and never log it.
- ✅ Store tokens securely; never expose JWT secrets in frontend code.
- ✅ Rate-limit auth endpoints to prevent brute force.
- ✅ Validate and sanitize all user-generated content shown in chat or notifications.
- ✅ Report security concerns privately to the team lead — never in public issues.

## 9 Documentation Rules

- ✅ Update [TASKS.md](TASKS.md) status when a task is completed.
- ✅ Update [MEMORY.md](MEMORY.md) with important decisions and context changes.
- ✅ Keep [PRD.md](PRD.md) aligned with shipped features.
- ✅ Document new env variables in `.env.example`.
- ✅ New contributors should read PRD → ARCHITECTURE → RULES → DESIGN before coding.
