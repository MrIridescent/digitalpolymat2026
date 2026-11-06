'use client'

import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type MagneticProps = {
  children: ReactNode
  className?: string
  strength?: number
}

/**
 * Pulls its child toward the pointer, then releases with an eased spring-out.
 * Disabled for coarse pointers and reduced-motion visitors.
 */
export function Magnetic({ children, className, strength = 12 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null)

  const reset = () => {
    const element = ref.current
    if (element) element.style.transform = 'translate3d(0, 0, 0)'
  }

  const onMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType !== 'mouse') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const element = ref.current
    if (!element) return
    const rect = element.getBoundingClientRect()
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    element.style.transform = `translate3d(${(dx * strength).toFixed(2)}px, ${(dy * strength).toFixed(2)}px, 0)`
  }

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onBlur={reset}
      className={cn('k-magnetic', className)}
    >
      {children}
    </span>
  )
}
