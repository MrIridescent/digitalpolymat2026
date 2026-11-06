'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { quoteForPath } from '@/lib/quote-passage'

const ROTATE_MS = 11000
const MAX_LINES = 4

/**
 * The page's quote, folded into the navigation pill.
 *
 * The first line is drawn deterministically from the route, so prerender and
 * hydration agree; neighbours from the same category follow on a slow timer.
 * Rotation begins after mount, which keeps the static HTML stable.
 */
export function NavQuote() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const selection = useMemo(() => quoteForPath(pathname), [pathname])
  const pool = useMemo(() => {
    if (!selection) return []
    return [selection.quote, ...selection.related.map((item) => item.quote)].slice(0, MAX_LINES)
  }, [selection])
  const [step, setStep] = useState(0)

  useEffect(() => {
    setStep(0)
  }, [pathname])

  useEffect(() => {
    if (reduceMotion || pool.length < 2) return
    const timer = window.setInterval(() => {
      setStep((value) => (value + 1) % pool.length)
    }, ROTATE_MS)
    return () => window.clearInterval(timer)
  }, [pool, reduceMotion])

  if (!pool.length) return null

  const current = pool[step % pool.length]

  return (
    <Link
      href="/quotes"
      aria-label="Quotes"
      title={`Quotes — ${current.author}`}
      className="group hidden h-full min-w-0 max-w-[16rem] flex-1 items-center gap-2.5 border-l border-white/10 pl-4 transition-colors min-[1340px]:flex"
    >
      <span
        aria-hidden="true"
        className="shrink-0 font-serif text-[1.05rem] leading-none text-[#c9f24b]/60 transition-colors group-hover:text-[#c9f24b]"
      >
        “
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={`${pathname}-${step}`}
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="flex min-w-0 flex-1 flex-col justify-center gap-[3px]"
        >
          <span className="line-clamp-2 text-[0.63rem] leading-[1.32] text-white/45 transition-colors group-hover:text-white/75">
            {current.text}
          </span>
          <span className="truncate font-mono text-[0.47rem] uppercase tracking-[0.16em] text-white/25 transition-colors group-hover:text-white/45">
            {current.author}
            <span className="text-white/15"> · {current.category}</span>
          </span>
        </motion.span>
      </AnimatePresence>
    </Link>
  )
}
