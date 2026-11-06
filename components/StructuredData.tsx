import { seoConfig, CONTENT_UPDATED, siteOrigin, pageMetadata } from '@/lib/seo-config'
import { site, socials, services, brandMark } from '@/lib/profile'
import { projects } from '@/lib/projects'
import { allHubs } from '@/lib/global'
import { faqs, type FaqItem } from '@/lib/faq'

interface StructuredDataProps {
  type?: 'person' | 'organization' | 'website' | 'article' | 'service'
  data?: Record<string, unknown>
}

const origin = siteOrigin()

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

function cityList() {
  return allHubs.map((hub) => ({
    '@type': 'City',
    name: `${hub.city}, ${hub.country}`,
  }))
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
        '@id': `${origin}/#organization`,
        name: seoConfig.business.name,
        legalName: seoConfig.business.name,
        founder: {
          '@type': 'Person',
          '@id': `${origin}/#person`,
          name: seoConfig.business.founder,
        },
        foundingDate: seoConfig.business.established,
        url: origin,
        logo: {
          '@type': 'ImageObject',
          url: `${origin}${brandMark.src}`,
          width: 768,
          height: 768,
        },
        image: `${origin}/media/brand/og-card.jpg`,
        email: site.email,
        telephone: site.phone,
        description:
          'A growth, reputation, creative, software, and digital product delivery studio founded by David Akpoviroro Oke in Lagos, Nigeria.',
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
          name: 'Worldwide, remote-first from Lagos, Nigeria',
        },
        sameAs: socials.filter((item) => item.href).map((item) => item.href),
        knowsAbout: seoConfig.business.services,
      }
      break

    case 'website':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        name: `${site.name} — ${site.alias}, ${site.persona}`,
        url: origin,
        description: site.description,
        inLanguage: 'en',
        publisher: {
          '@type': 'Organization',
          '@id': `${origin}/#organization`,
          name: seoConfig.business.name,
        },
        about: {
          '@type': 'Person',
          '@id': `${origin}/#person`,
          name: site.name,
        },
      }
      break

    case 'service':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${origin}/services#service`,
        name: 'Growth, reputation, creative, and digital product delivery',
        description:
          'Growth hacking and market entry, public relations and reputation management, content and creative direction, digital product delivery architecture, custom software development, workflow automation, security engineering, and brand systems.',
        provider: {
          '@type': 'Person',
          '@id': `${origin}/#person`,
          name: site.name,
          url: origin,
        },
        areaServed: cityList(),
        serviceType: seoConfig.business.services,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Services for individuals, brands, and companies',
          itemListElement: services.map((service, index) => ({
            '@type': 'Offer',
            position: index + 1,
            itemOffered: {
              '@type': 'Service',
              name: service.name,
              description: service.summary,
              serviceType: service.name,
              provider: {
                '@type': 'Person',
                '@id': `${origin}/#person`,
              },
            },
          })),
        },
      }
      break

    case 'article':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: data?.title || 'Notes from the work',
        description: data?.description || seoConfig.description,
        author: {
          '@type': 'Person',
          '@id': `${origin}/#person`,
          name: site.name,
          url: origin,
        },
        publisher: {
          '@type': 'Organization',
          '@id': `${origin}/#organization`,
          name: seoConfig.business.name,
          logo: {
            '@type': 'ImageObject',
            url: `${origin}/media/brand/mr-iridescent-mark.png`,
          },
        },
        datePublished: data?.publishDate,
        dateModified: data?.modifiedDate || data?.publishDate,
        mainEntityOfPage: data?.url || origin,
        image: data?.image || `${origin}/media/brand/og-card.jpg`,
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

export function FAQStructuredData({
  items = faqs,
  path = '/faq',
}: {
  items?: readonly FaqItem[]
  path?: string
}) {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${origin}${path}#questions`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return <JsonLd data={faqData} />
}

export function BreadcrumbStructuredData({
  items,
}: {
  items: ReadonlyArray<{ name: string; path: string }>
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${origin}${item.path === '/' ? '' : item.path}`,
    })),
  }

  return <JsonLd data={data} />
}

export function ProfilePageStructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${origin}/about#profile`,
    url: `${origin}/about`,
    name: `${site.name} — ${site.role}`,
    description: pageMetadata.about.description,
    dateModified: CONTENT_UPDATED,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      name: `${site.name} — ${site.alias}, ${site.persona}`,
      url: origin,
    },
    mainEntity: {
      '@type': 'Person',
      '@id': `${origin}/#person`,
      name: site.name,
      alternateName: site.alias,
      url: origin,
      image: `${origin}/media/brand/og-card.jpg`,
      jobTitle: site.roleLong,
      email: site.email,
    },
    about: {
      '@type': 'Person',
      '@id': `${origin}/#person`,
      name: site.name,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1'],
    },
  }

  return <JsonLd data={data} />
}

export function ProjectsStructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${origin}/projects#list`,
    name: 'Selected projects by David Akpoviroro Oke',
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareSourceCode',
        name: project.name,
        description: project.description,
        codeRepository: project.repo,
        programmingLanguage: project.language,
        author: {
          '@type': 'Person',
          '@id': `${origin}/#person`,
          name: site.name,
        },
        url: project.live || project.repo,
      },
    })),
  }

  return <JsonLd data={data} />
}

export function HubsStructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${origin}/global#hubs`,
    name: 'Tech hubs and collaboration corridors',
    description:
      'Cities where David Akpoviroro Oke collaborates remotely; these are not physical offices.',
    numberOfItems: allHubs.length,
    itemListElement: allHubs.map((hub, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'City',
        name: `${hub.city}, ${hub.country}`,
        containedInPlace: {
          '@type': 'Country',
          name: hub.country,
        },
      },
    })),
  }

  return <JsonLd data={data} />
}

export function ProfessionalServiceStructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${origin}/#professional-service`,
    name: seoConfig.business.name,
    alternateName: 'Mr Iridescent',
    description:
      'Growth hacking and market entry, public relations and reputation management, content and creative direction, digital product delivery architecture, software engineering, AI, and security — from Lagos, for clients worldwide.',
    url: origin,
    image: `${origin}/media/brand/og-card.jpg`,
    logo: `${origin}/media/brand/mr-iridescent-mark.png`,
    email: site.email,
    telephone: site.phone,
    founder: {
      '@type': 'Person',
      '@id': `${origin}/#person`,
      name: site.name,
    },
    foundingDate: seoConfig.business.established,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lagos',
      addressRegion: 'Lagos State',
      addressCountry: 'NG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 6.5244,
      longitude: 3.3792,
    },
    areaServed: cityList(),
    serviceType: seoConfig.business.services,
    knowsAbout: seoConfig.business.services,
    sameAs: socials.filter((item) => item.href).map((item) => item.href),
    parentOrganization: {
      '@type': 'Organization',
      '@id': `${origin}/#organization`,
    },
  }

  return <JsonLd data={data} />
}

export function ContactPageStructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${origin}/contact#page`,
    url: `${origin}/contact`,
    name: `Contact ${site.name}`,
    description: pageMetadata.contact.description,
    mainEntity: {
      '@type': 'Person',
      '@id': `${origin}/#person`,
      name: site.name,
      email: site.email,
      telephone: site.phone,
      url: origin,
    },
  }

  return <JsonLd data={data} />
}
