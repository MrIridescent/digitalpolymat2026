import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowUpRight,
  Globe2,
  Leaf,
  Recycle,
  ShieldCheck,
  Sun,
} from 'lucide-react'
import { ButtonLink } from '@/components/site/ButtonLink'
import { OrgLogo } from '@/components/site/OrgLogo'
import { SectionHeading } from '@/components/site/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'
import { advocacy, initiatives } from '@/lib/profile'

export const metadata: Metadata = generateMetaTags(
  pageMetadata.advocacy.title,
  pageMetadata.advocacy.description,
  [
    'green software advocate',
    'SDG 13 climate action',
    'African Union Agenda 2063',
    'sustainable software Nigeria',
    'civic technology climate',
  ],
  '/advocacy'
)

const goalIcons = [Leaf, Sun, Globe2, Recycle, ShieldCheck]

export default function AdvocacyPage() {
  return (
    <div className="pt-16">
      <section className="aurora grain relative overflow-hidden border-b border-white/10 pb-16 pt-20 sm:pt-24" data-parallax-scope>
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="orb -left-24 top-20 h-80 w-80 opacity-30" data-parallax="12" aria-hidden="true" />

        <div className="shell relative">
          <p className="eyebrow">Green software · SDGs · Agenda 2063</p>
          <h1 className="display mt-6 max-w-5xl text-5xl text-white sm:text-6xl lg:text-7xl">
            Technology is only progress if it leaves the place{' '}
            <span className="iridescent-text italic">better than it found it.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/65">
            {advocacy.intro}
          </p>
          <div className="mt-9 flex flex-wrap gap-2">
            <span className="chip">Green Software</span>
            <span className="chip">SDG 13 · Climate Action</span>
            <span className="chip">SDG 9 · Infrastructure</span>
            <span className="chip">SDG 11 · Sustainable cities</span>
            <span className="chip">African Union Agenda 2063</span>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/manifesto" variant="primary">
              Read the manifesto
              <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Talk about a responsible build
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <div>
              <div className="flex items-center gap-2.5">
                <Leaf className="h-5 w-5 text-emerald-300/70" strokeWidth={1.7} />
                <p className="eyebrow">Green Software</p>
              </div>
              <h2 className="display mt-5 text-4xl text-white sm:text-5xl">
                Less compute. <span className="iridescent-text italic">More consequence.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/60">
                {advocacy.greenSoftware.body}
              </p>
              <div className="mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] p-6">
                <p className="text-sm leading-relaxed text-emerald-100/70">
                  I do not claim a verified carbon-neutral practice. I claim a
                  commitment to measure, choose efficient architectures, and avoid
                  pretending that digital work is weightless.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass-panel p-7 sm:p-8">
              <h3 className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-emerald-300/80">
                Working commitments
              </h3>
              <ul className="mt-6 space-y-4">
                {advocacy.greenSoftware.commitments.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/60">
                    <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300/70" strokeWidth={1.7} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section border-t border-white/10 bg-ink-soft/40">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Sustainable Development Goals"
              title={
                <>
                  Five goals, <span className="text-white/35">woven into the work.</span>
                </>
              }
              body="These are the goals where software, infrastructure, and civic practice overlap most directly. Climate action is the thread that runs through all of them."
            />
            <div className="mt-5 flex items-center gap-2">
              <Globe2 className="h-4 w-4 text-white/30" strokeWidth={1.6} />
              <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-white/35">
                United Nations · 2030 Agenda for Sustainable Development
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {advocacy.goals.map((goal, index) => {
              const Icon = goalIcons[index] ?? Leaf
              return (
                <Reveal key={goal.code} delay={index * 0.05} className="h-full">
                  <article className="card card-glass h-full p-6 sm:p-7">
                    <div className="card-spot" aria-hidden="true" />
                    <div className="flex items-start justify-between gap-4">
                      <span className="icon-tile" data-tone="emerald" aria-hidden="true">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-emerald-300/70">
                        {goal.code}
                      </span>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-white">{goal.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{goal.body}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <div>
              <div className="flex items-center gap-2.5">
                <Globe2 className="h-5 w-5 text-[#67e8f9]/70" strokeWidth={1.6} />
                <p className="eyebrow">African Union Agenda 2063</p>
              </div>
              <h2 className="display mt-5 text-4xl text-white sm:text-5xl">
                A long horizon, <span className="iridescent-text italic">expressed in systems.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-white/60">
                {advocacy.agenda2063.body}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="chip">Inclusive growth</span>
                <span className="chip">Cultural identity</span>
                <span className="chip">Integrated continent</span>
                <span className="chip">Globally influential Africa</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass-panel p-7 sm:p-8">
              <h3 className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/35">
                How the agenda shows up
              </h3>
              <ul className="mt-6 space-y-4">
                {advocacy.agenda2063.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-white/60">
                    <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-[#67e8f9]/70" strokeWidth={1.7} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section border-t border-white/10 bg-ink-soft/40">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="The design constraints"
              title={
                <>
                  What this changes{' '}
                  <span className="text-white/35">in a build.</span>
                </>
              }
              body="Sustainability is not a page in the appendix. It changes the architecture, the dependencies, the device targets, and the handover."
            />
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
            {advocacy.commitments.map((commitment, index) => (
              <div key={commitment} className="bg-ink-soft p-6 sm:p-7">
                <span className="font-mono text-[0.6rem] text-white/25">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="mt-4 text-base leading-relaxed text-white/65">{commitment}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {initiatives.map((initiative) => (
              <a
                key={initiative.name}
                href={initiative.href}
                {...(initiative.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="card card-glass group p-6"
              >
                <div className="card-spot" aria-hidden="true" />
                <span className="tag">{initiative.kind}</span>
                <div className="mt-5 flex items-center gap-2.5">
                  <OrgLogo name={initiative.name} size={32} />
                  <h3 className="display text-2xl text-white">{initiative.name}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{initiative.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs text-white/45 group-hover:text-white">
                  {initiative.linkLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </a>
            ))}
            <Link href="/manifesto" className="card card-glass group p-6">
              <div className="card-spot" aria-hidden="true" />
              <span className="tag">The method</span>
              <h3 className="display mt-5 text-2xl text-white">Renaissance manifesto</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                The systems-architecture statement, seven Da Vincian principles, and the
                Letter of Capability.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs text-white/45 group-hover:text-white">
                Read it
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
