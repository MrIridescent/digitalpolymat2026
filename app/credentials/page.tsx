import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { CredentialHero } from '@/components/site/CredentialHero'
import { SectionHeading } from '@/components/site/SectionHeading'
import { OrgLogo } from '@/components/site/OrgLogo'
import { Reveal } from '@/components/motion/Reveal'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'
import { education, training } from '@/lib/profile'

export const metadata: Metadata = generateMetaTags(
  pageMetadata.credentials.title,
  pageMetadata.credentials.description,
  [
    'David Akpoviroro Oke credentials',
    'verified Cisco Networking Academy badges',
    'NITDA cybersecurity training',
    'Yabatech urban and regional planning',
    'University of the People computer science',
  ],
  '/credentials'
)

const ciscoTraining = training.filter((item) => item.issuer.includes('Cisco'))
const otherTraining = training.filter((item) => !item.issuer.includes('Cisco'))

export default function CredentialsPage() {
  return (
    <div className="pt-16">
      <CredentialHero
        current="overview"
        eyebrow="Credentials · training · schooling"
        title={
          <>
            The record, <span className="iridescent-text italic">not the résumé gloss.</span>
          </>
        }
        body="Six verified Cisco Networking Academy badges, professional training beyond Cisco, four institutions, and six languages. The record is split into focused pages so you can go straight to the part you need."
        stats={[
          { value: '06', label: 'verified Cisco badges' },
          { value: '04', label: 'institutions of study' },
          { value: '06', label: 'languages, honestly levelled' },
          { value: '20+', label: 'years of building' },
        ]}
      />

      <section className="section">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Cisco Networking Academy"
              title={
                <>
                  Six badges, <span className="text-white/35">one security thread.</span>
                </>
              }
              body="All six are verified Cisco Networking Academy records, not just Network Defense — five credentials and one course badge. Public evidence is linked on the Cisco page wherever the issuer provided one."
              action={{ label: 'Open the badges', href: '/credentials/cisco' }}
            />
          </Reveal>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {ciscoTraining.map((entry) => (
              <Link
                key={`${entry.issuer}-${entry.name}`}
                href="/credentials/cisco"
                className="group flex min-w-0 items-center gap-3 bg-ink-soft p-4 transition-colors hover:bg-ink-raised"
              >
                <OrgLogo name={entry.issuer} size={32} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{entry.name}</p>
                  <p className="mt-0.5 font-mono text-[0.52rem] uppercase tracking-[0.12em] text-white/30">
                    {entry.kind} · {entry.year}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-1.5 py-0.5 font-mono text-[0.48rem] uppercase tracking-[0.1em] text-emerald-200 sm:px-2">
                  <ShieldCheck className="h-2.5 w-2.5" />
                  Verified
                </span>
                <ArrowUpRight className="hidden h-3.5 w-3.5 shrink-0 text-white/25 transition-colors group-hover:text-white sm:block" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="paper section">
        <div className="shell">
          <p className="eyebrow">Choose the part you need</p>
          <h2 className="display mt-5 max-w-2xl text-4xl text-[#15161a] sm:text-5xl">
            A long record, kept in short pages.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#4b4d54] sm:text-base">
            Credentials are only useful if someone can check them quickly. Each page
            holds one part of the record, with the source links on the card.
          </p>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {[
              {
                href: '/credentials/cisco',
                eyebrow: 'Cisco Networking Academy',
                title: 'Six verified badges',
                body: 'Security operations, ethical hacking, network defence, threat management, endpoint security, and security support essentials.',
                meta: `${ciscoTraining.length} entries`,
              },
              {
                href: '/credentials/training',
                eyebrow: 'Beyond Cisco',
                title: 'Other professional training',
                body: 'CompTIA, web development, Python, design, cloud fundamentals, and desktop publishing.',
                meta: `${otherTraining.length} entries`,
              },
              {
                href: '/credentials/education',
                eyebrow: 'Schooling & languages',
                title: 'Four institutions, six languages',
                body: 'Spatial planning, business administration, human-resource practice, computer science, and the languages I actually use.',
                meta: `${education.length} institutions`,
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group flex h-full flex-col justify-between rounded-2xl border border-black/10 bg-white/55 p-6 transition-colors hover:bg-white"
              >
                <div>
                  <p className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-[#6b6d74]">
                    {card.eyebrow}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-[#15161a]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4b4d54]">{card.body}</p>
                </div>
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-black/10 pt-4">
                  <span className="font-mono text-[0.56rem] uppercase tracking-[0.12em] text-[#6b6d74]">
                    {card.meta}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#15161a] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="glass-panel p-7 sm:p-9 lg:p-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="eyebrow">Verification</p>
                  <h2 className="display mt-4 text-3xl text-white sm:text-4xl">
                    Check the record at the source.
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-white/55">
                    Cisco badges appear on Instagram and Credly; professional history
                    and schooling are on LinkedIn; code and project notes are on GitHub.
                    Every record on this site is issued to David Akpoviroro Oke — issuer
                    marks identify the source, not a partnership. If a credential is not
                    linked here, it is available on request; I will not invent one to
                    fill a card.
                  </p>
                </div>
                <div className="grid shrink-0 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                  <a
                    href="https://www.linkedin.com/in/mriridescent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between gap-3 rounded-xl border border-white/10 px-4 py-3 text-xs text-white/60 hover:border-white/25 hover:text-white"
                  >
                    <span className="inline-flex items-center gap-2">
                      <OrgLogo name="LinkedIn" size={18} />
                      LinkedIn record
                    </span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                  <a
                    href="https://www.instagram.com/mriridescent/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between gap-3 rounded-xl border border-white/10 px-4 py-3 text-xs text-white/60 hover:border-white/25 hover:text-white"
                  >
                    <span className="inline-flex items-center gap-2">
                      <OrgLogo name="Instagram" size={18} />
                      Cisco badge posts
                    </span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                  <a
                    href="https://www.credly.com/badges/18f92a18-ae03-4dcc-bec6-0dbcd06a7016"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between gap-3 rounded-xl border border-white/10 px-4 py-3 text-xs text-white/60 hover:border-white/25 hover:text-white"
                  >
                    <span className="inline-flex items-center gap-2">
                      <OrgLogo name="Credly" size={18} />
                      Credly badge
                    </span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                  <a
                    href="https://orcid.org/0000-0002-6340-2782"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between gap-3 rounded-xl border border-white/10 px-4 py-3 text-xs text-white/60 hover:border-white/25 hover:text-white"
                  >
                    <span className="inline-flex items-center gap-2">
                      <OrgLogo name="ORCID" size={18} />
                      ORCID
                    </span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <p className="text-sm text-white/45">
              Looking for the one-page version? The résumé is generated from this same record.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/resume" className="btn btn-primary">
                View résumé
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Ask a question
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
