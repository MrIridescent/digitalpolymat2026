'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type RailCarouselProps = {
  children: ReactNode
  label: string
  className?: string
  slideClassName?: string
  controlsClassName?: string
}

/**
 * A native scroll-snap rail with drag, arrow buttons, a progress read-out and
 * keyboard support. Uses the platform's own scrolling, so it stays smooth and
 * accessible without a carousel dependency.
 */
export function RailCarousel({
  children,
  label,
  className,
  slideClassName,
  controlsClassName,
}: RailCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, left: 0, moved: false })
  const [progress, setProgress] = useState(0)
  const [ratio, setRatio] = useState(24)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const update = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const max = track.scrollWidth - track.clientWidth
    const value = max > 0 ? track.scrollLeft / max : 0
    setProgress(Math.min(1, Math.max(0, value)))
    setRatio(Math.min(100, Math.max(10, (track.clientWidth / track.scrollWidth) * 100)))
    setAtStart(track.scrollLeft <= 2)
    setAtEnd(track.scrollLeft >= max - 2)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    update()
    track.addEventListener('scroll', update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(track)
    return () => {
      track.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [update])

  const step = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const slide = track.querySelector<HTMLElement>('[data-slide]')
    const gap = 20
    const distance = slide ? slide.offsetWidth + gap : track.clientWidth * 0.8
    track.scrollBy({ left: distance * direction, behavior: 'smooth' })
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      step(1)
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      step(-1)
    }
  }

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    const track = trackRef.current
    if (!track) return
    drag.current = {
      active: true,
      startX: event.clientX,
      left: track.scrollLeft,
      moved: false,
    }
    track.classList.add('is-dragging')
    track.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track || !drag.current.active) return
    const delta = event.clientX - drag.current.startX
    if (Math.abs(delta) > 5) drag.current.moved = true
    track.scrollLeft = drag.current.left - delta
  }

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track) return
    drag.current.active = false
    track.classList.remove('is-dragging')
    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId)
    }
  }

  const onClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!drag.current.moved) return
    event.preventDefault()
    event.stopPropagation()
    drag.current.moved = false
  }

  return (
    <div className={cn('k-carousel', className)}>
      <div
        ref={trackRef}
        className="k-carousel__track"
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
      >
        {Array.isArray(children)
          ? children.map((child, index) => (
              <div
                key={index}
                data-slide
                className={cn('k-carousel__slide', slideClassName)}
              >
                {child}
              </div>
            ))
          : children}
      </div>

      <div className={cn('mt-5 flex items-center gap-4', controlsClassName)}>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="k-carousel__btn"
            onClick={() => step(-1)}
            disabled={atStart}
            aria-label="Previous item"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="k-carousel__btn"
            onClick={() => step(1)}
            disabled={atEnd}
            aria-label="Next item"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="k-carousel__progress flex-1" aria-hidden="true">
          <span
            className="k-carousel__bar"
            style={{
              width: `${ratio}%`,
              transform: `translateX(${progress * (100 / ratio - 1) * 100}%)`,
            }}
          />
        </div>
        <span className="k-mono tabular-nums text-white/35">
          {String(Math.round(progress * 100)).padStart(2, '0')}
          <span className="text-white/20"> / 100</span>
        </span>
      </div>
    </div>
  )
}
