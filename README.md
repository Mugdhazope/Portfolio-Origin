# ORIGIN4

Interactive desktop portfolio and studio workspace for Origin4, built with Next.js
App Router, TypeScript, Tailwind CSS, Framer Motion, and Lucide.

## Run locally

```bash
bun install
bun run dev
```

Production checks:

```bash
bun run typecheck
bun run lint
bun run build
```

## Deploy to Cloudflare Workers

**Important:** keep `build` as `next build`. OpenNext calls that script internally — changing `build` to `opennextjs-cloudflare build` causes an infinite loop.

Use these scripts instead:

| Script | Purpose |
|---|---|
| `bun run build` | Standard Next.js build (local checks) |
| `bun run cf:build` | OpenNext bundle for Cloudflare (`.open-next/`) |
| `bun run deploy` | Build + deploy to Workers |

In **Cloudflare dashboard → Worker → Settings → Builds**, set:

| Setting | Value |
|---|---|
| **Build command** | `bun run cf:build` |
| **Deploy command** | `bunx wrangler deploy` |

Or use a single deploy step: `bun run deploy`

## Content architecture

- `data/projects.ts` contains primary products and configurable archive projects.
- `data/research.ts` contains systems, security, program-analysis, and experimental research.
- `data/collaborators.ts` contains people and organizations connected to the work.
- `data/documents.ts` contains the TXT-style About, Experience, Approach, Contact, Manifesto,
  and project documents.
- `data/personal.ts` contains contact links and the optional resume asset path.

Keep missing facts empty. Live URLs, GitHub repositories, social profiles, dates, roles,
metrics, research outcomes, and collaborator details must be configured from verified sources.
The UI hides optional links when their data is empty.

## Assets

- Desktop / tablet wallpaper: `public/assets/new-bg.png`
- Phone wallpaper: `public/assets/bg-for-phone.png`
- Portrait: `public/assets/mugdha-zope.png`
- Supplied Mugdha portrait: `public/assets/mugdha-zope.png`
- Optional project/research/collaborator media: `public/projects/` or `public/assets/`
- Approved resume PDF: stage at `public/assets/resume.pdf`, then set `resumeAsset` in
  `data/personal.ts` to `/assets/resume.pdf`

Desktop and window positions persist in browser localStorage. Use `RESET DESKTOP` to restore
curated positions.
