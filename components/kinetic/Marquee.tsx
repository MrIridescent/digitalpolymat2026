import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type MarqueeProps = {
  children: ReactNode
  className?: string
  itemClassName?: string
  speed?: 'slow' | 'normal' | 'fast'
  direction?: 'left' | 'right'
  /** Separator rendered between items. */
  separator?: ReactNode
  label?: string
}

/**
 * A seamless CSS marquee. Two identical groups move by -50%, so the loop has
 * no visible seam. Pauses on hover; fully stopped by reduced-motion CSS.
 */
export function Marquee({
  children,
  className,
  itemClassName,
  speed = 'normal',
  direction = 'left',
  separator,
  label,
}: MarqueeProps) {
  const items = Array.isArray(children) ? children : [children]

  return (
    <div
      className={cn(
        'k-marquee',
        speed === 'slow' && 'k-marquee--slow',
        speed === 'fast' && 'k-marquee--fast',
        direction === 'right' && 'k-marquee--reverse',
        className
      )}
      aria-label={label}
    >
      <div className="k-marquee__track">
        {[0, 1].map((group) => (
          <div
            key={group}
            className="flex shrink-0 items-center"
            aria-hidden={group === 1 || undefined}
          >
            {items.map((item, index) => (
              <span
                key={`${group}-${index}`}
                className={cn('k-marquee__item', itemClassName)}
                style={{ '--k-i': index } as CSSProperties}
              >
                {item}
                {separator}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
