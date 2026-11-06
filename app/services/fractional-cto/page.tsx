import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Check, Compass, ShieldCheck } from 'lucide-react'
import { ButtonLink } from '@/components/site/ButtonLink'
import { SectionHeading } from '@/components/site/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'
import { site, whatsappLink } from '@/lib/profile'

export const metadata: Metadata = generateMetaTags(
  pageMetadata.fractionalCto.title,
  pageMetadata.fractionalCto.description,
  [
    'fractional CTO Lagos',
    'fractional CTO for startups',
    'systems architect for hire',
    'technical due diligence Nigeria',
    'SME operational automation',
    'enterprise architecture audit',
  ],
  '/services/fractional-cto'
)

const problems = [
  {
    title: 'Silent drift',
    body: 'Payments, inventory, and bank records disagree by small amounts that compound. Nobody owns the reconciliation, so the loss stays invisible until month-end.',
  },
  {
    title: 'Manual operations',
    body: 'Skilled people spend the week copying between spreadsheets, inboxes, and CRMs. The process lives in someone’s head, and it leaves when they do.',
  },
  {
    title: 'Tool sprawl',
    body: 'Every team buys another SaaS. Nothing talks to anything else, and the subscription bill grows faster than the capability it was meant to buy.',
  },
  {
    title: 'Agency bloat',
    body: 'Hourly agencies are rewarded for overbuilding. You are left with a codebase nobody can explain and a maintenance bill that never ends.',
  },
]

const ownership = [
  'Technical strategy and the architecture decisions that follow from it',
  'Build-versus-buy, vendor selection, and spend review',
  'Security, reliability, and delivery governance',
  'Hiring support, code review, and mentorship for the existing team',
  'A small number of targeted builds — not an open-ended scope',
]

const blueprint = [
  {
    phase: 'Phase 1 · weeks 1–2',
    title: 'Architectural & vulnerability audit',
    body: 'I look behind the technology veil: cloud infrastructure, SaaS spend, code quality, data flows, security posture, and the manual workarounds holding the operation together.',
    output: 'Architecture map, risk register, and a prioritised list of where money or uptime is leaking.',
  },
  {
    phase: 'Phase 2 · month 1',
    title: 'Build-versus-buy & de-risking',
    body: 'We decide what must be built, what should be bought, and what should be switched off. The goal is to protect runway and stop paying for complexity you do not need.',
    output: 'Target architecture, procurement recommendation, and a 90-day delivery roadmap.',
  },
  {
    phase: 'Phase 3 · months 2–3',
    title: 'Turnkey micro-deployments & mentorship',
    body: 'I ship the smallest systems that remove the bottleneck, then document them and train the team that will own them. Your developers get stronger; the dependency on me gets smaller.',
    output: 'A working microservice, runbook, handover session, and an upskilled team.',
  },
]

const tiers = [
  {
    name: 'Strategic advisory',
    focus: 'Architectural oversight & vendor management',
    items: [
      'Two architecture reviews each month',
      'Codebase and security health check',
      'Vendor and agency vetting',
      'Build-versus-buy decisions',
    ],
    target: 'Early-stage startups and non-technical founders',
    featured: false,
  },
  {
    name: 'Fractional CTO',
    focus: 'Engineering leadership & strategy',
    items: [
      'Everything in Strategic advisory',
      'Technical roadmap design',
      'Managing the dev team or agency cadence',
      'One custom microservice per quarter',
    ],
    target: 'Growth-stage businesses, roughly 10–25 people',
    featured: true,
  },
  {
    name: 'Systems partner',
    focus: 'Deep-tech architecture & autonomous systems',
    items: [
      'Everything in Fractional CTO',
      'Custom multi-agent AI workflows',
      'Infrastructure modernisation and edge nodes',
      'On-call recovery architecture',
    ],
    target: 'Scale-ups, logistics, e-commerce, and public infrastructure',
    featured: false,
  },
]

const segments = [
  {
    segment: 'Public institutions',
    pain: 'Infrastructure decay, delayed reporting, and audit compliance.',
    offer: 'Civic diagnostics, edge AI sentinels, and low-friction public-works oversight — where procurement and access allow.',
  },
  {
    segment: 'Enterprise & institutional',
    pain: 'Legacy modernisation, fragmented tools, and security risk.',
    offer: 'Architecture audits, high-throughput services, and zero-trust workflow bridges.',
  },
  {
    segment: 'SMEs & SMBs',
    pain: 'Cash-flow leaks, manual inventory errors, and agency costs.',
    offer: 'Turnkey reconciliation, WhatsApp event bridges, and micro-SaaS integrations.',
  },
  {
    segment: 'Startups & founders',
    pain: 'Burn-rate pressure, non-technical leadership gaps, and overpriced agencies.',
    offer: 'Fractional CTO governance, rapid MVP de-risking, and a 30-day technical roadmap.',
  },
]

const microservices = [
  {
    title: 'Silent-drift reconciliation engine',
    body: 'A scheduled worker that pulls payment, inventory, and bank data, flags mismatched micro-transactions, and alerts operations before month-end.',
  },
  {
    title: 'Public-data monitoring nodes',
    body: 'Permission-aware monitors for pricing, tenders, listings, or supply-chain signals, normalised into a dashboard or sheet. Built only where access and terms allow.',
  },
  {
    title: 'WhatsApp & multi-channel bridges',
    body: 'An event gateway between the CRM and messaging channels so order updates, ops alerts, and high-value leads reach a human immediately.',
  },
  {
    title: 'Multi-agent document delegate',
    body: 'An internal tool where staff drop PDFs, voice notes, or spreadsheets and receive structured summaries, action items, and risk notes.',
  },
]

export default function FractionalCtoPage() {
  return (
    <div className="pt-16">
      <section className="aurora grain relative overflow-hidden border-b border-white/10 pb-16 pt-20 sm:pt-24" data-parallax-scope>
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="orb -right-24 top-10 h-80 w-80 opacity-25" data-parallax="14" aria-hidden="true" />

        <div className="shell relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="eyebrow">Fractional CTO · strategic systems partner</p>
            <h1 className="display mt-6 max-w-4xl text-5xl text-white sm:text-6xl lg:text-7xl">
              Own the architecture,{' '}
              <span className="iridescent-text italic">not the hours.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
              Most founders do not need a full-time CTO. They need a systems strategist
              who can find the hidden leverage, de-risk the build, and deploy targeted
              micro-solutions. I take technical ownership on a monthly retainer and leave
              your team stronger than I found it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="primary">
                Start a conversation
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href={whatsappLink()} variant="ghost">
                WhatsApp
              </ButtonLink>
            </div>

            <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/35">
              <a href="#blueprint" className="hover:text-white">Blueprint</a>
              <a href="#tiers" className="hover:text-white">Retainers</a>
              <a href="#fit" className="hover:text-white">Who it fits</a>
              <a href="#microservices" className="hover:text-white">Microservices</a>
            </nav>
          </div>

          <div className="glass-panel p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/35">
                  The shape of it
                </p>
                <p className="display mt-2 text-2xl text-white">30-60-90 days</p>
              </div>
              <span className="icon-tile h-11 w-11 rounded-xl" data-tone="emerald" aria-hidden="true">
                <Compass className="h-4 w-4" strokeWidth={1.7} />
              </span>
            </div>
            <div className="mt-6 space-y-3 text-sm leading-relaxed text-white/55">
              <p><strong className="text-white">Weeks 1–2:</strong> audit the architecture, spend, and risk.</p>
              <p><strong className="text-white">Month 1:</strong> decide what to build, buy, or switch off.</p>
              <p><strong className="text-white">Months 2–3:</strong> ship the smallest useful systems and hand them over.</p>
            </div>
            <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/35">
              Based in {site.location}; working with teams remotely. Scope and fees are
              set after discovery — no invented packages.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="The problem"
            title={
              <>
                The debt is invisible <span className="text-white/35">until it is expensive.</span>
              </>
            }
            body="Most operational friction is not a coding problem. It is a set of small, unowned gaps between systems, teams, and decisions. The first job is to make them visible."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {problems.map((problem) => (
              <div key={problem.title} className="glass-panel p-6">
                <h3 className="text-base font-semibold text-white">{problem.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{problem.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-8 rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">What I own</p>
              <h3 className="display mt-4 text-2xl text-white sm:text-3xl">
                One accountable technical owner.
              </h3>
            </div>
            <ul className="space-y-3">
              {ownership.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-white/55">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300/80" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="blueprint" className="paper section scroll-mt-24">
        <div className="shell">
          <p className="eyebrow">The 30-60-90 day blueprint</p>
          <h2 className="display mt-5 max-w-2xl text-4xl text-[#15161a] sm:text-5xl">
            Audit, decide, deploy.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#4b4d54] sm:text-base">
            Every engagement starts with evidence and ends with something your team can
            operate. No 80-slide deck that never becomes a system.
          </p>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {blueprint.map((phase, index) => (
              <div key={phase.phase} className="flex h-full flex-col rounded-2xl border border-black/10 bg-white/60 p-6">
                <p className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-[#6b6d74]">
                  {phase.phase}
                </p>
                <p className="display mt-4 text-3xl text-[#15161a]/20">0{index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-[#15161a]">{phase.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4b4d54]">{phase.body}</p>
                <p className="mt-5 border-t border-black/10 pt-4 text-xs leading-relaxed text-[#15161a]">
                  <span className="font-semibold">Output:</span> {phase.output}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tiers" className="section scroll-mt-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Retainer tiers"
            title={
              <>
                A shape that fits <span className="text-white/35">the stage you are in.</span>
              </>
            }
            body="Three levels of involvement. Each includes the one below it, so the engagement can grow without renegotiating the relationship."
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {tiers.map((tier, index) => (
              <Reveal key={tier.name} delay={index * 0.05} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-2xl border p-6 sm:p-7 ${
                    tier.featured
                      ? 'border-emerald-400/30 bg-emerald-400/[0.06]'
                      : 'border-white/10 bg-white/[0.025]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/35">
                        Tier 0{index + 1}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-white">{tier.name}</h3>
                    </div>
                    {tier.featured && (
                      <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 font-mono text-[0.5rem] uppercase tracking-[0.1em] text-emerald-200">
                        Core
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-white/45">{tier.focus}</p>
                  <ul className="mt-5 space-y-2.5">
                    {tier.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-white/55">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto border-t border-white/10 pt-4 text-xs leading-relaxed text-white/35">
                    {tier.target}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 text-xs leading-relaxed text-white/35">
            Fees are set after a short discovery conversation. I do not publish invented
            packages or promise outcomes that depend on access I have not seen.
          </p>
        </div>
      </section>

      <section id="fit" className="paper section scroll-mt-24">
        <div className="shell">
          <p className="eyebrow">Who it fits</p>
          <h2 className="display mt-5 max-w-2xl text-4xl text-[#15161a] sm:text-5xl">
            Different buyers, different pressure.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#4b4d54] sm:text-base">
            The technical work is similar; the buying trigger is not. The first
            conversation starts with the pressure you actually feel.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {segments.map((item) => (
              <div key={item.segment} className="rounded-2xl border border-black/10 bg-white/60 p-6">
                <h3 className="text-base font-semibold text-[#15161a]">{item.segment}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4b4d54]">
                  <span className="font-semibold text-[#15161a]">The pressure:</span> {item.pain}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#4b4d54]">
                  <span className="font-semibold text-[#15161a]">The offer:</span> {item.offer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="microservices" className="section scroll-mt-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Microservices"
            title={
              <>
                Small systems <span className="text-white/35">that protect revenue.</span>
              </>
            }
            body="Not everything needs a platform. Often the highest-leverage move is a narrow service that closes one expensive gap and stays cheap to run."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {microservices.map((service) => (
              <div key={service.title} className="glass-panel p-6">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-emerald-300">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-white">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/50">{service.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs leading-relaxed text-white/35">
            Every build is scoped for lawful access, data minimisation, and a clean
            handover. I do not scrape private data or leave a system that only I can
            operate.
          </p>
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
            <Link href="/services" className="btn btn-ghost">
              All services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
