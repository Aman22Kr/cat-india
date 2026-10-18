# CAT-INDIA (demo website)

A multi-page, static demo recreation of a large test-prep institute's website, rebranded **CAT-INDIA**. Built with Vite + React + Tailwind CSS, React Router (hash routing), Lucide icons and Framer Motion. No backend: all state lives in browser **localStorage** (per browser and device; no sync, no real accounts).

> Demo only. Prices, centres, stories and offers are sample data. Cart/checkout, login and forms never contact a server or take payment.

## Quick Settings
Edit `src/settings.js` (brand name, animation speed `SLOW|NORMAL|FAST|OFF`, intensity `SUBTLE|MEDIUM|STRONG`), colours in `tailwind.config.js`, content in `src/data/index.js`.

## Run locally
```bash
npm install
npm run dev
npm run build && npm run preview
```
`npm install` also creates `package-lock.json`; commit it.

## Deploy to GitHub Pages (GitHub Actions only)
1. Create a repo (e.g. `cat-india`) under `Aman22kr` and push:
```bash
git init && git add . && git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Aman22kr/cat-india.git
git push -u origin main
```
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and publishes `dist/` on every push to `main`.
4. Site URL: `https://aman22kr.github.io/cat-india/`

Routing uses `HashRouter` and `vite.config.js` uses a relative base (`./`), so refreshes, direct links and any repository name work without server rewrites.

## Demo limitations
Hash URLs (`#/…`); sample data only; images from the reference CDN fall back to a coloured tile if unreachable; ad strip is a house-ad placeholder; not every page of the original is replicated.
