# Media library

Everything visual lives here so it can be found, replaced, and audited without
searching through components.

| Folder | Use it for |
| --- | --- |
| `portraits/` | Editorial photography of David. Keep the hero portrait at a 4:5 ratio. |
| `brand/` | Social cards, marks, textures, and generated brand artwork. |
| `orgs/` | Official organization marks used beside names and links. Fallbacks live in `lib/organizations.ts`. |
| `evidence/` | Badge screenshots, event photography, and credential captures. |
| `../documents/` | Downloadable PDFs, including the résumé. Served from `/documents/`. |

## Canonical files

| File | Public URL | Used by |
| --- | --- | --- |
| `portraits/david-akpoviroro-oke.jpg` | `/media/portraits/david-akpoviroro-oke.jpg` | Home hero, About |
| `brand/mr-iridescent-logo.png` | `/media/brand/mr-iridescent-logo.png` | About, Share kit, Media library |
| `brand/mr-iridescent-mark.png` | `/media/brand/mr-iridescent-mark.png` | Navigation, Footer, Home |
| `brand/mr-iridescent-logo.jpg` | `/media/brand/mr-iridescent-logo.jpg` | Archival source; do not crop |
| `brand/og-card.jpg` | `/media/brand/og-card.jpg` | Open Graph, Twitter cards, article schema |
| `../favicon.svg` | `/favicon.svg` | Browser tab icon (generated) |
| `../favicon.ico` | `/favicon.ico` | Legacy tab, feed, and pinned-tab icon (generated) |
| `../apple-touch-icon.png` | `/apple-touch-icon.png` | iOS and iPadOS home screen (generated) |
| `../site.webmanifest` | `/site.webmanifest` | Web app manifest and Android icons (generated) |
| `../documents/David-Oke-Resume-2026.pdf` | `/documents/David-Oke-Resume-2026.pdf` | Résumé, navigation, home, about |

The complete registry — public URL, repository path, dimensions, and consuming
pages — is maintained in [`lib/media.ts`](../../lib/media.ts) and rendered at
`/media`.

## Replacing an asset

1. Drop the replacement at the same path, keeping the same filename and aspect
   ratio. Every page updates automatically.
2. If the filename changes, update `lib/media.ts` and the references listed in
   its `usedIn` field.
3. For the favicon set, replace
   `brand/mr-iridescent-mark.png`, then run:

   ```bash
   npm run generate:favicon
   ```

   This rebuilds `favicon.svg`, `favicon.ico`, the 16/32/48/96 PNG icons,
   `apple-touch-icon.png`, the Android icons, and `site.webmanifest`.

   To rebuild the Open Graph card as well, run `npm run generate:brand` (favicon
   plus `brand/og-card.jpg`). `npm run generate:assets` rebuilds only the social
   card.
4. For the résumé, run:

   ```bash
   npm run generate:resume
   ```

   The output path is defined in `scripts/generate-resume.mjs`.

## Replacing the header logo

The mark beside the name at the top of every page is controlled by one file and
one path:

- File: `brand/mr-iridescent-mark.png`
- Path constant: `brandMark` in [`lib/profile.ts`](../../lib/profile.ts)
- Source size: **512 × 512 px square** (256 × 256 minimum)
- Displayed at: **32 px** in the mobile header, **36 px** in the desktop header,
  and **40 px** in the footer

Keep the important artwork inside the central 80% of the square, because the
mark is cropped into a circle and sits on an ivory plate with a small inset.
Use a transparent or ivory background; black artwork disappears on the dark
header without the plate. To change the logo, replace that one PNG (or update
`brandMark.src` if you use a different filename), then run
`npm run generate:favicon` so the browser icons match.

## Journal covers

The local fallback essays use five CC0 photographs, cropped to **1600 × 900**
and compressed to WebP. They are referenced from `lib/blog-fallback.ts`; a post
published through Contentful supplies its own cover asset instead.

| File | Essay | Source | Credit |
| --- | --- | --- | --- |
| `blog/systems.webp` | The polymath is a systems engineer | [StockSnap — Circuit Macro](https://stocksnap.io/photo/circuit-macro-MADL8CN3KW) | Lenharth Systems, CC0 1.0 |
| `blog/security.webp` | Security is a design material | [Rawpixel — Building designed brutalist architecture](https://www.rawpixel.com/image/3303077/free-photo-image-architecture-cc0-pattern-apartment-building) | Rawpixel, CC0 1.0 |
| `blog/web.webp` | Twenty years of the web, and what it taught me about AI | [Rawpixel — Computer Room Oak Ridge 1960s](https://www.rawpixel.com/image/8738300/computer-room-oak-ridge-1960s) | US Department of Energy / Rawpixel, CC0 1.0 |
| `blog/interface.webp` | The interface is a promise | [Rawpixel — Wireframe Mobile App Sketch iPhone](https://www.rawpixel.com/image/5967036/wireframe-mobile-app-sketch-iphone) | Rawpixel, CC0 1.0 |
| `blog/green.webp` | Green software is a design constraint, not a badge | [StockSnap — Solar Panels](https://stocksnap.io/photo/solar-panels-EFYB8VJXNT) | Matt Bango, CC0 1.0 |

These files are placeholders for the essays. When a real photograph belongs to
an essay, replace the file at the same path and keep the 16:9 ratio, then update
the source credit above.

## Ground rules

- Prefer JPEG or WebP for photography; SVG for marks. The supplied Mr Iridescent
  artwork is raster, so keep the PNG variants rather than recreating it as SVG.
- Keep the monogram mark on an ivory plate. It is black artwork and disappears
  on dark backgrounds without one.
- Organization marks are trademarks of their owners and appear only to identify
  the organizations in David's record. Do not present a monogram fallback as an
  official logo. New organizations are registered in `lib/organizations.ts`.
- Optimise before committing. The portrait should stay under ~250 KB.
- Do not put secrets, private client material, or unreleased personal documents
  in `public/` — everything there is publicly served.
- Add new evidence files to `lib/media.ts` so they appear in the `/media`
  inventory.
