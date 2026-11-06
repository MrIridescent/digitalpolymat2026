import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { OrgLogo } from '@/components/site/OrgLogo'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'
import { projectCategories, projects, type ProjectCategory } from '@/lib/projects'
import { stats } from '@/lib/profile'

export const metadata: Metadata = generateMetaTags(
  pageMetadata.statistics.title,
  pageMetadata.statistics.description,
  ['engineering metrics', 'open source', 'David Akpoviroro Oke statistics', 'digital product delivery architect'],
  '/statistics'
)

const languages = Object.entries(
  projects.reduce<Record<string, number>>((counts, project) => {
    const language = project.language || 'Unspecified'
    counts[language] = (counts[language] || 0) + 1
    return counts
  }, {})
).sort((a, b) => b[1] - a[1])

const categoryCounts = projectCategories
  .filter((category): category is ProjectCategory => category !== 'All')
  .map((category) => ({
    category,
    count: projects.filter((project) => project.category === category).length,
  }))
  .filter((item) => item.count > 0)

const milestones: readonly {
  year: string
  text: string
  orgs?: readonly string[]
}[] = [
  { year: '2002', text: 'First went online; the beginning of a two-decade relationship with the web.' },
  { year: '2004', text: 'Started building web pages professionally and freelancing across Nigeria.' },
  {
    year: '2015',
    text: 'Founded Iridescent Internet Solutions.',
    orgs: ['Iridescent Internet Solutions Limited'],
  },
  {
    year: '2017',
    text: 'Incorporated Iridescent; took on digital project management at ITChef Nigeria.',
    orgs: ['Iridescent Internet Solutions Limited', 'ITChef Nigeria Ltd'],
  },
  {
    year: '2023—24',
    text: 'Completed cybersecurity training through NITDA and Cisco Networking Academy.',
    orgs: ['NITDA', 'Cisco Networking Academy'],
  },
  {
    year: '2024',
    text: 'Began a BSc in Computer Science at the University of the People.',
    orgs: ['University of the People'],
  },
  {
    year: '2025',
    text: 'Founded FEPAR.africa — Festac PanAfrican Renaissance Initiatives and/or diaspora foundations — and began chairing its Board of Trustees. Also completed a full-stack engineering engagement at Zandbox.',
    orgs: ['FEPAR.africa', 'Zandbox'],
  },
  {
    year: '2026',
    text: 'Working as a Digital Product Delivery Architect through Iridescent Internet Solutions; six Cisco course badges and credentials on record; building in public on GitHub.',
    orgs: ['Iridescent Internet Solutions Limited', 'Cisco Networking Academy', 'GitHub'],
  },
  {
    year: 'Now',
    text: 'Delivery architecture, growth partnerships, custom software, and workflow automation — with a public commitment to Green Software, the SDGs, and Agenda 2063.',
  },
]

export default function StatisticsPage() {
  return (
    <div className="pt-16">
      <section className="aurora grain border-b border-white/10 pb-12 pt-20 sm:pt-24">
        <div className="shell">
          <p className="eyebrow">Practice at a glance</p>
          <h1 className="display mt-6 max-w-4xl text-5xl text-white sm:text-6xl lg:text-7xl">
            Numbers <span className="iridescent-text italic">with sources.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/55">
            No vanity metrics. The counts below are public, verifiable, or
            explicitly described as a curated sample — not a performance claim
            dressed up as a dashboard.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-ink-soft p-7">
                <p className="display text-5xl text-white">{stat.value}</p>
                <p className="mt-3 text-xs leading-relaxed text-white/45">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-ink-soft p-7">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-lg font-semibold tracking-tight text-white">
                  Languages in the curated archive
                </h2>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-white/30">
                  {projects.length} projects
                </span>
              </div>

              <div className="mt-7 space-y-4">
                {languages.map(([language, count]) => (
                  <div key={language}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">{language}</span>
                      <span className="font-mono text-[0.65rem] text-white/35">
                        {count}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#8b5cf6,#06b6d4,#f59e0b)]"
                        style={{ width: `${(count / projects.length) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-[0.68rem] leading-relaxed text-white/30">
                Based on the {projects.length} projects featured on this site, not
                full GitHub language statistics. Repositories without a declared
                language are grouped as “Unspecified.”
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-ink-soft p-7">
              <h2 className="text-lg font-semibold tracking-tight text-white">
                What the archive covers
              </h2>
              <div className="mt-7 grid grid-cols-2 gap-3">
                {categoryCounts.map((item) => (
                  <div
                    key={item.category}
                    className="rounded-xl border border-white/10 p-4"
                  >
                    <p className="display text-3xl text-white">{item.count}</p>
                    <p className="mt-1 text-[0.7rem] leading-relaxed text-white/40">
                      {item.category}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/projects"
                className="link-underline mt-7 inline-flex items-center gap-2 text-sm text-white/65 hover:text-white"
              >
                Browse the archive
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16">
            <div>
              <p className="eyebrow">Milestones</p>
              <h2 className="display mt-5 text-4xl text-white sm:text-5xl">
                A timeline with real dates.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/45">
                Only milestones that can be traced to a public profile, a
                credential, or the site’s own record are included.
              </p>
            </div>

            <ol className="divide-y divide-white/10 border-y border-white/10">
              {milestones.map((milestone) => (
                <li
                  key={milestone.year}
                  className="grid gap-2 py-5 sm:grid-cols-[6rem_1fr]"
                >
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/35">
                    {milestone.year}
                  </span>
                  <div>
                    <p className="text-sm leading-relaxed text-white/60">
                      {milestone.text}
                    </p>
                    {milestone.orgs && (
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        {milestone.orgs.map((org) => (
                          <OrgLogo key={org} name={org} size={20} />
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-14 rounded-2xl border border-white/10 bg-ink-soft p-7 sm:p-9">
            <p className="eyebrow">How this is measured</p>
            <div className="mt-4 grid gap-5 text-sm leading-relaxed text-white/50 sm:grid-cols-2">
              <p>
                Repository and language counts come from the curated project
                registry used to build this site, checked against GitHub in
                November 2026. The GitHub profile is the source of truth for
                public repository counts.
              </p>
              <p>
                Credentials and education are taken from the résumé record and
                the public ORCID profile (0000-0002-6340-2782). Client outcomes
                are not claimed here because they cannot be independently
                verified on a public page.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
