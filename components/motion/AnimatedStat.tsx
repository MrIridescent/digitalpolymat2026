'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

type AnimatedStatProps = {
  value: string
  className?: string
}

/**
 * Counts a numeric stat up once, when it enters the viewport. Non-numeric
 * values (or reduced-motion visitors) render exactly as supplied.
 */
export function AnimatedStat({ value, className }: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const reduceMotion = useReducedMotion()
  const target = Number.parseInt(value.replace(/[^0-9]/g, ''), 10)
  const prefix = value.match(/^[^0-9]*/)?.[0] ?? ''
  const suffix = value.match(/[^0-9]*$/)?.[0] ?? ''
  const [current, setCurrent] = useState(Number.isFinite(target) ? target : 0)

  useEffect(() => {
    if (!inView || reduceMotion || !Number.isFinite(target)) return
    let frame = 0
    const start = performance.now()
    const duration = 1100

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    setCurrent(0)
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduceMotion, target])

  if (!Number.isFinite(target)) {
    return <span className={className}>{value}</span>
  }

  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden="true">
        {prefix}
        {current}
        {suffix}
      </span>
    </span>
  )
}
