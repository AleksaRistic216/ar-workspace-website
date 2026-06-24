# Site Architecture

## Routes

| Route | File | Notes |
|---|---|---|
| `/` | `src/app/page.tsx` | Landing page — all sections |
| `/download` | `src/app/download/page.tsx` | Per-platform download page (client component) |

## Component tree

```
layout.tsx               ← metadata, font vars, global CSS
├── page.tsx             ← landing page
│   ├── Navbar           ← fixed header, mobile hamburger menu
│   ├── Hero             ← headline, trust pills, CTA, navigable screenshot stack
│   ├── Features         ← 3-column card grid (6 feature cards)
│   ├── CrossPlatform    ← shortcut table + platform quirks (Windows / Linux)
│   ├── Pricing          ← single Pro card at €8/month
│   └── Footer           ← links to GitHub Releases and Bug Reports
└── download/page.tsx    ← download page
    ├── Navbar
    ├── (platform cards — Linux / Windows / macOS)
    └── Footer
```

## Section anchor IDs

| Component | `id` | Navbar link |
|---|---|---|
| Features | `#features` | Features |
| CrossPlatform | `#cross-platform` | Cross-Platform |
| Pricing | `#pricing` | Pricing |

## Hero screenshot stack

`Hero.tsx` renders a navigable stack of screenshots driven by `screenshots.config.json`.

- **Config** — `screenshots.config.json` at the repo root lists every image (`branch`, `dest`, `alt`). Array order is the initial display order: index 0 is on top.
- **`buildSlots(n)`** — pure function that generates a stack position for each of the `n` images. Slot 0 is front (no rotation, highest z-index); subsequent slots alternate left/right rotations that deepen with index.
- **Active index** — `useState(0)` tracks which image is currently on top. Arrows call `prev`/`next` which rotate `activeIndex` mod `n`. Each image's slot is `(imageIndex - activeIndex + n) % n`.
- **All images rendered** — all `n` images are always in the DOM; only their `transform` and `z-index` change. This avoids layout shift when cycling.
- **Pulling images** — `bash scripts/update-screenshots.sh` reads the config and copies files from the `screenshot-baselines` branch in `ar-workspace`. See `docs/screenshots.md`.

## Download page

`src/app/download/page.tsx` is a client component (`"use client"`) that fetches the latest release at runtime:

```
GET https://api.github.com/repos/AleksaRistic216/ar-workspace-release/releases/latest
```

Assets are matched by file extension:

| Extension | Platform |
|---|---|
| `.AppImage` | Linux AppImage |
| `.tar.gz` | Linux tar.gz |
| `.zip` | Windows |

macOS is hardcoded as disabled (no asset, "Coming soon" card). When a macOS build is added to releases, add a `.dmg` match and remove the disabled card.

The page falls back to a GitHub Releases link if the API request fails. Note: GitHub's unauthenticated API rate limit is 60 requests/hour per IP — sufficient for a landing page.

## Design tokens

All colours are CSS custom properties defined in `src/app/globals.css` via Tailwind v4's `@theme inline` block. Use them in JSX with `style={{ color: "var(--color-accent)" }}` etc.

| Token | Value | Role |
|---|---|---|
| `--color-background` | `#0c0c0f` | Page background |
| `--color-surface` | `#13131a` | Card backgrounds |
| `--color-surface-2` | `#1c1c26` | Table header / footer rows, disabled states |
| `--color-border` | `#252535` | All borders and dividers |
| `--color-foreground` | `#e2e2ec` | Primary text |
| `--color-muted` | `#6a6a85` | Secondary / label text |
| `--color-accent` | `#e07040` | Orange CTAs, icons, highlights |
| `--color-accent-dim` | `rgba(224,112,64,0.12)` | Icon badge backgrounds, pill backgrounds |
| `--color-blue` | `#4d9de0` | Spare; not yet used |

## Stack notes

- **Next.js 16 / React 19** — check `node_modules/next/dist/docs/` before writing Next-specific code; v16 has breaking API changes (see `AGENTS.md`).
- **Tailwind CSS v4** — configured via `@theme inline` in CSS, not `tailwind.config.*`. There is no `tailwind.config.ts`.
- **Fonts** — Geist Sans (`--font-sans`) and Geist Mono (`--font-mono`) loaded via `next/font/google` in `layout.tsx` and exposed as CSS vars.
- **`"use client"`** — `Navbar` (mobile menu state), `Hero` (active screenshot index), and `download/page.tsx` (API fetch) are client components. Everything else is a server component.
