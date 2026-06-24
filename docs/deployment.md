# Deployment

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

## Vercel

`vercel.json` sets `"framework": "nextjs"` and nothing else — Vercel infers build settings automatically. Push to `main` to trigger a production deploy.

There are no environment variables required.

## Build & lint

```bash
npm run build        # production build
npm run lint         # ESLint (config in eslint.config.mjs)
```

## Updating screenshots

Run the helper script whenever the app UI changes and new baselines land on `screenshot-baselines`:

```bash
bash scripts/update-screenshots.sh
git add public/screenshots/
git commit -m "sync screenshots"
git push
```

The script reads `screenshots.config.json` to know which files to pull. Add or remove entries there to control which screenshots appear in the hero stack. See `docs/screenshots.md` for details.

## Enabling macOS downloads

When a macOS build is added to the `ar-workspace-release` GitHub releases:

1. Open `src/app/download/page.tsx`.
2. Add a `macos` field to the `Release` type and an asset match (e.g. `.dmg`).
3. Replace the disabled macOS card with a live `<DownloadButton>`.

No other changes needed — the download page already fetches the latest release at runtime.

## Release checklist

1. Sync screenshots if the app UI changed (see above).
2. Push `main` — Vercel deploys automatically.
3. The `/download` page picks up new release assets automatically via the GitHub API — no code change needed when a new version is published.
