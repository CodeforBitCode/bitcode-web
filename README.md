# BitCode Website

A production-ready BitCode website and MCP endpoint built as one Next.js application. The current marketing content and design remain file-based, while Neon PostgreSQL and Drizzle provide the foundation for persistent enquiries, users, roles, students, courses, cohorts, and enrollments.

## Architecture

- Next.js App Router, React, and TypeScript
- Static/server-rendered public pages with focused client components
- `POST /api/enquiries` for persistent contact submissions
- Stateless public MCP endpoint at `/mcp`
- Neon PostgreSQL through the serverless driver
- Drizzle ORM with committed SQL migrations under `drizzle/`
- First-party staff credentials, database-backed sessions, and centralized role permissions
- Vercel deployment with no separate backend or microservices

Staff authentication uses Node.js `scrypt` password hashes and cryptographically random session tokens. Only SHA-256 session-token hashes are stored. Admin pages and APIs enforce permissions independently on the server; no OAuth or external authentication service is required.

Payment processing is also not active. Enrollments include payment status, amount in minor units, currency, provider, external order/payment references, and paid timestamp so a provider can be integrated later without storing card details or redesigning enrollment data.

## Requirements

- Git
- Node.js 20.9 or newer; `.nvmrc` pins the recommended development/CI version
- npm, pinned in `package.json`
- A Neon PostgreSQL database for persistent enquiries and future application data

## Environment variables

Copy `.env.example` to the ignored `.env.local` file and add values there. Never commit `.env.local` or credentials.

| Variable | Local development | Vercel | Purpose |
|---|---|---|---|
| `DATABASE_URL` | Required for migrations, enquiries, and staff login | Required | Neon PostgreSQL connection string |
| `NEXT_PUBLIC_SITE_URL` | Optional | Optional | Custom canonical URL; Vercel supplies its production URL automatically |
| `VERCEL_PROJECT_PRODUCTION_URL` | Not set manually | Supplied by Vercel | Default production metadata URL |
| `NODE_ENV` | Supplied by Next.js | Supplied by Vercel | Runtime mode |

The website can build and its email/WhatsApp contact fallbacks continue to work without `DATABASE_URL`, but server-side enquiry storage returns a safe unavailable response until the database is configured.

## Neon and Drizzle setup

1. Create a Neon project on its free tier and choose the closest practical region to the Vercel deployment.
2. Copy the Neon connection string into `DATABASE_URL` in `.env.local`. Do not paste it into source files, logs, issues, or chat.
3. Apply the committed migrations:

```bash
npm run db:migrate
```

4. In Vercel, add `DATABASE_URL` to the environments that need persistence, normally Production and Preview, then redeploy.

Database commands:

```bash
npm run db:generate  # generate a migration after an intentional schema change
npm run db:check     # verify migration metadata
npm run db:migrate   # apply pending committed migrations
npm run db:studio    # optional local database browser
```

Change `lib/db/schema.ts`, run `npm run db:generate`, review the generated SQL, and commit both the schema and migration. Do not use schema-push workflows against production.

The initial schema contains:

- `users` and `user_roles`
- `user_credentials` and `auth_sessions`
- `student_profiles` and `guardian_students`
- `courses` and `cohorts`
- `enrollments`, including future payment fields
- `enquiries` with status and timestamps

## Run locally

```bash
npm ci
npm run db:migrate
npm run check
npm test
npm run db:check
npm run dev
```

Open `http://localhost:3000`. For a production verification:

```bash
npm run build
npm start
```

## Admin enquiries

Apply migrations, then create the first staff account from an interactive local terminal:

```bash
npm run db:migrate
npm run admin:create
```

The command reads `.env.local`, prompts for email, display name, `admin` or `marketing`, and accepts the password through hidden terminal input. It never accepts or prints a password argument and creates the user, credential, and role atomically. There is no public registration route. Run it against the intended database, then sign in at `/admin/login`.

Both `admin` and `marketing` may view, search, filter, paginate, and update enquiries. Only `admin` receives the broader permission set; permissions remain centralized in `lib/auth/roles.ts`. Enquiry workflow states are `new`, `contacted`, `converted`, `closed`, with the existing `spam` state retained.

Sessions expire after 12 hours. Cookies are HttpOnly, SameSite=Lax, and Secure in production. Raw session tokens are never stored. Five failed password attempts lock the account for 15 minutes; the response remains generic to avoid account discovery. Logout revokes the database session. Apply schema changes only with committed Drizzle migrations—never schema push.

On Windows, use `npm.cmd` and `npx.cmd` if PowerShell blocks unsigned `.ps1` shims. No administrator access or execution-policy change is required.

## Enquiry workflow

The contact form keeps native browser validation and email/WhatsApp alternatives. It now also submits JSON to `POST /api/enquiries`.

The server endpoint provides:

- strict Zod validation and whitespace/email normalization
- a 16 KB body limit and JSON content-type enforcement
- a honeypot field for basic malformed/bot submission rejection
- PostgreSQL persistence with `new` status and timestamps
- safe error responses that do not expose database details

If persistence is unavailable, the visitor is told to use the existing email or WhatsApp options. No paid email, SMS, WhatsApp API, CAPTCHA, or notification service is used.

## MCP server

The public `/mcp` endpoint uses the official MCP TypeScript SDK with stateless Streamable HTTP. It remains unauthenticated because its tools return public BitCode information or prepare, but do not save, MCP enquiries.

```bash
curl https://bitcode-web.vercel.app/mcp?health=1
```

## Update content

- Courses, contact details, navigation, teaching steps, and project placeholders: `data/site.ts`
- Public MCP data, FAQs, recommendations, and sample guided projects: `data/bitcode.ts`
- Page copy: matching files under `app/`
- Testimonials: `app/testimonials/page.tsx`
- Database schema: `lib/db/schema.ts`
- Role permissions: `lib/auth/roles.ts`
- Logo and social assets: `public/`
- Theme and responsive styles: `app/globals.css`

Public course content is still source-controlled; the new database tables do not silently replace it.

## Checks and CI

Run before every deployment:

```bash
npm run check
npm test
npm run db:check
npm run build
```

`.github/workflows/ci.yml` runs `npm ci`, lint/typecheck, focused tests, migration checks, and a production build on pushes to `main` and pull requests. CI does not connect to a live database and therefore does not need `DATABASE_URL`.

## Contributing

All feature, fix, maintenance, refactoring, and documentation work must use a short-lived branch and a pull request into `main`. See [CONTRIBUTING.md](CONTRIBUTING.md) for branch naming, Conventional Commits, validation, review, migration, and squash-merge requirements.

## Deploy

With Vercel Git integration enabled, merging a reviewed pull request into `main` triggers the production deployment, while pull-request branches can receive preview deployments.

Import the GitHub repository into Vercel or reconnect the existing project:

```bash
npx vercel link --project bitcode-web
npx vercel --prod
```

Before deploying persistent enquiries, add `DATABASE_URL` in Vercel and apply migrations to the corresponding Neon database. Any host that supports the pinned Node range can also run `npm run build` followed by `npm start`.

The project remains suitable for free-tier development and early usage: no custom domain, payment provider, paid messaging, paid analytics, or object storage is required.

## Disaster Recovery / Fresh Machine Setup

GitHub is the source-of-truth backup for application code, schema, migration history, documentation, and static assets. Neon is the source of truth for persistent application records. Vercel contains deployment settings and environment-variable values.

Access to the `CodeforBitCode` GitHub organization, Neon project, and Vercel project must be recoverable independently through a password manager and provider recovery methods. Never commit passwords, tokens, recovery codes, database dumps, or local authentication files.

On a fresh machine:

```bash
git clone https://github.com/CodeforBitCode/bitcode-web.git
cd bitcode-web
npm ci
```

Then:

1. Restore access to the existing Neon project or restore the latest encrypted database backup into a replacement PostgreSQL database.
2. Copy `.env.example` to `.env.local` and set the restored `DATABASE_URL`.
3. Run `npm run db:migrate` to apply any migrations newer than the restored database.
4. Run `npm run check`, `npm test`, `npm run db:check`, and `npm run build`.
5. Run `npm run dev`, or reconnect Vercel and deploy.
6. Verify the homepage, `POST /api/enquiries`, and `/mcp?health=1`.

Database recovery requires more than Git. Enable the recovery features available on the selected Neon plan and keep periodic encrypted logical backups outside the laptop and outside this repository. Test restoration periodically. Backups may contain personal data and must use restricted access and an appropriate retention policy.

The ignored `.next/`, `node_modules/`, and `*.tsbuildinfo` paths are reproducible. The ignored `.vercel/` directory is only a local project link. The ignored Lighthouse/PageSpeed reports are not needed to run the application and only require separate archival if their historical evidence matters.
