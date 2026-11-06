import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Mail, MessageCircle, ShieldCheck } from 'lucide-react'
import { ButtonLink } from '@/components/site/ButtonLink'
import { SectionHeading } from '@/components/site/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import {
  BreadcrumbStructuredData,
  FAQStructuredData,
} from '@/components/StructuredData'
import { CONTENT_UPDATED, generateMetaTags, pageMetadata } from '@/lib/seo-config'
import { allFaqs, faqs, globalFaqs } from '@/lib/faq'
import { site, whatsappLink } from '@/lib/profile'

export const metadata: Metadata = generateMetaTags(
  pageMetadata.faq.title,
  pageMetadata.faq.description,
  [
    'David Akpoviroro Oke FAQ',
    'who is Mr Iridescent',
    'is David Akpoviroro Oke available for remote work',
    'David Oke credentials',
    'growth partner Lagos',
    'contact David Akpoviroro Oke',
    'Nigerian growth hacker',
  ],
  '/faq'
)

const groups = [
  {
    id: 'practice',
    eyebrow: 'The practice',
    title: 'Who, what, and how.',
    items: faqs,
  },
  {
    id: 'borders',
    eyebrow: 'Across borders',
    title: 'Working remotely, honestly.',
    items: globalFaqs,
  },
]

export default function FaqPage() {
  return (
    <div className="pt-16">
      <FAQStructuredData items={allFaqs} path="/faq" />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', path: '/' },
          { name: 'Questions', path: '/faq' },
        ]}
      />

      <section className="aurora grain relative overflow-hidden border-b border-white/10 pb-16 pt-20 sm:pt-24">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="orb -left-24 top-20 h-72 w-72 opacity-25" aria-hidden="true" />

        <div className="shell relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow">Questions · direct answers</p>
            <h1 className="display mt-6 max-w-4xl text-5xl text-white sm:text-6xl lg:text-7xl">
              The questions people{' '}
              <span className="iridescent-text italic">actually ask.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/65">
              A plain record of who David Akpoviroro Oke is, what the practice
              does, where it works, and what is still true after the contracts
              that have ended. Written for readers, recruiters, journalists, and
              answer engines that would rather quote the source than guess.
            </p>
          </div>

          <div className="glass-panel p-6 sm:p-7">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 text-[#c9f24b]" strokeWidth={1.7} />
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-white/40">
                Source of record
              </p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              These answers mirror the structured data on this site and the facts
              in the résumé. If a claim is uncertain, it is qualified rather than
              invented.
            </p>
            <p className="mt-4 font-mono text-[0.52rem] uppercase tracking-[0.14em] text-white/25">
              Last reviewed · {CONTENT_UPDATED}
            </p>
          </div>
        </div>
      </section>

      {groups.map((group, groupIndex) => (
        <section
          key={group.id}
          id={group.id}
          className={
            groupIndex === 0
              ? 'section scroll-mt-24'
              : 'section scroll-mt-24 border-t border-white/10 bg-ink-soft/40'
          }
        >
          <div className="shell">
            <Reveal>
              <SectionHeading
                eyebrow={group.eyebrow}
                title={
                  <>
                    {group.title.split(' ').slice(0, -1).join(' ')}{' '}
                    <span className="text-white/35">
                      {group.title.split(' ').slice(-1)}
                    </span>
                  </>
                }
              />
            </Reveal>

            <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {group.items.map((item) => (
                <details key={item.question} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg text-white/85 [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <span className="mt-0.5 font-mono text-xl leading-none text-white/25 transition-colors group-open:text-[#c9f24b]">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/50 sm:text-base">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div>
              <p className="eyebrow">Still asking</p>
              <h2 className="display mt-5 text-4xl text-white sm:text-5xl">
                A question is a <span className="iridescent-text italic">good start.</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/55">
                If the answer is not here, ask directly. A useful first message
                says what the problem is, who it affects, and what a good outcome
                looks like.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/contact" variant="primary">
                  Start a conversation
                  <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/global" variant="ghost">
                  See the global practice
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="glass-panel p-6 sm:p-8">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-white/35">
                Direct contact
              </p>
              <div className="mt-6 space-y-4">
                <a
                  href={site.emailHref}
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white"
                >
                  <Mail className="h-4 w-4 text-[#c9f24b]" />
                  {site.email}
                </a>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-300" />
                  Chat on WhatsApp
                </a>
                <Link
                  href="/resume"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white"
                >
                  <ArrowUpRight className="h-4 w-4 text-cyan-300" />
                  Read the résumé
                </Link>
              </div>
              <p className="mt-6 border-t border-white/10 pt-5 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/25">
                {site.location} · working worldwide
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
