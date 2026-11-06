import type { Metadata } from 'next'
import {
  site,
  currentRoles,
  education,
  training,
  languages,
  services,
} from './profile'

const socialMap = {
  linkedin: 'https://www.linkedin.com/in/mriridescent',
  github: 'https://github.com/MrIridescent',
  x: 'https://x.com/mriridescent_',
  orcid: 'https://orcid.org/0000-0002-6340-2782',
  medium: 'https://medium.com/@iammriridescent',
  instagram: 'https://instagram.com/mriridescent',
  facebook: 'https://facebook.com/iammriridescent',
  linktree: 'https://linktr.ee/mriridescent_',
  threads: 'https://www.threads.com/@mriridescent',
}

/** Bump this when the durable page copy changes; sitemap and AI files use it. */
export const CONTENT_UPDATED = '2026-11-06'

/** A meta description short enough for search results. */
export const seoDescription =
  'David Akpoviroro Oke (Mr Iridescent) — Lagos-based growth hacker, PR and reputation strategist, and digital product delivery architect.'

/** Absolute origin, with any trailing slash removed. */
export function siteOrigin() {
  return site.url.replace(/\/+$/, '')
}

export const seoConfig = {
  name: site.name,
  title: `${site.name} — Growth Hacker & Product Architect`,
  description: seoDescription,
  url: siteOrigin(),
  image: '/media/brand/og-card.jpg',

  social: socialMap,

  business: {
    name: 'Iridescent Internet Solutions Limited',
    founder: site.name,
    established: '2017',
    location: 'Lagos, Nigeria',
    serviceArea: 'Lagos, Nigeria · remote worldwide',
    address: {
      locality: 'Lagos',
      region: 'Lagos State',
      country: 'Nigeria',
      countryCode: 'NG',
    },
    services: services.map((service) => service.name),
  },

  keywords: [
    'David Akpoviroro Oke',
    'Mr Iridescent',
    'Creative Renaissance Man',
    'growth hacker',
    'growth hacker Lagos',
    'growth partner for brands',
    'growth partner for founders',
    'market entry strategist Nigeria',
    'market entry Africa',
    'public relations strategist Lagos',
    'tech PR Lagos',
    'reputation management Africa',
    'online reputation management Nigeria',
    'crisis communications Nigeria',
    'creative director Lagos',
    'video editor Nigeria',
    'content strategist Africa',
    'brand narrative strategist',
    'digital product delivery architect',
    'digital product architect Africa',
    'fractional CTO Lagos',
    'software engineer Lagos',
    'full stack developer Nigeria',
    'Next.js developer Africa',
    'TypeScript developer',
    'Python developer',
    'Rust developer',
    'AI engineer Nigeria',
    'agentic AI consultant',
    'cybersecurity engineer',
    'purple team security',
    'DevSecOps consultant Africa',
    'cyber-physical systems',
    'OT ICS security',
    'workflow automation Nigeria',
    'custom software development Lagos',
    'remote software engineer',
    'remote growth partner',
    'tech hubs',
    'Lagos tech ecosystem',
    'African tech talent',
    'Iridescent Internet Solutions',
    'civic technology Nigeria',
    'ROADvision Lagos',
    'FEPAR.africa',
    'Festac PanAfrican Renaissance',
    'green software',
    'SDG 13 climate action',
    'African Union Agenda 2063',
    'growth hacker London',
    'growth partner Berlin',
    'growth partner Nairobi',
    'product architect Dubai',
    'startup growth partner Singapore',
  ],

  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site.url}/#person`,
    name: site.name,
    alternateName: [site.alias, 'Mr Iridescent', site.persona],
    description: site.description,
    url: site.url,
    image: `${site.url}${seoImagePath()}`,
    jobTitle: [
      'Growth Hacker',
      'Growth Partner',
      'Public Relations & Reputation Strategist',
      'Digital Product Delivery Architect',
      'Software & Systems Architect',
      'Polymath Coder',
      'Creative Director',
      'Founder',
    ],
    email: site.email,
    telephone: site.phone,
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'ORCID',
      value: '0000-0002-6340-2782',
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Growth hacker, PR and reputation strategist, digital product delivery architect',
      occupationLocation: {
        '@type': 'City',
        name: 'Lagos, Nigeria',
      },
      skills:
        'Growth strategy, market entry, public relations, reputation management, crisis communications, product architecture, full-stack engineering, applied AI, cybersecurity, creative direction',
    },
    homeLocation: {
      '@type': 'Place',
      name: 'Lagos, Nigeria',
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 6.5244,
        longitude: 3.3792,
      },
    },
    worksFor: currentRoles.map((role) => ({
      '@type': 'Organization',
      name: role.org,
      description: role.note,
    })),
    alumniOf: education.map((item) => ({
      '@type': 'EducationalOrganization',
      name: item.school,
      description: `${item.credential} (${item.period})`,
    })),
    hasCredential: training.map((item) => ({
      '@type': 'EducationalOccupationalCredential',
      name: item.name,
      credentialCategory:
        item.kind === 'Certification'
          ? 'Professional certification'
          : item.kind === 'Diploma'
            ? 'Diploma'
            : item.kind === 'Professional training'
              ? 'Professional training'
              : item.kind === 'Programme'
                ? 'Programme'
                : 'Course badge',
      dateCreated: item.year,
      recognizedBy: {
        '@type': 'Organization',
        name: item.issuer,
      },
    })),
    knowsAbout: [
      'Digital product delivery architecture',
      'Product strategy',
      'Solution architecture',
      'Full-stack development',
      'TypeScript',
      'React',
      'Next.js',
      'Node.js',
      'Python',
      'Rust',
      'Java',
      'Artificial intelligence',
      'Agentic AI',
      'Machine learning',
      'Neural networks',
      'Quantum computing',
      'Neuromorphic computing',
      'Beyond von Neumann architecture',
      'Unconventional computing',
      'Cyber-physical systems',
      'Cybernetics',
      'Brain-computer interfaces',
      'OT and ICS security',
      'Workflow automation',
      'Cybersecurity',
      'Threat detection',
      'DevSecOps',
      'Computer vision',
      'Civic technology',
      'Geospatial analysis',
      'Urban and regional planning',
      'Growth strategy',
      'Growth hacking',
      'Market entry',
      'Public relations',
      'Reputation management',
      'Crisis communications',
      'Narrative strategy',
      'Brand systems',
      'Creative direction',
      'Film direction',
      'Video editing',
      'Copywriting',
      'Content strategy',
      'Art direction',
      'Curatorial practice',
      'Green software',
      'Sustainable development',
      'African Union Agenda 2063',
      'UI/UX design',
      'Systems thinking',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lagos',
      addressRegion: 'Lagos State',
      addressCountry: 'NG',
    },
    nationality: {
      '@type': 'Country',
      name: 'Nigeria',
    },
    knowsLanguage: languages.map((language) => language.name),
    sameAs: Object.values(socialMap).filter((value) => value.startsWith('http')),
    mainEntityOfPage: {
      '@type': 'ProfilePage',
      '@id': `${site.url}/about#profile`,
      url: `${site.url}/about`,
    },
  },
}

function seoImagePath() {
  return '/media/brand/og-card.jpg'
}

export function generateMetaTags(
  pageTitle?: string,
  pageDescription?: string,
  pageKeywords?: string[],
  path = '/'
): Metadata {
  const title = pageTitle
    ? `${pageTitle} — ${site.name}`
    : seoConfig.title
  const description = pageDescription || seoDescription
  const keywords = pageKeywords
    ? [...pageKeywords, ...seoConfig.keywords]
    : seoConfig.keywords
  const ogImage = `${siteOrigin()}/media/brand/og-card.jpg`
  const canonicalUrl = new URL(path, `${siteOrigin()}/`).toString()
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim()
  const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim()

  return {
    title,
    description,
    keywords: keywords.join(', '),
    metadataBase: new URL(siteOrigin()),
    authors: [{ name: site.name, url: siteOrigin() }],
    creator: site.name,
    publisher: site.name,
    category: 'technology',
    alternates: {
      canonical: path,
      types: {
        'application/rss+xml': '/feed.xml',
      },
    },
    verification: {
      ...(googleVerification ? { google: googleVerification } : {}),
      ...(bingVerification ? { other: { 'msvalidate.01': bingVerification } } : {}),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: `${site.name} — ${site.alias}, ${site.persona}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${site.name}, ${site.alias} — ${site.persona}`,
        },
      ],
      locale: 'en_NG',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: ogImage,
          alt: `${site.name}, ${site.alias} — ${site.persona}`,
        },
      ],
      creator: '@mriridescent_',
      site: '@mriridescent_',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    manifest: '/site.webmanifest',
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    other: {
      'theme-color': '#08090c',
      'color-scheme': 'dark',
      'format-detection': 'telephone=no',
      'geo.region': 'NG-LA',
      'geo.placename': 'Lagos, Nigeria',
      'geo.position': '6.5244;3.3792',
      ICBM: '6.5244, 3.3792',
    },
  }
}

export const pageMetadata = {
  about: {
    title: 'About',
    description:
      'The story behind Mr Iridescent — a growth hacker, growth partner, and product architect with an engineer’s mind and a director’s eye.',
  },
  growth: {
    title: 'Growth hacking, PR & reputation',
    description:
      'Growth hacking, market entry, PR, and reputation management — helping individuals, brands, and companies enter new networks and become impossible to misread.',
  },
  services: {
    title: 'Services',
    description:
      'Growth hacking, PR and reputation, content, digital product delivery, custom software, automation, security engineering, and brand systems.',
  },
  fractionalCto: {
    title: 'Fractional CTO & systems partner',
    description:
      'Fractional CTO and systems partnership for founders, SMEs, and public institutions: architecture audits, 30-60-90 roadmaps, and build-versus-buy calls.',
  },
  credentials: {
    title: 'Credentials & verified badges',
    description:
      'Six verified Cisco badges, training beyond Cisco, four institutions of study, and six honestly levelled languages — check every claim at the source.',
  },
  credentialsCisco: {
    title: 'Verified Cisco badges',
    description:
      'All six verified Cisco Networking Academy records: CyberOps, Ethical Hacking, Network Defense, Cyber Threat Management, Endpoint Security, and CSS Essentials.',
  },
  credentialsTraining: {
    title: 'Other professional training',
    description:
      'CompTIA A+ and Network+ at New Horizons, Afrihub diplomas in web development, Python, design and CyberOps, AWS Educate, and early N.I.I.T training.',
  },
  credentialsEducation: {
    title: 'Schooling & languages',
    description:
      'Yabatech urban planning, Les Cours Sonou business and HR, University of the People computer science, and the six languages he works in.',
  },
  manifesto: {
    title: 'Renaissance manifesto',
    description:
      'The systems-architecture manifesto and Letter of Capability of David Akpoviroro Oke — digital polymath and Creative Renaissance Man.',
  },
  advocacy: {
    title: 'Green software & Agenda 2063',
    description:
      'Green Software, the UN Sustainable Development Goals — especially SDG 13 climate action — and the African Union’s Agenda 2063.',
  },
  media: {
    title: 'Media library & service cards',
    description:
      'Download branded service cards and brand files, plus the portraits, documents, and media used across the site.',
  },
  projects: {
    title: 'Projects',
    description:
      'Selected open-source and client work by David Akpoviroro Oke — security platforms, AI systems, civic tech, and product engineering.',
  },
  caseStudies: {
    title: 'Case studies',
    description:
      'A closer look at real engineering: DevSecOps automation, multi-agent threat detection, and AI infrastructure for Nigerian roads.',
  },
  resume: {
    title: 'Résumé',
    description:
      'Experience, education, credentials, and technical capabilities of David Akpoviroro Oke.',
  },
  contact: {
    title: 'Contact',
    description:
      'Start a conversation about growth, PR and reputation, content and film, software, AI, security, or consulting. Email me@mriridescent.africa.',
  },
  global: {
    title: 'Global practice & tech hubs',
    description:
      'A remote-first Lagos practice working across 100+ tech hubs in six regions — collaboration corridors, overlap windows, and no implied offices.',
  },
  faq: {
    title: 'Questions & answers',
    description:
      'Direct answers about David Akpoviroro Oke: who he is, what he does, where he works, languages, credentials, availability, and how to start a conversation.',
  },
  statistics: {
    title: 'Practice at a glance',
    description:
      'Verified metrics and a working map of David Akpoviroro Oke’s engineering practice.',
  },
  writings: {
    title: 'Writing',
    description:
      'Notes on software, systems thinking, AI, security, and the polymathic life.',
  },
  blog: {
    title: 'Journal',
    description:
      'Field notes on software, systems thinking, security, AI, and the practice of building in public — written while doing the work.',
  },
  philosophy: {
    title: 'Philosophy',
    description:
      'The principles behind the work: clarity before code, security by default, systems over silos, and craft over volume.',
  },
  emergingTech: {
    title: 'Emerging technology',
    description:
      'The technologies behind the work: agentic AI, security engineering, computer vision for civic infrastructure, developer tools, and cultural platforms.',
  },
  quotes: {
    title: 'Quotes',
    description:
      'A collection of ideas that shape the work and the way it is made — on craft, systems, growth, security, and the polymathic life.',
  },
  share: {
    title: 'Share kit & service cards',
    description:
      'Download a service card for any offer, or use intent-based templates to recommend David Akpoviroro Oke — hiring, referrals, partnerships, speaking, and press.',
  },
  qrAtelier: {
    title: 'QR atelier — every door, its own code',
    description:
      'Twenty destinations, six art-directed QR editions. Download branded posters as PNGs or vector SVGs for print, each with campaign tracking.',
  },
}
