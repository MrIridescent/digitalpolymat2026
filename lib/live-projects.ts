/**
 * Live sites shipped by Mr Iridescent. These are separate from the open-source
 * archive in `projects.ts`: every entry below is a public, working front end that
 * can be visited and judged in the browser.
 *
 * Screenshots live in `public/media/live-sites/` and are regenerated with
 * `node scripts/capture-live-sites.mjs` when a site changes.
 */

export type LiveProjectKind = 'Client site' | 'Campaign site' | 'Portfolio' | 'Concept'

export type LiveProject = {
  slug: string
  name: string
  domain: string
  url: string
  kind: LiveProjectKind
  summary: string
  tags: readonly string[]
  accent: string
  image: string
}

export const liveProjects: readonly LiveProject[] = [
  {
    slug: 'mriridescent-github',
    name: 'Mr Iridescent — Web Portfolio',
    domain: 'mriridescent.github.io',
    url: 'https://mriridescent.github.io/',
    kind: 'Portfolio',
    summary:
      'The first public portfolio: graphics, interface design, web development and security in one place, built before the current site existed.',
    tags: ['Frontend', 'Portfolio', 'Responsive'],
    accent: 'from-orange-500 to-amber-300',
    image: '/media/live-sites/mriridescent-github.jpg',
  },
  {
    slug: 'olmash-consulting',
    name: 'Olmash Consulting',
    domain: 'olmashconsulting.com',
    url: 'https://olmashconsulting.com/',
    kind: 'Client site',
    summary:
      'A conversion-led HR consulting site for a Memphis firm, built around fractional HR, talent acquisition and a clear consultation path.',
    tags: ['Client site', 'Frontend', 'Conversion'],
    accent: 'from-amber-400 to-yellow-200',
    image: '/media/live-sites/olmash-consulting.jpg',
  },
  {
    slug: 'sf-dynamics',
    name: 'Stephen Feco Dynamics',
    domain: 'sfdynamics.com.ng',
    url: 'https://sfdynamics.com.ng/',
    kind: 'Client site',
    summary:
      'An engineering, construction-materials and consulting group site for a Nigerian firm, carrying one corporate identity from hero to enquiry.',
    tags: ['Client site', 'Corporate', 'Nigeria'],
    accent: 'from-rose-500 to-orange-400',
    image: '/media/live-sites/sf-dynamics.jpg',
  },
  {
    slug: 'ola-western',
    name: 'Ola Western',
    domain: 'olawestern.ng',
    url: 'https://olawestern.ng/',
    kind: 'Campaign site',
    summary:
      'A public-record and campaign site for a Lagos State House of Assembly candidate, with a WhatsApp-first contact flow and a mobile-first record of delivered work.',
    tags: ['Campaign', 'Civic', 'Mobile-first'],
    accent: 'from-orange-500 to-sky-400',
    image: '/media/live-sites/ola-western.jpg',
  },
  {
    slug: 'digital-polymath',
    name: 'Digital Polymath',
    domain: 'mriridescent-digitalpolymat.netlify.app',
    url: 'https://mriridescent-digitalpolymat.netlify.app/',
    kind: 'Concept',
    summary:
      'A dark, spectral portfolio concept: layered light, a live quotation panel and a personal record staged like a performance.',
    tags: ['Concept', 'Dark UI', 'Motion'],
    accent: 'from-violet-500 to-cyan-400',
    image: '/media/live-sites/digital-polymath.jpg',
  },
  {
    slug: 'polymathic-coder',
    name: 'Polymathic Coder — Nocturne',
    domain: 'mriridescent-polymatic-coder.netlify.app',
    url: 'https://mriridescent-polymatic-coder.netlify.app/',
    kind: 'Concept',
    summary:
      'The nocturnal edition of the Polymathic Coder concept: the same identity system, recomposed with a quieter, wider reading rhythm.',
    tags: ['Concept', 'Editorial', 'Dark UI'],
    accent: 'from-fuchsia-500 to-violet-400',
    image: '/media/live-sites/polymathic-coder.jpg',
  },
  {
    slug: 'polymathic-coder-studio',
    name: 'Polymathic Coder — Daylight',
    domain: 'harmonious-daffodil-5d988a.netlify.app',
    url: 'https://harmonious-daffodil-5d988a.netlify.app/',
    kind: 'Concept',
    summary:
      'A daylight edition built on illustrated geometry, soft gradients and generous space — the same story told without the dark stage.',
    tags: ['Concept', 'Light UI', 'Illustration'],
    accent: 'from-sky-400 to-emerald-300',
    image: '/media/live-sites/polymathic-coder-studio.jpg',
  },
  {
    slug: 'polymathic-coder-atelier',
    name: 'Polymathic Coder — Atelier',
    domain: 'cool-frangollo-9c22b5.netlify.app',
    url: 'https://cool-frangollo-9c22b5.netlify.app/',
    kind: 'Concept',
    summary:
      'The refined daylight edition: portrait-led hero, tighter pacing and a calmer hierarchy for the same multidisciplinary argument.',
    tags: ['Concept', 'Art direction', 'Editorial'],
    accent: 'from-cyan-400 to-violet-400',
    image: '/media/live-sites/polymathic-coder-atelier.jpg',
  },
]

export const liveProjectCount = liveProjects.length
