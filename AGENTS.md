<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Micro-Beyblade-x — Project AGENTS.md

## Project Identity
- **Name:** Micro-Beyblade-x
- **Type:** Next.js 16 (App Router) + React 19 web app for Beyblade X combo building & physics simulation
- **Path:** `/home/neon13/workspace/services/next/03-GAMES/Micro-Beyblade-x`
- **Package Manager:** pnpm (required)

## Tech Stack
- **Framework:** Next.js 16.2.11 with React 19 (App Router only)
- **Styling:** Tailwind CSS v4
- **Database:** SQLite (`prisma/dev.db`) via Prisma ORM 7.9.1 + `@prisma/adapter-libsql` + `@libsql/client`
- **Language:** TypeScript (strict)
- **Deployment:** Vercel (target)

## Directory Structure
```
Micro-Beyblade-x/
├── app/
│   ├── api/              # API routes (Server Actions preferred)
│   ├── components/       # Reusable UI components
│   │   ├── ComboBuilder.tsx
│   │   ├── DeckBuilder.tsx
│   │   ├── PhysicsEvaluator.tsx
│   │   └── BeyCard.tsx
│   ├── lib/
│   │   ├── types.ts      # Core type definitions
│   │   └── parts-db.ts   # Mock parts database (fallback)
│   └── wiki/             # Wiki/knowledge base pages (RSC)
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── dev.db            # Local SQLite database
├── public/               # Static assets (images for BX/UX/CX series)
├── scripts/              # Utility scripts
│   └── extract-beybuilder-parts.mjs
├── .agents/skills/beyblade-project-overview/  # Project skill
└── AGENTS.md             # This file
```

## Database Schema (prisma/schema.prisma)
| Model | Purpose |
|-------|---------|
| `Blade` | Base blade parts with stats: weight, atk, def, sta, bst |
| `Ratchet` | Ratchet parts with same stats |
| `Bit` | Bit parts with same stats |
| `SavedCombo` | User-saved combos (Blade+Ratchet+Bit) with physics snapshots (rpm, linearSpeed, impactForce, burstRiskLevel) |
| `WikiArticle` | Markdown articles for game mechanics, part knowledge, strategy |

## Core Features
1. **Combo Builder** — Build Beyblade X combinations from BX/UX/CX series parts
2. **Deck Builder** — Assemble 3-combo decks for tournament formats
3. **Physics Evaluator** — Calculate angular momentum, RPM, impact force, burst risk
4. **Wiki Knowledge Base** — Read articles on game mechanics and lore

## Development Commands
```bash
# Install deps
pnpm install

# Dev server
pnpm dev

# Build
pnpm build

# Type check
pnpm typecheck

# Lint
pnpm lint

# Prisma
pnpm prisma generate
pnpm prisma migrate dev
pnpm prisma studio
```

## Key Conventions
- **Server Components by default** — Use `'use client'` only when needed (interactivity, browser APIs)
- **Server Actions** for mutations — Prefer over API routes
- **Tailwind v4** — Use `@import "tailwindcss"` in globals.css, no config file needed
- **Prisma 7** — Use `@prisma/adapter-libsql` for libSQL/Turso compatibility
- **TypeScript strict** — No `any`, explicit return types for exported functions

## Environment Variables
- `DATABASE_URL` — `file:./dev.db` (local SQLite)
- No external services required for local dev

## Important Notes
- **No Python/Flask in this repo** (per global AGENTS.md rule #6)
- **Vercel deployment** — Ensure `output: 'standalone'` not used (App Router default)
- **Images** — Use `next/image` with local assets in `public/`
- **Wiki content** — Markdown files in `app/wiki/` or `WikiArticle` DB model

## Related Skills
- `beyblade-project-overview` — Full project context (loaded)
- `nextjs` — Next.js App Router expert guidance
- `next-best-practices` — Upstream Next.js conventions
- `prisma-orm-v7-skills` — Prisma 7 breaking changes