'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Small, opt-in GSAP layer. Elements stay visible without JavaScript; GSAP only
 * adds parallax, float, and grouped entrance effects where explicitly marked.
 */
export function GsapEffects() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
        const speed = Number(element.dataset.parallax || '12')
        const scope =
          element.closest<HTMLElement>('[data-parallax-scope]') ??
          element.parentElement

        gsap.fromTo(
          element,
          { yPercent: -speed / 2 },
          {
            yPercent: speed / 2,
            ease: 'none',
            scrollTrigger: {
              trigger: scope ?? element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
            },
          }
        )
      })

      gsap.utils.toArray<HTMLElement>('[data-gsap-float]').forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 === 0 ? -14 : 12,
          x: index % 2 === 0 ? 8 : -6,
          duration: 4.2 + index * 0.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.25,
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-gsap-stagger]').forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>('[data-gsap-item]')
        if (!items.length) return

        gsap.from(items, {
          y: 28,
          opacity: 0,
          duration: 0.8,
          stagger: 0.075,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 84%',
            once: true,
          },
        })
      })
    })

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [])

  return null
}
