import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowUpRight,
  Check,
  Compass,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
  X,
} from 'lucide-react'
import { ButtonLink } from '@/components/site/ButtonLink'
import { SectionHeading } from '@/components/site/SectionHeading'
import { ServiceCard } from '@/components/site/ServiceCard'
import { LanguagePanel } from '@/components/site/LanguagePanel'
import { Reveal } from '@/components/motion/Reveal'
import { ServiceStructuredData } from '@/components/StructuredData'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'
import { services, site, whatsappLink } from '@/lib/profile'

export const metadata: Metadata = generateMetaTags(
  pageMetadata.services.title,
  pageMetadata.services.description,
  [
    'digital product delivery architect',
    'growth hacker Lagos',
    'growth partner for brands',
    'reputation management Nigeria',
    'public relations strategist',
    'content and creative director',
    'custom software development Lagos',
    'workflow automation Nigeria',
    'hire product architect',
  ],
  '/services'
)

const process = [
  {
    step: '01',
    title: 'Find the real problem — and the angle',
    body:
      'A short, direct discovery: the business outcome, the market, the constraints, the people affected, and what has already failed. I would rather find the real problem — and the non-obvious way in — than accept the brief at face value.',
  },
  {
    step: '02',
    title: 'Design the system and the story',
    body:
      'Map the product, data, security, narrative, and delivery decisions. Separate what must exist on day one from what can wait. Write it down so the team can argue with it.',
  },
  {
    step: '03',
    title: 'Build with the people who will own it',
    body:
      'Ship in visible increments. Keep security, accessibility, and operability inside the build rather than bolted on at the end. Leave the team stronger than I found it.',
  },
  {
    step: '04',
    title: 'Put it in the world, measure, refine',
    body:
      'Launch, distribute, document, and hand over. Then watch the real signals — pipeline, reputation, retention, search — and improve the system where it actually hurts.',
  },
]

const engagementModels = [
  {
    name: 'Advisory sprint',
    duration: '2–4 weeks',
    body: 'Architecture, delivery roadmap, and decision records for a product that needs a clear path before a larger build.',
  },
  {
    name: 'Fixed-scope build',
    duration: '6–16 weeks',
    body: 'A defined product slice, delivered end to end with tests, documentation, and handover.',
  },
  {
    name: 'Monthly partnership',
    duration: 'Rolling',
    body: 'A senior growth, reputation, and delivery partner embedded with your team: strategy, narrative, reviews, and execution.',
  },
  {
    name: 'Retainer',
    duration: 'Monthly',
    body: 'Ongoing security, automation, or platform support with a named scope and a predictable cadence.',
  },
]

const goodFit = [
  'You need to enter a market, repair a reputation, or tell a clearer story.',
  'You want growth that survives being looked at closely.',
  'You have a real problem and a decision-maker in the room.',
  'You want a system your team can own, not a black box.',
]

const notFit = [
  'You want bought followers, fake reviews, or a story that cannot be proved.',
  'You need a warm body to fill a seat with no context.',
  'The goal is a demo that never has to survive users.',
  'Success is defined only by hours billed.',
]

export default function ServicesPage() {
  return (
    <div className="pt-16">
      <ServiceStructuredData />

      <section className="aurora grain relative overflow-hidden border-b border-white/10 pb-16 pt-20 sm:pt-24" data-parallax-scope>
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="orb -right-24 top-10 h-80 w-80 opacity-25" data-parallax="14" aria-hidden="true" />

        <div className="shell relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="eyebrow">Services · growth, reputation &amp; delivery</p>
            <h1 className="display mt-6 max-w-4xl text-5xl text-white sm:text-6xl lg:text-7xl">
              I grow the brand, build the product, and{' '}
              <span className="iridescent-text italic">direct the story.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
              I work as a growth hacker and growth partner to individuals, brands,
              and companies — with public relations, reputation management, content
              and film, and digital product delivery under one roof. I find the
              angle, shape the narrative, build the system, and stay until it works.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="primary">
                Start a conversation
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/growth" variant="ghost">
                The growth room
              </ButtonLink>
              <ButtonLink href="/services/fractional-cto" variant="ghost">
                Fractional CTO offer
              </ButtonLink>
            </div>
          </div>

          <div className="glass-panel p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/35">
                  Currently
                </p>
                <p className="display mt-2 text-2xl text-white">Taking selected work</p>
              </div>
              <span className="icon-tile h-11 w-11 rounded-xl" data-tone="emerald" aria-hidden="true">
                <Sparkles className="h-4 w-4" strokeWidth={1.7} />
              </span>
            </div>
            <div className="mt-6 space-y-3 text-sm leading-relaxed text-white/55">
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/35" />
                {site.location} · remote worldwide
              </p>
              <p className="flex items-start gap-2.5">
                <Compass className="mt-0.5 h-4 w-4 shrink-0 text-white/35" />
                Growth · reputation · content · product delivery
              </p>
              <a
                href={site.emailHref}
                className="flex items-start gap-2.5 hover:text-white"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/35" />
                {site.email}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 hover:text-white"
              >
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                WhatsApp · {site.whatsapp.display}
              </a>
            </div>
            <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/35">
              Scope and fees are set after a short discovery conversation. No invented
              packages, no mystery retainers.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="The offer"
              title={
                <>
                  {services.length} ways to move{' '}
                  <span className="text-white/35">the work forward.</span>
                </>
              }
              body="Each service can stand alone or combine into a single engagement. Growth without a product is a promise you cannot keep; a product without a story is a secret."
            />
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.04} className="h-full">
                <ServiceCard service={service} index={index} />
              </Reveal>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
            <p className="max-w-xl text-sm leading-relaxed text-white/45">
              Recommending a service to someone? Send a finished, branded card
              instead of a link and a paragraph.
            </p>
            <Link
              href="/media#service-designs"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              Download the service cards
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section border-t border-white/10 bg-ink-soft/40">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title={
                <>
                  A delivery rhythm,{' '}
                  <span className="text-white/35">not a black box.</span>
                </>
              }
              body="Four stages, each with a visible output. You always know what is being decided, what is being built, and what happens next."
            />
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {process.map((item, index) => (
              <Reveal key={item.step} delay={index * 0.05} className="h-full">
                <div className="glass-panel h-full p-6">
                  <p className="display text-4xl text-white/25">{item.step}</p>
                  <h3 className="mt-5 text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <div>
              <p className="eyebrow">Engagement models</p>
              <h2 className="display mt-5 text-4xl text-white sm:text-5xl">
                A shape that fits the problem.
              </h2>
              <div className="mt-8 space-y-3">
                {engagementModels.map((model) => (
                  <div
                    key={model.name}
                    className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:flex-row sm:items-baseline sm:justify-between"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-white">{model.name}</h3>
                      <p className="mt-1 max-w-md text-xs leading-relaxed text-white/45">
                        {model.body}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-white/30">
                      {model.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="space-y-4">
              <div className="glass-panel p-6">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
                  <Check className="h-4 w-4" />
                  A good fit
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {goodFit.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-white/55">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-panel p-6">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-white/70">
                  <X className="h-4 w-4" />
                  Probably not a fit
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {notFit.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-white/45">
                      <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/25" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <LanguagePanel compact />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-tight border-t border-white/10">
        <div className="shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow">Next step</p>
            <h2 className="display mt-3 max-w-xl text-3xl text-white sm:text-4xl">
              Tell me what is stuck. I will tell you whether I can help.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="btn btn-primary">
              Start a conversation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/case-studies" className="btn btn-ghost">
              See the evidence
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
