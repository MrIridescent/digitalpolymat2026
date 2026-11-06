import Link from 'next/link'
import { cn } from '@/lib/utils'

const tabs = [
  { key: 'overview', label: 'Overview', href: '/credentials' },
  { key: 'cisco', label: 'Cisco badges', href: '/credentials/cisco' },
  { key: 'training', label: 'Other training', href: '/credentials/training' },
  { key: 'education', label: 'Schooling & languages', href: '/credentials/education' },
] as const

export type CredentialsTabKey = (typeof tabs)[number]['key']

export function CredentialsTabs({ current }: { current: CredentialsTabKey }) {
  return (
    <nav
      aria-label="Credential sections"
      className="mt-10 flex flex-wrap gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 sm:inline-flex"
    >
      {tabs.map((tab) => {
        const active = current === tab.key
        return (
          <Link
            key={tab.key}
            href={tab.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'rounded-xl px-3.5 py-2.5 text-xs font-medium transition-colors',
              active
                ? 'bg-paper text-[#15161a]'
                : 'text-white/55 hover:bg-white/5 hover:text-white'
            )}
          >
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
