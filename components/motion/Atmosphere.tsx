'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  hue: number
  alpha: number
}

/**
 * Lightweight canvas atmosphere for the hero. It is decorative, DPR-aware,
 * pointer-reactive, and renders a single static frame for reduced motion.
 */
export function Atmosphere({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hues = [190, 264, 32, 330]
    let width = 0
    let height = 0
    let particles: Particle[] = []
    let frame = 0
    const pointer = { x: -10000, y: -10000, active: false }

    const seed = () => {
      const density = Math.min(92, Math.max(28, Math.round((width * height) / 24000)))
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: 0.7 + Math.random() * 1.9,
        hue: hues[Math.floor(Math.random() * hues.length)],
        alpha: 0.22 + Math.random() * 0.55,
      }))
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const draw = (animate: boolean) => {
      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation = 'lighter'

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i]

        if (animate) {
          particle.x += particle.vx
          particle.y += particle.vy

          if (particle.x < -20) particle.x = width + 20
          if (particle.x > width + 20) particle.x = -20
          if (particle.y < -20) particle.y = height + 20
          if (particle.y > height + 20) particle.y = -20

          if (pointer.active) {
            const dx = particle.x - pointer.x
            const dy = particle.y - pointer.y
            const distance = Math.hypot(dx, dy)
            if (distance < 150 && distance > 0.1) {
              const force = (150 - distance) / 150
              particle.x += (dx / distance) * force * 0.55
              particle.y += (dy / distance) * force * 0.55
            }
          }
        }

        for (let j = i + 1; j < particles.length; j += 1) {
          const other = particles[j]
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.hypot(dx, dy)
          if (distance < 118) {
            context.beginPath()
            context.strokeStyle = `hsla(${particle.hue}, 85%, 70%, ${((118 - distance) / 118) * 0.16})`
            context.lineWidth = 0.6
            context.moveTo(particle.x, particle.y)
            context.lineTo(other.x, other.y)
            context.stroke()
          }
        }

        context.beginPath()
        context.fillStyle = `hsla(${particle.hue}, 92%, 72%, ${particle.alpha})`
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fill()
      }

      context.globalCompositeOperation = 'source-over'
    }

    const loop = () => {
      draw(true)
      frame = window.requestAnimationFrame(loop)
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active =
        pointer.x >= 0 &&
        pointer.y >= 0 &&
        pointer.x <= rect.width &&
        pointer.y <= rect.height
    }

    const onPointerLeave = () => {
      pointer.active = false
    }

    resize()
    draw(false)

    const observer = new ResizeObserver(() => {
      resize()
      draw(false)
    })
    observer.observe(canvas)

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)

    if (!reduceMotion) {
      frame = window.requestAnimationFrame(loop)
    }

    return () => {
      observer.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}
