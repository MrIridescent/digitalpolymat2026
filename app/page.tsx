import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowDownRight,
  ArrowUpRight,
  Download,
  Github,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
} from 'lucide-react'
import { AnimatedStat } from '@/components/motion/AnimatedStat'
import { PostCover } from '@/components/blog/PostCover'
import { ServicesIndex } from '@/components/home/ServicesIndex'
import { KineticIcon } from '@/components/kinetic/KineticIcon'
import { LocalClock } from '@/components/kinetic/LocalClock'
import { Magnetic } from '@/components/kinetic/Magnetic'
import { Marquee } from '@/components/kinetic/Marquee'
import { RailCarousel } from '@/components/kinetic/RailCarousel'
import { ScrollWords } from '@/components/kinetic/ScrollWords'
import { SplitLines } from '@/components/kinetic/SplitLines'
import { OrgLogo } from '@/components/site/OrgLogo'
import { formatPostDateShort, getPosts } from '@/lib/contentful'
import { featuredProjects, projects } from '@/lib/projects'
import {
  capabilities,
  hero,
  initiatives,
  interests,
  lenses,
  manifesto,
  services,
  site,
  socials,
  stats,
  whatsappLink,
} from '@/lib/profile'

const capabilityIcons = [
  'growth',
  'wave',
  'compass',
  'code',
  'workflow',
  'shield',
  'sparkles',
  'orbit',
] as const

const heroSocials = socials.filter((social) =>
  ['GitHub', 'LinkedIn', 'Linktree', 'X'].includes(social.label)
)

const toolkit = Array.from(new Set(capabilities.flatMap((capability) => capability.items)))

const frontier = interests.find((interest) => interest.title === 'Post-von-Neumann computing')

export default async function HomePage() {
  const posts = await getPosts()
  const journal = posts.slice(0, 4)
  const latestPost = journal[0]

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="aurora grain relative overflow-hidden pb-20 pt-32 sm:pb-12 sm:pt-36 lg:pt-40">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="orb -left-28 top-24 h-72 w-72 opacity-25" data-gsap-float aria-hidden="true" />
        <div className="orb orb-slow -right-24 top-64 h-[26rem] w-[26rem] opacity-20" data-gsap-float aria-hidden="true" />
        <div className="k-hero-bgword" aria-hidden="true">
          IRIDESCENT
        </div>

        <div className="shell-wide relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="k-mono flex shrink-0 items-center gap-2 whitespace-nowrap text-white/45">
              <span className="k-dot-live" aria-hidden="true" />
              <span className="sm:hidden">Lagos · growth, reputation, story</span>
              <span className="hidden sm:inline">
                {site.location} · growth, reputation, story
              </span>
            </p>
            <p className="k-mono text-white/25">Portfolio / 2026</p>
          </div>

          <div className="k-hero-grid mt-12">
            <div>
              <p className="k-mono text-white/40">David Akpoviroro Oke · Mr Iridescent</p>

              <h1 className="mt-6">
                <SplitLines
                  lines={[
                    'I find the',
                    'angle others',
                    'miss. Then I',
                    <span key="growth">
                      build the{' '}
                      <span className="k-serif italic k-acid">growth.</span>
                    </span>,
                  ]}
                  delay={160}
                  stagger={105}
                  lineClassName="k-title block text-[clamp(2.6rem,8.6vw,7.2rem)] text-white"
                />
              </h1>

              <p className="mt-7 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
                {hero.body}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Magnetic strength={7}>
                  <Link href={hero.primaryCta.href} className="k-btn k-btn-acid">
                    {hero.primaryCta.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Magnetic>
                <a href={hero.secondaryCta.href} className="k-btn" download>
                  <Download className="h-4 w-4" />
                  {hero.secondaryCta.label}
                </a>
                <Link href={hero.tertiaryCta.href} className="k-link ml-1">
                  {hero.tertiaryCta.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/10 pt-5">
                {heroSocials.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[0.7rem] font-medium text-white/40 transition-colors hover:text-white"
                  >
                    <OrgLogo name={social.label} size={17} />
                    {social.label}
                  </a>
                ))}
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[0.7rem] font-medium text-white/40 transition-colors hover:text-white"
                >
                  <MessageCircle className="h-3 w-3 text-emerald-300" />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[24rem] sm:max-w-[27rem] lg:max-w-[30rem]" data-parallax="8">
              <div
                className="absolute -inset-5 opacity-60 blur-3xl"
                style={{ background: 'var(--spectral-soft)' }}
                aria-hidden="true"
              />
              <div className="k-arch relative overflow-hidden border border-white/15 bg-ink-soft">
                <Image
                  src="/media/portraits/david-akpoviroro-oke.jpg"
                  alt="Portrait of David Akpoviroro Oke, also known as Mr Iridescent, the Creative Renaissance Man"
                  width={990}
                  height={1280}
                  priority
                  sizes="(max-width: 1024px) 86vw, 30rem"
                  className="aspect-[4/5] w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="k-sticker k-sticker-acid">
                    <LocalClock className="!text-[color:var(--acid)]" label="" />
                  </span>
                  <p className="mt-4 text-lg font-semibold text-white">
                    David Akpoviroro Oke
                  </p>
                  <p className="k-serif mt-1 text-2xl leading-tight text-white/75">
                    Mr Iridescent, the Creative Renaissance Man
                  </p>
                </div>
              </div>

              <div className="k-sticker absolute -left-5 top-10 hidden sm:inline-flex" data-gsap-float>
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--acid)]" />
                Growth · reputation · story
              </div>
              <div
                className="k-sticker absolute -right-4 bottom-28 hidden sm:inline-flex"
                data-gsap-float
              >
                34 repositories I authored
              </div>
              <div className="absolute -bottom-4 -right-3 hidden text-right sm:block" aria-hidden="true">
                <span className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-white/25">
                  fig. 01 — the polymath
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
            <p className="max-w-xl font-mono text-[0.56rem] uppercase leading-relaxed tracking-[0.14em] text-white/30">
              {hero.languageLine}
            </p>
            <p className="inline-flex items-center gap-2 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/30">
              <MapPin className="h-3 w-3" />
              {site.availability}
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Acid marquee                                                      */}
      {/* ---------------------------------------------------------------- */}
      <div className="border-y border-[#0a0b0d]/15 bg-[color:var(--acid)] py-3.5 text-[color:var(--acid-ink)]">
        <Marquee
          speed="fast"
          label="What I do"
          separator={<span className="mx-6 opacity-40">✦</span>}
          itemClassName="font-grotesk text-[0.82rem] font-semibold uppercase tracking-[0.08em]"
        >
          {[
            'Growth hacking',
            'Reputation management',
            'Public relations',
            'Market entry',
            'Creative direction',
            'Film & video',
            'Content systems',
            'Digital products',
            'Polymath code',
          ].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </Marquee>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Growth room                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="section">
        <div className="shell-wide">
          <div className="k-section-head">
            <div>
              <p className="k-index">
                <strong>01</strong>
                <span>Growth · reputation · story</span>
              </p>
              <h2 className="k-section-title mt-5 text-white">
                Before the build, the{' '}
                <span className="k-serif italic k-acid">angle.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/40">
              Growth is not a channel. It is the wedge, the narrative, and the
              proof that make the next room possible.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative flex flex-col justify-between overflow-hidden bg-[color:var(--acid)] p-7 text-[color:var(--acid-ink)] sm:p-10">
              <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full border border-black/10" aria-hidden="true" />
              <div>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-black/50">
                  The growth room
                </p>
                <h3 className="k-display mt-6 text-[clamp(3rem,7vw,6rem)]">
                  Growth
                  <br />
                  <span className="k-outline-ink">hacking</span>
                </h3>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-black/65 sm:text-base">
                  I find the unfair angle: the network, the narrative, or the
                  product wedge that lets a person, brand, or company enter a room
                  it was not invited to — then turn the first opening into a
                  repeatable route.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap items-end justify-between gap-4 border-t border-black/20 pt-5">
                <p className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-black/50">
                  Individuals · Brands · Companies
                </p>
                <Link
                  href="/growth"
                  className="inline-flex items-center gap-2 rounded-full bg-[#15161a] px-5 py-3 text-sm font-semibold text-[color:var(--acid)] transition-transform hover:-translate-y-0.5"
                >
                  Enter the growth room
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid bg-ink">
              {[
                {
                  title: 'Reputation & PR',
                  body: 'Own the narrative. Protect the name. Be repeated correctly.',
                  href: '/growth#fronts',
                },
                {
                  title: 'Market entry & networks',
                  body: 'Break into new cities, sectors, audiences, and rooms.',
                  href: '/growth#fronts',
                },
                {
                  title: 'Content, film & direction',
                  body: 'Write it, shoot it, cut it, direct the scene.',
                  href: '/growth#fronts',
                },
              ].map((item, index) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex items-start justify-between gap-6 border-b border-white/10 p-7 transition-colors last:border-b-0 hover:bg-ink-raised sm:p-8"
                >
                  <span className="flex gap-4">
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/25">
                      0{index + 2}
                    </span>
                    <span>
                      <span className="block font-grotesk text-xl font-semibold tracking-tight text-white sm:text-2xl">
                        {item.title}
                      </span>
                      <span className="mt-2 block max-w-sm text-sm leading-relaxed text-white/45">
                        {item.body}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-white/25 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--acid)]" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Selected work — carousel                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="section border-t border-white/10">
        <div className="shell-wide">
          <div className="k-section-head">
            <div>
              <p className="k-index">
                <strong>02</strong>
                <span>Selected work · 2024—2026</span>
              </p>
              <h2 className="k-section-title mt-5 text-white">
                Built, shipped, and{' '}
                <span className="k-serif italic text-white/40">public.</span>
              </h2>
            </div>
            <div className="flex items-center gap-5">
              <p className="hidden max-w-xs text-sm leading-relaxed text-white/40 sm:block">
                Products, platforms, security systems, AI, and civic
                infrastructure. Every card links to a public repository.
              </p>
              <Link href="/projects" className="k-btn shrink-0">
                All {projects.length} projects
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12">
            <RailCarousel label="Selected projects" slideClassName="h-full">
              {featuredProjects.map((project, index) => (
                <article
                  key={project.slug}
                  className="group flex h-full w-[86vw] max-w-[86vw] flex-col overflow-hidden border border-white/10 bg-ink-soft transition-colors hover:border-[color:var(--acid)] sm:w-[32rem] sm:max-w-none lg:w-[40rem]"
                >
                  <div className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${project.accent}`}>
                    <div className="absolute inset-0 bg-ink/45" aria-hidden="true" />
                    <div className="k-cover-grid opacity-40" aria-hidden="true" />
                    <div className="relative flex h-full flex-col justify-between p-6">
                      <div className="flex items-start justify-between gap-4">
                        <span className="k-sticker border-white/25 bg-ink/45 text-white/80">
                          {project.category}
                        </span>
                        <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/60">
                          {String(index + 1).padStart(2, '0')} / {String(featuredProjects.length).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="k-display max-w-[16ch] text-[clamp(1.8rem,3.4vw,3rem)] text-white">
                        {project.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-sm leading-relaxed text-white/55">{project.tagline}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 4).map((item) => (
                        <span
                          key={item}
                          className="border border-white/10 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-white/40"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                      <div className="flex items-center gap-4">
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-white/55 hover:text-white"
                        >
                          <Github className="h-3.5 w-3.5" />
                          Repository
                        </a>
                        {project.live ? (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-white/55 hover:text-white"
                          >
                            <Globe className="h-3.5 w-3.5" />
                            Live
                          </a>
                        ) : null}
                      </div>
                      <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/25">
                        {project.license ?? 'Public'}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </RailCarousel>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Services index                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section className="section border-t border-white/10 bg-ink-soft/40">
        <div className="shell">
          <div className="k-section-head">
            <div>
              <p className="k-index">
                <strong>03</strong>
                <span>Ways to work together</span>
              </p>
              <h2 className="k-section-title mt-5 text-white">
                From angle to a system{' '}
                <span className="k-serif italic text-white/40">that ships.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/40">
              Open a row to see what the engagement actually produces. Growth,
              reputation, story, and the product that carries them.
            </p>
          </div>

          <div className="mt-12">
            <ServicesIndex services={services} />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/30">
              Growth · Reputation · Content · Builds · Security
            </p>
            <Link href="/services" className="k-link text-xs">
              See the full offer
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Capabilities + frontier                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="section">
        <div className="shell-wide">
          <div className="k-section-head">
            <div>
              <p className="k-index">
                <strong>04</strong>
                <span>Capabilities</span>
              </p>
              <h2 className="k-section-title mt-5 text-white">
                A wide surface.{' '}
                <span className="k-serif italic text-white/40">One standard.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/40">
              The through-line is not a single stack or a single channel. It is
              the habit of learning the domain deeply enough to find the real
              lever.
            </p>
          </div>

          <div className="mt-10 border-y border-white/10 py-4">
            <Marquee
              speed="slow"
              direction="right"
              label="Toolkit"
              separator={<span className="mx-3 text-[color:var(--acid)]">·</span>}
              itemClassName="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/40"
            >
              {toolkit.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </Marquee>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability, index) => (
              <div
                key={capability.title}
                className="group relative bg-ink p-6 transition-colors hover:bg-ink-raised sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[color:var(--acid)]">
                    <KineticIcon name={capabilityIcons[index] ?? 'sparkles'} size={20} />
                  </span>
                  <span className="font-mono text-[0.58rem] text-white/20">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                  {capability.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">
                  {capability.summary}
                </p>
                <p className="mt-5 font-mono text-[0.55rem] uppercase leading-relaxed tracking-[0.1em] text-white/30">
                  {capability.items.slice(0, 5).join(' · ')}
                </p>
              </div>
            ))}
          </div>

          {frontier ? (
            <div
              className="mt-8 grid gap-8 border border-[color:var(--acid)] p-6 sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"
              style={{
                background:
                  'linear-gradient(115deg, rgba(201,242,75,0.10), rgba(201,242,75,0.015) 62%)',
              }}
            >
              <div>
                <p className="k-mono text-[color:var(--acid)]">Research frontier</p>
                <h3 className="k-display mt-4 text-[clamp(2rem,5vw,4rem)] text-white">
                  Beyond von <span className="k-outline">Neumann</span>.
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/50">
                  Quantum computing, neuromorphic architectures, and models of
                  computation that are differently shaped rather than merely
                  faster. Studied seriously; stated honestly as an interest.
                </p>
              </div>
              <div>
                <p className="max-w-xl text-sm leading-relaxed text-white/55">
                  {frontier.body}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {frontier.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[#c9f24b]/40 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-[color:var(--acid)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-5 font-mono text-[0.56rem] uppercase leading-relaxed tracking-[0.12em] text-white/35">
                  Also following · Cyber-physical systems · Cybernetics ·
                  Brain–computer interfaces
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <span className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/30">
                    Daily languages · Rust · Java · Python
                  </span>
                  <Link href="/emerging-tech" className="k-link text-xs">
                    Emerging technology
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* The range — nine lenses                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="section border-t border-white/10 bg-ink-soft/40">
        <div className="shell-wide">
          <div className="k-section-head">
            <div>
              <p className="k-index">
                <strong>05</strong>
                <span>The range</span>
              </p>
              <h2 className="k-section-title mt-5 text-white">
                Nine ways of seeing.{' '}
                <span className="k-serif italic text-white/40">One pair of hands.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/40">
              The range is not a list of hobbies. It is how the work gets made:
              words, systems, images, movement, sound, people, judgement, place,
              and meaning, all in the same room.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {lenses.map((lens, index) => (
              <div
                key={lens.name}
                className="group relative bg-ink p-6 transition-colors hover:bg-ink-raised sm:p-7"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/25">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-[color:var(--acid)] opacity-30 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="k-serif mt-7 text-3xl leading-none text-white">{lens.name}</h3>
                <p className="mt-2 text-sm font-medium text-[color:var(--acid)]/80">{lens.line}</p>
                <p className="mt-4 text-sm leading-relaxed text-white/45">{lens.practice}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-2xl font-mono text-[0.55rem] uppercase leading-relaxed tracking-[0.14em] text-white/30">
            The test is not whether one person can do everything. It is whether
            the range makes the outcome more coherent.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Method — scroll-lit statement                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="section border-t border-white/10 bg-ink-soft/30">
        <div className="shell">
          <p className="k-index">
            <strong>06</strong>
            <span>The method</span>
          </p>
          <ScrollWords
            text={manifesto.statement}
            accent={['growth', 'angle', 'reputation', 'story', 'product', 'narrative']}
            className="k-title mt-8 max-w-5xl text-[clamp(1.75rem,4vw,3.6rem)] leading-[1.14] text-white"
          />
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-6">
            <Link href="/manifesto" className="k-btn">
              Read the manifesto
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/growth" className="k-link text-sm">
              The growth room
            </Link>
            <Link href="/philosophy" className="k-link text-sm">
              The operating principles
            </Link>
            <Link href="/advocacy" className="k-link text-sm">
              Green software & Agenda 2063
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Journal                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="section border-t border-white/10">
        <div className="shell-wide">
          <div className="k-section-head">
            <div>
              <p className="k-index">
                <strong>07</strong>
                <span>Journal · {String(posts.length).padStart(2, '0')} entries</span>
              </p>
              <h2 className="k-section-title mt-5 text-white">
                Notes from{' '}
                <span className="k-serif italic text-white/40">the work.</span>
              </h2>
            </div>
            <Link href="/blog" className="k-btn shrink-0">
              Read the journal
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12">
            <RailCarousel label="Journal entries" slideClassName="h-full">
              {journal.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex h-full w-[82vw] max-w-[82vw] flex-col border border-white/10 bg-ink-soft transition-colors hover:border-[color:var(--acid)] sm:w-[24rem] sm:max-w-none"
                >
                  <PostCover post={post} index={index} className="aspect-[16/10]" />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between gap-4 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/35">
                      <time dateTime={post.publishedAt}>
                        {formatPostDateShort(post.publishedAt)}
                      </time>
                      <span>{post.readingMinutes} min</span>
                    </div>
                    <h3 className="k-serif mt-3 text-2xl leading-tight text-white transition-colors group-hover:text-[color:var(--acid)]">
                      {post.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-white/45">
                      {post.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 border-t border-white/10 pt-4 text-xs font-medium text-white/50 group-hover:text-white">
                      Read the note
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </RailCarousel>
          </div>

          {latestPost ? (
            <p className="mt-6 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/25">
              Latest · {latestPost.title} ·{' '}
              {latestPost.source === 'contentful' ? 'Contentful' : 'Local archive'}
            </p>
          ) : null}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Civic infrastructure — paper band                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="paper relative overflow-hidden">
        <div className="shell relative py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-black/45">
                08 · Civic infrastructure
              </p>
              <h2 className="font-grotesk mt-5 text-[clamp(2.6rem,6.4vw,5.4rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-[#15161a]">
                Culture is
                <br />
                <span className="k-outline-ink">infrastructure.</span>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-black/60 sm:text-base">
                I treat public systems with the same rigour as commercial ones:
                roads that report their own condition, creators who keep
                ownership of their work, and software that respects the device
                and bandwidth people actually have.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/advocacy"
                  className="inline-flex items-center gap-2 rounded-full bg-[#15161a] px-5 py-3 text-sm font-semibold text-[color:var(--acid)] transition-transform hover:-translate-y-0.5"
                >
                  Green software & Agenda 2063
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:pt-10">
              <div className="border-t border-black/15">
                {initiatives.map((initiative, index) => (
                  <Link
                    key={initiative.name}
                    href={initiative.href}
                    className="group grid gap-3 border-b border-black/15 py-6 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-6"
                  >
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-black/35">
                      0{index + 1}
                    </span>
                    <span>
                      <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-grotesk text-2xl font-semibold tracking-tight text-[#15161a]">
                          {initiative.name}
                        </span>
                        <span className="font-mono text-[0.52rem] uppercase tracking-[0.14em] text-black/40">
                          {initiative.kind} · {initiative.status}
                        </span>
                      </span>
                      <span className="mt-2 block max-w-lg text-sm leading-relaxed text-black/55">
                        {initiative.summary}
                      </span>
                      <span className="mt-2 block font-mono text-[0.55rem] uppercase tracking-[0.12em] text-black/40">
                        {initiative.role}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-black/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black" />
                  </Link>
                ))}
              </div>
              <p className="mt-6 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-black/40">
                {site.origin} · building from Lagos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Numbers                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y border-white/10 bg-ink-soft/60">
        <div className="shell grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-2 py-9 sm:px-6 ${index > 0 ? 'border-l border-white/10' : ''} ${
                index === 2 ? 'border-l-0 lg:border-l' : ''
              }`}
            >
              <AnimatedStat
                value={stat.value}
                className="k-title block text-[clamp(2.6rem,5vw,4.4rem)] text-white"
              />
              <p className="mt-2 text-xs leading-relaxed text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Closing CTA                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-[color:var(--acid)] text-[color:var(--acid-ink)]">
        <div className="border-b border-[#0a0b0d]/15 py-3.5">
          <Marquee
            speed="normal"
            label="Availability"
            separator={<span className="mx-6 opacity-35">✦</span>}
            itemClassName="font-grotesk text-[0.8rem] font-semibold uppercase tracking-[0.1em]"
          >
            {[
              'Open to growth mandates',
              'Reputation & PR',
              'Content & film',
              'Selected product builds',
              'Lagos · worldwide',
            ].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </Marquee>
        </div>

        <div className="shell relative py-20 text-center sm:py-28">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-black/50">
            Have a problem that needs a different angle?
          </p>
          <h2 className="k-display mx-auto mt-6 max-w-5xl text-[clamp(2.8rem,9vw,8rem)] leading-[0.84] text-[#0a0b0d]">
            Let&rsquo;s find
            <br />
            the <span className="k-serif italic normal-case tracking-normal">angle</span>.
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-black/60 sm:text-base">
            Bring the market you cannot get into, the brand being misread, the
            product that needs to exist, or the story nobody has told properly. I
            will tell you what I see, what I would do first, and what to leave
            alone.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="k-btn k-btn-solid">
              Start a conversation
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="k-btn !border-[#0a0b0d]/25 !text-[#0a0b0d]"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={site.emailHref}
              className="inline-flex items-center gap-1.5 px-2 text-sm font-medium text-black/60 hover:text-black"
            >
              <Mail className="h-3.5 w-3.5" />
              {site.email}
            </a>
            <Link
              href="/resume"
              className="inline-flex items-center gap-1.5 px-2 text-sm font-medium text-black/60 hover:text-black"
            >
              Résumé
              <ArrowDownRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <p className="mt-10 inline-flex items-center gap-2 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-black/45">
            <MapPin className="h-3 w-3" />
            {site.location} · <LocalClock className="!text-black/45" />
          </p>
        </div>
      </section>
    </>
  )
}
