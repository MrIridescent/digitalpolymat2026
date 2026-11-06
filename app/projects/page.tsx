import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ProjectExplorer } from '@/components/site/ProjectExplorer'
import { BreadcrumbStructuredData, ProjectsStructuredData } from '@/components/StructuredData'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'
import { projectCount } from '@/lib/projects'

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
            {projectCount} curated projects from 34 original public repositories —
            every one created by me, with no forks. Security platforms, applied
            AI, civic infrastructure, client sites, and experiments that refused
            to stay theoretical.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/35">
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

      <section className="section-tight">
        <div className="shell">
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
