# Contributing to BitCode

BitCode uses lightweight trunk-based development. `main` is the stable, deployable production branch. Make every change on a short-lived branch and merge it through a reviewed pull request; do not create permanent `develop`, `staging`, or release branches without an operational need.

## Branches

Create branches from the latest `main` using one of these formats:

- `feat/<short-description>` for product work
- `fix/<short-description>` for bug fixes
- `chore/<short-description>` for maintenance
- `refactor/<short-description>` for behavior-preserving code changes
- `docs/<short-description>` for documentation

Use lowercase, hyphen-separated descriptions, for example `feat/student-enrollment`.

```bash
git switch main
git pull --ff-only origin main
git switch -c feat/short-description
```

Never develop directly on `main`, force-push it, delete it, or rewrite its history.

## Commits

Use Conventional Commit messages such as:

- `feat: add student authentication`
- `fix: handle duplicate enquiry submissions`
- `chore: update dependencies`
- `docs: improve deployment instructions`
- `refactor: simplify enquiry validation`
- `test: add enrollment validation coverage`

Each commit should represent one logical change, avoid unrelated formatting or refactoring, and leave the repository valid where practical. Do not commit secrets, `.env` files, credentials, database dumps, dependencies, build output, caches, or unnecessary generated files.

## Validation

Install from the lockfile and run the same critical checks as CI before opening a pull request:

```bash
npm ci
npm run check
npm test
npm run db:check
npm run build
```

CI must remain deterministic and must not connect to production Neon databases.

## Pull requests and review

1. Push the focused branch and open a pull request into `main`.
2. Use a clear Conventional Commit-style PR title; it becomes the squash commit message.
3. Complete the PR template, including database, security/privacy, and deployment impact.
4. Keep the diff small enough to review meaningfully and update documentation when behavior or operations change.
5. Resolve review conversations and obtain one approval when another maintainer is available.
6. Merge only after required CI checks pass and the branch is current with `main`.
7. Use **Squash and merge** by default, then delete the source branch.

Do not self-approve routine work or bypass failed checks. Repository administrators may retain an emergency path for urgent production recovery, with the reason and follow-up documented.

## Updating a branch

Prefer rebasing a private short-lived branch onto the latest `main`:

```bash
git fetch origin
git rebase origin/main
git push --force-with-lease
```

Use `--force-with-lease` only for your feature branch, never `main`. If several people share the branch, merge `origin/main` instead so you do not rewrite their work.

## Database changes

- Change the schema only through `lib/db/schema.ts`.
- Run `npm run db:generate` and review the generated SQL.
- Commit the schema and matching `drizzle/` migration files together.
- Call out migration, compatibility, rollout, and recovery impact in the PR.
- Apply production migrations explicitly; never use an uncontrolled schema-push workflow.
- Never point CI or unreviewed local scripts at the production Neon database.

## Production safety

Preserve backward compatibility where practical, keep `main` deployable, and document new environment variables or manual rollout steps. Treat authentication, personal data, payment fields, database migrations, and deployment configuration as security-sensitive changes. Confirm secrets remain outside Git before every push.
