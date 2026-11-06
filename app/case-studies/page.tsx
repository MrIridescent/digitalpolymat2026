import type { Metadata } from 'next'
import { ArrowUpRight, Github } from 'lucide-react'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'
import { projects } from '@/lib/projects'

export const metadata: Metadata = generateMetaTags(
  pageMetadata.caseStudies.title,
  pageMetadata.caseStudies.description,
  ['case studies', 'DevSecOps', 'threat detection', 'computer vision'],
  '/case-studies'
)

type Study = {
  slug: string
  anchor: string
  number: string
  category: string
  title: string
  summary: string
  problem: string
  approach: string[]
  repoNotes: string[]
  next: string
  blueprint?: { label: string; value: string }[]
  modules?: { name: string; detail: string; state: string }[]
}

const studies: Study[] = [
  {
    slug: 'devsecops-agent',
    anchor: 'devsecops',
    number: '01',
    category: 'Security engineering',
    title: 'DevSecOps Platform',
    summary:
      'Security review is usually a late, manual gate. This project explores what happens when code review, vulnerability analysis, and remediation assistance are orchestrated as one AI-assisted system.',
    problem:
      'Teams ship quickly and discover security problems after release. Reviewers are inconsistent, context is scattered across tools, and remediation advice often arrives without enough context to act on.',
    approach: [
      'Orchestrate code review and vulnerability analysis through a single AI layer.',
      'Detect issues in context rather than as isolated scanner output.',
      'Generate remediation guidance that a developer can evaluate and apply.',
      'Keep the human reviewer in control of the final decision.',
    ],
    repoNotes: [
      'A unified AI orchestrator for automated code review.',
      'Intelligent vulnerability remediation workflows.',
      'A turnkey security system rather than a collection of scripts.',
    ],
    next: 'Policy-as-code, SBOM awareness, and tighter CI/CD integration.',
  },
  {
    slug: 'threat-detection-platform',
    anchor: 'threat-detection',
    number: '02',
    category: 'Threat detection',
    title: 'Multi-agent Threat Detection',
    summary:
      'A threat detection ecosystem built around specialised agents that detect, analyse, and respond in real time — with enterprise observability as a first-class concern.',
    problem:
      'A single generic model struggles with the range of signals a real environment produces. Analysts drown in alerts that lack context, while response often happens in a different tool from detection.',
    approach: [
      'Split detection, analysis, and response across specialised agents.',
      'Let agents collaborate instead of duplicating the same analysis.',
      'Treat observability and scalability as design requirements, not afterthoughts.',
      'Keep the system explainable enough for a human analyst to trust.',
    ],
    repoNotes: [
      'Multiple specialised AI agents working together.',
      'Real-time detection, analysis, and response.',
      'Enterprise security, scalability, and observability as core principles.',
    ],
    next: 'Alert-feedback loops that turn analyst decisions into better agent behaviour.',
  },
  {
    slug: 'roadvision-lagos',
    anchor: 'roadvision',
    number: '03',
    category: 'Civic infrastructure',
    title: 'ROADvision Lagos',
    summary:
      'An AI infrastructure sentinel for Nigerian roads: pothole detection from images and video, satellite-level macro-analysis, and flood-erosion correlation to help prioritise repairs before the next rainy season.',
    problem:
      'Road damage is widespread, inspections are slow, and repair budgets are limited. The people who decide where to spend money often lack a current, spatial picture of where the damage is worst — and by the time a pothole is visible, the water has already done the structural damage.',
    approach: [
      'Detect potholes with a YOLOv8 computer-vision pipeline and an operator-facing review queue.',
      'Analyse satellite imagery to find macro-erosion patterns in areas that inspection vehicles cannot easily reach.',
      'Correlate road damage with topography and rainfall history to flag erosion incubation zones.',
      'Design the institutional layers — command link, contractor audit, aerial mapping — as documented extensions rather than claiming live government integrations.',
    ],
    repoNotes: [
      'FastAPI backend with a YOLOv8 inference pipeline.',
      'Next.js 15 operator dashboard for map overlays and alerts.',
      'WebSocket layer for low-latency hazard events.',
      'A turnkey setup script, technical manual, and hardware guidance for edge deployment.',
    ],
    blueprint: [
      { label: 'Backend', value: 'Python · FastAPI · YOLOv8' },
      { label: 'Dashboard', value: 'Next.js 15 · TypeScript · Tailwind' },
      { label: 'Real-time', value: 'WebSockets for hazard events' },
      { label: 'Deployment', value: 'Turnkey setup · Ubuntu / WSL2 · RTX 3070+' },
    ],
    modules: [
      {
        name: 'Pothole detection',
        detail: 'Frame-level vision inference that turns road footage into located, reviewable hazards.',
        state: 'Working core',
      },
      {
        name: 'Satellite sentinel',
        detail: 'Macro-scale raster analysis for erosion patterns across dense, hard-to-inspect areas.',
        state: 'Working core',
      },
      {
        name: 'Flood-erosion correlation',
        detail: 'A risk index combining elevation and rainfall history to predict where asphalt will fail.',
        state: 'Working core',
      },
      {
        name: 'Traffic command link',
        detail: 'A WebSocket channel for pushing diversion suggestions to traffic authorities.',
        state: 'Designed extension',
      },
      {
        name: 'Contractor audit ledger',
        detail: 'Before-and-after repair evidence reviewed before payment is released.',
        state: 'Designed extension',
      },
      {
        name: 'Coordinated aerial mapping',
        detail: 'A proposed multi-drone layer for covering all 20 Lagos LGAs.',
        state: 'Designed extension',
      },
    ],
    next: 'Field validation with local engineers, a public repair-priority map, and a durable audit trail for every intervention.',
  },
]

export default function CaseStudiesPage() {
  return (
    <div className="pt-16">
      <section className="aurora grain border-b border-white/10 pb-14 pt-20 sm:pt-24">
        <div className="shell">
          <p className="eyebrow">Case studies · public work</p>
          <h1 className="display mt-6 max-w-4xl text-5xl text-white sm:text-6xl lg:text-7xl">
            Systems under{' '}
            <span className="iridescent-text italic">real constraints.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/55">
            Three public projects, what they do, and how they are built. No
            invented clients, no imaginary conversion metrics — just the code and
            the reasoning.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell space-y-20 lg:space-y-28">
          {studies.map((study) => {
            const project = projects.find((item) => item.slug === study.slug)
            if (!project) return null

            return (
              <article
                key={study.slug}
                id={study.anchor}
                className="grid scroll-mt-28 gap-10 border-t border-white/10 pt-12 lg:grid-cols-[0.36fr_0.64fr] lg:gap-16"
              >
                <div className="lg:sticky lg:top-24 lg:self-start">
                  <p className="font-mono text-[0.65rem] text-white/30">
                    {study.number} / {study.category}
                  </p>
                  <h2 className="display mt-5 text-4xl text-white sm:text-5xl">
                    {study.title}
                  </h2>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {project.stack.map((item) => (
                      <span key={item} className="chip">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-col gap-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/35">
                    {project.license && <span>License · {project.license}</span>}
                    <span>Status · public repository</span>
                    <span>Role · design & engineering</span>
                  </div>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline mt-8 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
                  >
                    <Github className="h-3.5 w-3.5" />
                    Read the code
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>

                <div>
                  <p className="text-lg leading-relaxed text-white/70 sm:text-xl">
                    {study.summary}
                  </p>

                  <div className="mt-10">
                    <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/35">
                      The problem
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">
                      {study.problem}
                    </p>
                  </div>

                  <div className="mt-8">
                    <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/35">
                      The approach
                    </h3>
                    <ul className="mt-4 space-y-3">
                      {study.approach.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-sm leading-relaxed text-white/60"
                        >
                          <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-[#67e8f9]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {study.blueprint && (
                    <div className="mt-10">
                      <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/35">
                        System blueprint
                      </h3>
                      <dl className="mt-4 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
                        {study.blueprint.map((item) => (
                          <div key={item.label} className="bg-ink-soft p-4">
                            <dt className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/30">
                              {item.label}
                            </dt>
                            <dd className="mt-1.5 text-sm text-white/65">
                              {item.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}

                  {study.modules && (
                    <div className="mt-10">
                      <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/35">
                        System layers
                      </h3>
                      <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                        {study.modules.map((module) => (
                          <li
                            key={module.name}
                            className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2 py-4"
                          >
                            <div className="max-w-md">
                              <p className="text-sm font-semibold text-white">
                                {module.name}
                              </p>
                              <p className="mt-1 text-sm leading-relaxed text-white/45">
                                {module.detail}
                              </p>
                            </div>
                            <span
                              className={`mt-0.5 rounded-full border px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.1em] ${
                                module.state === 'Working core'
                                  ? 'border-[#67e8f9]/30 text-[#67e8f9]'
                                  : 'border-white/15 text-white/35'
                              }`}
                            >
                              {module.state}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3 text-xs leading-relaxed text-white/30">
                        Layers marked “designed extension” are documented in the
                        repository as intended architecture — not live government
                        integrations.
                      </p>
                    </div>
                  )}

                  <div className="mt-8 grid gap-6 border-y border-white/10 py-6 sm:grid-cols-2">
                    <div>
                      <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/35">
                        What is in the repository
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {study.repoNotes.map((item) => (
                          <li key={item} className="text-sm text-white/55">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/35">
                        What I would build next
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/55">
                        {study.next}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}

          <div className="rounded-2xl border border-white/10 bg-ink-soft p-7 sm:p-9">
            <p className="eyebrow">How to read this page</p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/50">
              Every repository linked here was created by David Akpoviroro Oke;
              forked or third-party work is not presented as his own. These are
              public repositories, not confidential client work. The summaries are
              grounded in the repository descriptions and the architecture visible
              in the code. The “next” sections are opinions, clearly labelled as
              such. No performance numbers are claimed unless they can be
              reproduced.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
