'use client'

import { useRef, type PointerEvent, type ReactNode } from 'react'

type TiltCardProps = {
  children: ReactNode
  className?: string
  max?: number
}

/**
 * Pointer-reactive 3D tilt. Mouse only; touch devices keep a plain card.
 */
export function TiltCard({ children, className = '', max = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    const element = ref.current
    if (!element) return

    const rect = element.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    element.style.setProperty('--ry', `${(x - 0.5) * max * 2}deg`)
    element.style.setProperty('--rx', `${-(y - 0.5) * max * 2}deg`)
    element.style.setProperty('--mx', `${x * 100}%`)
    element.style.setProperty('--my', `${y * 100}%`)
  }

  const onPointerLeave = () => {
    const element = ref.current
    if (!element) return
    element.style.setProperty('--ry', '0deg')
    element.style.setProperty('--rx', '0deg')
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`tilt-card ${className}`}
    >
      {children}
    </div>
  )
}
