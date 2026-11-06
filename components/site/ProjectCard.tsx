import { ArrowUpRight, Github } from 'lucide-react'
import type { Project } from '@/lib/projects'

type ProjectCardProps = {
  project: Project
  index?: number
  compact?: boolean
}

export function ProjectCard({ project, index, compact = false }: ProjectCardProps) {
  return (
    <article className="card group flex h-full flex-col p-6 sm:p-7">
      <div className="card-spot" aria-hidden="true" />

      <div className="flex items-start justify-between gap-4">
        <span className="tag">
          <span
            className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${project.accent}`}
            aria-hidden="true"
          />
          {project.category}
        </span>
        <div className="flex items-center gap-2">
          {project.license && <span className="chip">{project.license}</span>}
          {project.language && <span className="chip">{project.language}</span>}
        </div>
      </div>

      <div className="mt-10 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <h3
            className={
              compact
                ? 'text-xl font-semibold tracking-tight text-white'
                : 'text-2xl font-semibold tracking-tight text-white sm:text-[1.7rem]'
            }
          >
            {project.name}
          </h3>
          {typeof index === 'number' && (
            <span className="font-mono text-[0.65rem] text-white/25">
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-white/55">
          {compact ? project.tagline : project.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.slice(0, compact ? 3 : 4).map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-5">
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-medium text-white/65 transition-colors hover:text-white"
          >
            <Github className="h-3.5 w-3.5" />
            Repository
          </a>
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white/65 transition-colors hover:text-white"
            >
              Live site
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs text-white/30">
              Open source
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
