import { seoConfig } from '@/lib/seo-config'
import { site, socials } from '@/lib/profile'

interface StructuredDataProps {
  type?: 'person' | 'organization' | 'website' | 'article' | 'service'
  data?: Record<string, unknown>
}

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}

export function StructuredData({ type = 'person', data }: StructuredDataProps) {
  let structuredData: Record<string, unknown> = seoConfig.structuredData

  switch (type) {
    case 'person':
      structuredData = seoConfig.structuredData
      break

    case 'organization':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${site.url}/#organization`,
        name: seoConfig.business.name,
        founder: {
          '@type': 'Person',
          '@id': `${site.url}/#person`,
          name: seoConfig.business.founder,
        },
        foundingDate: seoConfig.business.established,
        url: site.url,
        email: site.email,
        description:
          'A growth, reputation, creative, software, and digital product delivery studio founded by David Akpoviroro Oke.',
        contactPoint: {
          '@type': 'ContactPoint',
          email: site.email,
          telephone: site.phone,
          contactType: 'business enquiries',
          availableLanguage: ['English', 'French', 'Yoruba'],
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lagos',
          addressRegion: 'Lagos State',
          addressCountry: 'NG',
        },
        areaServed: {
          '@type': 'Place',
          name: 'Lagos, Nigeria · remote worldwide',
        },
        sameAs: socials.filter((item) => item.href).map((item) => item.href),
        knowsAbout: seoConfig.business.services,
      }
      break

    case 'website':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        name: `${site.name} — ${site.alias}, ${site.persona}`,
        url: site.url,
        description: site.description,
        inLanguage: 'en',
        publisher: {
          '@type': 'Person',
          '@id': `${site.url}/#person`,
          name: site.name,
        },
      }
      break

    case 'service':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Growth hacking, public relations, reputation management, content, and digital product delivery',
        description:
          'Growth hacking and market entry, public relations and reputation management, content and creative direction, digital product delivery architecture, custom software development, workflow automation, security engineering, and brand systems.',
        provider: {
          '@type': 'Person',
          '@id': `${site.url}/#person`,
          name: site.name,
          url: site.url,
        },
        areaServed: {
          '@type': 'Place',
          name: 'Lagos, Nigeria · remote worldwide',
        },
        serviceType: seoConfig.business.services,
      }
      break

    case 'article':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data?.title || 'Notes from the work',
        description: data?.description || site.description,
        author: {
          '@type': 'Person',
          '@id': `${site.url}/#person`,
          name: site.name,
          url: site.url,
        },
        publisher: {
          '@type': 'Person',
          name: site.name,
          url: site.url,
        },
        datePublished: data?.publishDate,
        dateModified: data?.modifiedDate || data?.publishDate,
        mainEntityOfPage: data?.url || site.url,
        image: data?.image || `${site.url}/media/brand/og-card.jpg`,
      }
      break
  }

  return <JsonLd data={structuredData} />
}

export function PersonStructuredData() {
  return <StructuredData type="person" />
}

export function OrganizationStructuredData() {
  return <StructuredData type="organization" />
}

export function WebsiteStructuredData() {
  return <StructuredData type="website" />
}

export function ServiceStructuredData() {
  return <StructuredData type="service" />
}

export function FAQStructuredData() {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Who is David Akpoviroro Oke?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'David Akpoviroro Oke, also known as Mr Iridescent, is a Lagos-based growth hacker and growth partner, public-relations and reputation strategist, and digital product delivery architect. He works across growth, reputation, content and film, full-stack product development, applied AI, cybersecurity, and civic infrastructure.',
        },
      },
      {
        '@type': 'Question',
        name: 'What services does David Akpoviroro Oke offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Growth hacking and market entry, public relations and reputation management, content and creative direction, digital product delivery architecture, custom software development, workflow automation and AI enablement, security and DevSecOps, and brand systems and art direction.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does David Akpoviroro Oke work on?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'He builds full-stack web and fintech products, AI and agentic systems, workflow automation, security tooling and DevSecOps automation, and civic technology such as ROADvision Lagos and FEPAR.africa.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which languages does David Akpoviroro Oke speak?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'English at professional working proficiency, conversational French and Yoruba, and basic Hausa, Urhobo, and Okpe.',
        },
      },
      {
        '@type': 'Question',
        name: 'What training and credentials does David Akpoviroro Oke hold?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Six verified Cisco Networking Academy records — five credentials (CyberOps Associate, Ethical Hacking, Network Defense, Cyber Threat Management, Endpoint Security) and the CSS Essentials course badge — plus CompTIA A+ and Network+ training at New Horizons, Afrihub programmes, AWS Educate, and ongoing BSc Computer Science study at University of the People.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is David still at Zandbox or Helpman?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The Zandbox engineering engagement has concluded, and the Helpman growth-partner contract has ended. He now works as a Digital Product Delivery Architect through Iridescent Internet Solutions and chairs the Board of Trustees of FEPAR.africa.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is David available for remote work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. He is based in Lagos, Nigeria and works remotely with teams worldwide. He is open to growth partnerships, reputation mandates, and selected product builds.',
        },
      },
      {
        '@type': 'Question',
        name: 'How can I contact David Akpoviroro Oke?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Email ${site.email}, message him on WhatsApp at ${site.phone}, or use the contact form at mriridescent.africa/contact.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Where can I see David Akpoviroro Oke’s code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'His public repositories are on GitHub at github.com/MrIridescent, and selected project write-ups are on this site under Projects and Case studies.',
        },
      },
    ],
  }

  return <JsonLd data={faqData} />
}
