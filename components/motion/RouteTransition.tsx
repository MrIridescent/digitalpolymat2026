'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'

/**
 * A curtain that covers the new page for three seconds, then lifts over 0.85s.
 * It only runs on client-side navigation — a fresh page load renders straight
 * to content, so the long hold never delays first paint or Largest Contentful
 * Paint. The infinity lockup stays visible until the curtain starts moving.
 */
const HOLD_SECONDS = 3
const LIFT_SECONDS = 0.85
const TOTAL_SECONDS = HOLD_SECONDS + LIFT_SECONDS
const LIFT_START = HOLD_SECONDS / TOTAL_SECONDS

export function RouteTransition() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const mountedPath = useRef(pathname)
  const hasNavigated = useRef(false)

  if (mountedPath.current !== pathname) {
    mountedPath.current = pathname
    hasNavigated.current = true
  }

  if (!hasNavigated.current || reduceMotion) return null

  return (
    <motion.div
      key={pathname}
      aria-hidden="true"
      className="fixed inset-0 z-[90] overflow-hidden"
      animate={{ y: ['0%', '0%', '-101%'] }}
      transition={{
        duration: TOTAL_SECONDS,
        times: [0, LIFT_START, 1],
        ease: ['linear', [0.76, 0, 0.24, 1]],
      }}
    >
      <div className="absolute inset-0 bg-[#08090c]" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_30%_20%,rgba(139,92,246,0.25),transparent_70%),radial-gradient(50%_45%_at_80%_70%,rgba(201,242,75,0.16),transparent_70%)]" />

      <motion.div
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[linear-gradient(90deg,#8b5cf6,#06b6d4,#c9f24b,#ec4899)]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: HOLD_SECONDS, ease: 'linear' }}
      />

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.55, delay: HOLD_SECONDS + 0.1, ease: 'easeIn' }}
        className="absolute inset-0 flex items-center justify-center px-6"
      >
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <Image
            src="/media/brand/mr-iridescent-infinity-light.png"
            alt=""
            width={1199}
            height={592}
            priority
            className="h-auto w-40 sm:w-48"
          />
          <span aria-hidden="true" className="hidden h-10 w-px bg-white/15 sm:block" />
          <p className="text-center sm:text-left">
            <span className="k-mono block text-white/65">Mr Iridescent 2026</span>
            <span className="mt-1 block font-mono text-[0.5rem] uppercase tracking-[0.18em] text-white/35">
              Creative Renaissance Man
            </span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
