# 🎨 Design System

## Craftathon – Clean. Caring. Consistent.

This document defines the visual design system, UI components, and user experience guidelines for Craftathon. The goal is to create a modern, friendly, and accessible healthcare interface with a consistent claymorphism style across all roles (Patient, Caregiver, Doctor, Admin).

---

## 1. Design Principles

| | | |
|:---:|:---:|:---:|
| 🫶 **User-Centered** | 🌿 **Minimal & Calm** | 🧩 **Consistent** |
| Simple and reassuring for patients of all ages. | Reduce clutter and focus on health data. | Follow a unified design system everywhere. |

- **User-Centered** — Simple and intuitive for patients, caregivers and doctors.
- **Minimal & Calm** — Healthcare UI should lower anxiety; soft shadows, gentle colors, clear hierarchy.
- **Consistent** — Follow a unified design system — same components, spacing, and behaviors across all role dashboards.

## 2. Color Palette

Primary colors used across the application (defined in `Frontend/tailwind.config.js`):

| Swatch | Token | Hex | Usage |
|---|---|---|---|
| 🟦 | **Primary Blue** | `#0066FC` | Main brand color. Buttons, links, active states |
| 🟩 | **Primary Dark (Teal)** | `#205658` | Secondary actions, sidebar, headings |
| 🟦 | **Light Background** | `#ACD8FF` | Page background gradient start |
| 🟦 | **Gradient End** | `#E8F2FF` | Page background gradient end |
| ⬜ | **White** | `#FFFFFF` | Cards, surfaces |
| 🟥 | **Error** | `#EF4444` | Error messages, validation, missed doses |
| 🟧 | **Warning** | `#F59E0B` | Late doses, caution states |
| 🟩 | **Success** | `#10B981` | Taken doses, completed streaks |

### Background

```css
body {
  background: linear-gradient(135deg, #ACD8FF 0%, #E8F2FF 100%);
}
```

### Usage Rules

- Primary Blue `#0066FC` is reserved for **primary actions** — one primary button per view.
- Primary Dark `#205658` is used for **secondary buttons**, sidebar background, and emphasized text.
- Status colors (Success/Warning/Error) **only** for dose statuses and alerts — never decorative.

## 3. Typography

We use Segoe UI / system fonts as the primary stack for a clean, native and highly readable look:

```css
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
```

| Style | Size | Weight | Usage |
|---|---|---|---|
| H1 | 30px | Bold (700) | Page titles |
| H2 | 24px | SemiBold (600) | Section titles |
| H3 | 18px | SemiBold (600) | Card titles |
| Body | 16px | Regular (400) | Default text |
| Small | 14px | Regular (400) | Secondary text, captions |
| Tiny | 12px | Medium (500) | Badges, timestamps |

- Line height: 1.5 for body text
- Font weights: 400 / 500 / 600 / 700 only
- Numbers in adherence scores use tabular alignment for easy scanning

## 4. UI Components

Standard components to be used throughout the app (`Frontend/src/components/`):

### Buttons

| Variant | Class | Usage |
|---|---|---|
| Primary | `.clay-button-primary` | Main actions — Save dose, Add medication |
| Secondary | `.clay-button-secondary` | Less prominent actions |
| Destructive | red background `#EF4444` | Delete medication, remove link |

Style: `px-6 py-3 rounded-clay font-semibold hover:scale-105 active:scale-95`

### Cards

`.clay-card` — white surface with soft clay shadow:

```css
.clay-card {
  @apply bg-white rounded-clay shadow-clay p-6;
}
```

- `border-radius: 20px`, soft dual-direction shadow (claymorphism)
- Used for medication lists, stats, reports, forms

### Inputs

`.clay-input` — rounded input with focus ring:

```css
.clay-input {
  @apply w-full px-4 py-3 rounded-clay border border-gray-200
         focus:ring-2 focus:ring-primary-blue;
}
```

- Focus state: blue border + soft ring (accessibility)
- Always pair with a visible label

### Navigation

- **Sidebar** (`Sidebar.jsx`) — dark teal `#205658` background, white icons/labels, active item highlighted; role-aware items per layout
- **Topbar** (`Topbar.jsx`) — page title, notifications bell, profile avatar
- **Navbar** (`Navbar.jsx`) — public pages (Landing, Login, Signup)

### Other Shared Components

| Component | Usage |
|---|---|
| `CircleProgress` | Adherence score ring |
| `Card` | Generic content surface |
| `Notification` | Toast/in-app notification item |
| `ChatUI` | Realtime chat bubbles |
| `Logo` | Brand mark |

## 5. Iconography

- Library: **Lucide React**
- Stroke width: 2, size 20–24px for nav, 16–18px inline
- Icons are supportive — never the only carrier of meaning (pair with text labels)

## 6. Spacing & Layout

- Base spacing unit: 4px (Tailwind scale)
- Card padding: 24px (`p-6`)
- Section gaps: 24–32px
- Page max-width: 1280px, centered; dashboards use sidebar + content grid
- Border radius: 20px (`rounded-clay`) for cards/buttons/inputs

## 7. States & Feedback

| State | Treatment |
|---|---|
| Loading | Spinner or skeleton card, never blank screen |
| Empty | Friendly message + CTA ("No medications yet — Add your first") |
| Success | Green toast / banner |
| Error | Red inline message under field + toast for global errors |
| Dose statuses | 🟢 Taken · 🟡 Late · 🔴 Missed · ⚪ Pending · ⚫ Skipped |

## 8. Accessibility

- Minimum contrast ratio 4.5:1 for text
- All interactive elements reachable by keyboard, visible focus rings
- Form fields with labels and error text tied via `aria-describedby`
- Touch targets ≥ 44px (important for elderly patients)
- Do not rely on color alone for dose status — pair with icons/text

## 9. Do's and Don'ts

| ✅ Do | ❌ Don't |
|---|---|
| Use existing clay classes first | invent one-off shadows/radii |
| Keep one primary button per view | use blue for decorative elements |
| Use Lucide icons consistently | mix emoji + icon libraries in UI chrome |
| Show friendly empty states | leave blank data areas |
| Test on mobile widths | hardcode pixel widths |
