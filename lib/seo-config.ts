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
}

export const seoConfig = {
  name: site.name,
  title: `${site.name} — Growth Hacker, Digital Product Delivery Architect & Creative Renaissance Man`,
  description: site.description,
  url: site.url,
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
    'growth hacker Lagos',
    'growth partner for brands',
    'market entry strategist Nigeria',
    'public relations strategist Lagos',
    'reputation management Africa',
    'crisis communications Nigeria',
    'creative director Lagos',
    'video editor Nigeria',
    'content strategist Africa',
    'brand narrative strategist',
    'digital product delivery architect',
    'software engineer Lagos',
    'full stack developer Nigeria',
    'AI engineer',
    'cybersecurity engineer',
    'purple team security',
    'cyber-physical systems',
    'OT ICS security',
    'DevSecOps',
    'Next.js developer',
    'TypeScript developer',
    'Python developer',
    'Rust developer',
    'Java developer',
    'remote software engineer',
    'growth partner for brands',
    'workflow automation Nigeria',
    'custom software development Lagos',
    'Iridescent Internet Solutions',
    'civic technology Nigeria',
    'ROADvision Lagos',
    'FEPAR.africa',
    'Festac PanAfrican Renaissance',
    'green software',
    'SDG 13 climate action',
    'African Union Agenda 2063',
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
      '@id': site.url,
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
  const description = pageDescription || site.description
  const keywords = pageKeywords
    ? [...pageKeywords, ...seoConfig.keywords]
    : seoConfig.keywords
  const ogImage = `${site.url}/media/brand/og-card.jpg`
  const canonicalUrl = new URL(path, site.url).toString()

  return {
    title,
    description,
    keywords: keywords.join(', '),
    metadataBase: new URL(site.url),
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    category: 'technology',
    alternates: {
      canonical: path,
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
      images: [ogImage],
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
    },
  }
}

export const pageMetadata = {
  about: {
    title: 'About',
    description:
      'The story behind Mr Iridescent: a growth hacker and growth partner with an engineer’s mind and a director’s eye — code, campaigns, reputation, film, art, civic infrastructure, and a security-first approach.',
  },
  growth: {
    title: 'Growth hacking, PR & reputation',
    description:
      'Growth hacking and market entry, public relations and reputation management, and a content studio led by David Akpoviroro Oke — helping individuals, brands, and companies enter new networks and become impossible to misread.',
  },
  services: {
    title: 'Services',
    description:
      'Growth hacking and market entry, public relations and reputation management, content and creative direction, digital product delivery architecture, custom software, workflow automation, security engineering, and brand systems with David Akpoviroro Oke.',
  },
  fractionalCto: {
    title: 'Fractional CTO & systems partner',
    description:
      'Fractional CTO and strategic systems partnership for founders, SMEs, enterprises, and public institutions: architecture audits, 30-60-90 day roadmaps, build-versus-buy decisions, and targeted microservices.',
  },
  credentials: {
    title: 'Credentials & verified badges',
    description:
      'Six verified Cisco Networking Academy badges, professional training beyond Cisco, four institutions of study, and six honestly levelled languages — split into focused pages you can check at the source.',
  },
  credentialsCisco: {
    title: 'Verified Cisco badges',
    description:
      'All six verified Cisco Networking Academy records held by David Akpoviroro Oke — five credentials plus the CSS Essentials course badge: CyberOps, Ethical Hacking, Network Defense, Cyber Threat Management, Endpoint Security, and CSS Essentials.',
  },
  credentialsTraining: {
    title: 'Other professional training',
    description:
      'CompTIA A+ and Network+ at New Horizons, Afrihub GDLI diplomas in web development, Python, design and CyberOps, AWS Educate, and early desktop publishing at N.I.I.T — the training beyond Cisco.',
  },
  credentialsEducation: {
    title: 'Schooling & languages',
    description:
      'Yabatech urban and regional planning, Les Cours Sonou business and human resources, University of the People computer science, and the six languages David Akpoviroro Oke works in.',
  },
  manifesto: {
    title: 'Renaissance manifesto',
    description:
      'The systems-architecture manifesto and Letter of Capability of David Akpoviroro Oke — digital polymath, computational civic strategist, and Creative Renaissance Man.',
  },
  advocacy: {
    title: 'Green software & Agenda 2063',
    description:
      'David Akpoviroro Oke’s commitment to Green Software, the UN Sustainable Development Goals — especially SDG 13 climate action — and the African Union’s Agenda 2063.',
  },
  media: {
    title: 'Media library & branded service cards',
    description:
      'Download branded service cards and brand files, or find the portraits, documents, and media used across the site. Every service card carries mriridescent.africa, “Boundless Creativity Unleashed”, and WhatsApp contact details.',
  },
  projects: {
    title: 'Projects',
    description:
      'Selected open-source and client work by David Akpoviroro Oke — security platforms, AI systems, civic tech, and product engineering.',
  },
  caseStudies: {
    title: 'Case studies',
    description:
      'A closer look at real engineering work: DevSecOps automation, multi-agent threat detection, and AI infrastructure for Nigerian roads. Every repository is one David Akpoviroro Oke created.',
  },
  resume: {
    title: 'Résumé',
    description:
      'Experience, education, credentials, and technical capabilities of David Akpoviroro Oke.',
  },
  contact: {
    title: 'Contact',
    description:
      'Start a conversation with David Akpoviroro Oke about growth, public relations and reputation, content and film, software engineering, AI, security, or consulting. Email me@mriridescent.africa.',
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
      'The technologies David Akpoviroro Oke is building with: agentic AI, security engineering, computer vision for civic infrastructure, developer foundations, and cultural platforms.',
  },
  quotes: {
    title: 'Quotes',
    description:
      'A collection of ideas that shape the work and the way it is made.',
  },
  share: {
    title: 'Share kit & service cards',
    description:
      'Download a shareable service card for any offer, or use intent-based templates to recommend David Akpoviroro Oke — hiring, referrals, build partnerships, collaboration, speaking, and press.',
  },
  qrAtelier: {
    title: 'QR atelier — every door, its own code',
    description:
      'Twenty real destinations, six art-directed QR editions. Download branded QR posters as 1080 px PNGs or vector SVGs for print, each opening a specific page with campaign tracking.',
  },
}
