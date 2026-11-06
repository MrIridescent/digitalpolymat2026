import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

type SectionHeadingProps = {
  eyebrow: string
  title: React.ReactNode
  body?: string
  action?: { label: string; href: string }
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  action,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
      className={
        align === 'center'
          ? 'mx-auto max-w-3xl text-center'
          : 'flex flex-col gap-6 md:flex-row md:items-end md:justify-between'
      }
    >
      <div className={align === 'center' ? '' : 'max-w-2xl'}>
        <p className={align === 'center' ? 'eyebrow justify-center' : 'eyebrow'}>
          {eyebrow}
        </p>
        <h2 className="display mt-5 text-4xl text-white sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        {body && (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
            {body}
          </p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-2 text-sm text-white/60 hover:text-white"
        >
          {action.label}
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-white/40">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      )}
    </div>
  )
}
