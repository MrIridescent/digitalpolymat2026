import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin, MessageCircle } from 'lucide-react'
import { ButtonLink } from '@/components/site/ButtonLink'
import { OrgLogo } from '@/components/site/OrgLogo'
import { SectionHeading } from '@/components/site/SectionHeading'
import { BreadcrumbStructuredData, ProfilePageStructuredData } from '@/components/StructuredData'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'
import {
  credentials,
  currentRoles,
  education,
  experience,
  initiatives,
  now,
  principles,
  site,
  values,
  whatsappLink,
} from '@/lib/profile'

export const metadata: Metadata = generateMetaTags(
  pageMetadata.about.title,
  pageMetadata.about.description,
  ['about David Akpoviroro Oke', 'Mr Iridescent', 'growth hacker Lagos', 'growth partner for brands', 'PR and reputation strategist', 'Digital Product Delivery Architect', 'creative renaissance man', 'software engineer Lagos', 'FEPAR.africa'],
  '/about'
)

export default function AboutPage() {
  return (
    <div className="pt-16">
      <ProfilePageStructuredData />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]}
      />
      <section className="aurora grain border-b border-white/10 pb-16 pt-20 sm:pt-24">
        <div className="shell grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="eyebrow">About · {site.alias}</p>
            <h1 className="display mt-6 text-5xl text-white sm:text-6xl lg:text-7xl">
              A growth partner’s instinct.{' '}
              <span className="iridescent-text italic">An engineer’s mind.</span>{' '}
              A director’s eye.
            </h1>
            <div className="mt-7 max-w-2xl space-y-5 text-base leading-relaxed text-white/60">
              <p>
                I am David Akpoviroro Oke — Mr Iridescent, the Creative
                Renaissance Man. I work as a growth hacker and growth partner to
                individuals, brands, and companies, with public relations and
                reputation management, content and film, and digital product
                delivery in the same practice. I am based in Lagos and work
                worldwide.
              </p>
              <p>
                The range is intentional. I am an abstract conceptualiser and
                divergent thinker by temperament: I look for the pattern beneath
                the brief, generate options other people skip, and then build the
                thing. Engineering, design, narrative, security, art, and business
                stop pretending they are separate.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {currentRoles.map((role) => (
                <span key={role.org} className="chip inline-flex items-center gap-2">
                  <OrgLogo name={role.org} size={20} />
                  {role.title} · {role.org}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/40">
              {[
                { label: 'What I do', href: '/services' },
                { label: 'Credentials', href: '/credentials' },
                { label: 'Manifesto', href: '/manifesto' },
                { label: 'Green software', href: '/advocacy' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1 transition-colors hover:text-white"
                >
                  {link.label}
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="primary">
                Start a conversation
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href="/documents/David-Oke-Resume-2026.pdf"
                variant="ghost"
                download
              >
                Download résumé
              </ButtonLink>
            </div>
          </div>

          <aside className="lg:pt-8">
            <div className="overflow-hidden rounded-[1.6rem] border border-white/15 bg-ink-soft">
              <Image
                src="/media/portraits/david-akpoviroro-oke.jpg"
                alt="David Akpoviroro Oke"
                width={990}
                height={1280}
                sizes="(max-width: 1024px) 90vw, 420px"
                className="aspect-[4/5] w-full object-cover object-center"
              />
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
              <div className="bg-ink-soft p-4">
                <dt className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/35">
                  Based in
                </dt>
                <dd className="mt-1.5 text-sm text-white/70">{site.location}</dd>
              </div>
              <div className="bg-ink-soft p-4">
                <dt className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/35">
                  Working
                </dt>
                <dd className="mt-1.5 text-sm text-white/70">Worldwide, remote</dd>
              </div>
              <div className="bg-ink-soft p-4">
                <dt className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/35">
                  Languages
                </dt>
                <dd className="mt-1.5 text-sm text-white/70">
                  English (professional) · French &amp; Yoruba (conversational) · basic Hausa, Urhobo, Okpe
                </dd>
              </div>
              <div className="bg-ink-soft p-4">
                <dt className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/35">
                  Availability
                </dt>
                <dd className="mt-1.5 text-sm text-white/70">Open</dd>
              </div>
            </dl>

            <a
              href={site.emailHref}
              className="mt-5 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-ink-soft px-4 py-3.5 text-sm text-white/60 transition-colors hover:border-white/25 hover:text-white"
            >
              <Mail className="h-4 w-4 text-[#c9f24b]" />
              {site.email}
            </a>

            <div className="mt-5 rounded-2xl border border-white/10 bg-[#f7f5ef] p-4">
              <Image
                src="/media/brand/mr-iridescent-logo.png"
                alt="Mr Iridescent — crowned MR monogram with the iridescent eye"
                width={768}
                height={768}
                className="h-auto w-full"
              />
              <p className="mt-2 text-center font-mono text-[0.52rem] uppercase tracking-[0.16em] text-[#15161a]/40">
                The personal brand · est. Lagos
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Story */}
      <section className="section-tight">
        <div className="shell grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow">The long version</p>
            <h2 className="display mt-5 text-4xl text-white sm:text-5xl">
              A career shaped by following the interesting problem.
            </h2>
          </div>

          <div className="space-y-6 text-base leading-relaxed text-white/60">
            <p>
              I have been online since 2002 and building for the web since 2004.
              My first years were spent freelancing across Nigeria, learning the
              fundamentals by shipping real pages for real clients — and learning
              that a good relationship is as important as a good build.
            </p>
            <p>
              In 2015 I founded Iridescent Internet Solutions. The company was
              incorporated in 2017 and grew into a studio delivering web and
              mobile applications, secure systems, and digital strategy for
              startups and established organisations.
            </p>
            <p>
              Between 2017 and 2019 I worked as a Digital Project Manager at ITChef
              Nigeria, translating client objectives into delivery plans and
              leading cross-functional teams. Later roles in SMS marketing, SEO,
              and email marketing added a growth lens that most engineers never
              get: the discipline of measuring whether the thing actually worked.
              In 2024 and 2025 I worked as a Growth Partner at Helpman Analytics,
              where data and positioning met the harder question of how a brand
              earns a room.
            </p>
            <p>
              From 2021 onward I trained through Cisco Networking Academy and
              NITDA in CyberOps, ethical hacking, endpoint security, cyber threat
              management, and — in 2026 — network defence. That training changed
              how I build: threat models belong in the first design conversation,
              not the last sprint.
            </p>
            <p>
              Alongside the engineering, I kept a parallel practice in image and
              story: writing, photography, video editing, shooting, and directing
              scenes. Dance and movement trained the timing I use in an edit; six
              languages trained the ear I use in a room. I am an art lover and
              appreciator, moving deliberately toward collecting and curating —
              looking longer, learning the history, and building an eye that can
              tell the difference between fashionable and true.
            </p>
            <p>
              Today I work as a growth partner and Digital Product Delivery
              Architect through Iridescent Internet Solutions, helping people,
              brands, and companies find the angle, tell the story, and build the
              system that ships. I chair the Board of Trustees of FEPAR.africa —
              Festac PanAfrican Renaissance Initiatives and/or diaspora
              foundations, under the brand FEPAR.africa — and I studied computer
              science at the University of the People from 2024 to 2026. The
              chapters at Zandbox and Helpman Analytics have concluded; they stay
              in the timeline because the lessons did.
            </p>
            <p>
              The through-line is not a job title. It is the habit of learning the
              domain deeply enough to find the real lever — and of leaving the
              place better than I found it, in code, culture, and climate.
            </p>
          </div>
        </div>
      </section>

      {/* The practice */}
      <section className="section-tight border-t border-white/10">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow">The practice</p>
            <h2 className="display mt-5 text-4xl text-white sm:text-5xl">
              One person, <span className="text-white/35">several rooms.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
              The range is not a claim to be good at everything. It is a set of
              capacities that make the same outcome more coherent: the angle, the
              story, the system, and the taste that holds them together.
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
            {[
              {
                title: 'Growth & reputation',
                body: 'I find the angle, enter the new network, and protect the public record — for individuals, brands, companies, and institutions.',
              },
              {
                title: 'Story & image',
                body: 'Writing, photography, video editing, shooting, and directing scenes. The content and campaign system that makes the growth visible.',
              },
              {
                title: 'Systems & code',
                body: 'Architecture, full-stack products, AI, automation, and security. A polymath coder who still ships and can explain the trade-offs plainly.',
              },
              {
                title: 'Taste & culture',
                body: 'Art, aesthetics, and curation-in-progress. The references and judgement that make a brand feel inevitable rather than assembled. Collector and curator in the making — a way of training the eye, not a service I sell yet.',
              },
            ].map((item, index) => (
              <div key={item.title} className="bg-ink p-7 sm:p-9">
                <span className="font-mono text-[0.65rem] text-white/30">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="section border-t border-white/10">
        <div className="shell">
          <SectionHeading
            eyebrow="Experience"
            title={
              <>
                A timeline, <span className="text-white/35">not a highlight reel.</span>
              </>
            }
            body="The roles, turns, and detours that produced the current practice."
          />

          <ol className="mt-12 grid gap-x-12 gap-y-0 md:grid-cols-2">
            {experience.map((item) => (
              <li
                key={`${item.period}-${item.role}`}
                className="grid grid-cols-[7rem_1fr] gap-4 border-t border-white/10 py-6 sm:grid-cols-[9rem_1fr]"
              >
                <div className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/35">
                  {item.period}
                  {item.current && (
                    <span className="mt-2 flex items-center gap-1.5 text-[#67e8f9]">
                      <span className="h-1 w-1 rounded-full bg-[#67e8f9]" />
                      Now
                    </span>
                  )}
                  {item.ended && (
                    <span className="mt-2 flex items-center gap-1.5 text-white/30">
                      <span className="h-1 w-1 rounded-full bg-white/30" />
                      Ended
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {item.role}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-2.5">
                    <OrgLogo name={item.org} size={28} />
                    <p className="text-sm text-white/45">{item.org}</p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Civic & cultural initiatives */}
      <section id="initiatives" className="section border-t border-white/10 bg-ink-soft/40">
        <div className="shell">
          <SectionHeading
            eyebrow="Civic & cultural systems"
            title={
              <>
                Work that outlives <span className="text-white/35">a sprint.</span>
              </>
            }
            body="Two long-horizon projects: one for the roads people use every day, one for the creators who make the culture. Both are public, and both are honest about what is built versus what is designed."
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {initiatives.map((initiative, index) => {
              const external = initiative.href.startsWith('http')
              return (
                <a
                  key={initiative.name}
                  href={initiative.href}
                  {...(external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="card group flex h-full flex-col p-7 sm:p-9"
                >
                  <div className="card-spot" aria-hidden="true" />
                  <div className="flex items-start justify-between gap-4">
                    <span className="tag">{initiative.kind}</span>
                    <span className="font-mono text-[0.65rem] text-white/25">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="mt-9 flex items-center gap-3">
                    <OrgLogo name={initiative.name} size={40} />
                    <h3 className="display text-3xl text-white sm:text-4xl">
                      {initiative.name}
                    </h3>
                  </div>
                  {'fullName' in initiative && initiative.fullName && (
                    <p className="mt-2 text-xs leading-relaxed text-white/45">
                      {initiative.fullName}
                    </p>
                  )}
                  <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/35">
                    {initiative.role} · {initiative.status}
                  </p>

                  <p className="mt-5 text-sm leading-relaxed text-white/60">
                    {initiative.summary}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-white/45">
                    {initiative.detail}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-2 border-t border-white/10 pt-5 text-xs font-medium text-white/55 transition-colors group-hover:text-white">
                    {initiative.linkLabel}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section id="principles" className="paper section">
        <div className="shell">
          <div className="max-w-3xl">
            <p className="eyebrow">Operating principles</p>
            <h2 className="display mt-5 text-4xl text-[#15161a] sm:text-5xl lg:text-6xl">
              How I decide what to build — and what to leave out.
            </h2>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 md:grid-cols-2">
            {principles.map((principle, index) => (
              <div
                key={principle.title}
                className={`bg-paper p-7 sm:p-9 ${
                  index === principles.length - 1 && principles.length % 2 === 1
                    ? 'md:col-span-2'
                    : ''
                }`}
              >
                <span className="font-mono text-[0.65rem] text-black/35">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-[#15161a]">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-black/60">
                  {principle.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto + advocacy */}
      <section className="section-tight border-t border-white/10">
        <div className="shell grid gap-4 md:grid-cols-2">
          <Link href="/manifesto" className="card group p-7 sm:p-9">
            <div className="card-spot" aria-hidden="true" />
            <p className="eyebrow">Renaissance manifesto</p>
            <h2 className="display mt-4 text-3xl text-white sm:text-4xl">
              A systems architect with a cultural mandate.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              Seven Da Vincian principles, three pillars, and a modern Letter of
              Capability — the thinking behind the practice.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-white/55 transition-colors group-hover:text-white">
              Read the manifesto
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>

          <Link href="/advocacy" className="card group p-7 sm:p-9">
            <div className="card-spot" aria-hidden="true" />
            <p className="eyebrow">Green software & Agenda 2063</p>
            <h2 className="display mt-4 text-3xl text-white sm:text-4xl">
              Technology should leave the place better.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              A public commitment to Green Software, the SDGs — especially climate
              action — and the African Union’s Agenda 2063.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-white/55 transition-colors group-hover:text-white">
              See the commitments
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>
      </section>

      {/* Education + credentials */}
      <section id="education" className="section border-t border-white/10">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow">Education</p>
            <h2 className="display mt-5 text-4xl text-white sm:text-5xl">
              Still studying, on purpose.
            </h2>
            <div className="mt-8 space-y-6">
              {education.map((item) => (
                <div
                  key={item.school}
                  className="rounded-2xl border border-white/10 bg-ink-soft p-6"
                >
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/35">
                    {item.period}
                    {item.status ? ` · ${item.status}` : ''}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {item.credential}
                  </h3>
                  <div className="mt-2 flex items-center gap-2.5">
                    <OrgLogo name={item.school} size={30} />
                    <p className="text-sm text-white/55">{item.school}</p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/45">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow">Credentials</p>
            <h2 className="display mt-5 text-4xl text-white sm:text-5xl">
              Security, studied seriously.
            </h2>
            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {credentials.map((credential) => (
                <li
                  key={credential}
                  className="flex items-center gap-3 py-3 text-sm text-white/60"
                >
                  <OrgLogo name={credential.split(' — ')[0]} size={24} />
                  {credential}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-white/35">
              Training completed through NITDA and Cisco Networking Academy.
              Credential details available on request.
            </p>
          </div>
        </div>
      </section>

      {/* Now + values */}
      <section id="now" className="section border-t border-white/10 bg-ink-soft/40">
        <div className="shell grid gap-12 lg:grid-cols-[0.46fr_0.54fr] lg:gap-16">
          <div>
            <p className="eyebrow">Now</p>
            <h2 className="display mt-5 text-4xl text-white sm:text-5xl">
              What has my attention.
            </h2>
            <ul className="mt-8 space-y-4">
              {now.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/60">
                  <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-white/30" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Values</p>
            <h2 className="display mt-5 text-4xl text-white sm:text-5xl">
              The non-negotiables.
            </h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {values.map((value) => (
                <span key={value} className="chip !px-4 !py-2 !text-[0.7rem]">
                  {value}
                </span>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-ink-soft p-6">
              <p className="text-sm leading-relaxed text-white/55">
                Want the short version, or the version with all the detours?
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-300" />
                  WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
                >
                  Contact form
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href="https://www.linkedin.com/in/mriridescent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
                >
                  <OrgLogo name="LinkedIn" size={18} />
                  LinkedIn
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="section-tight border-t border-white/10">
        <div className="shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow">Next</p>
            <h2 className="display mt-3 text-3xl text-white sm:text-4xl">
              See the work, or start a conversation.
            </h2>
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
