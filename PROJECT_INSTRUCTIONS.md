# Project Instructions

This document is the definitive guide for developers and AI Agents working on this codebase. All instructions, rules, patterns, and constraints documented here are extracted directly from the codebase implementation, configuration files, and verified repository evidence.

---

## 1. Project Overview

* **What the project does**: A bilingual (English and Arabic) personal calendar and task management single-page web application (SPA). Features include Month, Week, and Day calendar views; drag-and-drop task and event rescheduling; task tracking (create, complete, reschedule); event scheduling with categories; a dashboard with productivity charts (weekly activity, task completion) and quick notes; theme customization across 7 color schemes; and an in-app notification center.
* **Primary purpose**: Personal scheduling and productivity tracking with first-class Arabic/RTL support and Firebase persistence.
* **Major technologies used**:
  * **Frontend Framework**: React 19 (`react` 19.2.4, `react-dom` 19.2.4)
  * **Build Tool & Bundler**: Vite 8 (`vite` 8.0.13)
  * **Styling**: Tailwind CSS 3.4 (`tailwindcss` 3.4.19, `postcss`, `autoprefixer`)
  * **Backend as a Service**: Firebase 12 (`firebase` 12.14.0 — Authentication & Cloud Firestore)
  * **Routing**: React Router v7 (`react-router-dom` 7.14.0)
  * **Animations**: Framer Motion 12 (`framer-motion` 12.38.0)
  * **Forms & Validation**: React Hook Form 7 (`react-hook-form` 7.78.0) + Yup 1 (`yup` 1.7.1) with `@hookform/resolvers`
  * **Date Handling**: Custom date logic + native `Intl` API + `react-datepicker` 9.1.0 (`date-fns` 4.4.0 transitively)
  * **Charts**: Recharts 3 (`recharts` 3.8.1)
  * **Icons & Fonts**: Lucide React (`lucide-react` 1.7.0), `@fontsource/inter`, `@fontsource/ibm-plex-sans-arabic`

---

## 2. Architecture

### Overall Architecture
The application is a client-side Single Page Application (SPA) communicating directly with Firebase Authentication and Cloud Firestore. There is no custom backend server or intermediate API gateway.

```
┌────────────────────────────────────────────────────────┐
│                      Browser UI                        │
│   (React 19 + Tailwind CSS 3.4 + Framer Motion)        │
└────────────┬─────────────────────────────▲─────────────┘
             │                             │
             ▼                             │
┌──────────────────────────┐  ┌────────────┴─────────────┐
│  React Context Layer     │  │ Native Pointer DnD Engine│
│ (Auth, Tasks, Events,    │  │ (30-min snap, lane calc, │
│  Notes, Themes, i18n)    │  │  HOUR_HEIGHT=56 mapping) │
└────────────┬─────────────┘  └──────────────────────────┘
             │
             ▼
┌──────────────────────────┐
│ Feature Services         │
│ (taskService,            │
│  eventService, etc.)     │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│ Cloud Firestore / Auth   │
│ (Scoped: users/{uid}/*)  │
└──────────────────────────┘
```

### Major Components & Provider Hierarchy
State and infrastructure providers wrap the application in `src/App.jsx` and the respective layout/page levels:

```
App.jsx
└── LocalizationProvider           (Language 'en'|'ar', RTL/LTR, Intl formatters)
    └── AuthContextProvider        (Firebase Auth listener & session state)
        └── VisibleContextProvider (Mobile/desktop sidebar visibility toggle)
            └── ThemeProvider      (7 theme palette management via CSS variables)
                └── BrowserRouter  (React Router v7 router)
                    └── NotificationProvider (User notifications context)
                        └── Routeing (/login, /register, /forgot-password, /, /dashboard)
```

At the route level:
* **Calendar Routes** (`/`, `/week`, `/day` via `src/components/layout/MainLayout/index.jsx`):
  `TaskProvider` ➔ `EventProvider` ➔ `CalendarDateProvider` ➔ `CalendarOverlayProvider` ➔ `MainLayout` (`Header` + `Outlet` + `MainMenu`)
* **Dashboard Route** (`/dashboard` via `src/features/dashboard/pages/Dashboard/index.jsx`):
  `SidebarProvider` ➔ `TaskProvider` ➔ `EventProvider` ➔ `NotesProvider` ➔ `DashboardContent` (`Sidebar` + `DashboardHeader` + Widgets)

### Component Interaction Patterns
1. **Context + Custom Hook Pattern**: Components consume state exclusively through feature hooks (e.g., `useAuth()`, `useTask()`, `useEvents()`, `useCalendarDate()`, `useCalendarOverlay()`, `useLocalization()`).
2. **Service Layer Separation**: Components never call Firestore directly. Context providers interact with service functions (`src/features/*/services/*.js`), which wrap Firestore modular SDK functions.
3. **Optimistic UI Updates with Rollback**: When a user updates, toggles, or deletes an item (tasks, events, notes, notifications), the React state updates immediately in memory. If the asynchronous Firestore call fails, the change is reverted and an error is set in the context.
4. **Pointer Events Drag-and-Drop Engine**: Rather than relying on HTML5 drag-and-drop or external libraries, DnD is implemented using the native Pointer Events API (`pointerdown`, `pointermove`, `pointerup`, `pointercancel`) with hit-testing (`document.elementFromPoint`), 30-minute slot snapping, and lane assignment (`layoutDayBlocks`).

---

## 3. Directory Structure

```
calender-app/
├── public/                       # Static public assets (favicon.svg)
├── src/
│   ├── assets/                   # Empty directory (reserved for static media)
│   ├── components/               # Shared, application-wide UI components
│   │   ├── animations/           # Framer motion animated primitives
│   │   │   └── AnimatedFramerMotion/ # AnimatedCounter, AnimatedProgressBar, InViewAnimation
│   │   ├── buttons/              # Generic button components (AddButtons, AuthBtn, IconBtn, ShineButton)
│   │   ├── feedback/             # Loaders & spinners (GradientRingLoader, LoadingScreen)
│   │   ├── form/                 # Empty directory (legacy)
│   │   ├── layout/               # Shell layout components (Container, Footer, Header, MainLayout, Sidebar)
│   │   ├── navigation/           # Navigation controls (Logo, MainMenu, NavigationMenuItem, UserProfile)
│   │   ├── ui/                   # Reusable UI primitives (card, chart, Modal, RequiredMark)
│   │   └── MotionPage.jsx        # Route transition wrapper with motion reduction support
│   ├── constants/                # App-wide constants
│   │   ├── const.js              # Days of week, months of year, navigation action types, settings items
│   │   ├── form.js               # Common form CSS classes (FORM_CLASSES) and time picker options (TIME_OPTIONS)
│   │   └── themes.js             # Theme definitions (THEMES metadata array)
│   ├── features/                 # Modular feature-sliced domain code
│   │   ├── auth/                 # Authentication & user profile
│   │   │   ├── components/       # Auth forms (LoginForm, RegisterForm, ForgotPasswordForm, AuthCard)
│   │   │   ├── context/          # AuthContext & AuthContextProvider
│   │   │   ├── hooks/            # useAuth hook
│   │   │   ├── pages/            # LoginPage, RegisterPage, ForgotPasswordPage
│   │   │   ├── services/         # userProfileService.js (profile doc in Firestore)
│   │   │   ├── utils/            # firebaseErrors.js (localized error mapping)
│   │   │   └── validation/       # authSchemas.js (Yup schemas with localization)
│   │   ├── calendar/             # Calendar views and scheduling
│   │   │   ├── components/       # MonthCalendar, WeekCalendar, DayCalendar, TimeGutter, EventCard, etc.
│   │   │   ├── context/          # CalendarDateContext, CalendarOverlayContext, EventContext
│   │   │   ├── hooks/            # useCalendarData, useCalendarDataDrop, useCalendarDragAndDrop, useDate
│   │   │   ├── services/         # eventService.js (CRUD for events in Firestore)
│   │   │   └── utils/            # calendarUtils, calendarItems, calendarTime, dragDrop
│   │   ├── dashboard/            # Dashboard & analytics
│   │   │   ├── components/       # WelcomeSection, GridStatus, UpcomingEvents, NotesWidget, ProductivityAnalytics
│   │   │   ├── context/          # NotesContext & NotesProvider
│   │   │   ├── pages/            # Dashboard page
│   │   │   ├── services/         # noteService.js (CRUD for notes in Firestore)
│   │   │   └── utils/            # analytics.js (completion stats, weekly activity calculations)
│   │   ├── notifications/        # Notification system
│   │   │   ├── components/       # NotificationBell, NotificationBadge, NotificationPreview, NotificationItem
│   │   │   ├── context/          # NotificationContext & NotificationProvider
│   │   │   └── services/         # notificationService.js (CRUD for notifications)
│   │   ├── settings/             # User settings & preferences
│   │   │   ├── components/       # SettingsMenu, ThemePicker, ThemeToggle, LanguageSettings, LanguageToggle
│   │   │   └── context/          # ThemeContext & ThemeProvider
│   │   ├── sidebar/              # Sidebar state
│   │   │   ├── context/          # SidebarContext & VisibleContext
│   │   │   └── hooks/            # useSidebar
│   │   └── tasks/                # Tasks & unified task/event modal
│   │       ├── components/       # Task card, TodaysTasks, TaskModal, TaskForm, EventForm
│   │       ├── context/          # TaskContext & TaskProvider
│   │       ├── data.js           # Static categories array (planning, meeting, design, etc.)
│   │       └── services/         # taskService.js (CRUD for tasks in Firestore)
│   ├── Hooks/                    # Global hooks directory (contains commented useLoading)
│   ├── i18n/                     # Internationalization & localization
│   │   ├── ar.js                 # Arabic translation dictionary
│   │   ├── en.js                 # English translation dictionary
│   │   ├── LocalizationProvider.jsx # Localization context, Intl formatters, RTL/LTR switcher
│   │   └── time.js               # formatStoredTime helper
│   ├── pages/                    # Empty legacy directory (pages are located in features/*/pages)
│   ├── routes/                   # Routing configuration
│   │   ├── index.jsx             # Route definitions and AnimatePresence setup
│   │   └── ProtectedRoute/       # Auth guard redirecting to /login
│   ├── services/                 # Empty legacy directory (services live in features/*/services)
│   ├── types/                    # Empty legacy directory
│   ├── utils/                    # Empty legacy directory
│   ├── animations.jsx            # Framer Motion page variants and transitions
│   ├── App.css                   # Global app layout overrides
│   ├── App.jsx                   # Root component with provider tree
│   ├── firebase.js               # Firebase app, auth, and firestore initialization
│   ├── index.css                 # Global Tailwind styles, CSS variables, typography rules
│   └── main.jsx                  # React DOM entry point
├── .env.example                  # Template for Firebase credentials
├── eslint.config.js              # ESLint 9 flat configuration
├── index.html                    # Root HTML document
├── jsconfig.json                 # Path aliases for JS IntelliSense (@ -> ./src)
├── package.json                  # Dependencies and build scripts
├── postcss.config.js             # PostCSS plugins (tailwindcss, autoprefixer)
├── tailwind.config.js            # Tailwind themes, colors, spacing, and utilities
└── vite.config.js                # Vite build config with path alias resolution
```

---

## 4. Development Rules

### Where New Code Goes
1. **New features**: Create a new folder under `src/features/<feature-name>/` containing `components/`, `context/`, `hooks/`, and `services/` as needed.
2. **Feature-specific UI**: Place inside `src/features/<feature-name>/components/`.
3. **Shared UI primitives**: Place in `src/components/ui/`, `src/components/buttons/`, `src/components/feedback/`, or `src/components/layout/`.
4. **Data fetching**: All Firestore interactions must go into `src/features/<feature-name>/services/<entity>Service.js`. Never query Firestore inside UI components or hooks directly.
5. **Localization keys**: Add all user-facing strings to **both** `src/i18n/en.js` and `src/i18n/ar.js` under the appropriate namespace.

### Existing Patterns That Must Be Followed
* **Import Alias**: Always use `@/` to import from `src/` (e.g., `import { db } from "@/firebase"`). Configured in `vite.config.js` and `jsconfig.json`.
* **Context Hooks Error Handling**: Always guard context hooks with:
  ```javascript
  const context = useContext(SomeContext);
  if (!context) {
    throw new Error("useSomeContext must be used within a SomeContextProvider");
  }
  return context;
  ```
* **Language-Agnostic Storage**:
  * Store time in 12-hour English format (e.g., `"09:30 AM"`, `"02:00 PM"`). Do not store localized Arabic numerals or strings in Firestore.
  * Store categories as stable English keys (e.g., `"planning"`, `"meeting"`). Localize them in the UI via `t('categories.' + key)`.
* **Microtask Queue for State Initialization**: When initializing context data from Firestore in `useEffect`, follow the established pattern with cancellation flags:
  ```javascript
  useEffect(() => {
    let isCancelled = false;
    queueMicrotask(() => {
      if (isCancelled) return;
      if (!uid) { /* reset state */ return; }
      // fetch data and handle cancellation
    });
    return () => { isCancelled = true; };
  }, [uid]);
  ```
* **Accessible Modals**: Modals must be mounted via `createPortal(..., document.body)`, lock or blur backgrounds, support `Escape` key close, and use Framer Motion for entrance/exit animations.

### What Should NOT Be Modified
* **Do not use `createdAt` as a calendar date**: A task's creation timestamp is distinct from its scheduled calendar date (`date` / `startAt`).
* **Do not alter `HOUR_HEIGHT = 56`**: The drag-and-drop calculation, time gutter, and calendar block positioning are strictly bound to this constant.
* **Do not delete empty legacy directories** (`src/assets`, `src/services`, `src/types`, `src/utils`, `src/components/form`, `src/pages/Dashboard`) unless explicitly directed by the repository owner.

---

## 5. Coding Conventions

### Naming Conventions
* **React Components**: PascalCase named exports and folder names (e.g., `MonthCalendar`, `TaskModal`). File names use either `index.jsx` or `<ComponentName>.jsx`.
* **Custom Hooks**: camelCase starting with `use` (e.g., `useCalendarDataDrop.js`, `useAuth/index.jsx`).
* **Services**: camelCase ending in `Service.js` (e.g., `taskService.js`, `eventService.js`).
* **Utilities & Helpers**: camelCase (e.g., `calendarUtils.js`, `analytics.js`).
* **Constants**: SCREAMING_SNAKE_CASE (e.g., `HOUR_HEIGHT`, `TIME_SNAP_MINUTES`, `FORM_CLASSES`).
* **Localization Keys**: camelCase nested paths (e.g., `t('taskForm.title')`, `t('common.cancel')`).

### Formatting & Imports
* File formatting follows standard modern JavaScript (ESM) with JSX.
* Single quotes or double quotes are accepted, but within a file consistency is maintained.
* Group imports in the following order:
  1. React core hooks and standard React libraries (`react`, `react-dom`, `react-router-dom`)
  2. Third-party packages (`framer-motion`, `lucide-react`, `yup`, `react-datepicker`)
  3. Internal aliased modules (`@/firebase`, `@/constants/...`, `@/i18n/...`)
  4. Feature-level contexts and hooks
  5. Feature components and local utilities
  6. Stylesheets (`.css`)

### RTL and Arabic Styling Conventions
* **Use logical properties**: Use `start-` and `end-` rather than `left-` and `right-` for positioning, padding, and margins (e.g., `ms-`, `me-`, `ps-`, `pe-`, `border-s`, `border-e`, `insetInlineStart`).
* **No `uppercase` or tracking on Arabic text**: Latin uppercase and letter tracking break Arabic cursive connections. In `src/index.css`, `html[lang="ar"] .uppercase` is forced to `text-transform: none` and `[class*="tracking-"]` to `letter-spacing: normal`. Never rely on uppercase transformations for Arabic content.
* **Touch actions on drag handles**: `html[dir="rtl"] .cal-drag-handle { touch-action: none; }` is enforced to prevent browser gestures from hijacking drag interactions.

### Error Handling
* In services, throw standard `Error` with descriptive message if unauthenticated:
  ```javascript
  if (!uid) throw new Error("User is not authenticated");
  ```
* In contexts, catch asynchronous errors, log with `console.error()`, revert optimistic state updates, and expose an `error` string to consumers.
* In auth forms, map Firebase auth error codes through `getFirebaseErrorMessage(error, t)` (`src/features/auth/utils/firebaseErrors.js`) to provide localized feedback.

---

## 6. Frameworks & Dependencies

### Main Frameworks & Libraries
| Package | Version Range | Purpose |
| :--- | :--- | :--- |
| `react` / `react-dom` | `^19.2.4` | UI library and virtual DOM rendering |
| `vite` | `^8.0.1` | Build tooling and development server |
| `firebase` | `^12.14.0` | Authentication and Cloud Firestore |
| `tailwindcss` | `^3.4.19` | Utility-first styling with custom CSS properties |
| `react-router-dom` | `^7.14.0` | Declarative client-side routing |
| `framer-motion` | `^12.38.0` | Page and component transitions, spring animations |
| `react-hook-form` | `^7.78.0` | Performant form state management |
| `yup` | `^1.7.1` | Schema validation for forms |
| `@hookform/resolvers` | `^5.4.0` | Bridge between React Hook Form and Yup |
| `lucide-react` | `^1.7.0` | UI icon set |
| `recharts` | `^3.8.1` | SVG charts for analytics |
| `react-datepicker` | `^9.1.0` | Date picker dropdowns |
| `@fontsource/inter` | `^5.2.8` | Self-hosted Inter font |
| `@fontsource/ibm-plex-sans-arabic` | `^5.3.0` | Self-hosted IBM Plex Sans Arabic font |

### Dependency Rules & Constraints
* **Do NOT introduce redundant state libraries**: Do not install Redux, Zustand, Recoil, or Jotai. State management is strictly React Context.
* **Do NOT add third-party DnD libraries**: Drag-and-drop is intentionally built using the native Pointer Events API in `src/features/calendar/hooks/useCalendarDragAndDrop.js`. Do not install `react-beautiful-dnd`, `@dnd-kit`, or `react-dnd`.
* **Do NOT add an i18n library**: The app uses a purpose-built `LocalizationProvider.jsx` with native `Intl` formatters and localized JS dictionaries. Do not install `i18next` or `react-intl`.
* **Transitive `date-fns`**: `date-fns/locale` is used by `TaskForm.jsx` and `EventForm/index.jsx` because `react-datepicker` depends on it. If adding direct date-fns utilities, be aware it is currently not declared in `dependencies` in `package.json`.

---

## 7. Build & Run

All commands extracted directly from `package.json`:

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Starts Vite dev server on the local machine (default `http://localhost:5173/`).

### Production Build
```bash
npm run build
```
Executes `vite build`. Emits compiled, minified bundle to `dist/`.

### Preview Production Build
```bash
npm run preview
```
Spins up Vite preview server for the compiled `dist/` directory.

### Linting
```bash
npm run lint
```
Runs ESLint (`eslint .`).
*Note: Currently reports 5 Fast Refresh errors in `src/i18n/LocalizationProvider.jsx` (`react-refresh/only-export-components`). The build itself still succeeds.*

### Type Checking
No TypeScript compiler is configured (`tsc` is not present in `package.json`, and there is no `tsconfig.json`). `@types/react` and `@types/react-dom` are installed solely for IDE editor assistance.

---

## 8. Testing

### Current Testing State
* **Testing Framework**: None configured in `package.json`.
* **Test Scripts**: There is **no `npm test` script** in `package.json`.
* **Test Files**: There are **zero test files** (`*.test.*` or `*.spec.*`) in the repository.
* **Evidence**: Although `README.md` mentions `npm test` with `vitest + @testing-library/react`, neither `vitest` nor `@testing-library` packages exist in `package.json` dependencies or devDependencies.
* **Rule for Developers & Agents**: Do not attempt to run `npm test` without first checking `package.json`. When introducing tests, Vitest would be the natural Vite companion, but introducing dependencies requires explicit approval.

---

## 9. Git & Development Workflow

### Observed Git Patterns
* **Active Branches**:
  * `feat/rtl-and-upgrade` (Current active feature branch containing complete RTL, Arabic localization, theme tokens, and refactored DnD).
  * `master` (Earlier baseline).
  * `reviw` (Intermediate development branch).
* **Commit Conventions**:
  * Commits frequently follow Conventional Commits style (e.g., `feat(i18n): localize CalendarViewSwitcher`, `fix: ...`, `refactor: ...`).
  * Solo author identity: `mohammadmesmeh <mesmeh2004@gmail.com>`.
  * AI Co-Authorship trailer: Multiple commits carry `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`.
* **CI/CD Pipeline**:
  * **None**. No `.github/workflows` directory exists.
  * No automated lint/build check on push. Developers must run `npm run lint` and `npm run build` locally.
* **Deployment Configuration**:
  * No `firebase.json`, `vercel.json`, or `netlify.toml` file is present in the repository root.

---

## 10. Environment & Configuration

### Environment Variables
Environment variables must be prefixed with `VITE_` to be exposed to the client by Vite. Configured in `src/firebase.js`:

| Variable Name | Description |
| :--- | :--- |
| `VITE_FIREBASE_API_KEY` | Firebase Web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Authentication domain |
| `VITE_FIREBASE_PROJECT_ID` | Google Cloud / Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage bucket URI |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Cloud Messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase Web App ID |
| `VITE_FIREBASE_MEASUREMENT_ID` | Google Analytics measurement ID |

### Configuration Rules
* `.env.example` is checked into version control as a template.
* `.env` is listed in `.gitignore` and **must never be committed**.
* **Never hardcode credentials or secrets in source code files.**

---

## 11. API & Database Rules

### Firestore Architecture
Firestore collections are strictly subcollections nested under the authenticated user's UID:

```
users/{uid}/
├── profile/
│   └── profile              (Single document: displayName, photoURL, timezone, language, createdAt, updatedAt)
├── tasks/
│   └── {taskId}             (title, date, startAt, endAt, time, endTime, day, completed, priority, description, createdAt, updatedAt)
├── events/
│   └── {eventId}            (title, date, startAt, endAt, time, day, note, type, color, location, createdAt, updatedAt)
├── notes/
│   └── {noteId}             (text, pinned, timestamp, createdAt, updatedAt)
└── notifications/
    └── {notificationId}     (title, message, time, read, type, createdAt, updatedAt)
```

### Database Access & Mutation Rules
1. **Always authenticate**: Every service method checks `if (!uid) throw new Error("User is not authenticated")`.
2. **Timestamps**: Always write `createdAt: serverTimestamp()` and `updatedAt: serverTimestamp()` via `firebase/firestore`.
3. **One-Time Fetches**: The application uses one-time `getDocs` / `getDoc` calls on component mount, ordered by `orderBy("createdAt", "desc")`. It does **not** maintain real-time listeners (`onSnapshot`).
4. **Partial Updates**: Updates must use `setDoc(docRef, { ...updates, updatedAt: serverTimestamp() }, { merge: true })` to prevent overwriting omitted fields.
5. **No Cascading Deletions**: When deleting parent records, there are currently no automated Cloud Functions or transactional cascading deletions. Deletions are individual `deleteDoc` calls.

---

## 12. Security Rules

* **Client Credential Scope**: All `VITE_FIREBASE_*` variables are client-side public config. Security relies entirely on Firebase Authentication tokens and Firestore Security Rules.
* **Database Isolation**: The client enforces path isolation by always routing requests to `users/${uid}/*`.
* **Firestore Security Rules**: Note that no `firestore.rules` file is tracked in this Git repository. Firestore rules must be configured in the Firebase Console to enforce `request.auth != null && request.auth.uid == uid`.
* **Input Validation**: Client-side form input validation is enforced via Yup schemas (`src/features/auth/validation/authSchemas.js`) and inline form validation (`TaskModal.jsx`). Max lengths are set on inputs (e.g., `maxLength={100}`).

---

## 13. Do & Don't

### DO
* **DO** use the `@/` path alias for all cross-directory imports.
* **DO** use Tailwind CSS variables and theme tokens (e.g., `bg-surface`, `text-text`, `bg-primary`, `rounded-card`).
* **DO** write direction-friendly CSS using logical properties (`ps-`, `pe-`, `ms-`, `me-`, `border-s`, `border-e`, `start-`, `end-`).
* **DO** update both `src/i18n/en.js` and `src/i18n/ar.js` whenever adding new user-facing copy.
* **DO** wrap any new calendar views with `TaskProvider`, `EventProvider`, `CalendarDateProvider`, and `CalendarOverlayProvider`.
* **DO** maintain optimistic updates with error rollbacks inside Context providers.
* **DO** keep dates and categories language-agnostic in Firestore (store 12-hour English time strings and fixed category keys).

### DON'T
* **DON'T** touch or query Firestore directly inside UI components; keep all data access in feature service files.
* **DON'T** use `createdAt` or day-of-week strings (`day: "Monday"`) to calculate calendar dates; use `resolveTaskDate()` or `startAt`.
* **DON'T** install external drag-and-drop or i18n libraries.
* **DON'T** use `uppercase` or wide letter spacing (`tracking-*`) on Arabic text.
* **DON'T** commit `.env` or paste real credentials into code or documentation.
* **DON'T** use `npm test` assuming Vitest is installed without checking `package.json`.
* **DON'T** change the calendar grid hour scale (`HOUR_HEIGHT = 56`) without updating all drag/drop and position calculations.

---

## 14. AI Agent Instructions

When acting as an AI coding Agent in this codebase:

1. **Check Reality vs Documentation**:
   The repository contains documentation (`README.md`) that describes aspirational or planned features (such as an Agenda view, command palette, undo, conflict warnings, ICS export, and Vitest test suite) that **do not exist** in the actual code. Always verify the code before assuming a documented feature exists.
2. **Preserve the Native Drag-and-Drop Implementation**:
   Do not attempt to replace `useCalendarDragAndDrop.js` with third-party libraries. If modifying drag-and-drop, adhere to the Pointer Events pattern and the `HOUR_HEIGHT = 56` slot math.
3. **Keep Context Exports Clean**:
   Be aware of ESLint rule `react-refresh/only-export-components`. When creating or editing context providers, keep context definitions or helper functions in separate `.js` files if Fast Refresh warnings must be avoided.
4. **Follow the Existing Context Provider Pattern**:
   When creating new feature state:
   * Define the Context in `<Name>Context.js`.
   * Create the Provider in `<Name>Provider.jsx` with `useMemo` for the context value and `useCallback` for actions.
   * Export the consumer hook in `index.jsx` or `use<Name>.js` with the `if (!context) throw Error` guard.
5. **Respect RTL & Bilingual Architecture**:
   Never hardcode English or Arabic strings in JSX. Always use `const { t } = useLocalization()` and call `t('namespace.key')`.
6. **Verify Build**:
   After making changes, always run `npm run build` to verify there are no broken imports or syntax errors.

---

## 15. Common Pitfalls

1. **Fast Refresh Lint Errors in Context Files**:
   Exporting utility functions, constants, or context instances from the same file that exports a React component triggers ESLint's `react-refresh/only-export-components` error (seen in `src/i18n/LocalizationProvider.jsx`). Separate context objects and helpers into standalone `.js` files.
2. **Mixing Scheduled Date with `createdAt`**:
   Tasks have both `createdAt` (server timestamp of creation) and `date` / `startAt` (the calendar date the task is scheduled for). Using `createdAt` to determine calendar positioning will cause tasks to appear on the day they were created rather than their scheduled date.
3. **Hardcoding Week Start**:
   The user preference supports `sat`, `sun`, and `mon` in `LocalizationProvider.jsx`, but `MonthCalendar` and `WeekCalendar` currently construct their grid assuming Sunday start (`new Date(YEAR, MONTH, 1 - numFirst)`). Modifying one without the other will cause visual misalignment.
4. **Missing Direct Dependency on `date-fns`**:
   `date-fns/locale` is imported in `TaskForm.jsx` and `EventForm/index.jsx` but is not explicitly declared in `package.json`. Relying on transitive dependencies from `react-datepicker` can fail if dependencies are cleaned or swapped.
5. **Large Single Bundle Warning**:
   `npm run build` generates a single 1.5MB bundle because no code splitting or `React.lazy` is implemented in `src/routes/index.jsx`. Be cautious when adding large dependencies.
6. **Missing Firestore Security Rules File**:
   Because `firestore.rules` is not tracked in the repo, local tests against an emulator or deployments without console-side rules will either fail or leave data completely unprotected.

---

## 16. Important Files

| File Path | Purpose | Why It Matters | When an Agent Should Inspect It |
| :--- | :--- | :--- | :--- |
| `src/firebase.js` | Firebase SDK initialization | Connects Auth and Firestore instances to the app | When reviewing backend configuration or authentication setup |
| `src/App.jsx` | App root component | Defines the top-level React Context provider tree | When adding global providers or debugging provider order |
| `src/routes/index.jsx` | React Router configuration | Central list of all routes and public/protected gates | When adding a new page or modifying navigation flow |
| `src/components/layout/MainLayout/index.jsx` | Layout for calendar views | Mounts calendar-specific context providers and shell UI | When modifying calendar shell or adding calendar-wide features |
| `src/features/calendar/hooks/useCalendarDragAndDrop.js` | Pointer-based DnD hook | Core engine for dragging tasks and events across the grid | When altering drag mechanics, snapping, or drop detection |
| `src/features/calendar/utils/dragDrop.js` | DnD mathematical helpers | Defines `DRAG_THRESHOLD_PX`, `TIME_SNAP_MINUTES`, and coordinate-to-time math | When adjusting time slot resolution or grid coordinate mapping |
| `src/features/calendar/utils/calendarTime.js` | Time grid placement & lanes | Calculates block heights, top offsets, and overlap lanes (`layoutDayBlocks`) | When fixing overlapping event displays or changing grid heights |
| `src/features/calendar/utils/calendarItems.js` | Calendar item normalization | Merges and normalizes tasks and events for display | When debugging item filtering by date or category colors |
| `src/i18n/LocalizationProvider.jsx` | i18n & RTL manager | Controls `dir="rtl"`, language switching, and `Intl` date formatters | When modifying language behavior, dates, or translation logic |
| `src/constants/themes.js` & `src/index.css` | Design system & CSS tokens | Defines the 7 theme color palettes and global typography/RTL rules | When styling UI components or adding new theme variables |

---

## 17. Verified vs Inferred Rules

### Verified Rules (Direct Evidence from Code & Config)
* **React 19 & Vite 8**: Direct evidence in `package.json`.
* **Path Alias `@/`**: Configured in `vite.config.js` and `jsconfig.json`.
* **No External State Manager**: React Context API is used exclusively across all features.
* **Native Pointer DnD**: Pointer event listeners and `elementFromPoint` are used in `useCalendarDragAndDrop.js`.
* **Firestore Data Isolation**: All service files query `users/${uid}/*`.
* **Bilingual Support**: Fully implemented parallel dictionaries in `src/i18n/en.js` and `src/i18n/ar.js`.
* **7 Persistent Themes**: Configured in `tailwind.config.js`, `src/constants/themes.js`, and `src/index.css`.
* **No Test Suite**: Confirmed 0 test files in `src/` and no test runner in `package.json`.

### Inferred Conventions (Observed Consistent Patterns)
* **Context Microtask Queuing**: Every major provider uses `queueMicrotask` in `useEffect` when fetching data on `uid` change.
* **Optimistic Local Updates**: Providers consistently update state first and roll back if the Firestore promise rejects.
* **Language-Agnostic Storage**: Stored time strings are formatted in 12-hour English (`"09:30 AM"`) and converted to localized strings at render time.
* **Arabic Typography Neutralization**: Uppercase and tracking classes are stripped in Arabic mode via `src/index.css` to preserve cursive calligraphy.

### Unknowns
* **Remote Firestore Security Rules**: Cannot be verified from the codebase because no `firestore.rules` file is present in the repository.
* **Production Deployment URL**: No production hosting configuration (`firebase.json`, `vercel.json`, etc.) or live domain is documented in the repository.
* **Future Test Framework Choice**: Unknown whether the repository owner intends to adopt `vitest` or another runner when tests are added.

---

## 18. Change Checklist

Before completing any code modifications in this repository, verify the following checklist:

* [ ] **Scope understood**: I have identified all affected components, contexts, and services.
* [ ] **Path alias used**: All imports use the `@/` alias for internal modules rather than complex relative paths (`../../`).
* [ ] **No invented patterns**: I followed the existing React Context + Service layer architecture.
* [ ] **No unnecessary dependencies**: I avoided adding state libraries, DnD packages, or i18n frameworks.
* [ ] **Both languages updated**: Any new UI string has been added to both `src/i18n/en.js` and `src/i18n/ar.js`.
* [ ] **RTL compatibility maintained**: All styling uses Tailwind logical properties (`start-`, `end-`, `ps-`, `pe-`, `ms-`, `me-`) and avoids uppercase/tracking on Arabic text.
* [ ] **Firestore scoped to user**: Any new database operation accesses paths under `users/${uid}/*`.
* [ ] **Data stored language-agnostic**: Dates, times, and category keys are stored in standard formats, not localized strings.
* [ ] **Build passes**: Ran `npm run build` without compilation or bundling errors.
* [ ] **Clean diff**: No unintended edits to legacy empty folders, `.env`, or unrelated files.
