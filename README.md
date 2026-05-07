# Codex Globe

Interactive 3D globe mapping Codex Ambassadors worldwide.

**Live:** https://codex-globe.vercel.app

## Stack

- Next.js 16, React 19, TypeScript
- [cobe](https://github.com/shuding/cobe) v2 (WebGL globe)
- Tailwind CSS v4, shadcn/ui
- flag-icons for country flags

## Features

- Interactive globe with auto-rotation (pause on hover)
- Click-to-rotate to any ambassador's location
- Continent and country filters
- Globe view + Grid view (group by continent, country, or timezone)
- Mobile responsive with swipeable drawer (vaul)
- Mask fades on scrollable areas

## Architecture

```mermaid
flowchart LR
  ambassadors["src/data/ambassadors.ts\nAmbassador profiles + map coordinates"]
  events["src/data/events.ts\nCommunity event locations"]
  app["Next.js App Router\nsrc/app"]
  globe["cobe WebGL globe\nsrc/components/globe.tsx"]
  grid["Grid/list UI\nsrc/app/page.tsx"]
  vercel["Vercel deployment\ncodex-globe.vercel.app"]

  ambassadors --> app
  events --> app
  app --> globe
  app --> grid
  app --> vercel
```

## Development

```bash
bun install
bun dev
```

## Deploy

```bash
vercel --prod
```
