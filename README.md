# BitCode Website

A production-ready multi-page website for BitCode, built with Next.js, React, and TypeScript. The design uses the supplied BitCode logo as its primary brand reference without altering or stretching the source image.

## Run locally

Requirements: Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production check:

```bash
npm run build
npm start
```

## Contact form

The form uses native browser validation and prepares email and direct-message links entirely in the visitor’s browser. No personal details are uploaded to BitCode until the visitor explicitly chooses a sending option.

No email API, paid service, billing account, or `.env.local` file is required. `NEXT_PUBLIC_SITE_URL` is optional; Vercel supplies its production URL automatically.

## MCP server

The site exposes a public MCP endpoint at `/mcp` for ChatGPT App / MCP connections. It uses the official MCP TypeScript SDK with stateless Streamable HTTP and no authentication in V1 because tools only return public BitCode information or prepare enquiry messages.

Health check:

```bash
curl https://bitcode-web.vercel.app/mcp?health=1
```

## Update content

- Courses, contact details, navigation, teaching steps, and project placeholders: `data/site.ts`
- Public MCP data, FAQs, recommendations, and sample guided projects: `data/bitcode.ts`
- Page copy: matching files under `app/`
- Testimonials: `app/testimonials/page.tsx`
- Logo: `public/bitcode-logo.webp` (optimized production artwork; keep the source proportions unchanged)
- Social preview: `public/og.jpg`
- Theme and responsive styles: `app/globals.css`

## Deploy

Import the project into a free Vercel personal account and deploy with the default Next.js settings. Any host that supports Next.js and Node.js can also run `npm run build` followed by `npm start`.

Vercel automatically supplies the production URL used by Open Graph, sitemap, and robots metadata. A free `vercel.app` subdomain is sufficient; no domain purchase or payment method is needed.

```bash
npx vercel
npx vercel --prod
```

After making changes, run `npm run check` and `npm run build`, then redeploy with `npx vercel --prod`.

The free Vercel plan has usage limits and a generated subdomain. The contact form intentionally uses WhatsApp and email-client fallbacks, so it does not depend on a paid transactional email service.
