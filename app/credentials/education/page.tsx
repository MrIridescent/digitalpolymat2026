import type { Metadata } from 'next'
import Link from 'next/link'
import { CredentialHero } from '@/components/site/CredentialHero'
import { SectionHeading } from '@/components/site/SectionHeading'
import { OrgLogo } from '@/components/site/OrgLogo'
import { LanguagePanel } from '@/components/site/LanguagePanel'
import { Reveal } from '@/components/motion/Reveal'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'
import { education, languages } from '@/lib/profile'

export const metadata: Metadata = generateMetaTags(
  pageMetadata.credentialsEducation.title,
  pageMetadata.credentialsEducation.description,
  [
    'Yaba College of Technology urban and regional planning',
    'Les Cours Sonou University',
    'University of the People computer science',
    'Institute of Arts Management and Professional',
    'David Akpoviroro Oke languages',
  ],
  '/credentials/education'
)

export default function EducationCredentialsPage() {
  return (
    <div className="pt-16">
      <CredentialHero
        current="education"
        eyebrow="Schooling · languages"
        title={
          <>
            Four institutions,{' '}
            <span className="iridescent-text italic">one long education.</span>
          </>
        }
        body="Spatial planning at Yabatech, business administration at Les Cours Sonou, human-resource practice at I.A.M.P.S, and computer science at University of the People — followed by the six languages I actually work in."
        stats={[
          { value: '04', label: 'institutions' },
          { value: '04', label: 'fields of study' },
          { value: '06', label: 'languages' },
          { value: '2026', label: 'latest programme' },
        ]}
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Schooling"
            title={
              <>
                Formal study, <span className="text-white/35">in four directions.</span>
              </>
            }
            body="Planning taught me to read systems at the scale of a city. Business administration taught me how organisations actually make decisions. Human-resource practice taught me that teams are part of the system. Computer science is the language I keep sharpening."
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {education.map((item, index) => (
              <Reveal key={item.school} delay={index * 0.06} className="h-full">
                <article className="card card-glass h-full p-6 sm:p-7">
                  <div className="card-spot" aria-hidden="true" />
                  <div className="flex items-start justify-between gap-4">
                    <OrgLogo name={item.school} size={44} />
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-white/30">
                        {item.period}
                      </span>
                      {item.status && (
                        <span className="rounded-full border border-[#c9f24b]/30 bg-[#c9f24b]/[0.08] px-2 py-0.5 font-mono text-[0.5rem] uppercase tracking-[0.1em] text-[#c9f24b]">
                          {item.status}
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{item.credential}</h3>
                  <p className="mt-1 text-sm text-white/55">{item.school}</p>
                  {item.location && (
                    <p className="mt-0.5 font-mono text-[0.56rem] uppercase tracking-[0.1em] text-white/25">
                      {item.location}
                    </p>
                  )}
                  <p className="mt-4 text-xs leading-relaxed text-white/45">{item.note}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="paper section">
        <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div>
              <p className="eyebrow">Languages</p>
              <h2 className="display mt-5 text-4xl text-[#15161a] sm:text-5xl">
                Six languages,{' '}
                <span className="italic text-[#5b4b8a]">honestly levelled.</span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-[#4b4d54]">
                English is my professional working language. French and Yoruba are
                conversational. Hausa, Urhobo, and Okpe are below conversational — I
                would rather name the level accurately than overclaim it.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {languages.map((language) => (
                  <span
                    key={language.name}
                    className="inline-flex items-center rounded-full border border-black/10 bg-white/60 px-3 py-1.5 text-xs font-medium text-[#15161a]"
                  >
                    {language.name} · {language.level}
                  </span>
                ))}
              </div>
              <p className="mt-8 text-xs leading-relaxed text-[#6b6d74]">
                Language work is part of the practice: technical writing in English,
                Francophone West African contexts in French, and cultural and community
                work in Yoruba, Hausa, Urhobo, and Okpe.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <LanguagePanel tone="light" />
          </Reveal>
        </div>
      </section>

      <section className="section-tight border-t border-white/10">
        <div className="shell flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow">The rest of the record</p>
            <h2 className="display mt-3 max-w-xl text-3xl text-white sm:text-4xl">
              Badges and training, kept close.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/credentials/cisco" className="btn btn-ghost">
              Cisco badges
            </Link>
            <Link href="/credentials/training" className="btn btn-ghost">
              Other training
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
