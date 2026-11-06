import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SplitLinesProps = {
  lines: ReactNode[]
  className?: string
  lineClassName?: string
  /** Milliseconds before the first line starts. */
  delay?: number
  /** Milliseconds between lines. */
  stagger?: number
}

/**
 * A line-by-line masked entrance. Each line rises from behind an overflow mask,
 * which reads as typographic rather than as a generic fade.
 */
export function SplitLines({
  lines,
  className,
  lineClassName,
  delay = 120,
  stagger = 95,
}: SplitLinesProps) {
  return (
    <span className={cn('block', className)}>
      {lines.map((line, index) => (
        <span key={index} className="k-line-mask">
          <span
            className={cn('k-line-inner', lineClassName)}
            style={{ animationDelay: `${delay + index * stagger}ms` } as CSSProperties}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  )
}
