import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { ProjectExplorer } from '@/components/site/ProjectExplorer'
import { LiveSiteCard } from '@/components/site/LiveSiteCard'
import {
  BreadcrumbStructuredData,
  LiveSitesStructuredData,
  ProjectsStructuredData,
} from '@/components/StructuredData'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'
import { projectCount } from '@/lib/projects'
import { liveProjectCount, liveProjects } from '@/lib/live-projects'

export const metadata: Metadata = generateMetaTags(
  pageMetadata.projects.title,
  pageMetadata.projects.description,
  ['projects', 'open source', 'security engineering', 'AI projects'],
  '/projects'
)

export default function ProjectsPage() {
  return (
    <div className="pt-16">
      <ProjectsStructuredData />
      <LiveSitesStructuredData />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ]}
      />
      <section className="aurora grain border-b border-white/10 pb-12 pt-20 sm:pt-24">
        <div className="shell">
          <p className="eyebrow">Projects · a public record</p>
          <h1 className="display mt-6 max-w-4xl text-5xl text-white sm:text-6xl lg:text-7xl">
            The work, <span className="iridescent-text italic">in the open.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/55">
            {projectCount} curated repositories from 34 original public projects,
            plus {liveProjectCount} live client and concept sites — every one
            created by me, with no forks. Security platforms, applied AI, civic
            infrastructure, front-end work, and experiments that refused to stay
            theoretical.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/35">
            <a
              href="#live"
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-white"
            >
              See the live sites
              <ArrowDown className="h-3 w-3" />
            </a>
            <a
              href="https://github.com/MrIridescent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white"
            >
              github.com/MrIridescent
              <ArrowUpRight className="h-3 w-3" />
            </a>
            <span>Descriptions adapted from repository READMEs</span>
          </div>
        </div>
      </section>

      <section id="live" className="section scroll-mt-24">
        <div className="shell">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Live work · the front end in the world</p>
              <h2 className="display mt-5 max-w-3xl text-4xl text-white sm:text-5xl">
                {liveProjectCount} sites,{' '}
                <span className="iridescent-text italic">shipped and breathing.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base">
                Client work, campaign sites and portfolio studies, captured at
                1440 px and left to speak for themselves. Every card opens the
                real site — no mockups, no unavailable links.
              </p>
            </div>
            <p className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/30">
              {liveProjectCount} live · 2024–2026
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {liveProjects.map((site, index) => (
              <LiveSiteCard key={site.slug} site={site} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight border-t border-white/10">
        <div className="shell">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Open source · the repository archive</p>
              <h2 className="display mt-4 max-w-2xl text-3xl text-white sm:text-4xl">
                Code you can read.
              </h2>
            </div>
            <p className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/30">
              {projectCount} repositories
            </p>
          </div>

          <ProjectExplorer />

          <div className="mt-14 rounded-2xl border border-white/10 bg-ink-soft p-7 sm:p-9">
            <p className="eyebrow">A note on the archive</p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/50">
              Some client repositories are private or lag behind production
              deployments. The public repositories here are the ones that can be
              shared safely. If you want a walkthrough of a specific system —
              architecture, trade-offs, or the parts that broke — ask. That
              conversation is usually more useful than a screenshot.
            </p>
            <Link
              href="/contact"
              className="link-underline mt-6 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
            >
              Ask about a project
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
