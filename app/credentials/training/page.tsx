import type { Metadata } from 'next'
import Link from 'next/link'
import { CredentialHero } from '@/components/site/CredentialHero'
import { CredentialBadge } from '@/components/site/CredentialBadge'
import { SectionHeading } from '@/components/site/SectionHeading'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'
import { training } from '@/lib/profile'

export const metadata: Metadata = generateMetaTags(
  pageMetadata.credentialsTraining.title,
  pageMetadata.credentialsTraining.description,
  [
    'CompTIA A+ Network+ training',
    'New Horizons Nigeria',
    'Afrihub GDLI',
    'AWS Educate',
    'graphic design certification',
    'Python development training',
  ],
  '/credentials/training'
)

const otherTraining = training.filter((item) => !item.issuer.includes('Cisco'))

export default function OtherTrainingPage() {
  return (
    <div className="pt-16">
      <CredentialHero
        current="training"
        eyebrow="Professional training · beyond Cisco"
        title={
          <>
            Hardware, web, design,{' '}
            <span className="iridescent-text italic">and people.</span>
          </>
        }
        body="The non-Cisco record: professional IT training, web development, Python, design, cloud fundamentals, and desktop publishing. These are the supporting skills that make the security and product work usable in a real organisation."
        stats={[
          { value: String(otherTraining.length).padStart(2, '0'), label: 'programmes and badges' },
          { value: '04', label: 'issuing organisations' },
          { value: '03', label: 'skill families: infrastructure, software, people' },
          { value: '2004–23', label: 'years represented' },
        ]}
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="The record"
            title={
              <>
                The supporting skills, <span className="text-white/35">not the headline.</span>
              </>
            }
            body="Security and product work depends on understanding the hardware, the operating system, the web, the visual language, and the people who use the system. This is where much of that came from."
            action={{
              label: 'Full training history on LinkedIn',
              href: 'https://www.linkedin.com/in/mriridescent/details/certifications/',
            }}
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3" data-gsap-stagger>
            {otherTraining.map((entry) => (
              <CredentialBadge key={`${entry.issuer}-${entry.name}`} entry={entry} />
            ))}
          </div>

          <p className="mt-8 text-sm leading-relaxed text-white/40">
            This page lists the programmes that issued a certificate or badge. The
            longer training history, including course completions, lives on{' '}
            <a
              href="https://www.linkedin.com/in/mriridescent/details/certifications/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 underline decoration-white/20 underline-offset-4 hover:decoration-white"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </section>

      <section className="paper section">
        <div className="shell">
          <p className="eyebrow">The through-line</p>
          <h2 className="display mt-5 max-w-2xl text-4xl text-[#15161a] sm:text-5xl">
            Training that still shows up in the work.
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Systems first',
                body: 'CompTIA and Cisco fundamentals make the later architecture work concrete: hardware, operating systems, networks, and the failure modes between them.',
              },
              {
                title: 'Build, then explain',
                body: 'Web development, Python, and design training sit alongside the engineering practice. The point is to ship something and be able to explain why it works.',
              },
              {
                title: 'People are part of the system',
                body: 'Delivery depends on how teams are organised, how decisions are made, and how change is adopted. The human-resource membership on the education page is where that discipline became formal.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-black/10 bg-white/55 p-6">
                <h3 className="text-base font-semibold text-[#15161a]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4b4d54]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight border-t border-white/10">
        <div className="shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow">Next</p>
            <h2 className="display mt-3 max-w-xl text-3xl text-white sm:text-4xl">
              The formal record and the languages.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/credentials/cisco" className="btn btn-ghost">
              Cisco badges
            </Link>
            <Link href="/credentials/education" className="btn btn-ghost">
              Schooling &amp; languages
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
