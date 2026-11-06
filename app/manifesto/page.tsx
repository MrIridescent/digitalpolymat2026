import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowUpRight,
  Compass,
  Feather,
  Landmark,
  Layers,
  Sparkles,
} from 'lucide-react'
import { ButtonLink } from '@/components/site/ButtonLink'
import { SectionHeading } from '@/components/site/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'
import { initiatives, manifesto, site } from '@/lib/profile'

export const metadata: Metadata = generateMetaTags(
  pageMetadata.manifesto.title,
  pageMetadata.manifesto.description,
  [
    'David Akpoviroro Oke manifesto',
    'digital polymath',
    'growth partner',
    'reputation strategist',
    'computational civic strategist',
    'Letter of Capability',
    'Da Vincian principles',
  ],
  '/manifesto'
)

const pillarIcons = [Layers, Compass, Landmark]

export default function ManifestoPage() {
  return (
    <div className="pt-16">
      <section className="aurora grain relative overflow-hidden border-b border-white/10 pb-16 pt-20 sm:pt-24" data-parallax-scope>
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="orb -right-28 top-8 h-80 w-80 opacity-25" data-parallax="12" aria-hidden="true" />

        <div className="shell relative">
          <p className="eyebrow">The Renaissance manifesto</p>
          <h1 className="display mt-6 max-w-5xl text-5xl text-white sm:text-6xl lg:text-7xl">
            A growth partner with an{' '}
            <span className="iridescent-text italic">engineer’s mind and a director’s eye.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/65">
            {manifesto.intro}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href="/services" variant="primary">
              Work with me
              <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
            <a href="#letter" className="link-underline text-sm text-white/60 hover:text-white">
              Read the Letter of Capability
            </a>
            <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/30">
              David Akpoviroro Oke · Mr Iridescent
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <blockquote className="glass-panel p-7 sm:p-10">
              <Feather className="h-6 w-6 text-[#c4b5fd]" strokeWidth={1.5} />
              <p className="display mt-6 max-w-4xl text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
                “{manifesto.statement}”
              </p>
              <footer className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/35">
                Growth &amp; systems statement · David Akpoviroro Oke
              </footer>
            </blockquote>
          </Reveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {manifesto.pillars.map((pillar, index) => {
              const Icon = pillarIcons[index] ?? Layers
              return (
                <Reveal key={pillar.title} delay={index * 0.06} className="h-full">
                  <article className="card card-glass h-full p-6 sm:p-7">
                    <div className="card-spot" aria-hidden="true" />
                    <span className="icon-tile" data-tone={index === 1 ? 'cyan' : index === 2 ? 'amber' : 'violet'} aria-hidden="true">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <h2 className="mt-6 text-xl font-semibold text-white">{pillar.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">{pillar.body}</p>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section border-t border-white/10 bg-ink-soft/40">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Seven principles"
              title={
                <>
                  The Da Vincian method,{' '}
                  <span className="text-white/35">applied to the work.</span>
                </>
              }
              body="Leonardo’s notebooks were a delivery system: observe, test, connect, and keep the human hand in the work. These are the seven habits I try to keep."
            />
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {manifesto.daVinci.map((principle, index) => (
              <div key={principle.name} className="bg-ink-soft p-6 sm:p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="display text-3xl text-white/20">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/25">
                    {principle.translation}
                  </span>
                </div>
                <h3 className="display mt-6 text-2xl text-white">{principle.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{principle.body}</p>
              </div>
            ))}
            <div className="flex flex-col justify-between bg-[linear-gradient(150deg,rgba(139,92,246,0.16),rgba(6,182,212,0.1),rgba(245,158,11,0.08))] p-6 sm:p-7">
              <Sparkles className="h-5 w-5 text-white/70" strokeWidth={1.6} />
              <div>
                <h3 className="display mt-6 text-2xl text-white">The synthesis</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  A working life is a portfolio of connections. The job is to keep
                  making them, and to leave a system behind that others can extend.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="letter" className="section border-t border-white/10 scroll-mt-24">
        <div className="shell grid gap-12 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow">Letter of Capability</p>
            <h2 className="display mt-5 text-4xl text-white sm:text-5xl">
              A modern Renaissance petition.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/45">
              Adapted in spirit from Leonardo da Vinci’s letter to the Duke of Sforza,
              and addressed to the people building modern Africa.
            </p>
          </div>

          <Reveal>
            <div className="paper rounded-[1.6rem] p-7 sm:p-10 lg:p-12">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-black/35">
                To the founders, municipal leaders, and technological custodians of modern Africa
              </p>
              <div className="mt-8 space-y-5 text-base leading-relaxed text-black/70">
                {manifesto.letter.slice(1, -1).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-10 border-t border-black/10 pt-6">
                <p className="display text-2xl text-[#15161a]">
                  David Akpoviroro Oke
                </p>
                <p className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-black/40">
                  Mr Iridescent · The Creative Renaissance Man
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section border-t border-white/10 bg-ink-soft/40">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="The work behind the words"
              title={
                <>
                  A manifesto is only{' '}
                  <span className="text-white/35">a promise to build.</span>
                </>
              }
              body="These are the public systems where the ideas meet the road, the budget, and the user."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {initiatives.map((initiative) => (
              <a
                key={initiative.name}
                href={initiative.href}
                {...(initiative.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="card card-glass group flex h-full flex-col p-7"
              >
                <div className="card-spot" aria-hidden="true" />
                <span className="tag">{initiative.kind}</span>
                <h3 className="display mt-6 text-3xl text-white">{initiative.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{initiative.summary}</p>
                <span className="mt-auto inline-flex items-center gap-2 border-t border-white/10 pt-5 text-xs text-white/50 group-hover:text-white">
                  {initiative.linkLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </a>
            ))}
            <Link href="/advocacy" className="card card-glass group flex h-full flex-col p-7">
              <div className="card-spot" aria-hidden="true" />
              <span className="tag">Climate & long horizon</span>
              <h3 className="display mt-6 text-3xl text-white">Green software & Agenda 2063</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                The environmental and Pan-African commitments that constrain how the
                systems are designed, sourced, and operated.
              </p>
              <span className="mt-auto inline-flex items-center gap-2 border-t border-white/10 pt-5 text-xs text-white/50 group-hover:text-white">
                Read the commitments
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>

          <div className="mt-10 text-center">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/30">
              {site.location} · working worldwide ·{' '}
              <Link href="/contact" className="text-white/50 hover:text-white">
                open a conversation
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
