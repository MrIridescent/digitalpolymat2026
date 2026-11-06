'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Lenis smooth scroll, wired into GSAP's ticker so ScrollTrigger stays in sync.
 * Skipped entirely for visitors who ask for reduced motion.
 */
export function SmoothScroll() {
  // Deep links still need to land correctly when Lenis is disabled. The native
  // hash jump is unreliable in a statically exported App Router page, so move
  // the document manually and respect the fixed header offset.
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const jump = () => {
      const hash = window.location.hash
      if (hash.length < 2) return
      let id = hash.slice(1)
      try {
        id = decodeURIComponent(id)
      } catch {
        // Keep the raw fragment if it cannot be decoded.
      }
      const target = document.getElementById(id)
      if (!target) return
      const top = target.getBoundingClientRect().top + window.scrollY - 88
      const previous = document.documentElement.style.scrollBehavior
      document.documentElement.style.scrollBehavior = 'auto'
      window.scrollTo(0, Math.max(0, top))
      document.documentElement.style.scrollBehavior = previous
    }

    const timers = window.location.hash
      ? [0, 250, 900].map((delay) => window.setTimeout(jump, delay))
      : []
    window.addEventListener('hashchange', jump)

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
      window.removeEventListener('hashchange', jump)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.25,
      anchors: true,
    })

    const update = () => ScrollTrigger.update()
    lenis.on('scroll', update)

    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Lenis takes over scrolling, so the browser's own initial hash jump is
    // lost. Restore it for deep links such as /services#security-devsecops.
    const scrollToHash = (immediate: boolean) => {
      const hash = window.location.hash
      if (hash.length < 2) return
      let id = hash.slice(1)
      try {
        id = decodeURIComponent(id)
      } catch {
        // Keep the raw fragment if it cannot be decoded.
      }
      const target = document.getElementById(id)
      if (target) {
        lenis.resize()
        lenis.scrollTo(target, { offset: -88, immediate })
      }
    }

    if (window.location.hash) {
      window.requestAnimationFrame(() => scrollToHash(true))
    }

    // Next's scroll restoration can land after Lenis has measured the document.
    // Retry twice so a deep link survives that race.
    const hashTimers = window.location.hash
      ? [250, 900].map((delay) =>
          window.setTimeout(() => {
            if (window.location.hash) scrollToHash(true)
          }, delay)
        )
      : []

    const onHashChange = () => scrollToHash(false)
    window.addEventListener('hashchange', onHashChange)

    const refresh = () => {
      ScrollTrigger.refresh()
      lenis.resize()
      // Fonts and images settle after Lenis has measured the page, so retry the
      // deep link once the document height is final.
      if (window.location.hash) scrollToHash(true)
    }
    window.addEventListener('load', refresh)
    if (document.fonts) {
      document.fonts.ready.then(refresh).catch(() => undefined)
    }

    return () => {
      hashTimers.forEach((timer) => window.clearTimeout(timer))
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener('load', refresh)
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return null
}
