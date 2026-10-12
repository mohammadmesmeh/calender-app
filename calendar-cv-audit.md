# Calendar App — CV Audit

Read-only, evidence-based audit. Branch audited: `feat/rtl-and-upgrade` (current `HEAD` at the time of this audit). Every claim below cites the file path, command, or git output it came from. Where I could not verify something, it is listed under "Questions for Mohammad" instead of guessed.

---

## Authorship

**Command:** `git shortlog -sne --all`
```
    83  mohammadmesmeh <mesmeh2004@gmail.com>
```

**Command:** `git log --format='%an <%ae>' | sort | uniq -c`
```
     83 mohammadmesmeh <mesmeh2004@gmail.com>
```

Every commit's **author** field is `mohammadmesmeh <mesmeh2004@gmail.com>` — no other author identity appears anywhere in the history on any branch.

**AI tool disclosure (important):** the commit *author* is always you, but **37 of the 83 commits** carry a `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>` trailer in the commit body (verified via `git log --all --grep="Co-Authored-By" --format="%H %s" | wc -l` → `37`, and `git log --all --format="%B" | grep "^Co-Authored-By" | sort -u` → only that one identity). These are concentrated on `feat/rtl-and-upgrade` (the Arabic/RTL localization work) and are visible in the log, e.g.:
```
feat(i18n): localize CalendarViewSwitcher
...
Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
```
So: the project is solo-authored by you (sole committer, sole author identity), but a meaningful portion of the code — specifically the Arabic/RTL localization pass — was written with an AI coding assistant as a disclosed co-author, not entirely unassisted. I'm flagging this because the brief says "I built solo" and asks me to note any AI-tool authors.

**Date range:**
- First commit: `2026-04-27` ("first commit", `1286bf2`)
- Last commit: `2026-09-23` (current `HEAD` of `feat/rtl-and-upgrade`)
- (`git log --reverse --all --format='%ad' --date=short` / `git log -1 --format='%ad' --date=short`)

**Per-branch commit counts** (`git rev-list --count <branch>`): `master` 14, `reviw` 43, `feat/rtl-and-upgrade` 83. The branches are divergent histories of the same project, not separate features merged together — `feat/rtl-and-upgrade` is the most complete and current.

---

## Technical Inventory

### 1. Stack and versions
Source: `package.json` + exact installed versions via `node -p "require('./node_modules/<pkg>/package.json').version"`.

| Package | package.json range | Installed |
|---|---|---|
| react / react-dom | ^19.2.4 | 19.2.4 |
| vite | ^8.0.1 | 8.0.13 |
| firebase | ^12.14.0 | 12.14.0 |
| tailwindcss | ^3.4.19 | 3.4.19 |
| react-router-dom | ^7.14.0 | 7.14.0 |
| framer-motion | ^12.38.0 | 12.38.0 |
| react-hook-form | ^7.78.0 | 7.78.0 |
| yup | ^1.7.1 | 1.7.1 |
| react-datepicker | ^9.1.0 | 9.1.0 |
| recharts | ^3.8.1 | 3.8.1 |
| date-fns | *(not a direct dependency — see note)* | 4.4.0 |

Note: `date-fns` is imported directly in two files (`src/features/tasks/components/task-modal/TaskForm.jsx`, `src/features/tasks/components/EventForm/index.jsx`, both `import { ar as arLocale } from 'date-fns/locale'`) but is **not listed in `package.json`**'s own dependencies — it resolves only because `react-datepicker` depends on it. Confirmed stack: **React 19 + Vite 8**, matches your description. **Language: JavaScript, not TypeScript** — `find src -iname "*.ts" -o -iname "*.tsx"` returns 0 files, and there is no `tsconfig.json` at the repo root. `@types/react`/`@types/react-dom` are present as devDependencies but only for editor IntelliSense on `.jsx` files; they do not make this a TypeScript project.

### 2. Architecture
- **Folder structure** (`find src -maxdepth 2 -type d`): feature-based under `src/features/{auth,calendar,dashboard,notifications,settings,sidebar,tasks}`, each typically with its own `components/`, `context/`, `hooks/`, `services/`. Shared UI in `src/components/{animations,buttons,feedback,layout,navigation,ui}`. Localization in `src/i18n/`.
- **Dead/legacy folders present but empty**: `src/pages/Dashboard/`, `src/services/`, `src/types/`, `src/utils/`, `src/components/form/` — all confirmed empty (`find <dir> -type f` returns nothing for each). Leftover from an earlier reorganization; not used.
- **Routing**: `react-router-dom` v7, defined in `src/routes/index.jsx`. 7 routes total: `/login`, `/register`, `/forgot-password` (public), and `/` (Month), `/week`, `/day`, `/dashboard` (behind `src/routes/ProtectedRoute/index.jsx`).
- **State management**: React Context API only — no Redux/Zustand/Jotai in `package.json`. 16 files export a custom `use*` hook (`grep -rl "^export const use[A-Z]" src | wc -l`).
- **Firebase wrapper**: a single file, `src/firebase.js`, initializes `firebase/app`, `firebase/auth` (+ `GoogleAuthProvider`), and `firebase/firestore`, reading config from `import.meta.env.VITE_FIREBASE_*`. I did not open `.env` or print any values, per the rules.

### 3. Features (file paths cited)
- **Calendar views — confirmed Month, Week, and Day** (no Agenda/list view exists): `src/features/calendar/components/MonthCalendar/index.jsx`, `WeekCalendar/index.jsx`, `DayCalendar/index.jsx`, routed in `src/routes/index.jsx`.
- **Task create/edit/delete**: `src/features/tasks/services/taskService.js` exports `createTask`, `updateTask`, `toggleTask`, `deleteTask` against Firestore; UI in `src/features/tasks/components/task-modal/{TaskModal,TaskForm}.jsx`.
- **Event create/edit/delete**: same pattern, `src/features/calendar/services/eventService.js` (`createEvent`, `updateEvent`, `deleteEvent`), UI in `src/features/tasks/components/EventForm/index.jsx` (shared modal with tasks via `TaskModal`).
- **Drag and drop**: hand-written with the **native Pointer Events API** (`pointerdown`/`pointermove`/`pointerup` listeners), not the HTML5 `draggable`/`dragstart`/`drop` API and not a third-party DnD library — confirmed by `grep -n "pointerdown\|pointermove\|pointerup\|draggable=\|onDragStart\|onDrop=" src/features/calendar/hooks/useCalendarDragAndDrop.js`, which only matches the `pointer*` listeners. It supports dragging a task or event card onto another date cell (Month view) or onto a specific time slot (Week/Day views), with 30-minute snapping — logic in `src/features/calendar/utils/dragDrop.js` and `src/features/calendar/hooks/useCalendarDataDrop.js`.
- **Recurring events: not present.** `grep -rliE "recurring|recurrence" src` returns zero matches anywhere in the codebase.
- **Reminders: UI scaffolding only, not a working feature.** `src/features/notifications/components/NotificationItem/index.jsx` has icon/color mappings for notification types `task_reminder` and `event_reminder`, but `grep -rn "createNotification(" src` (the only function that writes a notification document) returns **zero call sites** anywhere in the app. Nothing in the running app ever creates a reminder notification — the type exists in the display code but is never produced.
- **Filters: not present** as a user-facing feature. My initial broad grep for "filter" matched only JavaScript's `.filter()` array method inside unrelated files (`EventProvider.jsx`, `TaskProvider.jsx`, `analytics.js`, etc.), not a filter UI.
- **Categories**: a fixed, hardcoded list of 6 — `src/features/tasks/data.js`: `planning, meeting, design, development, personal, research`. Not user-editable; not a CRUD feature, just a fixed taxonomy used on the Event form.
- **Dashboard/analytics**: `src/features/dashboard/pages/Dashboard/index.jsx` — completion stats, a weekly activity area chart (`AreaStepChart`, Recharts), a completion pie chart (`ProgressCircle`), notes widget, upcoming events.
- **Notes**: simple per-user notes with pin/unpin, `src/features/dashboard/services/noteService.js`.

### 4. Firebase
- **Auth providers**: email/password and Google — confirmed in `src/features/auth/context/authContext/index.jsx`: `createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, `signInWithPopup` (with `GoogleAuthProvider`), and `sendPasswordResetEmail`.
- **Firestore data model** (collection names only, from `grep -rn "collection(db" src`): every collection is nested under `users/{uid}/...` — `users/{uid}/tasks`, `users/{uid}/events`, `users/{uid}/notes`, `users/{uid}/notifications`, and a single profile document at `users/{uid}/profile/profile` (from `src/features/auth/services/userProfileService.js`).
- **Real-time listeners vs one-time reads: all one-time reads.** `grep -rln "onSnapshot" src` returns zero files. Every service (`taskService.js`, `eventService.js`, `noteService.js`, `notificationService.js`) uses `getDocs`/`getDoc` (one-time fetch), loaded once in a `useEffect` on mount per provider, with manual local-state updates on create/update/delete rather than live Firestore subscriptions.
- **Firestore security rules: do not exist in this repository.** `find . -iname "firestore.rules" -not -path "./node_modules/*"` returns nothing, and there is no `firebase.json` either. I cannot confirm or deny per-user data isolation at the database-rules level from the repo alone — the `users/{uid}/...` path structure in the client code is consistent with the kind of structure a `request.auth.uid == uid` rule would protect, but **no rules file exists to verify this**, so I am not claiming it is enforced.

### 5. Arabic / RTL
- **Direction handling**: a custom-built `src/i18n/LocalizationProvider.jsx` (no i18n library — `react-i18next`/`react-intl`/`formatjs` are not in `package.json`). It sets `document.documentElement.lang`/`.dir` directly based on state, and Tailwind's built-in `rtl:`/logical-property utilities (`start-`, `end-`, `ms-`, `me-`, etc.) are used throughout the component tree for direction-aware layout.
- **Date localization**: `Intl.DateTimeFormat`/`Intl.NumberFormat` are used directly (8 occurrences in `LocalizationProvider.jsx` alone) to produce Arabic weekday/month names, optional Hijri dates, and Arabic-Indic digits — not a hardcoded translation table for dates.
- **Week start**: a user preference exists (`src/features/settings/components/LanguageSettings/index.jsx`, Sat/Sun/Mon options) and is wired into the `react-datepicker` popups in the task/event forms (`calendarStartDay` prop), but **does not affect the main Month/Week calendar grids**, which are hardcoded to start on Sunday regardless of this setting (`src/features/calendar/components/MonthCalendar/index.jsx`, `WeekCalendar/index.jsx` both compute the grid via `date.getDay()` with no offset).
- **Both languages exist and are complete**: `src/i18n/en.js` and `src/i18n/ar.js`, each with the same top-level key structure (`common`, `auth`, `nav`, `dashboard`, `calendar`, `settings`, etc.).

### 6. Forms and validation
`react-hook-form` + `@hookform/resolvers` + `yup` schemas (not Zod — Zod was a dependency historically but is **not present** in the current `package.json`, confirmed by `grep -i "zod" package.json` returning nothing). Validation schemas: `src/features/auth/validation/authSchemas.js` (login/register/forgot-password, built as `make*Schema(t)` factories so error messages localize). Task/Event form validation is manual (non-yup) inline logic in `src/features/tasks/components/task-modal/TaskModal.jsx`.

### 7. Performance techniques actually present
- `useMemo`/`useCallback` used in 27 files (`grep -rc "useMemo\|useCallback" src | grep -v ":0" | wc -l`).
- Self-hosted web fonts via `@fontsource/inter` and `@fontsource/ibm-plex-sans-arabic` (avoids a Google Fonts network round-trip).
- **No code splitting**: `grep -rn "React.lazy\|lazy(" src` returns zero matches. The production build (`npm run build`) emits a single JS bundle and explicitly warns about this (see Measurements).
- No `next/image`-equivalent (not Next.js), no explicit caching layer, no service worker found.

### 8. Accessibility
- Many components use `aria-label`, `aria-expanded`, `aria-hidden`, `role` attributes (spot-checked across `Header`, `Sidebar`, `NotificationBell`, `Modal`, calendar components).
- **Keyboard alternative to drag-and-drop**: partial. The only keyboard handling inside the drag hook itself (`src/features/calendar/hooks/useCalendarDragAndDrop.js`) is `Escape` to **cancel** an in-progress pointer drag — there is no keyboard-only way to pick up and move an item the way a mouse/touch drag does (no arrow-key repositioning, no "grab/drop" keyboard mode). However, every draggable event/task bar is rendered as a native `<button>` (confirmed in `src/features/calendar/components/CalendarEventBar/index.jsx`), so it is keyboard-focusable and `Enter`/`Space`-activatable, which opens the same edit modal a mouse click would — and that modal's date/time fields are standard, fully keyboard-operable form controls. So: **rescheduling an item by keyboard alone is possible, but only by editing its date/time in the modal, not by replicating the drag gesture itself.**

### 9. Testing
**No tests exist.** `find src -iname "*.test.*" -o -iname "*.spec.*"` returns zero files. `vitest`/`@testing-library/*` are not in `package.json`. There is no `test` script in `package.json`'s `scripts` block, so there is nothing to run.

### 10. Tooling/quality
- **Lint**: `npm run lint` (ESLint 9, flat config `eslint.config.js`) run on the full current source tree. Result: **5 errors, 0 warnings**, all in one file, all the same rule:
  ```
  src/i18n/LocalizationProvider.jsx — 5× react-refresh/only-export-components
  "Fast refresh only works when a file only exports components."
  ```
  This is a dev-experience lint rule (the file mixes a React context/provider with plain helper functions and constants in one module) — it does not indicate a runtime bug, and the production build succeeds.
- **TypeScript strictness**: not applicable — plain JavaScript project (see §1).
- **CI**: none. `find .github` → directory does not exist.
- **Deployment config**: none found. No `vercel.json`, `netlify.toml`, or `firebase.json` at the repo root.
- **Production URL**: none found. Searched `README.md` and all tracked source/config/markdown files for `http(s)://` patterns pointing at Vercel/Netlify/Firebase Hosting — no matches. A commit titled `"deploy"` exists in history (`git log --all --oneline | grep -i deploy` → `7a33fd1 deploy`), but it is just a commit message; I found no artifact in the repo confirming a live, currently-reachable URL.

---

## Measurements

**Command:** `npm run build` (Vite 8.0.13 / rolldown-vite). Ran successfully, no secrets were read or printed by me to run it — Vite reads `.env` itself at build time, I did not open the file.

Reported bundle output (as printed by Vite):
- **JS**: `dist/assets/index-2T7lpMVX.js` — **1,520.30 kB** (gzip: **451.69 kB**)
- **CSS**: `dist/assets/index-D5J05r2Y.css` — **92.34 kB** (gzip: **21.44 kB**)
- Vite's own build warning, printed verbatim: *"Some chunks are larger than 500 kB after minification. Consider: Using dynamic import() to code-split the application..."* — this is Vite confirming, in its own output, that there is no code splitting (consistent with §7 above).
- Fonts: 25 self-hosted `.woff`/`.woff2` files (Inter + IBM Plex Sans Arabic, multiple weights/subsets), individually 10–49 kB each, loaded as static assets rather than bundled into the JS.

Per your instruction, I did not run Lighthouse.

---

## CV Candidates

Each bullet is written as if for your CV, in English, framed as solo work, with evidence listed under it. I only included outcomes I could measure.

**1.**
> Built a bilingual (English/Arabic) calendar and task-management web app solo with React 19, Vite, and Firebase, implementing full RTL layout and locale-aware date formatting without an i18n library.
- Evidence: `src/i18n/LocalizationProvider.jsx` (custom provider, 8× `Intl.DateTimeFormat`/`Intl.NumberFormat` calls), `src/i18n/en.js` + `ar.js` (parallel dictionaries), Tailwind `rtl:`/logical-property usage across components, package.json confirming no i18n library dependency.

**2.**
> Implemented pointer-based drag-and-drop task/event rescheduling from scratch using the native Pointer Events API, supporting both date-cell and time-slot drop targets with 30-minute time snapping.
- Evidence: `src/features/calendar/hooks/useCalendarDragAndDrop.js`, `src/features/calendar/hooks/useCalendarDataDrop.js`, `src/features/calendar/utils/dragDrop.js`.

**3.**
> Designed a Firestore data model scoping all user data (tasks, events, notes, notifications, profile) under per-user subcollections, with Firebase Authentication supporting email/password and Google sign-in.
- Evidence: `grep -rn "collection(db" src` output (§4), `src/features/auth/context/authContext/index.jsx`.

**4.**
> Built Month/Week/Day calendar views, a task/event management flow, and a Firestore-backed analytics dashboard (completion stats, weekly activity chart) as a solo full project, from initial commit to current state.
- Evidence: `src/routes/index.jsx` (7 routes), `src/features/dashboard/pages/Dashboard/index.jsx`, git date range `2026-04-27` → `2026-09-23`.

*A note on "solo": as disclosed in Authorship above, a portion of the commits (37 of 83, concentrated in the RTL/localization work) carry an AI co-author trailer. If you present this as entirely unassisted solo work, that would not match the repository's own commit history — you may want to phrase it as "solo project, AI-assisted" or similar, or exclude the AI-assisted portion's specifics from CV framing. This is your call; I'm flagging it so the CV claim matches the evidence.*

---

## Not CV-Worthy

Facts that are true but I would not put on a CV, with why:
- **The 6 event categories are a hardcoded, non-editable list** (`src/features/tasks/data.js`). Listing "category management" as a feature would overstate it — there is no create/edit/delete UI for categories.
- **"Reminders" and "filters" do not actually work** (see §3) — don't claim them as features; a technical reviewer who opens the repo would find the gap immediately.
- **No tests exist.** Don't imply test coverage; if asked about testing in an interview, be ready to say honestly that this project has none yet.
- **No CI/CD pipeline and no confirmed live deployment URL.** Don't claim "deployed to production" unless you can point to an actual reachable URL — I found none in the repo.
- **5 pre-existing ESLint errors** in `src/i18n/LocalizationProvider.jsx` — minor, dev-experience-only, not worth mentioning either way, but don't claim "zero lint errors" without caveat.
- **Single 1.5 MB JS bundle, no code splitting** — not a strength to highlight; if performance comes up, this is an honest area for improvement, not an achievement.
- **The week-start preference doesn't reach the main calendar grid** — an inconsistency, not a feature to describe as "fully working."

---

## Questions for Mohammad

1. Is there a live, deployed URL for this app anywhere (Firebase Hosting, Vercel, etc.)? I could not find one in the repository, and the brief says "run the production build" but explicitly not Lighthouse — if you have a URL, it isn't recorded in the repo itself.
2. How do you want to frame the AI-co-authored commits (37/83, concentrated in the RTL work) for a CV that says "solo project"? I didn't guess an answer — see the note under CV Candidates.
3. Do Firestore security rules exist in the Firebase console (not in this repo)? I could not verify per-user data isolation is actually enforced at the database level, since no `firestore.rules` file is checked into version control.
4. Were `src/pages/Dashboard/`, `src/services/`, `src/types/`, `src/utils/`, `src/components/form/` meant to be deleted? They're empty and appear to be leftovers from an earlier restructuring — I didn't delete them since this audit is read-only.
5. Which branch should represent "the project" for CV purposes — `feat/rtl-and-upgrade` (most complete, what I audited), `reviw`, or `master`? They have meaningfully different feature sets.
