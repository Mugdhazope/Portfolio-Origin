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

- Supplied forest wallpaper: `public/assets/wallpaper.png`
- Supplied Mugdha portrait: `public/assets/mugdha-zope.png`
- Optional project/research/collaborator media: `public/projects/` or `public/assets/`
- Approved resume PDF: stage at `public/assets/resume.pdf`, then set `resumeAsset` in
  `data/personal.ts` to `/assets/resume.pdf`

Desktop and window positions persist in browser localStorage. Use `RESET DESKTOP` to restore
curated positions.
