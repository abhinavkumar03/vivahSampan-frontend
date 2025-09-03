# MyApp — Next.js App Router Starter (Turbopack, `src/`, Auth-ready)

This is a clean starter for a modular, scalable Next.js app (App Router) using the `src/` directory and Turbopack. It ships with responsive **Login** and **Signup** pages, a simple shell, and a structure that scales by **feature**.

---

## Quick Start

```bash
# install deps
npm i

# run dev (Turbopack)
npm run dev

# build & start
npm run build
npm run start
Environment:

Node 18+ recommended

Spring Boot backend assumed at http://localhost:8080 (configure via .env.local)

bash
Always show details

Copy code
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
Folder Structure
python
Always show details

Copy code
src/
  app/
    (auth)/
      layout.tsx           # uses AppShell + imports auth.css
      login/
        page.tsx           # responsive login UI
      signup/
        page.tsx           # responsive signup UI
      auth.css             # shared styles for auth screens
    (app)/
      page.tsx             # placeholder for authenticated app area
    api/                   # (optional) Next route handlers; version under v1/...
    globals.css
  components/
    layout/
      app-shell.tsx        # site header/nav/footer shell
    ui/
      button.tsx           # gradient button w/ loader
      input.tsx            # accessible text input
      password-input.tsx   # password with show/hide
  constants/
    routes.ts              # central route helpers
  features/
    auth/
      server/
        schemas.ts         # zod schemas for login/signup
  hooks/
    use-toast.ts           # ultra-simple toast (alert) placeholder
  lib/
    api.ts                 # ky instance + helpers (postJson, getJson)
  store/                   # (reserved) zustand/redux for UI state
  styles/
    globals.css            # global resets/minimal styles
  types/                   # shared types (api.d.ts, env.d.ts, etc.)
public/
  favicon.ico
Why this layout?
Feature-first: group code by domain (src/features/<feature>) so each feature owns its components, hooks, and server code.

Thin routes: page/route files stay minimal; logic lives in lib/ or features/*/server/.

Shared primitives: components/ui holds reusable, styling-agnostic building blocks.

Route Groups: (auth) vs (app) keep anonymous/authenticated areas cleanly separated.

Versioned APIs: if you add Next.js Route Handlers, put them under app/api/v1/....

Code Style & Conventions
Type safety: Validate all inputs with Zod (see features/auth/server/schemas.ts).

HTTP: Use lib/api.ts (Ky) for client-side HTTP; prefer HttpOnly cookies set by the backend for session auth.

Naming:

Components: PascalCase

Hooks: useSomething.ts

Files in features: kebab-case.ts

Imports: Use absolute imports with @ path alias (Next default with src/).

CSS: Small local styles colocated or in feature folders; global tokens in styles/.

Auth Screens (UI)
Responsive login/signup with split layout on desktop and single column on mobile.

Accessible inputs with labeled fields, focus ring, and error messages.

PasswordInput includes show/hide toggle.

Social buttons included as placeholders; wire them as needed.

Spring Boot API Contract (to implement later)
Endpoints expected by the current UI. Change paths if you prefer—update lib/api.ts and forms accordingly.

Auth

POST /api/v1/auth/register

req: { name: string, email: string, password: string }

res: 201 Created (body optional, e.g., { userId })

POST /api/v1/auth/login

req: { email: string, password: string }

res (cookies): 200 OK + set HttpOnly access_token cookie; body { userId, name, email }

res (bearer): 200 OK body { token, userId, name, email }

POST /api/v1/auth/logout

204 No Content and clears cookie

GET /api/v1/auth/me

returns current user when authenticated

CORS & Cookies

Allow origin http://localhost:3000

When using cookies: credentials=true, set SameSite=None; Secure in production, and HttpOnly

Error Shape (recommended)

json
Always show details

Copy code
{ "error": { "code": "INVALID_CREDENTIALS", "message": "..." } }
Adding a New Feature (Guide)
Let’s add a profile feature as an example.

pgsql
Always show details

Copy code
src/features/profile/
  components/
    profile-card.tsx
  server/
    schemas.ts            # zod for inputs
    queries.ts            # server-only data access
  hooks/
    use-profile.ts        # client fetching hooks if needed
  index.ts                # public exports
Create folders & files

bash
Always show details

Copy code
mkdir -p src/features/profile/{components,server,hooks}
Define contracts (Zod)

ts
Always show details

Copy code
// src/features/profile/server/schemas.ts
import { z } from 'zod';
export const updateProfileSchema = z.object({
  name: z.string().min(2),
  bio: z.string().max(280).optional(),
});
Server accessors
Place server-only logic in server/ (e.g., calls to your Spring Boot /api/v1/profile endpoints).

Pages
Add a route under src/app/(app)/profile/page.tsx and render ProfileCard. Keep the page thin; do data fetching via server components or server actions, and UI in components/.

Exports
index.ts re-exports public pieces so importing code stays consistent.

Responsive Patterns
Prefer one code path: layout changes handled by CSS/container queries.

Behavioral differences: add small switchers (e.g., AppShellMobile vs AppShellDesktop) if UX diverges. Keep business logic shared.

Use next/image with sizes for responsive images.

Caching & Performance
Static/ISR: export revalidate = <seconds> in server pages that can be cached.

Dynamic: use no-store for user-specific data.

Edge runtime: lightweight GET handlers can export runtime = 'edge'; Node runtime for SDKs requiring native modules.

Code-splitting: dynamic(() => import('...'), { ssr: false }) for heavy client widgets.

Testing
bash
Always show details

Copy code
tests/
  unit/          # component & util tests
  integration/   # feature-level tests
e2e/
  specs/         # Playwright or Cypress
Keep route files thin, so most logic is testable in plain TS.

Consider contract tests against the Spring Boot API (e.g., Pact) when ready.

Scripts & Automation (suggested)
scripts/data-seed.ts: seed sample data (in dev)

scripts/generate-sitemap.ts: sitemap for marketing pages

scripts/check-types.ts: typecheck gate in CI

Package.json scripts to consider:

json
Always show details

Copy code
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit",
    "lint": "next lint"
  }
}
Roadmap — Future Feature Additions
Phase 1: Auth Foundation

 Implement Spring Boot endpoints (register, login, logout, me)

 Cookie-based session (HttpOnly)

 Protect /(app) via middleware or server checks

Phase 2: Profiles & Settings

 /profile view + edit

 Avatar upload (S3/GCS)

 Account settings (email, password, 2FA)

Phase 3: Organizations/Teams (optional)

 Team model; invites and roles

 Role-Based Access Control (RBAC)

Phase 4: App Core Features

 Your primary domain features (e.g., projects/tasks)

 Search and filters

 Activity feed & notifications

Phase 5: Observability & Quality

 Structured logging on both FE/BE

 Error reporting (Sentry) & basic tracing

 e2e smoke tests in CI

Phase 6: Performance & DX

 Cache tags + precise invalidation

 Edge runtime where appropriate

 Bundle analysis & critical render paths

Deployment Notes
Vercel/Netlify handle Edge + Node per-route runtimes smoothly.

Keep secrets on the server (never import server-only files in client components).

Cookies must be Secure in production (HTTPS).

Contributing
Small, isolated PRs by feature.

Keep route handlers/pages thin; move logic to features/ or lib/.

Validate all external input with Zod.

FAQ
Can I split mobile and desktop into distinct UIs?
Prefer a single responsive system. If the UX diverges significantly, create *.mobile.tsx and *.desktop.tsx wrappers that import shared components.

Where should I put DB/payment/queue clients?
src/lib/ or src/server/ (server-only). Import them into route handlers or server actions.

How do I version APIs?
Use app/api/v1/.... When breaking changes occur, create v2/ and deprecate v1/ endpoints.

Happy building! ✨