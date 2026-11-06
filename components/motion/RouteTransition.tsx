'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'

/**
 * A curtain that lifts whenever the route changes. It keys on the pathname, so
 * the new page is briefly covered, then revealed from the bottom edge up.
 */
export function RouteTransition() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      key={pathname}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] overflow-hidden"
      initial={reduceMotion ? { opacity: 0 } : { y: '0%' }}
      animate={reduceMotion ? { opacity: 0 } : { y: '-101%' }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="absolute inset-0 bg-[#08090c]" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_30%_20%,rgba(139,92,246,0.25),transparent_70%),radial-gradient(50%_45%_at_80%_70%,rgba(201,242,75,0.16),transparent_70%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[linear-gradient(90deg,#8b5cf6,#06b6d4,#c9f24b,#ec4899)]" />
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="k-mono text-white/50">Mr Iridescent · 2026</span>
      </motion.div>
    </motion.div>
  )
}
