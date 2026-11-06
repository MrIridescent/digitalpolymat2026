import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Download, MapPin, MessageCircle } from 'lucide-react'
import { PrintButton } from '@/components/site/PrintButton'
import { OrgLogo } from '@/components/site/OrgLogo'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'
import {
  capabilities,
  credentials,
  education,
  experience,
  languages,
  services,
  site,
  socials,
  whatsappLink,
} from '@/lib/profile'
import { featuredProjects } from '@/lib/projects'

export const metadata: Metadata = generateMetaTags(
  pageMetadata.resume.title,
  pageMetadata.resume.description,
  ['resume', 'CV', 'David Akpoviroro Oke', 'digital product delivery architect', 'software engineer resume'],
  '/resume'
)

export default function ResumePage() {
  return (
    <div className="pt-16">
      <section className="aurora grain border-b border-white/10 pb-12 pt-20 sm:pt-24">
        <div className="shell">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">Résumé · updated 2026</p>
              <h1 className="display mt-5 text-5xl text-white sm:text-6xl lg:text-7xl">
                {site.name}
              </h1>
              <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/40">
                {site.role} · {site.alias}, {site.persona}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/50">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" />
                  {site.location}
                </span>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
                <a
                  href="https://www.linkedin.com/in/mriridescent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  linkedin.com/in/mriridescent
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            <div className="no-print flex flex-wrap gap-3">
              <a
                href="/documents/David-Oke-Resume-2026.pdf"
                download
                className="btn btn-primary"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </a>
              <PrintButton />
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell grid gap-12 lg:grid-cols-[1.55fr_0.75fr] lg:gap-16">
          {/* Main column */}
          <div>
            <div>
              <p className="eyebrow">Profile</p>
              <p className="mt-4 text-lg leading-relaxed text-white/70">
                Digital Product Delivery Architect, systems engineer, and founder
                with more than two decades of hands-on experience across the web.
                I turn complex business problems into shipped systems: full-stack
                products, applied AI, workflow automation, security tooling, and
                civic infrastructure — with a security-first, climate-aware,
                systems-level view of every decision.
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/50">
                I lead delivery architecture through Iridescent Internet
                Solutions Limited and chair the Board of Trustees of FEPAR.africa
                — Festac PanAfrican Renaissance Initiatives and/or diaspora
                foundations. I studied computer science at the University of the
                People (2024–2026). Earlier engagements at Zandbox and Helpman
                Analytics have concluded and are marked as such below.
              </p>
            </div>

            <div className="mt-12">
              <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4">
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  Experience
                </h2>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/30">
                  2002 — present
                </span>
              </div>

              <div className="mt-2">
                {experience.map((item) => (
                  <div
                    key={`${item.period}-${item.role}`}
                    className="grid gap-3 border-b border-white/10 py-6 sm:grid-cols-[8.5rem_1fr]"
                  >
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/35">
                      {item.period}
                    </p>
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        {item.role}
                        {item.current && (
                          <span className="ml-2 inline-flex items-center gap-1 align-middle font-mono text-[0.55rem] uppercase tracking-[0.1em] text-[#67e8f9]">
                            <span className="h-1 w-1 rounded-full bg-[#67e8f9]" />
                            now
                          </span>
                        )}
                        {item.ended && (
                          <span className="ml-2 inline-flex items-center gap-1 align-middle font-mono text-[0.55rem] uppercase tracking-[0.1em] text-white/30">
                            <span className="h-1 w-1 rounded-full bg-white/30" />
                            ended
                          </span>
                        )}
                      </h3>
                      <div className="mt-1.5 flex items-center gap-2">
                        <OrgLogo name={item.org} size={22} />
                        <p className="text-sm text-white/45">{item.org}</p>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-white/55">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-4">
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                  Selected projects
                </h2>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-1 text-xs text-white/45 hover:text-white"
                >
                  All projects
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="mt-2">
                {featuredProjects.slice(0, 4).map((project) => (
                  <div
                    key={project.slug}
                    className="border-b border-white/10 py-5"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-sm font-semibold text-white">
                        {project.name}
                      </h3>
                      <span className="font-mono text-[0.58rem] uppercase tracking-[0.1em] text-white/30">
                        {project.category}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-white/50">
                      {project.tagline}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-10">
            <div>
              <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/35">
                Education
              </h2>
              <div className="mt-4 space-y-5">
                {education.map((item) => (
                  <div key={item.school}>
                    <h3 className="text-sm font-semibold text-white">
                      {item.credential}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-2">
                      <OrgLogo name={item.school} size={22} />
                      <p className="text-sm text-white/50">{item.school}</p>
                    </div>
                    <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-white/30">
                      {item.period}
                      {item.status ? ` · ${item.status}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/35">
                Credentials
              </h2>
              <ul className="mt-4 space-y-3">
                {credentials.map((credential) => (
                  <li
                    key={credential}
                    className="flex items-center gap-2 text-sm leading-relaxed text-white/55"
                  >
                    <OrgLogo name={credential.split(' — ')[0]} size={20} />
                    {credential}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/35">
                Capabilities
              </h2>
              <div className="mt-4 space-y-5">
                {capabilities.map((capability) => (
                  <div key={capability.title}>
                    <h3 className="text-sm font-semibold text-white">
                      {capability.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/45">
                      {capability.items.join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/35">
                Services
              </h2>
              <ul className="mt-4 space-y-2">
                {services.map((service) => (
                  <li
                    key={service.slug}
                    className="text-sm leading-relaxed text-white/55"
                  >
                    {service.name}
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className="mt-3 inline-flex items-center gap-1 text-xs text-white/45 hover:text-white"
              >
                Engagement models
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>

            <div>
              <h2 className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/35">
                Languages
              </h2>
              <ul className="mt-3 space-y-2">
                {languages.map((language) => (
                  <li
                    key={language.code}
                    className="flex items-baseline justify-between gap-3 text-sm text-white/55"
                  >
                    <span>{language.name}</span>
                    <span className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-white/30">
                      {language.level}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-white/35">
                Hausa, Urhobo, and Okpe are conversational working levels.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-ink-soft p-5">
              <p className="text-sm text-white/55">
                The PDF is a print-ready version of the verified facts on this page.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                {socials.slice(0, 5).map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between gap-2 text-xs text-white/50 hover:text-white"
                  >
                    <span className="inline-flex items-center gap-2">
                      <OrgLogo name={social.label} size={18} />
                      {social.label}
                    </span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-tight border-t border-white/10">
        <div className="shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow">References</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50">
              References and credential verification are available on request.
              The fastest way to evaluate the work is still the code.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/projects" className="btn btn-primary">
              View projects
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
