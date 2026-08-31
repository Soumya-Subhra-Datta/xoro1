# NEXORA PulseOne

Interactive 3D medical technology product experience created for the **XORO Story UI/UX Design Challenge**.

PulseOne™ is a fictional next-generation portable health-monitoring device. This prototype demonstrates a premium product-launch experience combining interactive 3D, cinematic storytelling, and polished motion design.

> **Note:** This is a design prototype. PulseOne is a fictional product and makes no real medical claims.

---

## Features

- **Interactive 3D product** — WebGL-based product model with realistic materials, lighting, and shadows
- **Scroll-driven storytelling** — a cinematic DISCOVER → ACT narrative journey
- **Product exploration** — interactive hotspots that highlight conceptual components
- **Exploded product view** — explore and assemble the product's internal layers
- **Cinematic video sections** — strategically integrated environmental storytelling
- **How it works** — animated signal-to-insight progression
- **Real-world context** — HOME / CLINICAL / PROFESSIONAL segmented view
- **Responsive UI** — optimised from 1440px down to 375px
- **Micro-interactions** — hover, focus, and tap feedback throughout
- **AR experience entry point** — prepared for the next XORO Story task
- **Premium loading state** — progress-driven intro
- **Graceful fallbacks** — assets degrade gracefully on failure
- **GitHub Pages deployment** — automated via GitHub Actions

## Tech Stack

- **React 19** — UI library
- **Vite 8** — build tool and dev server
- **Three.js** + **@react-three/fiber** + **@react-three/drei** — WebGL 3D
- **Lenis** — smooth scrolling
- **GSAP / Framer Motion** — motion design
- **CSS** — custom design system, CSS Grid / Flexbox

## Project Structure

```
xoro1/
├── public/
│   ├── videos/          # 4 cinematic story videos
│   ├── med/             # 6 medical environment images
│   └── product/         # 5 product reference images
├── src/
│   ├── components/      # Navbar, LoadingScreen, hooks
│   ├── sections/        # Hero, Explorer, HowItWorks, etc.
│   ├── three/           # ProductScene, ProductModel, Hotspots
│   ├── animations/      # Reveal and scroll helpers
│   ├── data/            # Product data (hotspots, specs, contexts)
│   ├── App.jsx
│   └── index.css
├── .github/workflows/   # GitHub Pages deployment
├── vite.config.js       # base config for /xoro1/ subpath
└── index.html
```

## Run Locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

### Option A — GitHub Actions (recommended)

1. Push this repository to GitHub as `xoro1`.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, select **Source: GitHub Actions**.
4. Push to `main` — the included workflow builds and deploys automatically.

The site is served from the `/xoro1/` subpath via the `base` setting in `vite.config.js`.

### Option B — Manual

Build locally, then publish the `dist/` folder to GitHub Pages (e.g. via the `gh-pages` branch).

---

Created for the **XORO Story UI/UX Design Challenge**.
