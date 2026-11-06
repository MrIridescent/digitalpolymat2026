import { site } from './profile'

export type ShareChannel = 'x' | 'linkedin' | 'whatsapp' | 'telegram' | 'facebook'

export type ShareIntent = {
  slug: string
  label: string
  eyebrow: string
  audience: string
  template: string
  ctaLabel: string
  ctaHref: string
}

/**
 * Intent-based share templates. The intent travels in the URL (`?via=`) so the
 * landing page can acknowledge why the visitor was sent here instead of showing
 * the same generic pitch to everyone.
 */
export const shareIntents: readonly ShareIntent[] = [
  {
    slug: 'hiring',
    label: 'I am hiring',
    eyebrow: 'For a role',
    audience: 'Founders, hiring managers, and engineering leaders',
    template:
      'I am hiring for a product or engineering role, and David Akpoviroro Oke is worth a serious look. He is a Digital Product Delivery Architect in Lagos working across full-stack product, applied AI, security, and delivery leadership. His record is here:',
    ctaLabel: 'Review the résumé and credentials',
    ctaHref: '/resume',
  },
  {
    slug: 'build-partner',
    label: 'I need a build partner',
    eyebrow: 'For a build',
    audience: 'Founders and teams with a product to ship',
    template:
      'If you need a senior partner to take a product from ambition to production, look at David Akpoviroro Oke. He works on delivery architecture, custom software, workflow automation, and security — and he builds, not just advises. The services and case studies are here:',
    ctaLabel: 'See the services and case studies',
    ctaHref: '/services',
  },
  {
    slug: 'referral',
    label: 'Passing this on',
    eyebrow: 'A referral',
    audience: 'Anyone who knows someone with a hard product problem',
    template:
      'Passing this on because it may be useful to someone you know. David Akpoviroro Oke is a Digital Product Delivery Architect and systems engineer in Lagos. The public work, case studies, and credentials are easy to inspect:',
    ctaLabel: 'Browse the public work',
    ctaHref: '/projects',
  },
  {
    slug: 'collaboration',
    label: 'Let’s collaborate',
    eyebrow: 'A collaboration',
    audience: 'Builders, researchers, and cultural organisations',
    template:
      'I think David Akpoviroro Oke would be a strong collaborator. His practice joins product engineering, applied AI, security, civic infrastructure, and cultural work — and he is public about what is built versus what is still designed. Start here:',
    ctaLabel: 'Read the practice and manifesto',
    ctaHref: '/about',
  },
  {
    slug: 'speaking',
    label: 'Speaking or press',
    eyebrow: 'For an event or story',
    audience: 'Programme curators, editors, and podcast hosts',
    template:
      'For a conversation on systems architecture, applied AI, security, green software, or the polymathic life, David Akpoviroro Oke is a strong voice. His bio, positions, and press assets are here:',
    ctaLabel: 'Open the press and media kit',
    ctaHref: '/media',
  },
  {
    slug: 'general',
    label: 'Worth a look',
    eyebrow: 'A general recommendation',
    audience: 'Anyone curious about the work',
    template:
      'Worth a look: David Akpoviroro Oke — Mr Iridescent, the Creative Renaissance Man. A Lagos-based Digital Product Delivery Architect building across software, AI, security, climate, and civic infrastructure.',
    ctaLabel: 'Explore the portfolio',
    ctaHref: '/',
  },
] as const

export const shareChannels: readonly {
  slug: ShareChannel
  label: string
  className: string
}[] = [
  { slug: 'x', label: 'X', className: 'hover:border-white/40 hover:text-white' },
  {
    slug: 'linkedin',
    label: 'LinkedIn',
    className: 'hover:border-[#67e8f9]/40 hover:text-[#c4f7ff]',
  },
  {
    slug: 'whatsapp',
    label: 'WhatsApp',
    className: 'hover:border-emerald-400/40 hover:text-emerald-200',
  },
  {
    slug: 'telegram',
    label: 'Telegram',
    className: 'hover:border-sky-400/40 hover:text-sky-200',
  },
  {
    slug: 'facebook',
    label: 'Facebook',
    className: 'hover:border-blue-400/40 hover:text-blue-200',
  },
] as const

export function shareIntent(slug: string | null | undefined) {
  return shareIntents.find((intent) => intent.slug === slug) ?? null
}

export function trackedShareUrl(intentSlug: string, channel: string) {
  const url = new URL(site.url)
  url.searchParams.set('via', intentSlug)
  url.searchParams.set('utm_source', channel)
  url.searchParams.set('utm_medium', 'social')
  url.searchParams.set('utm_campaign', `share-${intentSlug}`)
  return url.toString()
}

export function channelShareUrl(
  channel: ShareChannel,
  url: string,
  text: string
) {
  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(text)

  switch (channel) {
    case 'x':
      return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    case 'whatsapp':
      return `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`
    case 'telegram':
      return `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  }
}
