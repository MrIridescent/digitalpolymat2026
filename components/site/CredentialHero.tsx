import type { ReactNode } from 'react'
import { CredentialsTabs, type CredentialsTabKey } from '@/components/site/CredentialsTabs'

type CredentialHeroProps = {
  current: CredentialsTabKey
  eyebrow: string
  title: ReactNode
  body: string
  stats?: readonly { value: string; label: string }[]
}

export function CredentialHero({ current, eyebrow, title, body, stats }: CredentialHeroProps) {
  return (
    <section
      className="aurora grain relative overflow-hidden border-b border-white/10 pb-12 pt-20 sm:pt-24"
      data-parallax-scope
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="orb -left-24 top-16 h-72 w-72 opacity-25" data-parallax="12" aria-hidden="true" />

      <div className="shell relative">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display mt-6 max-w-4xl text-5xl text-white sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">{body}</p>

        {stats && stats.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-ink-soft p-5">
                <p className="display text-3xl text-white sm:text-4xl">{stat.value}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        <CredentialsTabs current={current} />
      </div>
    </section>
  )
}
