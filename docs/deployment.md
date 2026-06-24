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

## Release checklist

1. Update screenshot(s) if the app UI changed: `bash scripts/update-screenshots.sh`
2. Commit updated PNG(s) in `public/screenshots/`.
3. Push `main` — Vercel deploys automatically.
