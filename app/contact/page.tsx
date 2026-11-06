import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import { ContactForm } from '@/components/site/ContactForm'
import { OrgLogo } from '@/components/site/OrgLogo'
import { BreadcrumbStructuredData, ContactPageStructuredData } from '@/components/StructuredData'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'
import { site, socials, whatsappLink } from '@/lib/profile'

export const metadata: Metadata = generateMetaTags(
  pageMetadata.contact.title,
  pageMetadata.contact.description,
  ['contact David Akpoviroro Oke', 'growth partner Lagos', 'public relations Nigeria', 'hire digital product delivery architect', 'custom software Lagos', 'workflow automation consultant'],
  '/contact'
)

export default function ContactPage() {
  return (
    <div className="pt-16">
      <ContactPageStructuredData />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      />
      <section className="aurora grain border-b border-white/10 pb-12 pt-20 sm:pt-24">
        <div className="shell">
          <p className="eyebrow">Contact · open inbox</p>
          <h1 className="display mt-6 max-w-4xl text-5xl text-white sm:text-6xl lg:text-7xl">
            Tell me what you are{' '}
            <span className="iridescent-text italic">trying to build.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/55">
            A useful first message says what the problem is, who it affects, and
            what a good outcome looks like. I read everything myself.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <a href={site.emailHref} className="btn btn-ghost">
              <Mail className="h-4 w-4" />
              Email me
            </a>
            <Link href="/services" className="btn btn-ghost">
              See what I do
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Form */}
          <div>
            <ContactForm />
          </div>

          {/* Details */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-ink-soft p-6">
              <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/35">
                Direct
              </h2>
              <div className="mt-6 space-y-5">
                <a href={site.emailHref} className="group flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#c9f24b]/25 bg-[#c9f24b]/10 text-[#c9f24b]">
                    <Mail className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-white group-hover:text-[#67e8f9]">
                      Email
                    </span>
                    <span className="mt-0.5 block break-all text-sm text-white/50">
                      {site.email}
                    </span>
                  </span>
                </a>

                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
                    <MessageCircle className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-white group-hover:text-[#67e8f9]">
                      WhatsApp
                    </span>
                    <span className="mt-0.5 block text-sm text-white/50">
                      {site.whatsapp.display} · fastest reply
                    </span>
                  </span>
                </a>

                <a href={`tel:${site.phoneE164}`} className="group flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-white group-hover:text-[#67e8f9]">
                      Phone
                    </span>
                    <span className="mt-0.5 block text-sm text-white/50">
                      {site.phone}
                    </span>
                  </span>
                </a>

                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-white">
                      Location
                    </span>
                    <span className="mt-0.5 block text-sm text-white/50">
                      {site.location} · remote worldwide
                    </span>
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60">
                    <Clock className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-white">
                      Response time
                    </span>
                    <span className="mt-0.5 block text-sm text-white/50">
                      Within two business days
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-ink-soft p-6">
              <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/35">
                Elsewhere
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {socials.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-xs text-white/55 transition-colors hover:border-white/25 hover:text-white"
                  >
                    <span className="inline-flex min-w-0 items-center gap-2">
                      <OrgLogo name={social.label} size={18} />
                      {social.label}
                    </span>
                    <ArrowUpRight className="h-3 w-3 shrink-0 opacity-40 transition-opacity group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                <div>
                  <h2 className="text-sm font-medium text-white">
                    Security disclosures
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    If you are reporting a vulnerability, use the form and
                    describe the affected surface. Do not send exploit details or
                    credentials through this form.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-ink-soft p-6">
              <p className="text-sm leading-relaxed text-white/50">
                Prefer to see the work first? The{' '}
                <a
                  href="/projects"
                  className="text-white/80 underline decoration-white/20 underline-offset-4 hover:decoration-white"
                >
                  project archive
                </a>{' '}
                and{' '}
                <a
                  href="/case-studies"
                  className="text-white/80 underline decoration-white/20 underline-offset-4 hover:decoration-white"
                >
                  case studies
                </a>{' '}
                are the fastest way to judge fit.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
