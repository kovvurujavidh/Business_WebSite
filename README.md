<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=wave&color=0:0f172a,50:c87941,100:f59e0b&height=220&section=header&text=LOCALBIZZ&fontSize=44&fontColor=ffffff&fontAlignY=38&animation=fadeIn&desc=Digital%20Solutions%20for%20Local%20Businesses&descAlignY=60&descAlign=62" alt="LocalBizz header" />

  <h1>LocalBizz — Portfolio &amp; Services Site</h1>
  <p><strong>The website behind <a href="https://localbizz.dpdns.org">localbizz.dpdns.org</a></strong></p>
  <p>A dark-mode portfolio and services site for building websites, landing pages and digital tools for local businesses.</p>

  <p>
    <a href="#pages"><img src="https://img.shields.io/badge/Pages-4-amber?style=for-the-badge" alt="Pages" /></a>
    <a href="#tech-stack"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" /></a>
    <a href="#tech-stack"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="#getting-started"><img src="https://img.shields.io/badge/Get_Started-c87941?style=for-the-badge" alt="Get Started" /></a>
  </p>
</div>

<br/>

## What this is

A services and portfolio site for **LocalBizz** — covering business websites,
landing pages, custom digital tools, forms & automation, and chatbots.

The design brief was simple: **minimal, fast, professional, no clutter** — and
no fake content. Every project shown is a real one, every link works, and there
are no invented testimonials or fabricated metrics.

<br/>

## Pages

| Route | What it holds |
|---|---|
| `/` | Hero, About, featured Projects, Services, Process, Contact |
| `/work` | Full project grid |
| `/work/[id]` | Individual case study — challenge, solution, architecture, stack, features |
| `/contact` | Enquiry form + direct links (email, WhatsApp with pre-filled message) |

Supporting routes: `/robots.ts`, `/sitemap.ts`, `/manifest.ts`, and a
`not-found.tsx` for 404s.

<br/>

## Features

- **Dark mode by default**, with a light-mode toggle (`ThemeProvider`).
- **Case studies from structured data** — each project carries challenge,
  solution, architecture, tech stack, metrics and features.
- **Scroll-reveal animations** via a custom `useScrollReveal` hook
  (IntersectionObserver, reduced-motion aware).
- **Working enquiry form** posting to `/api/enquiry`.
- **WhatsApp CTA** with a pre-filled message: `wa.me/917670860094`.
- **SEO-ready** — metadata, Open Graph, manifest, robots and sitemap.
- **Responsive** across mobile, tablet and desktop.

<br/>

## Services

| # | Service |
|---|---|
| 01 | Business websites — hotels, restaurants, function halls, local shops |
| 02 | Conversion-focused landing pages |
| 03 | Custom digital tools & dashboards |
| 04 | Forms & automation — enquiry flows, notifications, data pipelines |
| 05 | Chatbots & assistants |

Pricing tiers (Basic / Standard / Custom) are defined in
[`src/data/plans.ts`](src/data/plans.ts).

<br/>

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js** (App Router) |
| Language | **TypeScript** |
| Styling | **Tailwind CSS 4** (`@tailwindcss/postcss`) |
| UI | **React 19** |
| Linting | **ESLint 9** + `eslint-config-next` |
| Fonts | Geist Sans + Geist Mono |
| Accent | Warm amber `#c87941` |

<br/>

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 Home
│   ├── layout.tsx               Root layout, fonts, metadata
│   ├── globals.css              Design tokens & base styles
│   ├── manifest.ts              PWA manifest
│   ├── robots.ts / sitemap.ts   SEO
│   ├── not-found.tsx            404
│   ├── contact/page.tsx         Enquiry + direct contact
│   ├── work/page.tsx            Project grid
│   ├── work/[id]/page.tsx       Case study
│   └── api/enquiry/route.ts     Enquiry endpoint
├── components/
│   ├── Header.tsx / Footer.tsx
│   ├── ThemeProvider.tsx        Dark / light toggle
│   └── sections/
│       ├── HomeHero.tsx      HomeAbout.tsx    HomeProjects.tsx
│       ├── HomeServices.tsx  HomeProcess.tsx  HomeContact.tsx
├── data/
│   ├── projects.ts             Project case-study content
│   └── plans.ts                Service tiers
└── hooks/
    └── useScrollReveal.ts      IntersectionObserver reveal
```

<br/>

## Content Rules

Enforced in [`MEMORY.md`](MEMORY.md) so the site never drifts:

1. **No fake testimonials or reviews.**
2. **No fabricated metrics.**
3. **No invented projects** — only real, existing work.
4. All external links open in a new tab.
5. WhatsApp links carry a pre-filled message.

<br/>

## Featured Projects

Case studies live in [`src/data/projects.ts`](src/data/projects.ts):

| Project | Type |
|---|---|
| **Varasiddi Function Hall** | Business website — [varasiddi.netlify.app](https://varasiddi.netlify.app/) |
| **HR Analytics Excel Dashboard** | Data analytics — [repo](https://github.com/kovvurujavidh/HR-Analytics-Excel-Dashboard) |
| **HR Analytics SQL** | Data engineering — [repo](https://github.com/kovvurujavidh/HR-Analytics-SQL) |
| **MyTradingBot** | Automation — [repo](https://github.com/kovvurujavidh/MyTradingBot) |
| **Trading Indicator** | Web frontend — [repo](https://github.com/kovvurujavidh/Trading-Indicator) |

<br/>

## Getting Started

```bash
git clone https://github.com/kovvurujavidh/Business_WebSite.git
cd Business_WebSite
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Action |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

### Deployment

Standard Next.js app — deploys to **Vercel** with zero config, or any Node
host via `npm run build && npm run start`. The live site is served at
[localbizz.dpdns.org](https://localbizz.dpdns.org/).

<br/>

## Author

**Kovvuru Javidh** — Founder, LocalBizz

- GitHub: [@kovvurujavidh](https://github.com/kovvurujavidh)
- LinkedIn: [kovvurujavidh](https://www.linkedin.com/in/kovvurujavidh/)
- WhatsApp: [Chat](https://wa.me/917670860094?text=Hi%2C%20I%20need%20to%20connect%20with%20you.)
- Portfolio: [localbizz.dpdns.org](https://localbizz.dpdns.org/)

<br/>

<div align="sub">
  <sub>Digital solutions for local businesses.</sub>
</div>
