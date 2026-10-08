# Karthikeya — Software Developer

A responsive Next.js portfolio built with TypeScript, React Three Fiber, Three.js, GSAP, and ScrollTrigger. A lightweight architectural WebGL scene sits behind the HTML portfolio; the camera and section handoffs are driven by scroll position and reverse naturally. Mobile renders a reduced scene, and reduced-motion preferences stop camera and geometry motion.

## Requirements

- Node.js 20.9 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

The app is served at the local address printed by Next.js. For a production build, run:

```bash
npm run build
npm start
```

To run the TypeScript check, use `npm run check`.

`next start` uses the `PORT` environment variable when one is provided, including on Render. No custom server or separate backend is required.

## Resume PDF

The Resume links point to `/resume.pdf`, served from the included `public/resume.pdf` file.

## Deploy to Vercel

1. Import this repository into Vercel.
2. Select the Next.js framework preset. Vercel detects the framework and its standard build and start behavior automatically.
3. Deploy. No project-specific environment variables are required.

## Deploy to Render

Create a **Web Service** using the **Node** runtime and configure:

- **Build command:** `npm install && npm run build`
- **Start command:** `npm start`

Render supplies `PORT` to the service; the standard Next.js start command reads it automatically. Choose a Node.js version of 20.9 or newer in the service settings.

## Environment variables

There are no external API integrations in this foundation. Set `NEXT_PUBLIC_SITE_URL` to the deployed site origin (for example, `https://your-domain.example`) so Open Graph previews use an absolute image URL. If an external API is added later, put its public base URL in an environment variable and keep secrets in the deployment provider’s environment settings. Do not commit secrets or local `.env` files.
