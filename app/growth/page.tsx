import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowUpRight,
  Check,
  Film,
  Mail,
  Megaphone,
  MessageCircle,
  Search,
  ShieldCheck,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'
import { ButtonLink } from '@/components/site/ButtonLink'
import { Marquee } from '@/components/kinetic/Marquee'
import { SplitLines } from '@/components/kinetic/SplitLines'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/site/SectionHeading'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'
import { growthThinking, services, site, whatsappLink } from '@/lib/profile'

export const metadata: Metadata = generateMetaTags(
  pageMetadata.growth.title,
  pageMetadata.growth.description,
  [
    'growth hacker Lagos',
    'growth partner for brands',
    'market entry Nigeria',
    'reputation management Africa',
    'public relations strategist',
    'creative director Lagos',
    'content studio Nigeria',
    'brand narrative strategy',
  ],
  '/growth'
)

const diagnostics = [
  {
    title: 'The offer is clear to you, not to the market.',
    body:
      'A stranger cannot repeat what you do or why it matters. We reposition the promise until the value survives being said out loud by someone else.',
  },
  {
    title: 'The audience is adjacent, not inside.',
    body:
      'You are reaching people who could care instead of the network that already holds the room. We map the gatekeepers, communities, and rooms worth entering.',
  },
  {
    title: 'The reputation is thin or noisy.',
    body:
      'There is either nothing worth finding or too much that misrepresents you. We build a public record that reflects the work and a plan for the day it is tested.',
  },
  {
    title: 'The content looks like content.',
    body:
      'Competent, forgettable, interchangeable. We find the point of view that could only come from you, then direct it with the craft to make people look twice.',
  },
]

const fronts = [
  {
    name: 'Growth hacking & market entry',
    icon: TrendingUp,
    tag: 'For individuals, brands & companies',
    body:
      'For the person, brand, or company that needs to enter a new network, city, sector, or audience — without a big agency budget. I map the room, find the wedge, and engineer the first repeatable route in.',
    outcomes: [
      'A market wedge only you can occupy',
      'A route into the rooms that matter',
      'A first pipeline you can measure',
      'A referral and content loop that compounds',
    ],
    deliverables: ['Growth audit', 'Market wedge map', 'Positioning & offer', 'Channel experiments', 'Pipeline scorecard'],
    slug: 'growth-hacking',
  },
  {
    name: 'Public relations & reputation',
    icon: ShieldCheck,
    tag: 'For names that are assets',
    body:
      'A reputation is not a press release. It is the accumulated record of what you do and what people say about it. I shape the narrative, build the media and community relationships, and prepare the response before the bad day arrives.',
    outcomes: [
      'A public narrative people repeat correctly',
      'Placement with the right media and communities',
      'A search footprint that reflects the work',
      'Crisis readiness, not crisis improvisation',
    ],
    deliverables: ['Narrative platform', 'Media map', 'Press materials', 'Reputation monitoring', 'Crisis playbook'],
    slug: 'reputation-pr',
  },
  {
    name: 'Content studio & creative direction',
    icon: Film,
    tag: 'For stories that must be seen',
    body:
      'Film, photography, copy, and campaign systems made by one director who also writes and edits. The story stays coherent because it never leaves the same pair of hands — from the first idea to the final cut.',
    outcomes: [
      'A campaign idea worth watching',
      'Video and photography that feel directed',
      'Copy that sounds like a person',
      'A content system the team can keep feeding',
    ],
    deliverables: ['Creative concept', 'Script & copy', 'Direction & shoot', 'Edit & grade', 'Campaign assets'],
    slug: 'content-studio',
  },
]

const hands = [
  {
    role: 'The strategist',
    body: 'Finds the pattern, names the real problem, and chooses the wedge. Refuses to confuse activity with strategy.',
  },
  {
    role: 'The storyteller',
    body: 'Writes the narrative, the pitch, the script, and the press note. Makes the value legible in one read.',
  },
  {
    role: 'The director',
    body: 'Shoots the scene, edits the cut, directs the frame, and protects the taste until the thing feels inevitable.',
  },
  {
    role: 'The engineer',
    body: 'Builds the product, the landing page, the automation, and the measurement that make the growth hold.',
  },
]

const engagements = [
  {
    name: 'Growth sprint',
    duration: '4–6 weeks',
    body: 'An audit, a market wedge, a rewritten offer and narrative, and the first channel experiments. For a brand entering a new market or relaunching with a sharper position.',
  },
  {
    name: 'Reputation retainer',
    duration: 'Monthly',
    body: 'Narrative upkeep, media and community relationships, search reputation, monitoring, and crisis readiness. For a name that cannot afford to be misread.',
  },
  {
    name: 'Launch room',
    duration: '4–8 weeks',
    body: 'A campaign concept, film, photography, copy, landing experience, and content system built around one launch moment.',
  },
  {
    name: 'Fractional growth partner',
    duration: 'Rolling',
    body: 'An embedded senior partner across growth, reputation, content, and product — for the team that needs one person who can see the whole board.',
  },
]

const refusals = [
  'Buy followers, engagement, reviews, or press.',
  'Astroturf a community or manufacture a movement.',
  'Promise a number I cannot measure or defend.',
  'Treat reputation as spin instead of the record of what you actually do.',
]

const growthServices = services.filter((service) =>
  ['growth-hacking', 'reputation-pr', 'content-studio'].includes(service.slug)
)

export default function GrowthPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="aurora grain relative overflow-hidden border-b border-white/10 pb-16 pt-20 sm:pt-24">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="orb -right-24 top-10 h-80 w-80 opacity-25" data-parallax="14" aria-hidden="true" />
        <div className="k-hero-bgword" aria-hidden="true">
          GROWTH
        </div>

        <div className="shell relative grid gap-12 lg:grid-cols-[1.16fr_0.84fr] lg:items-end">
          <div>
            <p className="eyebrow">Growth &amp; reputation · Lagos → worldwide</p>
            <h1 className="mt-6">
              <SplitLines
                lines={[
                  'Break into',
                  'the room.',
                  <span key="conversation">
                    Then change the{' '}
                    <span className="k-serif italic text-[color:var(--acid)]">conversation.</span>
                  </span>,
                ]}
                delay={140}
                stagger={105}
                lineClassName="k-title block text-[clamp(2.7rem,8vw,6.6rem)] text-white"
              />
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
              I am a growth hacker and growth partner to individuals, brands, and
              companies. I find the angle that gets you into a new network or
              market, shape the reputation that keeps you there, and direct the
              content that makes people care. And because I also build products,
              the promise survives the first impression.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="primary">
                Bring me the problem
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="#fronts" variant="ghost">
                See the three fronts
              </ButtonLink>
              <a
                href={site.emailHref}
                className="inline-flex items-center gap-1.5 px-2 text-sm font-medium text-white/55 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4" />
                {site.email}
              </a>
            </div>
            <p className="mt-8 max-w-xl font-mono text-[0.56rem] uppercase leading-relaxed tracking-[0.14em] text-white/30">
              No bought followers · No fake reviews · No mystery retainers
            </p>
          </div>

          <aside className="glass-panel p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/35">
                  Currently
                </p>
                <p className="display mt-2 text-2xl text-white">Taking selected growth mandates</p>
              </div>
              <span className="icon-tile h-11 w-11 rounded-xl" data-tone="emerald" aria-hidden="true">
                <TrendingUp className="h-4 w-4" strokeWidth={1.7} />
              </span>
            </div>
            <div className="mt-6 space-y-3 text-sm leading-relaxed text-white/55">
              <p className="flex items-start gap-2.5">
                <Megaphone className="mt-0.5 h-4 w-4 shrink-0 text-white/35" />
                Growth hacking · market entry · PR · reputation
              </p>
              <p className="flex items-start gap-2.5">
                <Film className="mt-0.5 h-4 w-4 shrink-0 text-white/35" />
                Content, film, and creative direction
              </p>
              <p className="flex items-start gap-2.5">
                <Users className="mt-0.5 h-4 w-4 shrink-0 text-white/35" />
                Individuals, brands, companies, institutions
              </p>
              <a href={site.emailHref} className="flex items-start gap-2.5 hover:text-white">
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
              {site.location} · working remotely worldwide. I read every message
              myself and reply within two business days.
            </p>
          </aside>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-[#0a0b0d]/15 bg-[color:var(--acid)] py-3.5 text-[color:var(--acid-ink)]">
        <Marquee
          speed="fast"
          label="Growth & reputation"
          separator={<span className="mx-6 opacity-40">✦</span>}
          itemClassName="font-grotesk text-[0.82rem] font-semibold uppercase tracking-[0.08em]"
        >
          {[
            'Growth hacking',
            'Market entry',
            'PR strategy',
            'Reputation management',
            'Crisis readiness',
            'Narrative design',
            'Creative direction',
            'Film & edit',
            'Content systems',
            'Referral networks',
            'Search reputation',
            'Lagos → worldwide',
          ].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </Marquee>
      </div>

      {/* Diagnosis */}
      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow">The diagnosis</p>
            <h2 className="display mt-5 text-4xl text-white sm:text-5xl lg:text-6xl">
              Most growth problems are not{' '}
              <span className="iridescent-text italic">traffic problems.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/55">
              A brand can have reach and no trust, attention and no pipeline, a
              launch and no language for why it matters. I start by naming which
              system is actually stuck — then build the smallest intervention that
              changes the outcome.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {['Positioning', 'Network', 'Reputation', 'Narrative', 'Product'].map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10">
            {diagnostics.map((item, index) => (
              <div
                key={item.title}
                className="grid gap-3 border-b border-white/10 py-7 sm:grid-cols-[auto_1fr] sm:gap-6"
              >
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[color:var(--acid)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-white">{item.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/50">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three fronts */}
      <section id="fronts" className="section scroll-mt-24 border-t border-white/10 bg-ink-soft/40">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Three fronts"
              title={
                <>
                  Growth, reputation, and the{' '}
                  <span className="text-white/35">story that carries both.</span>
                </>
              }
              body="They are not separate services. A market entry needs a narrative, a reputation needs proof, and a campaign needs a product worth the attention."
            />
          </Reveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {fronts.map((front, index) => {
              const Icon = front.icon
              return (
                <Reveal key={front.name} delay={index * 0.06} className="h-full">
                  <article className="card card-glass group flex h-full flex-col p-7 sm:p-8">
                    <div className="card-spot" aria-hidden="true" />
                    <div className="flex items-start justify-between gap-4">
                      <span className="icon-tile h-12 w-12 rounded-2xl" data-tone="violet" aria-hidden="true">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/25">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="mt-6 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[#67e8f9]/70">
                      {front.tag}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                      {front.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">{front.body}</p>

                    <ul className="mt-6 space-y-2.5">
                      {front.outcomes.map((outcome) => (
                        <li key={outcome} className="flex gap-2.5 text-xs leading-relaxed text-white/50">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300/80" strokeWidth={2.2} />
                          {outcome}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {front.deliverables.slice(0, 4).map((item) => (
                        <span key={item} className="chip">
                          {item}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/contact?service=${front.slug}`}
                      className="mt-auto inline-flex items-center gap-1.5 border-t border-white/10 pt-5 text-xs font-medium text-white/60 transition-colors group-hover:text-white"
                    >
                      Discuss this front
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </article>
                </Reveal>
              )
            })}
          </div>

          <p className="mt-6 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/30">
            {growthServices.length} core fronts · {services.length} total offers across growth,
            reputation, design, engineering, security, and delivery
          </p>
        </div>
      </section>

      {/* How I think */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="How I think"
              title={
                <>
                  The answer is rarely the{' '}
                  <span className="text-white/35">obvious one.</span>
                </>
              }
              body="The differentiator is not a tool or a channel. It is the quality of the thinking before the first tactic — abstract enough to see the pattern, concrete enough to ship the move."
            />
          </Reveal>

          <div className="mt-12 border-t border-white/10">
            {growthThinking.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <div className="grid gap-4 border-b border-white/10 py-7 sm:grid-cols-[5rem_1fr] sm:gap-8">
                  <span className="font-grotesk text-3xl font-semibold text-white/20">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="grid gap-3 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
                    <h3 className="text-xl font-semibold tracking-tight text-white">{item.title}</h3>
                    <p className="max-w-2xl text-sm leading-relaxed text-white/50">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* One operator, four hands */}
      <section className="section border-t border-white/10 bg-ink-soft/40">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="One operator, four hands"
              title={
                <>
                  A studio in one person.{' '}
                  <span className="text-white/35">Without the handoffs.</span>
                </>
              }
              body="Most growth work loses its edge in the gap between the strategist, the writer, the director, and the engineer. I do all four, which is why the story and the system usually agree."
            />
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {hands.map((hand, index) => (
              <div key={hand.role} className="bg-ink p-7">
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[color:var(--acid)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">{hand.role}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{hand.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="max-w-xl text-sm leading-relaxed text-white/45">
              The same range covers the build: product architecture, custom
              software, AI automation, security, and the brand system around it.
            </p>
            <Link href="/services" className="k-link text-xs">
              See all {services.length} offers
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Engagements */}
      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <p className="eyebrow">Engagement models</p>
            <h2 className="display mt-5 text-4xl text-white sm:text-5xl">
              A shape that fits the room.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/55">
              Scope and fees are set after a short discovery conversation. No
              invented packages, no retainer for the sake of a retainer.
            </p>

            <div className="mt-8 space-y-3">
              {engagements.map((model) => (
                <div
                  key={model.name}
                  className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-white">{model.name}</h3>
                    <p className="mt-1 max-w-md text-xs leading-relaxed text-white/45">{model.body}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-white/30">
                    {model.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pt-10">
            <div className="rounded-[1.6rem] border border-[color:var(--acid)]/40 bg-[color:var(--acid)]/[0.05] p-7 sm:p-9">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-[color:var(--acid)]">
                What I will not do
              </p>
              <h3 className="display mt-4 text-3xl text-white sm:text-4xl">
                Growth without a conscience is just noise with a budget.
              </h3>
              <ul className="mt-7 space-y-3">
                {refusals.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/55">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--acid)]/70" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-t border-white/10 pt-5 text-xs leading-relaxed text-white/40">
                The work has to survive being looked at closely. That is the
                standard I would want applied to my own name.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={site.emailHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs font-medium text-white/65 transition-colors hover:border-white/30 hover:text-white"
              >
                <Mail className="h-3.5 w-3.5" />
                {site.email}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs font-medium text-white/65 transition-colors hover:border-white/30 hover:text-white"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-300" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#0b0d11]">
        <div className="grain absolute inset-0" aria-hidden="true" />
        <div className="shell relative py-20 sm:py-24">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="eyebrow">The next room</p>
              <h2 className="display mt-5 text-[clamp(2.6rem,6.4vw,5.4rem)] text-white">
                Tell me the room you need to{' '}
                <span className="iridescent-text italic">get into.</span>
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
                Bring the market, the brand, the reputation problem, or the story
                nobody has told properly yet. I will tell you what I see, what I
                would do first, and whether I am the right person for it.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="primary">
                Start a conversation
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/manifesto" variant="ghost">
                Read the manifesto
              </ButtonLink>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5">
            <p className="inline-flex items-center gap-2 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/35">
              <Search className="h-3 w-3" />
              Growth · reputation · story · product
            </p>
            <p className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/25">
              {site.location} · {site.availability}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
