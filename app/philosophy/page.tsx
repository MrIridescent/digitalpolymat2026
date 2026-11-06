import Link from 'next/link'
import { Aperture, ArrowUpRight, Clapperboard, Crop, Palette } from 'lucide-react'
import { ButtonLink } from '@/components/site/ButtonLink'
import { SectionHeading } from '@/components/site/SectionHeading'
import { site } from '@/lib/profile'

const philosophies = [
  {
    title: 'The intersection imperative',
    summary:
      'True innovation emerges at the convergence of disciplines. I reject the artificial silos that fragment knowledge and work in the spaces where breakthrough insights are born.',
    body:
      'When security principles inform user experience, when artistic sensibilities guide architecture, and when philosophical frameworks shape implementation, the result is more than the sum of its parts. The hardest problems of this century will not be solved by one department.',
    examples: [
      'Game theory applied to threat modelling',
      'Musical composition principles in API design',
      'Psychology in interface architecture',
      'Biological systems thinking in distributed computing',
    ],
  },
  {
    title: 'Continuous renaissance',
    summary:
      'Learning never ends. I try to keep a beginner’s mind across disciplines, expanding the intersection points and staying honest about what I do not yet know.',
    body:
      'Every challenge is a teacher. From debugging DHTML in the early 2000s to architecting AI systems today, each obstacle becomes a pattern that outlives the technology that produced it. The Renaissance ideal was never omniscience; it was curiosity without permission.',
    examples: [
      'Ancient philosophy informing modern AI ethics',
      'Biological systems improving software resilience',
      'Design thinking applied to security protocols',
      'Storytelling principles in technical writing',
    ],
  },
  {
    title: 'Solution-first thinking',
    summary:
      'I do not just write code — I solve problems. Technology is the means, not the end, and every line should serve a human outcome.',
    body:
      'The question is never “what technology should we use?” but “what problem are we solving, and what is the most elegant path to resolution?” Sometimes that path is a week of learning. Often it is a boring, reliable choice that everybody can maintain.',
    examples: [
      'Simplicity over complexity when simple solutions suffice',
      'User experience over technical elegance',
      'Proven technology over trends when appropriate',
      'Maintainability over cleverness',
    ],
  },
  {
    title: 'Ethical technology leadership',
    summary:
      'Technical capability carries responsibility. Technology is never neutral — it embodies the values of the people who build it.',
    body:
      'I try to integrate ethical reasoning, social awareness, and long-term thinking into technical decisions. That means asking not only what we can build, but what we should build, who carries the risk, and who is missing from the room.',
    examples: [
      'Privacy by design in every system',
      'Algorithmic bias considered before deployment',
      'Accessibility designed in from the start',
      'Long-term societal impact assessed honestly',
    ],
  },
  {
    title: 'Emergent complexity navigation',
    summary:
      'Complex systems develop properties that cannot be predicted from their components alone. I try to work with uncertainty instead of pretending it away.',
    body:
      'Rather than trying to control complexity, I design for adaptation: feedback loops, graceful failure, and modular boundaries that can evolve. The most interesting solutions often emerge from the interaction between parts, not from any single part.',
    examples: [
      'Systems that handle unexpected inputs gracefully',
      'Feedback loops built in for continuous adaptation',
      'Modular architecture that can evolve organically',
      'Failure treated as information, not shame',
    ],
  },
]

const cinematographyMatrix = [
  {
    icon: Aperture,
    title: 'Exposure & dynamic range',
    body:
      'What is allowed to be seen, and what is lost to the shadows. In a product, this is observability: logs, metrics, and the honesty to show the parts that are not flattering.',
    craft: 'Latitude · highlights · shadow detail',
  },
  {
    icon: Crop,
    title: 'Composition & framing',
    body:
      'The frame is an argument about what matters. Every screen and every roadmap excludes something; the craft is choosing the exclusion deliberately.',
    craft: 'Scope · hierarchy · negative space',
  },
  {
    icon: Clapperboard,
    title: 'Rhythm & montage',
    body:
      'Meaning lives in the cut. A release cadence, an interaction, and a sentence all have timing; the same content lands differently at a different pace.',
    craft: 'Pacing · sequence · attention',
  },
  {
    icon: Palette,
    title: 'Colour science & grading',
    body:
      'Colour is felt before it is understood. A design system is a grade: it sets the emotional temperature and must stay consistent across every scene.',
    craft: 'Palette · contrast · mood',
  },
]

const guidingPrinciples = [
  {
    title: 'Adaptive intelligence',
    body:
      'The ability to move between analytical and creative modes, balancing technical precision with humanistic judgement.',
  },
  {
    title: 'Emergent problem-solving',
    body:
      'Complex challenges rarely have predetermined answers. I make room for experimentation and let the solution emerge from evidence.',
  },
  {
    title: 'Human-centred technology',
    body:
      'The ultimate measure of a system is its effect on people. Usability is the floor; dignity and agency are the standard.',
  },
  {
    title: 'Systems thinking',
    body:
      'Understanding interconnections and patterns across domains, then synthesising insights rather than defending a silo.',
  },
]

const manifesto = {
  believe: [
    'Cross-disciplinary innovation over narrow specialisation',
    'Synthesis over analysis alone',
    'Adaptive intelligence over rigid expertise',
    'Human-centred technology over technology for its own sake',
    'Continuous learning over static knowledge',
    'Emergent solutions over predetermined outcomes',
    'Intellectual humility over false certainty',
    'Systems thinking over reductionist approaches',
  ],
  reject: [
    'Artificial silos that fragment knowledge',
    'Technology without ethical consideration',
    'Solutions that ignore human complexity',
    'Innovation without responsibility',
    'Expertise that cannot adapt',
    'The myth of the single genius',
    'Binary thinking in complex domains',
    'Optimisation without understanding purpose',
  ],
}

export default function PhilosophyPage() {
  return (
    <>
      <section className="aurora grain relative overflow-hidden pb-16 pt-32 sm:pt-36">
        <div className="shell relative">
          <p className="eyebrow animate-rise">Philosophy · how I work</p>
          <h1 className="display animate-rise delay-1 mt-6 max-w-4xl text-[clamp(2.9rem,6.4vw,5.6rem)] text-white">
            A generalist by design.{' '}
            <span className="iridescent-text italic">An engineer by practice.</span>
          </h1>
          <p className="animate-rise delay-2 mt-7 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
            My work is rooted in the Renaissance idea that mastery comes from
            understanding the connections between art, science, technology, and
            human experience. In an age of accelerating complexity, that habit is
            not a luxury. It is a survival skill.
          </p>
          <div className="animate-rise delay-3 mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/projects" variant="primary">
              See the practice
              <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/about" variant="ghost">
              Read the story
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="shell">
          <SectionHeading
            eyebrow="Core philosophies"
            title={
              <>
                Five ideas that <span className="text-white/35">survive contact.</span>
              </>
            }
            body="These are not slogans. They are the filters I use when a decision is ambiguous and the obvious answer is probably incomplete."
          />

          <div className="mt-12 space-y-4">
            {philosophies.map((item, index) => (
              <article
                key={item.title}
                className="grid gap-8 rounded-2xl border border-white/10 bg-ink-soft p-7 sm:p-9 lg:grid-cols-[0.42fr_0.58fr]"
              >
                <div>
                  <span className="font-mono text-[0.65rem] text-white/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="mt-5 text-2xl font-semibold tracking-tight text-white">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">
                    {item.summary}
                  </p>
                </div>

                <div className="space-y-5">
                  <p className="text-sm leading-relaxed text-white/55">{item.body}</p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {item.examples.map((example) => (
                      <li
                        key={example}
                        className="flex items-start gap-2 text-xs leading-relaxed text-white/40"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#67e8f9]" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="paper section">
        <div className="shell">
          <p className="eyebrow">The polymathic manifesto</p>
          <h2 className="display mt-5 max-w-3xl text-4xl text-[#15161a] sm:text-5xl">
            A position, not a personality.
          </h2>

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[#15161a]/50">
                I believe in
              </h3>
              <ul className="mt-5 space-y-3">
                {manifesto.believe.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-sm text-[#15161a]/75">
                    <span className="mt-0.5 text-[#15161a]/35">+</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[#15161a]/50">
                I reject
              </h3>
              <ul className="mt-5 space-y-3">
                {manifesto.reject.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-sm text-[#15161a]/75">
                    <span className="mt-0.5 text-[#15161a]/35">×</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-black/10 pt-8">
            <h3 className="text-lg font-semibold text-[#15161a]">The polymathic imperative</h3>
            <div className="mt-4 grid gap-5 text-sm leading-relaxed text-[#15161a]/65 md:grid-cols-2">
              <p>
                The challenges we face — from climate change to AI ethics, from
                security to inequality — cannot be solved by a single discipline.
                They require what I call cognitive bridging: translating insight
                across domains and synthesising solutions that respect the
                interconnected nature of reality.
              </p>
              <p>
                This is not dilettantism. It is deep expertise in more than one
                place, combined with the agility to see patterns specialists miss.
                The goal is to become a translator between worlds of knowledge,
                not a tourist in all of them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="shell">
          <SectionHeading
            eyebrow="Guiding principles"
            title={
              <>
                The habits behind <span className="text-white/35">the decisions.</span>
              </>
            }
          />
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
            {guidingPrinciples.map((principle) => (
              <div key={principle.title} className="bg-ink-soft p-7 sm:p-8">
                <h3 className="text-lg font-semibold text-white">{principle.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="shell">
          <SectionHeading
            eyebrow="Arte & Scienza · cinematography"
            title={
              <>
                The cinematography{' '}
                <span className="text-white/35">matrix.</span>
              </>
            }
            body="Cinematography is the clearest example I know of art and science operating as one discipline. I use its four decisions as a second lens on interface, brand, and delivery."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cinematographyMatrix.map((item, index) => {
              const Icon = item.icon
              return (
                <article key={item.title} className="card h-full p-6">
                  <div className="card-spot" aria-hidden="true" />
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#c4b5fd]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="font-mono text-[0.55rem] text-white/25">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {item.body}
                  </p>
                  <p className="mt-4 border-t border-white/10 pt-3 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-white/30">
                    {item.craft}
                  </p>
                </article>
              )
            })}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <figure className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
              <blockquote className="display text-2xl leading-snug text-white/85">
                “Light is the first element of cinematography.”
              </blockquote>
              <figcaption className="mt-4 text-sm text-white/45">
                Vittorio Storaro
                <span className="mt-1 block font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/25">
                  Cinematographer · three Academy Awards
                </span>
              </figcaption>
            </figure>
            <figure className="rounded-2xl border border-white/10 bg-white/[0.02] p-7">
              <blockquote className="display text-2xl leading-snug text-white/85">
                “The screen is a magic medium. It has such power that it can
                retain interest as it conveys emotions and moods that no other
                art form can hope to tackle.”
              </blockquote>
              <figcaption className="mt-4 text-sm text-white/45">
                Stanley Kubrick
                <span className="mt-1 block font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/25">
                  Filmmaker · 2001: A Space Odyssey
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section border-t border-white/10 bg-ink-soft/40">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <p className="eyebrow">The Da Vinci connection</p>
            <h2 className="display mt-5 text-4xl text-white sm:text-5xl">
              The boundaries were{' '}
              <span className="iridescent-text italic">always artificial.</span>
            </h2>
            <div className="mt-7 space-y-5 text-sm leading-relaxed text-white/55">
              <p>
                Leonardo painted the Mona Lisa, designed flying machines, studied
                anatomy, and engineered waterways. The disciplines were not
                separate projects. They were one curiosity applied to different
                materials.
              </p>
              <p>
                Today I build applications and design interfaces, analyse security
                threats and create visual work, architect systems and explain them
                to people who will never read the code. The tools have changed. The
                spirit has not.
              </p>
            </div>
          </div>

          <figure className="flex flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <blockquote className="display text-2xl leading-snug text-white/85">
              “Learning never exhausts the mind. Simplicity is the ultimate
              sophistication.”
            </blockquote>
            <figcaption className="mt-6 text-sm text-white/45">
              Leonardo da Vinci
              <span className="mt-2 block font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/25">
                Principles that guide the work
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="shell text-center">
          <p className="eyebrow justify-center">The mission</p>
          <h2 className="display mx-auto mt-5 max-w-4xl text-4xl text-white sm:text-5xl">
            Build technology that does not merely work —{' '}
            <span className="iridescent-text italic">it serves.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/50">
            To turn bold ideas into secure, effective platforms that help people
            succeed without asking them to surrender their privacy, their agency,
            or their attention. That is the standard I hold the work to.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/contact" variant="primary">
              Start a conversation
              <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
            <Link href="/writings" className="btn btn-ghost">
              Read the notes
            </Link>
          </div>
          <p className="mt-8 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/30">
            {site.location} · working worldwide
          </p>
        </div>
      </section>
    </>
  )
}
