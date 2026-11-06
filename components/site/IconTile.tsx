import {
  Code2,
  Compass,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import type { ServiceIcon } from '@/lib/profile'

const icons: Record<ServiceIcon, LucideIcon> = {
  compass: Compass,
  code: Code2,
  workflow: Workflow,
  growth: TrendingUp,
  shield: ShieldCheck,
  sparkles: Sparkles,
}

const tones: Record<ServiceIcon, string> = {
  compass: 'violet',
  code: 'cyan',
  workflow: 'amber',
  growth: 'emerald',
  shield: 'cyan',
  sparkles: 'violet',
}

export function IconTile({
  icon,
  className = '',
  size = 'md',
}: {
  icon: ServiceIcon
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const Icon = icons[icon]
  const dimension =
    size === 'lg' ? 'h-14 w-14 rounded-2xl' : size === 'sm' ? 'h-10 w-10 rounded-xl' : 'h-12 w-12 rounded-2xl'
  const iconSize = size === 'lg' ? 'h-6 w-6' : size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'

  return (
    <span
      className={`icon-tile ${dimension} ${className}`}
      data-tone={tones[icon]}
      aria-hidden="true"
    >
      <Icon className={iconSize} strokeWidth={1.6} />
    </span>
  )
}
