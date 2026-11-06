'use client'

import { useEffect, useRef } from 'react'

/**
 * A soft spectral light that follows the pointer. Desktop only; hidden for
 * coarse pointers and reduced-motion visitors via CSS and this guard.
 */
export function CursorAura() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 3
    let currentX = targetX
    let currentY = targetY
    let frame = 0

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      element.style.opacity = '0.14'
    }

    const onLeave = () => {
      element.style.opacity = '0'
    }

    const render = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      element.style.transform = `translate3d(${currentX - 272}px, ${currentY - 272}px, 0)`
      frame = window.requestAnimationFrame(render)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    frame = window.requestAnimationFrame(render)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return <div ref={ref} className="cursor-aura" aria-hidden="true" />
}
