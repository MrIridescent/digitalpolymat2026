import { ArrowUpRight } from 'lucide-react'
import type { LiveProject } from '@/lib/live-projects'

type LiveSiteCardProps = {
  site: LiveProject
  index: number
}

export function LiveSiteCard({ site, index }: LiveSiteCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors duration-500 hover:border-white/25">
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full flex-col"
        aria-label={`Visit ${site.name} — ${site.domain} (opens in a new tab)`}
      >
        <div className="border-b border-white/10 bg-ink-soft/60">
          <div className="flex items-center gap-2 px-4 py-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" aria-hidden="true" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" aria-hidden="true" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/10" aria-hidden="true" />
            <span className="ml-2 min-w-0 truncate font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/35">
              {site.domain}
            </span>
            <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-[color:var(--acid)]/80">
              <span className="h-1 w-1 animate-pulse rounded-full bg-[color:var(--acid)]" aria-hidden="true" />
              Live
            </span>
          </div>

          <div className="relative aspect-[1440/820] overflow-hidden">
            <img
              src={site.image}
              alt={`Preview of ${site.name} at ${site.domain}`}
              width={1440}
              height={820}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top saturate-[0.92] transition duration-700 ease-out group-hover:scale-[1.02] group-hover:saturate-100"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0d12]/50 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <span className="tag">
              <span
                className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${site.accent}`}
                aria-hidden="true"
              />
              {site.kind}
            </span>
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/25">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <h3 className="display mt-5 text-2xl leading-tight text-white sm:text-[1.7rem]">
            {site.name}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50">{site.summary}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {site.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-5">
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-white/30">
              Open the live site
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/65 transition-colors group-hover:text-white">
              {site.domain}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </a>
    </article>
  )
}
