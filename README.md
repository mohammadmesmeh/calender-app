# Calendar App

A bilingual (English / Arabic) personal calendar app: tasks, events, notes, analytics, notifications and reminders — built with React and Firebase. Full Arabic + RTL support, seven color themes, drag-and-drop scheduling, and a demo mode so reviewers can explore it without signing up.

## Features

- **Calendar views** — Month, Week, Day, and Agenda (list) with drag-and-drop scheduling, hit-test based drop targeting, 30-minute snapping, and overlap lanes.
- **Tasks & events** — create, edit, resize, reschedule, mark complete, categorize, and color-code.
- **Dashboard** — completion stats, weekly activity chart, today's tasks, upcoming events, quick notes.
- **Global search** — Ctrl/Cmd+K command palette that searches tasks, events and notes, jumps to dates/views, and runs quick actions.
- **Notifications & reminders** — in-app notifications with an optional browser Notification API opt-in. Reminders fire while the app is open (no server push).
- **Undo** — deleted or misplaced items can be restored within a few seconds.
- **Conflict warning** — creating or moving an event that overlaps another shows a non-blocking warning.
- **ICS import/export** — download events as `.ics` and import from `.ics` files.
- **Keyboard shortcuts** — `T` today, `M/W/D/A` views, arrows prev/next, `N` new, `?` help.
- **7 themes** — light, dark, midnight, ocean, emerald, sunset, rose; persisted per user profile.
- **Arabic / RTL** — full Arabic interface, right-to-left layout, Hijri dates (optional), Gregorian or Arabic-Indic digits, week starting Saturday/Sunday/Monday.
- **Demo mode** — "Try demo" on the login page loads the app with realistic sample data in an in-memory store. Nothing is saved.

## Tech stack

- React 19 + Vite
- Tailwind CSS 3.4 (design-token driven, 7 themes via CSS custom properties)
- Firebase (Auth, Firestore) — data is scoped per user (`users/{uid}/…`)
- react-router-dom, framer-motion, recharts, react-datepicker, lucide-react
- react-hook-form + yup (forms), @fontsource (self-hosted Inter + IBM Plex Sans Arabic)
- vitest + @testing-library/react (unit & component tests)

## Getting started

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file from the template (empty variable names only):

   ```bash
   copy .env.example .env
   ```

   Fill in your Firebase Web App credentials (see [Firebase setup](#firebase-setup)).

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Run checks:

   ```bash
   npm run lint      # eslint
   npm run build     # production build
   npm test          # vitest unit/component tests
   ```

### Firebase setup

Create a Firebase project, enable Email/Password + Google sign-in, and register a Web App to obtain the credentials referenced in `.env.example`. Firestore rules live in `firestore.rules` — deploy them with the steps at the bottom of this file.

## Project structure

The app is feature-based under `src/features`:

```
src/
├─ components/          # shared UI (layout, buttons, feedback, modal, chart wrapper)
├─ constants/           # themes, static config
├─ features/
│  ├─ auth/             # login/register/forgot, auth context, yup schemas
│  ├─ calendar/         # month/week/day/agenda views, DnD, time grid
│  ├─ dashboard/        # widgets, analytics, notes
│  ├─ notifications/    # notification bell, preview, context, service
│  ├─ settings/         # theme context, theme picker, language picker
│  ├─ sidebar/          # sidebar + visible-state contexts
│  └─ tasks/            # tasks context, task/event modals, categories
├─ routes/              # router + ProtectedRoute guard
└─ services/            # Firestore service layer (per-user collections)
```

Services talk to Firestore collections scoped to the signed-in user:

- `users/{uid}/tasks`
- `users/{uid}/events`
- `users/{uid}/notes`
- `users/{uid}/notifications`
- `users/{uid}/profile/profile`

Data is stored language-agnostic: categories and types are stored as stable keys and translated in the UI. All Firebase access lives behind a thin service layer, which also enables the **demo mode** (an in-memory adapter with the same interface).

## Demo mode

From the login page, click **Try demo** to explore the app instantly. The demo swaps the Firestore service layer for an in-memory adapter seeded with realistic sample tasks, events and notes (no real names or personal data). A banner makes clear the data is temporary and not saved. See `src/demo/` and `src/features/<x>/services/demo*` for the adapters.

## Firestore rules

Deploy `firestore.rules` (enforces per-user access):

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules
```

## Screenshots

Portfolio shots — capture in both languages (`ar` and `en`):

| Screen | How to reach |
| --- | --- |
| `docs/screenshots/arabic-month.png` | `/` in Arabic |
| `docs/screenshots/arabic-week.png` | `/week` in Arabic |
| `docs/screenshots/agenda.png` | `/agenda` |
| `docs/screenshots/command-palette.png` | Ctrl/Cmd+K |
| `docs/screenshots/dashboard-ar.png` | `/dashboard` in Arabic |
| `docs/screenshots/login-demo.png` | `/login` (Try demo) |
| `docs/screenshots/theme-rose.png` | Daily view in Rose theme |

## Roadmap / notes

- Recurring events (daily/weekly/monthly with until/count) are listed as future work.
- Reminders fire only while the app is open; they are not server push.