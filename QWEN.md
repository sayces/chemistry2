# QWEN.md - Chemistry2 Project Context

## Project Overview

**Chemistry2** is a Next.js 16 web application bootstrapped with `create-next-app`. Based on the metadata and structure, it appears to be a website for a "Nail Master from Moscow" branded as "Chemistry". The project uses a **Feature-Sliced Design (FSD)** inspired architecture with clear separation of concerns across `app`, `pages`, `shared`, and `widgets` directories.

### Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript (strict mode) |
| **UI Library** | React 19 |
| **Styling** | SCSS/Sass |
| **State Management** | Zustand |
| **Database/Backend** | Supabase |
| **Linting** | ESLint (with Next.js Core Web Vitals) |

## Project Structure

```
chemistry2/
├── src/
│   ├── app/              # Next.js App Router (root layout, global metadata)
│   ├── pages/            # Feature pages (home, calendar, map)
│   │   ├── calendar/     # Calendar page feature
│   │   └── map/          # Map page feature
│   ├── shared/           # Shared/reusable modules
│   │   ├── assets/       # Static assets
│   │   ├── components/   # UI components (button, header, link, typography, etc.)
│   │   ├── store/        # Global state stores (Zustand)
│   │   └── styles/       # Global SCSS styles (variables, mixins, themes)
│   └── widgets/          # Widget-level components
│       └── navigationColumns/
├── public/               # Public static assets
├── .next/                # Next.js build output
└── node_modules/         # Dependencies
```

### Architecture Pattern

The project follows a **layered architecture** inspired by Feature-Sliced Design:

- **`app/`** - Next.js root-level configuration (layout, global metadata)
- **`pages/`** - Page-level features, each with its own `page.tsx` and `layout.tsx`
- **`widgets/`** - Composite UI blocks (e.g., navigation columns)
- **`shared/`** - Reusable primitives (components, store, styles, assets)

## Building and Running

### Development

```bash
npm run dev
```

Starts the development server. Open [http://localhost:3000](http://localhost:3000) to view.

### Production Build

```bash
npm run build
```

Builds the application for production.

### Start Production Server

```bash
npm start
```

### Linting

```bash
npm run lint
```

Runs ESLint with Next.js Core Web Vitals and TypeScript rules.

## Key Files

| File | Description |
|------|-------------|
| `src/app/layout.tsx` | Root layout with global metadata and base styles |
| `src/app/page.tsx` | Root page that renders the HomeLayout |
| `src/pages/layout.tsx` | Home page layout with Header, Columns, and HomePage |
| `src/shared/store/useNavigationStore.ts` | Zustand store for navigation state |
| `src/shared/styles/index.scss` | Main SCSS entry point (imports variables, mixins, base, theme) |
| `next.config.ts` | Next.js configuration (strict mode enabled) |
| `tsconfig.json` | TypeScript config with path alias `@/*` → `./src/*` |

## Development Conventions

- **TypeScript**: Strict mode enabled, targeting ES2017
- **Styling**: SCSS modules with organized partials (`_variables.scss`, `_mixins.scss`, `_base.scss`, `_theme.scss`)
- **Path Aliases**: Use `@/*` to reference `src/*` (e.g., `@/shared/components/header/Header`)
- **Components**: Follow a folder-per-component pattern within `shared/components/`
- **State Management**: Zustand for global state (see `useNavigationStore`)
- **Client Components**: Pages use `"use client"` directive where interactivity is needed

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with Header, interactive Columns, and main content |
| `/calendar` | Calendar page (placeholder) |
| `/map` | Map page with Header and Main layout |

## Notes

- The project uses Supabase (`@supabase/supabase-js`) but no Supabase client configuration is visible yet — likely to be added.
- Calendar and Map pages are currently stubs with minimal content.
- The home page layout includes an interactive `Columns` component from shared components.
