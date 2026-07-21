# Architecture Report

## Project Structure

```
src/
├── assets/                          # Static assets
├── components/                      # Shared/reusable components
│   ├── animations/                  # Framer Motion animation wrappers
│   │   └── AnimatedFramerMotion/    # AnimatedCounter, AnimatedProgressBar, InViewAnimation
│   ├── buttons/                     # Button components (AddButtons, AuthBtn, IconBtn, etc.)
│   ├── feedback/                    # Loading indicators (GradientRingLoader, LoadingScreen)
│   ├── layout/                      # Layout components (Container, Footer, Header, MainLayout, Sidebar)
│   ├── navigation/                  # Navigation components (Logo, MainMenu, NavigationMenuItem, UserProfile)
│   └── ui/                          # UI primitives (card, chart, Modal, RequiredMark)
├── constants/                       # App-wide constants and config
├── features/                        # Feature-based modules
│   ├── auth/                        # Authentication (components, context, hooks, pages)
│   ├── calendar/                    # Calendar views (components, hooks)
│   ├── dashboard/                   # Dashboard (components, pages)
│   ├── notifications/               # Notification system (components, context)
│   ├── settings/                    # Settings & theme (components, context)
│   ├── sidebar/                     # Sidebar state (context, hooks)
│   └── tasks/                       # Task management (components, context, data)
├── Mock Data/                       # Mock data files
├── pages/                           # (Deprecated — replaced by features/*/pages)
├── routes/                          # Routing configuration (ProtectedRoute, index)
├── animations.jsx                   # Shared animation variants (framer-motion)
├── firebase.js                      # Firebase initialization
├── App.jsx                          # Root component with providers
├── main.jsx                         # Entry point
└── index.css                        # Global styles
```

## Key Decisions

- **Import Aliases**: `@/` maps to `src/` (configured in `vite.config.js` + `jsconfig.json`)
- **State Management**: React Context + hooks (no external state library)
- **Routing**: react-router-dom v7 with AnimatePresence transitions
- **Styling**: Tailwind CSS 3 with custom theme variables
- **Auth**: Firebase Authentication (email/password + Google)
- **Animations**: framer-motion
- **Forms**: react-hook-form + yup/zod validation

## Provider Hierarchy (from App.jsx)

```
AuthContextProvider
  └── VisibleContextProvider
      └── ThemeProvider
          └── BrowserRouter
              └── NotificationProvider
                  └── Routeing
```

## Feature Isolation

Each feature folder (`auth/`, `calendar/`, `dashboard/`, `notifications/`, `settings/`, `sidebar/`, `tasks/`) contains its own:
- `components/` — feature-specific UI
- `context/` — feature-specific state
- `hooks/` — feature-specific logic
- `pages/` — route-level pages (when applicable)
