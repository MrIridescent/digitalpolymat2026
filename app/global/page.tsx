import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Clock3, Globe2, MapPin } from 'lucide-react'
import { ButtonLink } from '@/components/site/ButtonLink'
import { SectionHeading } from '@/components/site/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import {
  BreadcrumbStructuredData,
  FAQStructuredData,
  HubsStructuredData,
} from '@/components/StructuredData'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'
import { allHubs, corridors, hubRegions, remoteSteps } from '@/lib/global'
import { globalFaqs } from '@/lib/faq'
import { site } from '@/lib/profile'

export const metadata: Metadata = generateMetaTags(
  pageMetadata.global.title,
  pageMetadata.global.description,
  [
    'global tech hubs',
    'tech hubs 2026',
    'remote growth partner',
    'growth hacker for startups',
    'market entry Africa',
    'market entry Nigeria',
    'growth hacker London',
    'growth partner Berlin',
    'growth partner Nairobi',
    'product architect Dubai',
    'growth partner Singapore',
    'startup growth partner Toronto',
    'growth partner São Paulo',
    'Lagos tech ecosystem',
    'remote-first consultancy',
  ],
  '/global'
)

const timeZones = [
  { region: 'United Kingdom', relation: '0–1 hour ahead' },
  { region: 'Europe (CET)', relation: '0–2 hours ahead' },
  { region: 'Middle East', relation: '2–3 hours ahead' },
  { region: 'South Asia', relation: '4.5–5.5 hours ahead' },
  { region: 'East & Southeast Asia', relation: '6–7 hours ahead' },
  { region: 'US Eastern', relation: '5–6 hours behind' },
  { region: 'US Pacific', relation: '8–9 hours behind' },
  { region: 'Brazil', relation: '4 hours behind' },
  { region: 'Australia & New Zealand', relation: '8–10 hours ahead' },
]

const heroHubs = ['Lagos', 'London', 'Berlin', 'Nairobi', 'New York', 'Dubai', 'Bengaluru', 'Singapore']

export default function GlobalPage() {
  return (
    <div className="pt-16">
      <HubsStructuredData />
      <FAQStructuredData items={globalFaqs} path="/global" />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', path: '/' },
          { name: 'Global practice', path: '/global' },
        ]}
      />

      <section className="aurora grain relative overflow-hidden border-b border-white/10 pb-16 pt-20 sm:pt-24">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="orb -right-24 top-16 h-80 w-80 opacity-25" data-parallax="12" aria-hidden="true" />

        <div className="shell relative">
          <p className="eyebrow">Global practice · remote-first from Lagos</p>
          <h1 className="display mt-6 max-w-5xl text-5xl text-white sm:text-6xl lg:text-7xl">
            A Lagos practice with{' '}
            <span className="iridescent-text italic">a worldwide room.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/65">
            David Akpoviroro Oke works with founders, brands, and institutions
            across {allHubs.length} tech hubs — from Lagos to London, Nairobi to
            New York, Berlin to Bengaluru. The work is remote-first, written down,
            and scheduled around a real overlap window. No offices are implied;
            the map is made of conversations, client markets, and corridors.
          </p>

          <div className="mt-9 flex flex-wrap gap-2">
            {heroHubs.map((hub) => (
              <span key={hub} className="chip">
                {hub}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="primary">
              Start a conversation
              <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/growth" variant="ghost">
              See the growth offer
            </ButtonLink>
          </div>

          <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Base', value: 'Lagos, Nigeria' },
              { label: 'Time zone', value: 'WAT · UTC+1' },
              { label: 'Hubs in view', value: String(allHubs.length) },
              { label: 'Mode', value: 'Remote-first' },
            ].map((item) => (
              <div key={item.label} className="bg-ink px-5 py-5">
                <dt className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-white/30">
                  {item.label}
                </dt>
                <dd className="mt-2 text-sm text-white/75">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="The map"
              title={
                <>
                  The tech hubs,{' '}
                  <span className="text-white/35">region by region.</span>
                </>
              }
              body="Every place where the work has a reason to travel. Each list is a set of collaboration corridors — not a claim of local offices."
              action={{ label: 'Read the questions', href: '#global-questions' }}
            />
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {hubRegions.map((region, index) => {
              const notes = region.hubs.filter((hub) => hub.note)
              return (
                <Reveal key={region.id} delay={index * 0.04} className="h-full">
                  <article className="card card-glass flex h-full flex-col p-6 sm:p-7">
                    <div className="card-spot" aria-hidden="true" />
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-[#c9f24b]/70">
                          {String(index + 1).padStart(2, '0')} · {region.kicker}
                        </p>
                        <h3 className="display mt-2 text-2xl text-white sm:text-3xl">
                          {region.name}
                        </h3>
                      </div>
                      <Globe2 className="h-5 w-5 shrink-0 text-white/25" strokeWidth={1.5} />
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-white/55">{region.blurb}</p>

                    <ul className="mt-6 flex flex-wrap gap-1.5">
                      {region.hubs.map((hub) => (
                        <li
                          key={hub.city}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[0.52rem] uppercase tracking-[0.1em] text-white/50"
                        >
                          {hub.city}
                        </li>
                      ))}
                    </ul>

                    {notes.length > 0 ? (
                      <dl className="mt-auto space-y-2 border-t border-white/10 pt-5">
                        {notes.map((hub) => (
                          <div key={hub.city} className="flex gap-2 text-xs leading-relaxed">
                            <dt className="shrink-0 font-mono text-[0.5rem] uppercase tracking-[0.12em] text-white/35">
                              {hub.city}
                            </dt>
                            <dd className="text-white/40">{hub.note}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}
                  </article>
                </Reveal>
              )
            })}
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/35">
            Your city is not listed? The work is still remote-first. The list is a
            map of attention, not a gate — a conversation is enough to find out
            whether the fit is real.
          </p>
        </div>
      </section>

      <section className="section border-t border-white/10 bg-ink-soft/40">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Corridors"
              title={
                <>
                  Six routes that <span className="text-white/35">keep repeating.</span>
                </>
              }
              body="Some pairs of cities produce the same kind of work. These are the corridors where growth, reputation, and product delivery tend to meet."
            />
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {corridors.map((corridor, index) => (
              <Reveal key={`${corridor.from}-${corridor.to}`} delay={index * 0.04} className="h-full">
                <article className="card h-full p-6">
                  <p className="flex flex-wrap items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/40">
                    <span>{corridor.from}</span>
                    <ArrowRight className="h-3 w-3 text-[#c9f24b]/70" />
                    <span>{corridor.to}</span>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-white/55">{corridor.body}</p>
                  <p className="mt-5 border-t border-white/10 pt-4 font-mono text-[0.5rem] uppercase tracking-[0.12em] text-white/25">
                    {corridor.overlap}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div>
              <p className="eyebrow">How remote works</p>
              <h2 className="display mt-5 text-4xl text-white sm:text-5xl">
                Distance is a design{' '}
                <span className="iridescent-text italic">constraint.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/55">
                The practice is built for teams that are not in the same room.
                Decisions are written, demos are frequent, and the time difference
                is planned instead of apologised for.
              </p>
              <div className="mt-8 flex items-center gap-2 text-sm text-white/45">
                <MapPin className="h-4 w-4 text-[#c9f24b]" strokeWidth={1.7} />
                Lagos, Nigeria · working worldwide
              </div>
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {remoteSteps.map((step, index) => (
              <Reveal key={step.step} delay={index * 0.05} className="h-full">
                <article className="glass-panel h-full p-5">
                  <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-[#c9f24b]/70">
                    {step.step}
                  </p>
                  <h3 className="mt-3 text-base font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{step.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-white/10 bg-ink-soft/40">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <div>
              <div className="flex items-center gap-2.5">
                <Clock3 className="h-5 w-5 text-cyan-300/70" strokeWidth={1.6} />
                <p className="eyebrow">Working hours</p>
              </div>
              <h2 className="display mt-5 text-4xl text-white sm:text-5xl">
                A shared window, <span className="text-white/35">not a guess.</span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-white/55">
                Lagos is WAT (UTC+1) all year; Nigeria does not observe daylight
                saving. Calls are placed where the overlap is real, and the rest is
                handled in writing.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <dl className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {timeZones.map((zone) => (
                <div key={zone.region} className="flex items-center justify-between gap-4 bg-ink px-5 py-4">
                  <dt className="text-sm text-white/60">{zone.region}</dt>
                  <dd className="shrink-0 font-mono text-[0.5rem] uppercase tracking-[0.12em] text-white/30">
                    {zone.relation}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section id="global-questions" className="section scroll-mt-24">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Direct answers"
              title={
                <>
                  Working across <span className="text-white/35">borders.</span>
                </>
              }
              body="Short answers for founders, journalists, and anyone checking whether the fit is real before sending a brief."
              action={{ label: 'All questions', href: '/faq' }}
            />
          </Reveal>

          <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {globalFaqs.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-base text-white/80 [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <span className="mt-0.5 font-mono text-lg leading-none text-white/30 transition-colors group-open:text-[#c9f24b]">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/50">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href="/contact" variant="primary">
              Send a brief
              <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
            <a
              href={site.emailHref}
              className="link-underline inline-flex items-center gap-2 text-sm text-white/55 hover:text-white"
            >
              {site.email}
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="shell py-16 sm:py-20">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Next step</p>
              <h2 className="display mt-5 max-w-2xl text-4xl text-white sm:text-5xl">
                Find the room. <span className="iridescent-text italic">Then change it.</span>
              </h2>
            </div>
            <Link
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-2 text-sm text-white/60 hover:text-white"
            >
              Start a conversation
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-white/40">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
