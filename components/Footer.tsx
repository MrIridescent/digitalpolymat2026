import Link from 'next/link'
import { ArrowUpRight, ArrowUp, Mail, MessageCircle, Share2 } from 'lucide-react'
import { OrgLogo } from '@/components/site/OrgLogo'
import { Marquee } from '@/components/kinetic/Marquee'
import { LocalClock } from '@/components/kinetic/LocalClock'
import { site, socials, whatsappLink } from '@/lib/profile'

const navigate = [
  { label: 'Work', href: '/projects' },
  { label: 'Growth & reputation', href: '/growth' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Credentials', href: '/credentials' },
  { label: 'Journal', href: '/blog' },
  { label: 'Résumé', href: '/resume' },
]

const more = [
  { label: 'Case studies', href: '/case-studies' },
  { label: 'Renaissance manifesto', href: '/manifesto' },
  { label: 'Green software & Agenda 2063', href: '/advocacy' },
  { label: 'Practice at a glance', href: '/statistics' },
  { label: 'Philosophy', href: '/philosophy' },
  { label: 'Emerging technology', href: '/emerging-tech' },
  { label: 'Quotes', href: '/quotes' },
  { label: 'Share kit', href: '/share' },
  { label: 'QR atelier', href: '/qr' },
  { label: 'Media library', href: '/media' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink">
      <Link
        href="/contact"
        className="group block border-b border-white/10 bg-[#c9f24b] py-3 text-[#0a0b0d]"
        aria-label="Start a project with David Akpoviroro Oke"
      >
        <Marquee speed="slow" direction="left" separator={<span className="opacity-50">✳</span>}>
          <span className="font-grotesk text-sm font-semibold uppercase tracking-[0.18em] group-hover:underline group-hover:underline-offset-4">
            Start a project
          </span>
          <span className="font-grotesk text-sm font-semibold uppercase tracking-[0.18em]">
            Growth hacking
          </span>
          <span className="font-grotesk text-sm font-semibold uppercase tracking-[0.18em]">
            PR & reputation
          </span>
          <span className="font-grotesk text-sm font-semibold uppercase tracking-[0.18em]">
            Creative direction
          </span>
          <span className="font-grotesk text-sm font-semibold uppercase tracking-[0.18em]">
            Delivery architecture
          </span>
        </Marquee>
      </Link>

      <div className="shell-wide pb-24 pt-16 sm:pb-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <p className="k-mono text-white/30">Iridescent Internet Solutions Limited</p>
            <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#c9f24b]/70">
              {site.positioning} · {site.motto}
            </p>
            <p className="mt-5 text-sm leading-relaxed text-white/45">
              Growth hacker and growth partner, PR and reputation strategist,
              digital product delivery architect, and creative director. Building
              at the intersection of narrative, software, film, security, art, and
              climate. Based in Lagos; working worldwide.
            </p>
            <a
              href={site.emailHref}
              className="mt-4 inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-[#c9f24b]" />
              {site.email}
            </a>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <LocalClock />
            <div className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/35">
              <span className="k-dot-live" />
              {site.availability}
            </div>
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-white/25">
              English · French · Yoruba · Hausa · Urhobo · Okpe
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_0.9fr]">
          <div>
            <h3 className="k-mono text-white/30">Navigate</h3>
            <ul className="mt-5 space-y-2.5">
              {navigate.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="k-mono text-white/30">More</h3>
            <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {more.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/55 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="k-mono text-white/30">Elsewhere</h3>
            <ul className="mt-5 space-y-3">
              {socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 text-sm text-white/55 hover:text-white"
                  >
                    <OrgLogo name={social.label} size={20} />
                    {social.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col items-start gap-2 border-t border-white/10 pt-5">
              <a
                href={site.emailHref}
                className="inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 text-[#c9f24b]" />
                {site.email}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-300" />
                Chat on WhatsApp
              </a>
              <Link
                href="/share"
                className="inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white"
              >
                <Share2 className="h-3.5 w-3.5 text-[#67e8f9]" />
                Share this site
              </Link>
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/30">
                {site.location}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Iridescent Internet Solutions Limited. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em]">
              Next.js · Tailwind · curiosity
            </p>
            <a
              href="#main-content"
              className="inline-flex items-center gap-1 text-white/45 hover:text-white"
            >
              Back to top
              <ArrowUp className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
