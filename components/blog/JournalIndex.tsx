'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Search } from 'lucide-react'
import { formatPostDateShort, type BlogPost } from '@/lib/contentful'
import { PostCover } from '@/components/blog/PostCover'

type JournalIndexProps = {
  posts: BlogPost[]
}

export function JournalIndex({ posts }: JournalIndexProps) {
  const [tag, setTag] = useState('All')
  const [query, setQuery] = useState('')
  const reduceMotion = useReducedMotion()
  const tags = useMemo(
    () => ['All', ...Array.from(new Set(posts.flatMap((post) => post.tags)))],
    [posts]
  )

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return posts.filter((post) => {
      const matchesTag = tag === 'All' || post.tags.includes(tag)
      const matchesQuery =
        !term ||
        `${post.title} ${post.excerpt} ${post.tags.join(' ')}`.toLowerCase().includes(term)
      return matchesTag && matchesQuery
    })
  }, [posts, tag, query])

  return (
    <div>
      <div className="flex flex-col gap-5 border-y border-white/10 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div
          className="k-no-bar flex min-w-0 flex-1 flex-wrap gap-2 pb-1"
          role="tablist"
          aria-label="Filter by topic"
        >
          {tags.map((item) => {
            const active = item === tag
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTag(item)}
                className={`shrink-0 border px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] transition-colors ${
                  active
                    ? 'border-[color:var(--acid)] bg-[color:var(--acid)] text-[color:var(--acid-ink)]'
                    : 'border-white/10 text-white/45 hover:border-white/30 hover:text-white'
                }`}
              >
                {item}
              </button>
            )
          })}
        </div>

        <label className="relative flex items-center gap-2 border border-white/10 px-3 py-2 focus-within:border-[color:var(--acid)] lg:w-56">
          <Search className="h-3.5 w-3.5 shrink-0 text-white/30" aria-hidden="true" />
          <span className="sr-only">Search the journal</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search notes…"
            className="w-full bg-transparent text-sm text-white placeholder:text-white/25 focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/35">
        <span>
          {String(filtered.length).padStart(2, '0')} {filtered.length === 1 ? 'entry' : 'entries'}
        </span>
        <span>{tag === 'All' ? 'All topics' : tag}</span>
      </div>

      <motion.div layout className="mt-6 grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((post, index) => (
            <motion.div
              key={post.slug}
              layout
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: index * 0.03 }}
            >
              <Link href={`/blog/${post.slug}`} className="group k-card flex h-full flex-col">
                <PostCover post={post} index={index} showTitle={false} className="aspect-[16/10]" />
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/35">
                    <time dateTime={post.publishedAt}>{formatPostDateShort(post.publishedAt)}</time>
                    <span>{post.readingMinutes} min</span>
                  </div>
                  <h2 className="k-display mt-3 text-[1.55rem] leading-[1.05] text-white transition-colors group-hover:text-[color:var(--acid)] sm:text-[1.8rem]">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/50">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                    <span className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/30">
                      {post.tags.slice(0, 3).join(' · ')}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-white/25 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--acid)]" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 ? (
        <div className="mt-6 border border-dashed border-white/15 px-6 py-16 text-center">
          <p className="k-serif text-3xl text-white/70">Nothing filed under that yet.</p>
          <p className="mt-3 text-sm text-white/40">
            Try another topic, or clear the search.
          </p>
          <button
            type="button"
            onClick={() => {
              setTag('All')
              setQuery('')
            }}
            className="k-btn k-btn-acid mt-6"
          >
            Reset the index
          </button>
        </div>
      ) : null}
    </div>
  )
}
