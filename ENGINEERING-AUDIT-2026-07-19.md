# BitCode Engineering Audit

Audit date: 19 July 2026
Production: https://bitcode-web.vercel.app

## Result

The application was audited across React and Next.js architecture, rendering, hydration, assets, CSS, animations, networking, dependencies, accessibility, SEO, security, resilience, MCP behavior, and production delivery. The established BitCode interface was deliberately preserved: the original loader, reveal transitions, floating graphics, card motion, SVG glow filters, backdrop effects, and responsive layouts remain.

| Measure | Before | Final |
|---|---:|---:|
| Public assets | 2,158,520 B | 79,035 B |
| Compiled CSS | 115,696 B | 82,660 B |
| Automatic route-prefetch requests | 22 | 0 |
| Production dependency advisories | — | 0 |

## Engineering retained or improved

- Kept pages as Server Components and limited client code to eight intentional interaction boundaries: navigation, loader, reveals, course accordion, contact preparation, visible learning showcase, and error handling.
- Preserved React hydration and the visual animation system while retaining reduced-motion handling, offscreen/visibility timer gates, interval cleanup, and GPU-friendly transform-based motion where the design permits.
- Removed obsolete assets, duplicate logic, confirmed dead CSS selectors, unused animation rules, speculative route prefetching, third-party font requests, and unnecessary runtime packages.
- Kept the complete public asset set to four optimized files (79 KB total) and one compiled stylesheet.
- Kept contact details local until the visitor explicitly chooses email or “Message BitCode”; the static contact page performs no background upload.
- Preserved static CDN delivery for every public page. Only `/mcp` executes dynamically.
- Hardened production with CSP, HSTS, anti-framing, MIME-sniff protection, restricted permissions, referrer controls, canonical metadata, JSON-LD, sitemap/robots output, error boundaries, and a branded 404.
- Kept the MCP endpoint stateless and type-safe with strict Zod inputs, a 64 KB request cap, content-type enforcement, sanitized failures, structured server logging, controlled caching, and seven verified tools.
- Avoided speculative memoization, global state, analytics SDKs, animation libraries, and abstractions that would add bytes or maintenance without measurable value.

## Verification

- `npm run check`: passed
- `npm run build`: passed; 12 static outputs, only `/mcp` dynamic
- Dependency audit: 0 known vulnerabilities
- Desktop and mobile route checks: no horizontal overflow or console errors
- Loader, menu, course accordion, reveal transitions, contact actions, SVG filters, and reduced-motion safeguards verified
- Production routes, CDN/security headers, assets, 404, sitemap, robots, MCP health, 415 media-type handling, and 413 body-limit handling verified
- Connected BitCode MCP tools successfully returned learning paths, the teaching method, and a correct learner recommendation

## Deliberate boundaries

- Loader, reveals, mobile navigation, and course accordions retain hydration because that behavior is part of the approved interface.
- Paint-heavy glow/backdrop effects remain by design; reduced-motion and visibility guards limit unnecessary work.
- Next.js currently requires inline bootstrap/style allowances in CSP; all external scripts, frames, objects, and non-self connections remain blocked.
- No analytics SDK was added. Production delivery and structured MCP errors are observable through Vercel logs without adding client JavaScript or network requests.
- Distributed abuse protection for the public MCP endpoint belongs at Vercel Firewall/edge level; an in-memory serverless limiter would be unreliable.
- Lighthouse was intentionally not rerun for this engineering pass.
