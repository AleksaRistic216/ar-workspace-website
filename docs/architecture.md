# Site Architecture

## Component tree

```
layout.tsx          ← metadata, font vars, global CSS
└── page.tsx
    ├── Navbar      ← fixed header, mobile hamburger menu
    ├── Hero        ← headline, trust pills, CTA, app screenshot
    ├── Features    ← 3-column card grid (6 feature cards)
    ├── CrossPlatform ← shortcut table + platform quirks (Windows / Linux)
    ├── Pricing     ← single Pro card at $44/month
    └── Footer      ← links to GitHub Releases and Bug Reports
```

## Section anchor IDs

| Component | `id` | Navbar link |
|---|---|---|
| Features | `#features` | Features |
| CrossPlatform | `#cross-platform` | Cross-Platform |
| Pricing | `#pricing` | Pricing |

## Design tokens

All colours are CSS custom properties defined in `src/app/globals.css` via Tailwind v4's `@theme inline` block. Use them in JSX with `style={{ color: "var(--color-accent)" }}` etc.

| Token | Value | Role |
|---|---|---|
| `--color-background` | `#0c0c0f` | Page background |
| `--color-surface` | `#13131a` | Card backgrounds |
| `--color-surface-2` | `#1c1c26` | Table header / footer rows |
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
- **`"use client"`** — only `Navbar` is a client component (needs `useState` for mobile menu). Everything else is a server component.
