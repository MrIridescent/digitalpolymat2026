import Link from 'next/link'
import {
  ArrowUpRight,
  Atom,
  Brain,
  BrainCircuit,
  Compass,
  Cpu,
  Factory,
  FlaskConical,
  Landmark,
  Layers,
  Leaf,
  Network,
  Plane,
  Radar,
  Settings2,
  ShieldCheck,
  Terminal,
} from 'lucide-react'
import { ButtonLink } from '@/components/site/ButtonLink'
import { SectionHeading } from '@/components/site/SectionHeading'
import { projects } from '@/lib/projects'
import { interests } from '@/lib/profile'
import { generateMetaTags, pageMetadata } from '@/lib/seo-config'

export const metadata = generateMetaTags(
  pageMetadata.emergingTech.title,
  pageMetadata.emergingTech.description,
  [
    'agentic AI',
    'DevSecOps',
    'computer vision Nigeria',
    'geometric algebra',
    'offline-first software',
    'security engineering',
    'cyber-physical systems',
    'cybernetics',
    'brain-computer interfaces',
    'quantum computing',
  ],
  '/emerging-tech'
)

const domains = [
  {
    icon: Brain,
    title: 'Agentic AI & applied intelligence',
    status: 'Shipping',
    summary:
      'Systems where several models, tools, and retrieval layers cooperate on a real task instead of producing a demo. The interesting engineering is in the boundaries: what the agent may touch, how it recovers, and how a human audits the result.',
    stack: ['Python', 'TypeScript', 'LangChain / CrewAI', 'RAG', 'FastAPI', 'spaCy'],
    work: [
      { label: 'Iridescent DevSecOps Platform', href: '/case-studies#devsecops' },
      { label: 'ATS Résumé Matcher', href: 'https://github.com/MrIridescent/mriridescent-ats-matcher' },
      { label: 'OchukoAi', href: 'https://github.com/MrIridescent/OchukoAi' },
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Security engineering & DevSecOps',
    status: 'Practising',
    summary:
      'Threat modelling as a design activity, not a compliance ritual. I build detection and remediation workflows that fit the way teams already ship, and I keep the Cisco CyberOps and ethical hacking material close to the code.',
    stack: ['Threat detection', 'SAST / DAST', 'Cloud security', 'CyberOps', 'Vulnerability remediation'],
    work: [
      { label: 'Threat Detection Platform', href: '/case-studies#threat-detection' },
      { label: 'DevSecOps repository', href: 'https://github.com/MrIridescent/DevSecOps-Agent' },
    ],
  },
  {
    icon: Radar,
    title: 'Computer vision for civic infrastructure',
    status: 'Experimenting',
    summary:
      'Computer vision is only useful when it changes a decision. ROADvision pairs pothole detection with satellite context and flood-erosion signals so that a prediction can become a maintenance queue rather than another dashboard. The repository documents five layers, including the institutional ones still in design.',
    stack: ['YOLOv8', 'Python', 'FastAPI', 'Geospatial analysis', 'Satellite imagery'],
    work: [
      { label: 'ROADvision Lagos', href: '/case-studies#roadvision' },
      { label: 'Facial Attendance System', href: 'https://github.com/MrIridescent/Facial_Attendance_System' },
    ],
  },
  {
    icon: Layers,
    title: 'Developer tools & foundations',
    status: 'Exploring',
    summary:
      'The parts of the stack most teams inherit without questioning: offline behaviour, resilience under failure, and the ergonomics of the tools we use every day. These projects are where I test opinions I intend to keep.',
    stack: ['JavaScript', 'Offline-first', 'Accessibility', 'Self-healing'],
    work: [
      { label: 'Rezilient.JS', href: 'https://github.com/MrIridescent/Rezilient.JS' },
    ],
  },
  {
    icon: Landmark,
    title: 'Civic & cultural infrastructure',
    status: 'Building',
    summary:
      'The same systems discipline applied to public goods and cultural work. ROADvision treats road maintenance as a data problem; FEPAR treats African creative ownership as an infrastructure problem. Neither is a hackathon demo, and neither pretends the institutional layer already exists.',
    stack: ['Public data', 'GeoAI', 'Next.js', 'Community platforms', 'Programme design'],
    work: [
      { label: 'ROADvision Lagos', href: '/case-studies#roadvision' },
      { label: 'FEPAR.africa', href: 'https://www.naijafund.com/campaign/fepar-africa-non-profit-ngo-donations/' },
    ],
  },
  {
    icon: Leaf,
    title: 'Green software & climate-aware computing',
    status: 'Committed',
    summary:
      'Efficiency is an engineering requirement, not a footnote. I design for lower compute, smaller payloads, longer device life, and measurable energy awareness — and I am public about the difference between a commitment and a verified carbon claim.',
    stack: ['Green Software', 'Edge computing', 'SDG 13', 'Agenda 2063', 'Efficiency budgets'],
    work: [
      { label: 'Green software commitments', href: '/advocacy' },
      { label: 'Renaissance manifesto', href: '/manifesto' },
      { label: 'ROADvision Lagos', href: '/case-studies#roadvision' },
    ],
  },
]

const method = [
  {
    number: '01',
    title: 'Start from a real constraint',
    body:
      'A technology earns attention when it removes a constraint I can name: unreliable networks, an audit trail that has to exist, a model that must explain itself. Novelty alone is not a reason to learn something.',
  },
  {
    number: '02',
    title: 'Build the smallest honest version',
    body:
      'A working repository with a README beats a folder of slides. I would rather publish an unfinished system that runs than a polished claim that cannot be verified.',
  },
  {
    number: '03',
    title: 'Keep what survives contact',
    body:
      'Every experiment is allowed to end. The point is to carry forward the pattern that worked, write it down, and use it in the next product instead of treating the stack as an identity.',
  },
]

export default function EmergingTechPage() {
  return (
    <>
      <section className="aurora grain relative overflow-hidden pb-16 pt-32 sm:pt-36">
        <div className="shell relative">
          <p className="eyebrow animate-rise">Emerging technology</p>
          <h1 className="display animate-rise delay-1 mt-6 max-w-4xl text-[clamp(2.9rem,6.4vw,5.6rem)] text-white">
            The frontier is a{' '}
            <span className="iridescent-text italic">practice</span>, not a list.
          </h1>
          <p className="animate-rise delay-2 mt-7 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
            I do not collect technologies. I use them to solve problems that are
            already in front of me — in security, in civic infrastructure, and in
            the daily work of building software that survives real conditions.
            Beyond the screen, I am studying applied sciences, mechatronics,
            physical automation, drone technology, cyber-physical systems,
            cybernetics, and brain–computer interfaces — with one eye on
            post-von-Neumann computing.
          </p>
          <div className="animate-rise delay-3 mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/projects" variant="primary">
              See the work
              <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/case-studies" variant="ghost">
              Read the case studies
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="shell">
          <SectionHeading
            eyebrow="Where the time goes"
            title={
              <>
                Six domains, <span className="text-white/35">one standard.</span>
              </>
            }
            body="These are the areas I am actively building, practising, or testing. Each one is tied to public work you can inspect."
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {domains.map((domain) => {
              const Icon = domain.icon
              return (
                <article key={domain.title} className="card p-7 sm:p-9">
                  <div className="card-spot" aria-hidden="true" />
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                      <Icon className="h-5 w-5 text-white/70" />
                    </span>
                    <span className="tag">{domain.status}</span>
                  </div>

                  <h2 className="mt-7 text-2xl font-semibold tracking-tight text-white">
                    {domain.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    {domain.summary}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {domain.stack.map((item) => (
                      <span key={item} className="chip">
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 space-y-2 border-t border-white/10 pt-5">
                    {domain.work.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group flex items-center justify-between gap-4 text-sm text-white/60 transition-colors hover:text-white"
                      >
                        <span>{item.label}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-white/30 transition-colors group-hover:text-white" />
                      </Link>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section border-t border-white/10 bg-ink-soft/40">
        <div className="shell">
          <SectionHeading
            eyebrow="Applied science & physical systems"
            title={
              <>
                The next interface is{' '}
                <span className="text-white/35">physical.</span>
              </>
            }
            body="These are research and learning interests, not services I claim to have delivered. They are the direction of travel: sensing, control, motion, and the data pipeline that turns a physical event into a decision."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {interests.map((interest, index) => {
              const icons = [FlaskConical, Settings2, Factory, Plane, Cpu, Network, BrainCircuit, Atom]
              const Icon = icons[index % icons.length]
              return (
                <article key={interest.title} className="card p-6">
                  <div className="card-spot" aria-hidden="true" />
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                    <Icon className="h-5 w-5 text-white/70" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-white">
                    {interest.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {interest.body}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {interest.tags.map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="eyebrow">Method</p>
            <h2 className="display mt-5 text-4xl text-white sm:text-5xl">
              How I choose{' '}
              <span className="iridescent-text italic">what to learn.</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-white/50">
              The list of interesting technologies is infinite. The list of
              problems worth solving is not. This is the filter I use.
            </p>
            <div className="mt-8 flex items-center gap-3 text-xs text-white/35">
              <Compass className="h-4 w-4" />
              Updated as the work changes
            </div>
          </div>

          <ol className="space-y-8">
            {method.map((item) => (
              <li key={item.number} className="flex gap-6 border-b border-white/10 pb-8 last:border-0 last:pb-0">
                <span className="font-mono text-xs text-white/30">{item.number}</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="shell">
          <SectionHeading
            eyebrow="Current experiments"
            title={
              <>
                Built in public, <span className="text-white/35">open to inspection.</span>
              </>
            }
            body="A selection of the repositories behind this page. Each links to the source."
            action={{ label: 'All projects', href: '/projects' }}
          />

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 9).map((project) => (
              <Link
                key={project.slug}
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/25 hover:bg-white/[0.04]"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{project.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/40">
                    {project.tagline}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 2).map((item) => (
                      <span key={item} className="chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-white/25 transition-colors group-hover:text-white" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t border-white/10 bg-ink-soft/40">
        <div className="shell text-center">
          <p className="eyebrow justify-center">Work together</p>
          <h2 className="display mx-auto mt-5 max-w-3xl text-4xl text-white sm:text-5xl">
            Have a problem that needs{' '}
            <span className="iridescent-text italic">more than one discipline?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/50">
            I take on engineering roles, consulting engagements, and selected
            collaborations. The best conversations start with the constraint,
            not the technology.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/contact" variant="primary">
              Start a conversation
              <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/resume" variant="ghost">
              View résumé
            </ButtonLink>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/30">
            <Terminal className="h-3 w-3" />
            <Cpu className="h-3 w-3" />
            <span>Lagos, Nigeria · remote worldwide</span>
          </div>
        </div>
      </section>
    </>
  )
}
