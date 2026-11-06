import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { OrgLogo } from '@/components/site/OrgLogo'
import type { TrainingEntry } from '@/lib/profile'

export function CredentialBadge({ entry }: { entry: TrainingEntry }) {
  return (
    <article className="card card-glass group flex h-full flex-col p-5 sm:p-6" data-gsap-item>
      <div className="card-spot" aria-hidden="true" />

      <div className="flex items-start justify-between gap-3">
        <OrgLogo name={entry.issuer} size={42} />
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-white/30">
          {entry.year}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <p className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/30">
          {entry.kind}
        </p>
        {entry.verified && (
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[0.5rem] uppercase tracking-[0.1em] text-emerald-200">
            <ShieldCheck className="h-2.5 w-2.5" />
            Verified
          </span>
        )}
      </div>
      <h3 className="mt-1.5 text-base font-semibold leading-snug text-white">
        {entry.name}
      </h3>
      <p className="mt-1 text-xs leading-relaxed text-white/45">{entry.issuer}</p>
      <p className="mt-3 text-xs leading-relaxed text-white/50">{entry.note}</p>

      {entry.verified && entry.verifiedNote && (
        <p className="mt-3 text-[0.68rem] leading-relaxed text-emerald-200/70">
          {entry.verifiedNote}
        </p>
      )}

      {entry.evidence && (
        <a
          href={entry.evidence}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto inline-flex items-center gap-1.5 border-t border-white/10 pt-4 text-[0.68rem] font-medium transition-colors hover:text-white ${
            entry.verified ? 'text-emerald-200/80' : 'text-white/45'
          }`}
        >
          {entry.evidenceLabel ?? 'View evidence'}
          <ArrowUpRight className="h-3 w-3" />
        </a>
      )}
    </article>
  )
}
