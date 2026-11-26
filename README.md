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

## 4. Default Seed Credentials

The database has been seeded with realistic administrative, fellowship, and project data.

### Executive Root Administrator
- **Email:** `admin@bff.com`
- **Password:** `Admin@BFF2026!`
- **Role:** `SUPER_ADMIN`
- **Access:** Complete platform administration, system settings, member approvals, role management, and audit logs (`/admin`).

### Verified Fellows & Project Managers
- **Marcus Vance (Mindset Lead):** `marcus.vance@bff.org` | Password: `Member@BFF2026!`
- **Dr. Elena Rostova (Solutions Architect):** `elena.rostova@bff.org` | Password: `Member@BFF2026!`
- **David Chen (Venture Partner):** `david.chen@bff.org` | Password: `Member@BFF2026!`
- **Amara Okafor (Social Impact Director):** `amara.okafor@bff.org` | Password: `Member@BFF2026!`
- **Priya Sharma (AI Specialist):** `priya.sharma@bff.org` | Password: `Member@BFF2026!`

*(Note: Instant 1-click test buttons for these accounts are available on `/login`.)*

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

1. **Database Schema:** Use the included PostgreSQL schema:
   ```bash
   cp prisma/schema.postgresql.prisma prisma/schema.prisma
   ```
2. **Environment Variables:** Set the following variables in your hosting environment:
   ```env
   POSTGRES_PRISMA_URL="postgresql://user:password@host:5432/bff_ecosystem?sslmode=require"
   JWT_SECRET="generate-a-strong-32-byte-hex-key"
   NEXT_PUBLIC_APP_URL="https://your-production-domain.com"
   ADMIN_DEFAULT_EMAIL="admin@bff.com"
   ADMIN_DEFAULT_PASSWORD="YourStrongAdminPassword!"
   ```
3. **Database Migration & Build:**
   ```bash
   npx prisma db push
   node prisma/seed.js
   npm run build
   ```
4. **Deploy:** Deploy directly via Git to Vercel, Railway, AWS ECS, or Render.

---

**BROTHERS_FRIENDS_FAMILIES**  
**BELIEVE. BUILD. BECOME.**

