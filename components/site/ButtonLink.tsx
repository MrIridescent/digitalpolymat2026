import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonLinkProps = {
  href: string
  variant?: 'primary' | 'ghost' | 'spectral'
  download?: boolean
  className?: string
  children: React.ReactNode
  target?: string
  rel?: string
}

export function ButtonLink({
  href,
  variant = 'primary',
  download = false,
  className,
  children,
  target,
  rel,
}: ButtonLinkProps) {
  const classes = cn('btn', `btn-${variant}`, className)

  if (download || href.startsWith('http')) {
    return (
      <a
        href={href}
        className={classes}
        download={download || undefined}
        target={target}
        rel={target === '_blank' ? rel || 'noopener noreferrer' : rel}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}
