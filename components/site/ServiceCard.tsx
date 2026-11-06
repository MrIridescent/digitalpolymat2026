import Link from 'next/link'
import { ArrowUpRight, Check, ImageDown } from 'lucide-react'
import { IconTile } from '@/components/site/IconTile'
import { TiltCard } from '@/components/motion/TiltCard'
import type { Service } from '@/lib/profile'

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <TiltCard className="h-full">
      <article
        id={service.slug}
        className="card card-glass group flex h-full scroll-mt-24 flex-col p-7 sm:p-8"
      >
        <div className="card-spot" aria-hidden="true" />

        <div className="flex items-start justify-between gap-4">
          <IconTile icon={service.icon} />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/30">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[#67e8f9]/70">
          {service.kicker}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
          {service.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/55">{service.summary}</p>

        <ul className="mt-6 space-y-2.5">
          {service.outcomes.map((outcome) => (
            <li key={outcome} className="flex gap-2.5 text-xs leading-relaxed text-white/50">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300/80" strokeWidth={2.2} />
              {outcome}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {service.deliverables.slice(0, 4).map((deliverable) => (
            <span key={deliverable} className="chip">
              {deliverable}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-white/30">
            {service.engagement}
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`/share?service=${service.slug}#service-cards`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white/45 transition-colors hover:text-white"
            >
              Share card
              <ImageDown className="h-3.5 w-3.5" />
            </Link>
            <Link
              href={service.href ?? `/contact?service=${service.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 transition-colors group-hover:text-white"
            >
              {service.href ? 'Explore the offer' : 'Discuss this'}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </article>
    </TiltCard>
  )
}
