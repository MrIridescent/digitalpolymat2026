import Link from 'next/link'
import { ArrowUpRight, Home, Search } from 'lucide-react'
import { BackButton } from '@/components/BackButton'

const popular = [
  { href: '/projects', label: 'Projects' },
  { href: '/case-studies', label: 'Case studies' },
  { href: '/about', label: 'About' },
  { href: '/writings', label: 'Writing' },
  { href: '/contact', label: 'Contact' },
]

export default function NotFound() {
  return (
    <section className="aurora grain relative flex min-h-[80vh] items-center overflow-hidden py-32">
      <div className="shell relative">
        <div className="max-w-xl">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
            <Search className="h-6 w-6 text-white/60" />
          </span>

          <p className="eyebrow mt-8">404 · Not found</p>

          <h1 className="display mt-5 text-6xl text-white sm:text-7xl">
            This page took a{' '}
            <span className="iridescent-text italic">different route.</span>
          </h1>

          <p className="mt-6 text-base leading-relaxed text-white/55">
            The link may be out of date, or the page may have moved. The work is
            still here — start from one of these.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-primary">
              <Home className="h-4 w-4" />
              Go home
            </Link>
            <BackButton />
          </div>

          <div className="mt-12 border-t border-white/10 pt-6">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/30">
              Popular pages
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {popular.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group inline-flex items-center gap-1.5 text-sm text-white/55 transition-colors hover:text-white"
                >
                  {item.label}
                  <ArrowUpRight className="h-3 w-3 text-white/25 group-hover:text-white/70" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
