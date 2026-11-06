'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Heart,
  Quote as QuoteIcon,
  Search,
  Shuffle,
} from 'lucide-react'
import Link from 'next/link'
import { quotes } from '@/lib/quotes'

const FAVORITES_KEY = 'iridescent:quote-favorites'

export default function QuotesPage() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [favorites, setFavorites] = useState<number[]>([])
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(FAVORITES_KEY)
      if (saved) setFavorites(JSON.parse(saved))
    } catch {
      // Storage is optional; the page works without it.
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    } catch {
      // Ignore quota or privacy-mode failures.
    }
  }, [favorites])

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(quotes.map((quote) => quote.category)))],
    []
  )

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return quotes
      .map((quote, index) => ({ quote, index }))
      .filter(({ quote }) => {
        const matchesCategory = category === 'All' || quote.category === category
        const matchesQuery =
          !normalized ||
          quote.text.toLowerCase().includes(normalized) ||
          quote.author.toLowerCase().includes(normalized) ||
          quote.category.toLowerCase().includes(normalized)
        return matchesCategory && matchesQuery
      })
  }, [category, query])

  const current = quotes[currentQuote]

  const nextQuote = () => setCurrentQuote((value) => (value + 1) % quotes.length)
  const prevQuote = () =>
    setCurrentQuote((value) => (value - 1 + quotes.length) % quotes.length)

  const shuffleQuote = () => {
    if (filtered.length === 0) return
    const pick = filtered[Math.floor(Math.random() * filtered.length)]
    setCurrentQuote(pick.index)
  }

  const toggleFavorite = (index: number) => {
    setFavorites((previous) =>
      previous.includes(index)
        ? previous.filter((value) => value !== index)
        : [...previous, index]
    )
  }

  const shareQuote = async () => {
    const text = `“${current.text}” — ${current.author}`
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'A quote worth keeping',
          text,
          url: window.location.href,
        })
        return
      } catch {
        // The user may have cancelled; fall through to copying.
      }
    }
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      // Clipboard access can be blocked; no destructive fallback needed.
    }
  }

  return (
    <>
      <section className="aurora grain relative overflow-hidden pb-16 pt-32 sm:pt-36">
        <div className="shell relative">
          <p className="eyebrow animate-rise">Quotes · a working library</p>
          <h1 className="display animate-rise delay-1 mt-6 max-w-4xl text-[clamp(2.9rem,6.4vw,5.6rem)] text-white">
            Wisdom is a{' '}
            <span className="iridescent-text italic">shared inheritance.</span>
          </h1>
          <p className="animate-rise delay-2 mt-7 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
            A collection of lines that shaped how I think about craft, systems,
            and the polymathic life — from Renaissance masters, engineers, and
            writers who refused the boundaries of their time.
          </p>
        </div>
      </section>

      <section className="section-tight border-t border-white/10">
        <div className="shell">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-ink-soft p-7 sm:p-12">
            <QuoteIcon
              className="pointer-events-none absolute -right-4 -top-6 h-40 w-40 text-white/[0.03]"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="tag">{current.category}</span>
                <span className="font-mono text-[0.62rem] text-white/30">
                  {currentQuote + 1} / {quotes.length}
                </span>
              </div>

              <div className="mt-10 min-h-[13rem] sm:min-h-[11rem]">
                <AnimatePresence mode="wait">
                  <motion.figure
                    key={currentQuote}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35 }}
                  >
                    <blockquote className="display text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.15] text-white/90">
                      “{current.text}”
                    </blockquote>
                    <figcaption className="mt-8 text-sm text-white/55">
                      <span className="font-semibold text-white">{current.author}</span>
                      <span className="text-white/30"> · {current.context}</span>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevQuote}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/35 hover:text-white"
                    aria-label="Previous quote"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={shuffleQuote}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/35 hover:text-white"
                    aria-label="Shuffle quote"
                  >
                    <Shuffle className="h-4 w-4" />
                  </button>
                  <button
                    onClick={nextQuote}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/35 hover:text-white"
                    aria-label="Next quote"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(currentQuote)}
                    className={`flex h-10 items-center gap-2 rounded-full border px-4 text-xs transition-colors ${
                      favorites.includes(currentQuote)
                        ? 'border-rose-400/40 bg-rose-400/10 text-rose-200'
                        : 'border-white/15 text-white/55 hover:border-white/35 hover:text-white'
                    }`}
                    aria-pressed={favorites.includes(currentQuote)}
                  >
                    <Heart
                      className={`h-3.5 w-3.5 ${
                        favorites.includes(currentQuote) ? 'fill-current' : ''
                      }`}
                    />
                    {favorites.includes(currentQuote) ? 'Saved' : 'Save'}
                  </button>
                  <button
                    onClick={shareQuote}
                    className="flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-xs text-white/55 transition-colors hover:border-white/35 hover:text-white"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">Browse</p>
              <h2 className="display mt-4 text-4xl text-white sm:text-5xl">
                The full collection.
              </h2>
            </div>
            <div className="relative w-full lg:max-w-xs">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search quotes or authors"
                aria-label="Search quotes or authors"
                className="w-full rounded-full border border-white/15 bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/30 focus:border-white/35 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                  category === item
                    ? 'border-white/40 bg-white text-ink'
                    : 'border-white/15 text-white/50 hover:border-white/35 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {favorites.length > 0 && (
            <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold text-white">
                  Saved quotes ({favorites.length})
                </h3>
                <button
                  onClick={() => setFavorites([])}
                  className="text-xs text-white/35 hover:text-white/70"
                >
                  Clear
                </button>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {favorites.map((index) => {
                  const quote = quotes[index]
                  if (!quote) return null
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentQuote(index)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      className="rounded-xl border border-white/10 bg-ink-soft p-5 text-left transition-colors hover:border-white/25"
                    >
                      <p className="text-sm leading-relaxed text-white/70">“{quote.text}”</p>
                      <p className="mt-3 text-xs text-white/35">{quote.author}</p>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <div className="mt-12 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map(({ quote, index }) => (
              <article
                key={index}
                className={`group flex flex-col rounded-xl border p-5 transition-colors ${
                  index === currentQuote
                    ? 'border-white/30 bg-white/[0.05]'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/25'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="tag">{quote.category}</span>
                  <button
                    onClick={() => toggleFavorite(index)}
                    className={`-m-2 p-2 transition-colors ${
                      favorites.includes(index)
                        ? 'text-rose-300'
                        : 'text-white/20 hover:text-white/60'
                    }`}
                    aria-label={
                      favorites.includes(index)
                        ? `Remove quote by ${quote.author} from saved quotes`
                        : `Save quote by ${quote.author}`
                    }
                    aria-pressed={favorites.includes(index)}
                  >
                    <Heart
                      className={`h-4 w-4 ${favorites.includes(index) ? 'fill-current' : ''}`}
                    />
                  </button>
                </div>

                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/65">
                  “{quote.text}”
                </blockquote>

                <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/10 pt-4">
                  <div>
                    <p className="text-xs font-medium text-white/80">{quote.author}</p>
                    <p className="mt-0.5 text-[0.68rem] text-white/30">{quote.context}</p>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentQuote(index)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="text-white/20 transition-colors hover:text-white"
                    aria-label={`Feature quote by ${quote.author}`}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-12 rounded-2xl border border-white/10 p-10 text-center">
              <p className="text-sm text-white/45">
                No quotes match “{query}” in {category}. Try a different word or category.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section border-t border-white/10 bg-ink-soft/40">
        <div className="shell text-center">
          <p className="eyebrow justify-center">Keep thinking</p>
          <h2 className="display mx-auto mt-5 max-w-3xl text-4xl text-white sm:text-5xl">
            A quote is only useful if it{' '}
            <span className="iridescent-text italic">changes a decision.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/50">
            The rest of this site is where those ideas meet actual work: security
            platforms, AI systems, and products built in public.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/projects" className="btn btn-primary">
              See the work
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/philosophy" className="btn btn-ghost">
              Read the philosophy
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
