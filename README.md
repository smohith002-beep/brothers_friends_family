# BROTHERS_FRIENDS_FAMILIES (BFF)
## Premium Corporate Website + Digital Business & Community Ecosystem

**Company Name:** Brothers_Friends_Families  
**Brand Name:** BFF  
**Brand Tagline:** BELIEVE. BUILD. BECOME.  
**Platform URL:** `https://bff-ecosystem.org` (Local: `http://localhost:3000`)

---

## 1. Executive Product Overview

**Brothers_Friends_Families (BFF)** is an international digital business ecosystem and corporate technology platform. Designed to meet the aesthetic and architectural standards of Apple, Stripe, Linear, and modern enterprise SaaS platforms, BFF combines:

- **Corporate Brand Experience:** High-converting landing pages, interactive pillar architectures, verified testimonials, and transparent impact metrics.
- **Member Portal & Workspace:** Personalized dashboards, profile completion engines, registered event passes, project collaboration boards, and verifiable digital certificates.
- **Community & Networking:** Member directories with real-time connection requests, interest filtering, and multi-category peer discussion forums.
- **Project Collaboration Engine:** Milestone checklists, task assignment kanbans, budget tracking, repository integration, and proposal review workflows.
- **Executive Admin Control Suite:** Multi-module administrative portal featuring real-time KPI metrics, one-click member approval/rejection workflows, RBAC user governance, content publishing, event scheduling, and immutable security audit logging.

---

## 2. The Four Foundational Pillars

1. **MINDSET:** Personal breakthrough, high-performance leadership conditioning, habit engineering, and one-on-one master mentorship circles.
2. **SOLUTIONS:** Enterprise multi-cloud architecture, applied AI & multi-agent orchestration, cybersecurity, zero-knowledge sovereign identity, and collaborative open-source engineering.
3. **BUSINESS:** Venture incubation, angel syndicate deal rooms, B2B enterprise pilot matchmaking, unit economics optimization, and cross-border commercial expansion.
4. **SOCIAL IMPACT:** Verifiable grassroots transformation powered by real-time IoT water and solar telemetry, fully funded STEM fellowships, and autonomous local community stewardship.

---

## 3. Technology Stack

- **Frontend Framework:** Next.js 14 (App Router, Server Components & Client Hydration)
- **Language:** TypeScript 5.7
- **Styling:** Tailwind CSS with Deep Navy tokens (`#060B18`, `#0A1128`), Electric Blue (`#3B82F6`), Neon Cyan (`#00F0FF`), Glassmorphism, and Light/Dark theme switching
- **Iconography:** Lucide Icons
- **Database & ORM:** Prisma ORM 6
  - **Local Development:** SQLite (`dev.db`) for instant zero-dependency execution and offline testing
  - **Production:** PostgreSQL (`prisma/schema.postgresql.prisma`) optimized for Vercel Postgres, Supabase, Neon, or AWS RDS
- **Security & Auth:** bcryptjs (10-round salted password hashing), JSON Web Tokens (JWT) stored in HTTP-only `SameSite=Lax` cookies, and server-side RBAC enforcement

---

## 4. Seeded Accounts

The seed command creates the administrator using the `ADMIN_DEFAULT_EMAIL` and
`ADMIN_DEFAULT_PASSWORD` values in your untracked `.env` file. Use a unique password
of at least 16 characters. Sample fellow accounts receive random, undisclosed passwords
and are not intended for sign-in.

### Executive Root Administrator
- **Email:** Set with `ADMIN_DEFAULT_EMAIL`
- **Password:** Set with `ADMIN_DEFAULT_PASSWORD`
- **Role:** `SUPER_ADMIN`
- **Access:** Complete platform administration, system settings, member approvals, role management, and audit logs (`/admin`).

---

## 5. Local Setup & Running Instructions

### 1. Prerequisites
- Node.js 18+ (tested on Node.js v24.19)
- npm or pnpm

### 2. Installation
```bash
npm install
```

### 3. Database Generation & Seeding
Set `ADMIN_DEFAULT_EMAIL` and `ADMIN_DEFAULT_PASSWORD` in `.env` before seeding.
Never use demo credentials in production.

```bash
npm run db:setup
```
*This command runs `prisma generate`, syncs the schema with `prisma db push`, and executes `prisma/seed.js`.*

### 4. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 6. Complete Route & Page Map

### Public Ecosystem Pages
- `/` — Homepage (Apple/Stripe quality hero, 4 pillars showcase, impact metrics, featured projects, upcoming events, real testimonials)
- `/about` — Heritage, Vision, Mission, Journey timeline, and Leadership
- `/pillars/mindset` — Dedicated Mindset Architecture page
- `/pillars/solutions` — Dedicated Solutions & Engineering page
- `/pillars/business` — Dedicated Business & Venture page
- `/pillars/social-impact` — Dedicated Social Impact & Telemetry page
- `/services` — Comprehensive Ecosystem Services catalog
- `/projects` — Collaborative projects directory with search, pillar filters, and live proposal submission modal
- `/events` — Global calendar with Upcoming & Completed tabs and real-time pass enrollment
- `/opportunities` — Business opportunities, angel syndicates, and startup showcase
- `/blog` — Insights & Intelligence dispatch
- `/blog/[slug]` — Full article reader with author credentials
- `/team` — Leadership Council & Fellows
- `/careers` — Open roles, fellowships, and interactive application form
- `/become-a-member` — Multi-step member admission portal (writes to database)
- `/partnerships` — Corporate partnership and sponsor proposal form
- `/contact` — Secure contact center (writes to database)
- `/faq` — Interactive accordion FAQ with search
- `/privacy` — Sovereign data governance policy
- `/terms` — Ecosystem charter & legal terms

### Authentication
- `/login` — Secure login with instant test account fill
- `/register` — Member registration portal

### Member Workspace (`/dashboard`)
- `/dashboard` — Overview: profile completion widget, tier badge, announcements, quick stats
- `/dashboard/profile` — Full profile and credential management
- `/dashboard/projects` — My projects, milestone tracking, and task kanbans
- `/dashboard/events` — Enrolled passes and verifiable digital certificates
- `/dashboard/community/members` — Member directory with search and 1-click connection requests
- `/dashboard/community/discussions` — Community forum with topic publishing, threaded replies, and reporting

### Admin Control Suite (`/admin`)
- `/admin` — Executive KPI Dashboard (Total Members, Active Projects, Pending Approvals, Inquiries, Real-time Audit Ledger)
- `/admin/approvals` — Member Approval workflow (Review applications, 1-click Approve to auto-provision account, or Decline)
- `/admin/users` — Role-Based Access Control (RBAC) governance, role assignment, and account suspension/reactivation
- `/admin/projects` — Project review and workflow status transitions (`SUBMITTED` -> `APPROVED` -> `IN_PROGRESS` -> `COMPLETED`)
- `/admin/events` — Global summit and masterclass scheduling
- `/admin/blog` — Editorial intelligence publishing and archiving
- `/admin/moderation` — Community forum and comment moderation queue
- `/admin/partnerships` — Institutional partnership proposal reviews
- `/admin/enquiries` — Public contact dispatch mailbox
- `/admin/settings` — Global configuration parameters and announcement banner controls
- `/admin/audit-logs` — Immutable, chronological security audit trail

---

## 7. Production Deployment Guide (PostgreSQL)

To deploy to production using Vercel, Supabase, Neon, or Railway with a managed PostgreSQL database:

1. **Database:** Create or select a managed PostgreSQL database. The Vercel build
   generates Prisma Client from `prisma/schema.postgresql.prisma`; local development
   continues to use SQLite.
2. **Environment Variables:** Set the following variables in Vercel:
   ```env
   POSTGRES_PRISMA_URL="postgresql://user:password@host:5432/bff_ecosystem?sslmode=require"
   JWT_SECRET="<at least 32 randomly generated characters>"
   NEXT_PUBLIC_APP_URL="https://your-production-domain.com"
   ADMIN_DEFAULT_EMAIL="<your administrator email>"
   ADMIN_DEFAULT_PASSWORD="<unique password of at least 16 characters>"
   ```
   Set these values in Vercel Project Settings → Environment Variables for the
   Production environment. Do not expose secrets through `NEXT_PUBLIC_` variables.
3. **Database Migration:** This repository now includes a PostgreSQL initial migration.
   Back up the database before applying it. For a new, empty database, run:
   ```bash
   npm run prisma:migrate:deploy:postgres
   ```
   The production database used for the reported P2021 error may already contain data
   but has no migration history in this repository. Do not apply the initial migration
   blindly to that database. First back it up and inspect its tables. If it is an
   existing database, compare it with the PostgreSQL schema and baseline or synchronize
   it deliberately; never use `--accept-data-loss`. `npm run prisma:push:postgres` is
   available for a reviewed schema sync and may ask before destructive changes.
4. **Deploy:** After confirming the database schema is current, push the branch to Git
   and deploy through Vercel. The build script generates the PostgreSQL Prisma Client
   automatically when `VERCEL=1`.

---

**BROTHERS_FRIENDS_FAMILIES**  
**BELIEVE. BUILD. BECOME.**

