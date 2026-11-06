'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type ScrollWordsProps = {
  text: string
  className?: string
  /** Words matching these substrings are lit in acid. */
  accent?: string[]
}

/**
 * Lights a sentence word by word as it travels up the viewport. The effect is
 * scroll-linked rather than time-based, so it reads as part of the page.
 */
export function ScrollWords({ text, className, accent = [] }: ScrollWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null)
  const words = text.split(' ')

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const targets = Array.from(
      element.querySelectorAll<HTMLElement>('[data-word]')
    )

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((target) => (target.dataset.lit = 'true'))
      return
    }

    let frame = 0
    const update = () => {
      frame = 0
      const rect = element.getBoundingClientRect()
      const start = window.innerHeight * 0.88
      const end = window.innerHeight * 0.22
      const span = rect.height + (start - end)
      const travelled = start - rect.top
      const progress = Math.min(1, Math.max(0, travelled / span))
      const lit = Math.round(progress * targets.length)
      targets.forEach((target, index) => {
        target.dataset.lit = String(index < lit)
      })
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <p ref={ref} className={cn('k-balance', className)}>
      {words.map((word, index) => {
        const clean = word.toLowerCase().replace(/[^a-z]/g, '')
        const highlighted = accent.includes(clean)
        return (
          <span
            key={`${word}-${index}`}
            data-word
            className={cn('k-word', highlighted && 'k-word-acid')}
          >
            {word}
            {index < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </p>
  )
}
