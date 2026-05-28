# Cashta

Trusted Value Movement — swap physical cash and stablecoins through verified local merchants.

Next.js 14 (App Router) prototype.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel (this is the part that fixes your 404)

The 404 you saw happened because a single `.jsx`/`.tsx` file is not a deployable app —
Vercel had nothing to build or serve. This folder is a complete Next.js project, so it
will build and serve correctly.

1. Put **this entire folder** (not just the component file) into your GitHub repo.
   Make sure these are committed: `package.json`, `next.config.js`, `app/`, `components/`.
   Do NOT commit `node_modules` (the `.gitignore` handles that).
2. In Vercel: New Project → Import your GitHub repo.
3. Framework Preset: Vercel auto-detects **Next.js**. Leave build settings default
   (Build Command `next build`, Output `.next`). Don't override anything.
4. Deploy. The root URL will now serve the app.

## Common mistakes that cause a 404

- Uploading only `Cashta.jsx` with no `package.json` → nothing to build. (This was the issue.)
- Renaming the file to `.tsx` → it's plain JS, not TypeScript, so it won't compile. Keep it `.jsx`.
- Committing `node_modules` instead of letting Vercel install → bloats repo, can break builds.

## Structure

```
cashta-app/
├── package.json          # dependencies + scripts
├── next.config.js
├── jsconfig.json
├── .gitignore
├── app/
│   ├── layout.jsx        # HTML shell + metadata
│   └── page.jsx          # renders <Cashta /> (client component)
└── components/
    └── Cashta.jsx        # the full app (starts with "use client")
```
