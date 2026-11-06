'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { ProjectCard } from './ProjectCard'
import { projectCategories, projects } from '@/lib/projects'
import { cn } from '@/lib/utils'

export function ProjectExplorer() {
  const [category, setCategory] = useState<(typeof projectCategories)[number]>('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()

    return projects.filter((project) => {
      const inCategory = category === 'All' || project.category === category
      if (!inCategory) return false
      if (!needle) return true

      const haystack = [
        project.name,
        project.tagline,
        project.description,
        project.category,
        project.language,
        ...project.stack,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return haystack.includes(needle)
    })
  }, [category, query])

  return (
    <div>
      <div className="flex flex-col gap-6 border-y border-white/10 py-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {projectCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={cn(
                'shrink-0 rounded-full border px-3.5 py-2 font-mono text-[0.65rem] uppercase tracking-[0.1em] transition-colors',
                category === item
                  ? 'border-white/30 bg-white text-ink'
                  : 'border-white/10 text-white/50 hover:border-white/25 hover:text-white'
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <label className="relative flex w-full items-center lg:max-w-xs">
          <span className="sr-only">Search projects</span>
          <Search className="pointer-events-none absolute left-3.5 h-3.5 w-3.5 text-white/35" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the archive"
            className="h-11 w-full rounded-full border border-white/10 bg-white/[0.03] pl-9 pr-4 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/35">
          {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
        </p>
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/25">
          Source · GitHub
        </p>
      </div>

      {filtered.length > 0 ? (
        <div
          key={`${category}-${query}`}
          className="mt-6 grid animate-fade-in gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {filtered.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-white/10 bg-ink-soft p-10 text-center">
          <p className="text-white/70">No projects match that search.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setCategory('All')
            }}
            className="mt-3 text-sm text-[#67e8f9] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
