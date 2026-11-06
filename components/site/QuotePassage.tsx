'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Marquee } from '@/components/kinetic/Marquee'
import { quotes } from '@/lib/quotes'
import { quoteForPath } from '@/lib/quote-passage'

/**
 * A page-specific passage from the quote library, sitting between the page and
 * the footer. The line is chosen deterministically from the pathname, so each
 * route (and each journal slug) carries a different voice.
 */
export function QuotePassage() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const selection = quoteForPath(pathname)
  const firstRender = useRef(true)

  useEffect(() => {
    firstRender.current = false
  }, [])

  if (!selection) return null

  const { quote, index, related } = selection
  const calm = reduceMotion || firstRender.current

  return (
    <section
      aria-label="A quote for this page"
      className="no-print relative overflow-hidden border-t border-white/10 bg-ink-soft/30"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_120%_at_12%_0%,rgba(139,92,246,0.11),transparent_62%),radial-gradient(50%_110%_at_100%_100%,rgba(201,242,75,0.07),transparent_70%)]"
      />
      <span
        aria-hidden="true"
        className="display pointer-events-none absolute -left-3 top-1 select-none text-[13rem] leading-none text-white/[0.035] sm:-left-6 sm:top-0 sm:text-[20rem]"
      >
        “
      </span>

      <div className="shell relative py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_2.3fr] lg:gap-16">
          <div className="flex flex-col items-start justify-between gap-8">
            <div>
              <p className="eyebrow">Commonplace</p>
              <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#c9f24b]/70">
                {quote.category}
              </p>
              <p className="mt-5 max-w-[17rem] text-[0.72rem] leading-relaxed text-white/30">
                A line from the working library, chosen for this page. Follow the
                thread and the rest of the collection opens.
              </p>
            </div>

            <Link
              href="/quotes"
              className="group inline-flex items-center gap-2 py-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/45 transition-colors hover:text-white"
            >
              Enter the library
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <motion.figure
            key={pathname}
            initial={calm ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: calm ? 0 : 3.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <blockquote className="display max-w-5xl text-[clamp(1.6rem,3.3vw,2.9rem)] leading-[1.14] text-white/90">
              <span aria-hidden="true" className="iridescent-text">
                “
              </span>
              {quote.text}
              <span aria-hidden="true" className="text-white/30">
                ”
              </span>
            </blockquote>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-5">
              <figcaption className="text-sm text-white/50">
                <span className="font-semibold text-white">{quote.author}</span>
                <span className="text-white/25"> · {quote.context}</span>
                {quote.source ? (
                  <span className="mt-1 block text-[0.66rem] leading-relaxed text-white/25">
                    {quote.source}
                  </span>
                ) : null}
              </figcaption>
              <span className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-white/20">
                {String(index + 1).padStart(2, '0')} / {quotes.length}
              </span>
            </div>
          </motion.figure>
        </div>
      </div>

      {related.length > 0 ? (
        <div className="relative border-t border-white/10 py-3">
          <Marquee
            speed="slow"
            label={`More quotes on ${quote.category}`}
            separator={
              <span aria-hidden="true" className="mx-5 text-[#c9f24b]/50">
                ✦
              </span>
            }
          >
            {related.map((item) => (
              <Link
                key={item.index}
                href="/quotes"
                className="text-[0.68rem] text-white/35 transition-colors hover:text-white/80"
              >
                “{item.quote.text}” — {item.quote.author}
              </Link>
            ))}
          </Marquee>
        </div>
      ) : null}
    </section>
  )
}
