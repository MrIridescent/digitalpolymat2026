# David Akpoviroro Oke — Portfolio

The personal site of **David Akpoviroro Oke — Mr Iridescent, the Creative
Renaissance Man**: a Lagos-based Digital Product Delivery Architect, systems
engineer, and founder working across product engineering, applied AI, workflow
automation, cybersecurity, and civic infrastructure.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, GSAP, Lenis, and
Framer Motion. The site is a fully static export, deployed on Netlify. The
journal is powered by Contentful at build time, with a local essay fallback.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Kinetic editorial introduction: selected work carousel, services index, capabilities, method, journal |
| `/projects` | Filterable project index linked to real repositories and demos |
| `/case-studies` | Longer write-ups of systems built under real constraints |
| `/about` | Background, languages, experience, principles, and education |
| `/services` | Delivery architecture, custom software, automation, growth, security, creative systems |
| `/services/fractional-cto` | Fractional CTO retainer offer: 30-60-90 blueprint, tiers, client segments, microservices |
| `/credentials` | Credential overview: six verified Cisco badges, training, schooling, languages |
| `/credentials/cisco` | The six verified Cisco Networking Academy badges |
| `/credentials/training` | Professional training beyond Cisco |
| `/credentials/education` | Institutions of study and honestly levelled languages |
| `/manifesto` | The Renaissance manifesto, seven Da Vincian principles, and Letter of Capability |
| `/advocacy` | Green Software, the SDGs, climate action, and African Union Agenda 2063 |
| `/media` | Discoverable registry of every portrait, brand file, document, and evidence path |
| `/resume` | Web résumé with a print/download PDF |
| `/contact` | WhatsApp-first contact details and a server-delivered enquiry form |
| `/share` | Intent-aware share kit with message templates and social channels |
| `/qr` | QR atelier: 20 destinations × 6 art-directed editions, PNG and SVG downloads |
| `/blog` | Journal index with featured entry, topic filters, and search |
| `/blog/[slug]` | Article pages rendered from Contentful rich text, with TOC, share, and prev/next |
| `/writings` | Legacy writing URL; points readers to the journal (canonical `/blog`) |
| `/statistics` | Verified numbers with sources |
| `/emerging-tech` | Current areas of practice and active experiments |
| `/philosophy` | The polymathic approach, in detail |
| `/quotes` | A searchable, saveable working library of quotes |

## Stack

- **Framework:** Next.js 15 with the App Router, exported statically (`output: 'export'`)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS plus two custom layers: `app/globals.css` (iridescent system) and `styles/kinetic.css` (kinetic editorial layer)
- **Type:** Bricolage Grotesque, Instrument Serif, Inter, JetBrains Mono via `next/font`
- **Motion:** GSAP + ScrollTrigger, Lenis smooth scroll, Framer Motion, CSS scroll-driven reveals, marquees, route curtain
- **Graphics:** CSS spectral gradients, arch masks, outlined type, pointer aura, keyframe-animated SVG icons
- **Icons:** Lucide React plus the purpose-built `KineticIcon` set
- **Journal:** Contentful Delivery API fetched at build time, rendered with a local rich-text renderer; publish with `npm run blog:publish`; local fallback essays live in `lib/blog-fallback.ts`
- **Forms:** Netlify Function (`netlify/functions/contact.js`) delivering through Resend, with optional SMTP fallback
- **Live chat:** WhatsApp click-to-chat with prefilled intent templates
- **Assets:** `sharp` (brand images) and Playwright (résumé PDF)
- **Deployment:** Netlify (`netlify.toml`)

All motion respects `prefers-reduced-motion`. The pointer aura is disabled on
coarse pointers, and the atmosphere renders a static frame when motion is reduced.

## Project structure

```
app/                    Routes, layout, metadata, global styles
  services/             Engagement and service architecture
  credentials/          Training, schooling, and verification
  manifesto/            Renaissance manifesto and Letter of Capability
  advocacy/             Green Software, SDGs, Agenda 2063
  media/                Asset registry UI
  resume/               Web résumé
  share/                Referral and share kit
  qr/                   QR atelier: destinations and poster editions
  ...
components/
  Navigation.tsx        Floating editorial navigation
  Footer.tsx            Site footer with acid marquee and oversized wordmark
  StructuredData.tsx    JSON-LD (Person, WebSite, Organization, FAQ, Service)
  DynamicLayoutSystem   Page shell (nav + main + footer)
  kinetic/              Kinetic primitives: marquee, split lines, magnetic, rail carousel, scroll words, animated icons, editorial frame
  blog/                 Rich-text renderer, generated covers, journal filter, share row
  home/                 Interactive services index
  motion/               GSAP effects, Lenis, reveals, tilt, aura, atmosphere, route curtain
  site/                 Shared UI, contact form, live chat, share kit, referral banner
lib/
  profile.ts            Single source of truth for identity and facts
  contentful.ts         Build-time Contentful client, rich-text helpers, local fallback switch
  blog-fallback.ts      Five local essays used when Contentful is unavailable
  organizations.ts      Organization logo registry and monogram fallbacks
  projects.ts           Project catalogue and featured selection
  media.ts              Registry of every public asset and where it is used
  quotes.ts             Quote library
  share.ts              Share intents, channels, and tracked-link helpers
  seo-config.ts         Metadata and canonical URL helpers
netlify/
  functions/contact.js  Server-side enquiry delivery (Resend or SMTP)
public/
  media/
    portraits/          Editorial photography
    brand/              Social cards and brand artwork
    orgs/               Official organization marks and logos
    evidence/           Badge and event captures
    blog/               Journal cover photographs (CC0, credited in media/README.md)
  documents/            Downloadable résumé PDF
  favicon.svg/.ico      Favicon set and browser icons
  site.webmanifest      Web app manifest
styles/
  kinetic.css           Kinetic editorial layer (type, marquee, carousel, motion)
scripts/
  generate-favicon.mjs        Regenerates the favicon set and manifest
  generate-brand-assets.mjs   Regenerates the OG social card
  generate-resume.mjs         Regenerates the résumé PDF
  contentful-publish.mjs      Creates/updates and publishes journal entries via the CMA
  preview-server.cjs          Local server that mimics Netlify clean URLs
contentful/
  post-template.json          Copy to post.json, edit, then run blog:publish
```

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build and preview

```bash
npm run type-check
npm run build
npm run preview
```

`npm run build` writes a static site to `out/`. To preview it with the same clean
URLs Netlify serves, run the included static server:

```bash
node scripts/preview-server.cjs
```

Then open [http://localhost:4173](http://localhost:4173).

### Why `out/` stays

`output: 'export'` turns every route into HTML at build time, and `out/` is the
artifact Netlify publishes (`publish = "out"` in `netlify.toml`). It is generated,
not authored: `out/` is gitignored and must never be edited by hand, because the
next build overwrites it. Delete it freely; `npm run build` recreates it. Keep it
in the pipeline only as the deploy target.

`npm run dev` does not need it — pages are compiled and served in memory, while
`/api/contact` still resolves through Netlify Functions in production.

## Content

Edit the facts in one place:

- **Identity, languages, roles, services, experience, training, advocacy:** `lib/profile.ts`
- **Projects and case studies:** `lib/projects.ts`
- **Media and asset paths:** `lib/media.ts`
- **Quotes:** `lib/quotes.ts`
- **Page metadata and canonical URLs:** `lib/seo-config.ts`

When adding or removing a route, update `app/sitemap.ts` and the navigation in
`components/Navigation.tsx` and `components/Footer.tsx` as well. The sitemap is
generated at build time from `app/sitemap.ts`, so Contentful articles are
included automatically.

## Journal (Contentful)

The journal is fetched at build time from the Contentful Delivery API. Set these
server-side environment variables in the build environment (they are never
exposed to the browser):

| Variable | Purpose |
| --- | --- |
| `CONTENTFUL_SPACE_ID` | Contentful space |
| `CONTENTFUL_ACCESS_TOKEN` | Delivery API token (read-only, used by the build) |
| `CONTENTFUL_MANAGEMENT_TOKEN` | CMA token (write access, used only by `blog:publish`) |
| `CONTENTFUL_ENVIRONMENT` | Optional, defaults to `master` |
| `CONTENTFUL_CONTENT_TYPE` | Optional, defaults to `blogPost` |
| `CONTENTFUL_LOCALE` | Optional, defaults to `en-US` |
| `BLOG_REBUILD_WEBHOOK_URL` | Optional Netlify build hook called after `blog:publish` |
| `BLOG_REBUILD_TOKEN` | Optional fallback GitHub token for a workflow dispatch |
| `BLOG_REBUILD_REPO` | Optional, defaults to `mriridescent/digitalpolymat2026` |

`CONTENTFUL_MANAGEMENT_TOKEN` is a secret with write access. Keep it in
`.env.local` or GitHub Actions secrets, never in a `NEXT_PUBLIC_` variable and
never in a commit.

If any required variable is missing, the fetch fails, or the space returns no
entries, the build still renders the five local essays in
`lib/blog-fallback.ts`. When Contentful is available, its entries are added to
the journal and a remote entry with the same slug replaces the local one. A
fallback build still succeeds and still produces every article route, so the
site never ships an empty journal.

### Content type fields

Create a content type with the API ID `blogPost` and these fields:

| Field | Type | Notes |
| --- | --- | --- |
| `title` | Short text | Required |
| `slug` | Short text | Required, URL-safe and unique |
| `excerpt` | Short text | Card and meta description |
| `body` | Rich text | Paragraphs, headings, lists, quotes, links, embedded assets |
| `publishedAt` | Date and time | Sort key, newest first |
| `updatedAt` | Date and time | Optional, used for `article:modified_time` |
| `tags` | Short text, list | First tag drives the card label |
| `cover` | Media | Optional; assets resolve from `images.ctfassets.net` |
| `featured` | Boolean | Optional; pins one entry to the blog masthead |
| `readingMinutes` | Number | Optional; estimated from the body when absent |

The client is deliberately tolerant: `content`, `richText`, `summary`,
`publishDate`, `date`, `categories`, and `hero` are accepted as aliases, and
missing optional fields degrade rather than break the build. See
`lib/contentful.ts` for the exact mapping.

### Publish from the command line

The static export reads Contentful at build time, so publishing is two steps:
write the entry, then rebuild the site. The CLI does both.

```bash
# 1. One-time: create the content type if the space does not have it yet
npm run blog:setup

# 2. Copy the template and write the essay
cp contentful/post-template.json contentful/post.json
# ...edit title, slug, excerpt, tags, cover, and Markdown body...

# 3. Validate without changing anything in Contentful
npm run blog:validate

# 4. Publish the entry and cover asset, then trigger the Netlify build
npm run blog:publish
```

`blog:publish` accepts `--file <path>` (or `--file -` to read JSON from stdin),
`--dry-run`, and `--no-rebuild`. It creates or updates by slug, uploads and
publishes the cover asset, and preserves fields it does not manage. The post
JSON looks like this:

```json
{
  "title": "The post title",
  "slug": "the-post-title",
  "excerpt": "One or two sentences for the card and search results.",
  "publishedAt": "2026-11-06T09:00:00.000Z",
  "tags": ["Growth", "Systems"],
  "featured": false,
  "cover": "public/media/blog/systems.webp",
  "coverAlt": "Describe the image for screen readers",
  "body": "## A heading\n\nMarkdown paragraphs, **bold**, *italic*, links, lists, and quotes."
}
```

`cover` accepts a repository path or an `https://` image URL. To reuse an asset
already in Contentful, pass `coverAssetId` instead. `body` accepts Markdown, or
a raw Contentful rich-text document (`bodyRichText`).

For automatic rebuilds, create a build hook in **Netlify → Site configuration →
Build & deploy → Build hooks** and set it as `BLOG_REBUILD_WEBHOOK_URL`. The
publish script calls the hook after the entry and cover are published, and Netlify
rebuilds the static export. Without a hook, trigger a deploy from the Netlify
dashboard after publishing. `BLOG_REBUILD_TOKEN` remains an optional fallback for
a GitHub Actions workflow, but this repository deploys through Netlify's Git
integration and ships no deploy workflow.

You can still publish in the Contentful web app instead; just rebuild afterwards.
`generateStaticParams` enumerates slugs at build time and `app/sitemap.ts`
regenerates the sitemap, so no manual route or sitemap edits are needed.
Fallback essays are treated identically.

## Assets and media

All visual assets are discoverable at `/media` and documented in
`public/media/README.md`:

| Asset | Path |
| --- | --- |
| Portrait | `public/media/portraits/david-akpoviroro-oke.jpg` |
| Primary logo | `public/media/brand/mr-iridescent-logo.png` |
| Square mark | `public/media/brand/mr-iridescent-mark.png` |
| Social card | `public/media/brand/og-card.jpg` |
| Organization logos | `public/media/orgs/` |
| Résumé | `public/documents/David-Oke-Resume-2026.pdf` |
| Favicon | `public/favicon.svg`, `public/favicon.ico` |
| Web manifest | `public/site.webmanifest` |

Organization logos are trademarks of their owners and appear only to identify
the organizations in David's record. Organizations without a usable official
mark fall back to a designed monogram in `lib/organizations.ts`.

Replace a file at the same path to update every page that uses it. If a filename
changes, update `lib/media.ts` and the references in its `usedIn` field.

The mark beside the name in the header is `public/media/brand/mr-iridescent-mark.png`,
referenced once as `brandMark` in `lib/profile.ts`. Use a **768 × 768 px square
PNG** (256 × 256 minimum) with transparent corners. It renders at
32 px on mobile, 36 px in the desktop header, and 40 px in the footer, cropped to
a circle inside an ivory plate. Keep detail within the central 80% of the square.
After replacing it, run `npm run generate:favicon` so the browser icons match.

## Regenerating assets

```bash
npm run generate:favicon  # favicon.svg/.ico, PNG icons, Apple/Android icons, manifest
npm run generate:assets   # media/brand/og-card.jpg
npm run generate:brand    # favicon set + OG card
npm run generate:resume   # public/documents/David-Oke-Resume-2026.pdf
```

The résumé generator uses Playwright's Chromium. If it is installed in a
non-standard location, set `PLAYWRIGHT_CHROMIUM_PATH`.

## Deployment

The repository deploys to Netlify with `netlify.toml`; the full walkthrough is
in [DEPLOYMENT.md](DEPLOYMENT.md).

- Build command: `npm run build`
- Publish directory: `out`
- Node version: 20
- Functions directory: `netlify/functions` (esbuild bundler)
- Redirect: `/api/contact` → `/.netlify/functions/contact`

Netlify's Git integration builds every push to `main`. No GitHub deploy workflow
is required.

### Contact delivery

The contact form posts JSON to `/api/contact`, which Netlify routes to
`netlify/functions/contact.js`. Configure these environment variables in the
Netlify UI (Site configuration → Environment variables). They are server-side
only and must never be committed or exposed with a `NEXT_PUBLIC_` prefix.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | API key from [resend.com](https://resend.com) |
| `CONTACT_TO_EMAIL` | Recommended | Inbox for enquiries; defaults to `me@mriridescent.africa` |
| `CONTACT_FROM_EMAIL` | Recommended | Verified sender on your Resend domain |
| `CONTACT_AUTO_REPLY` | No | Set to `false` to disable the visitor acknowledgement |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | No | Fallback delivery when Resend is not configured |

Every enquiry is delivered to `me@mriridescent.africa`, with the visitor set as
`Reply-To`; a visitor acknowledgement follows by default. If no provider is
configured the function returns a friendly 503, and the form shows a direct
`me@mriridescent.africa` link plus the WhatsApp fallback. Run `npm run email:test`
to verify Resend and the sender domain.

The share kit uses the Web Share API where available and X, LinkedIn, WhatsApp,
Telegram, and Facebook intent URLs everywhere else. Shared links include
`?via=<intent>` plus UTM parameters, so the landing page can show a relevant
referral banner.

## Quality checks

```bash
npm run type-check   # TypeScript
npm run lint         # ESLint
npm run analyze      # Bundle analysis (ANALYZE=true build)
```

The site ships with canonical URLs, Open Graph and Twitter metadata, JSON-LD,
a sitemap, robots rules, security headers, a custom 404, and reduced-motion
support.

## Contact

- **WhatsApp:** [+234 904 125 8180](https://wa.me/2349041258180)
- **Contact form:** [mriridescent.africa/contact](https://mriridescent.africa/contact)
- **GitHub:** [github.com/MrIridescent](https://github.com/MrIridescent)
- **LinkedIn:** [linkedin.com/in/mriridescent](https://www.linkedin.com/in/mriridescent)
- **Site:** [mriridescent.africa](https://mriridescent.africa)
