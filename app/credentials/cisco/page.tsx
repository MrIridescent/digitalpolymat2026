import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { CredentialHero } from '@/components/site/CredentialHero'
import { CredentialBadge } from '@/components/site/CredentialBadge'
import { SectionHeading } from '@/components/site/SectionHeading'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'
import { training } from '@/lib/profile'

export const metadata: Metadata = generateMetaTags(
  pageMetadata.credentialsCisco.title,
  pageMetadata.credentialsCisco.description,
  [
    'verified Cisco Networking Academy badges',
    'Cisco CyberOps Associate',
    'Cisco Ethical Hacking',
    'Cisco Network Defense',
    'Cisco Cyber Threat Management',
    'Cisco Endpoint Security',
  ],
  '/credentials/cisco'
)

const ciscoTraining = training.filter((item) => item.issuer.includes('Cisco'))

export default function CiscoCredentialsPage() {
  return (
    <div className="pt-16">
      <CredentialHero
        current="cisco"
        eyebrow="Cisco Networking Academy · verified"
        title={
          <>
            Six badges, <span className="iridescent-text italic">one security thread.</span>
          </>
        }
        body="All six are verified Cisco Networking Academy records — not just Network Defense. Five are credentials; CSS Essentials is a verified course badge. The thread runs from security operations and ethical hacking through network defence, threat governance, endpoint security, and security support essentials."
        stats={[
          { value: '06', label: 'verified Cisco badges' },
          { value: '04', label: 'calendar years of study' },
          { value: '02', label: 'issuing bodies: Cisco & NITDA' },
          { value: '00', label: 'unverified entries on this page' },
        ]}
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="The thread"
            title={
              <>
                Security operations, defence,{' '}
                <span className="text-white/35">and support essentials.</span>
              </>
            }
            body="Read top to bottom as a progression: incident-response foundations, offensive fundamentals, network defence, threat governance, endpoint hardening, and the security support essentials that make the rest usable."
          />

          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-200">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <div>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-emerald-300/80">
                  Verified record
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  Every badge on this page is verified.
                </p>
                <p className="mt-1 max-w-2xl text-xs leading-relaxed text-white/50">
                  Network Defense, CyberOps, Ethical Hacking, Cyber Threat Management,
                  and Endpoint Security are Cisco credentials issued to David
                  Akpoviroro Oke. CSS Essentials is a verified Cisco course badge.
                  Public evidence is linked on each card where the issuer provided
                  one.
                </p>
              </div>
            </div>
            <a
              href="https://www.linkedin.com/in/mriridescent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/30 px-4 py-2 text-xs font-medium text-emerald-100 transition-colors hover:bg-emerald-400/10"
            >
              Public record
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" data-gsap-stagger>
            {ciscoTraining.map((entry) => (
              <CredentialBadge key={`${entry.issuer}-${entry.name}`} entry={entry} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight border-t border-white/10">
        <div className="shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow">Keep going</p>
            <h2 className="display mt-3 max-w-xl text-3xl text-white sm:text-4xl">
              The rest of the record, without the scroll.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/credentials/training" className="btn btn-ghost">
              Other training
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
