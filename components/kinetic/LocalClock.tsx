'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type LocalClockProps = {
  className?: string
  label?: string
}

/** Live Lagos time. Renders a placeholder until mount to avoid hydration drift. */
export function LocalClock({ className, label = 'Lagos' }: LocalClockProps) {
  const [time, setTime] = useState('--:--')

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Africa/Lagos',
    })
    const tick = () => setTime(formatter.format(new Date()))
    tick()
    const timer = window.setInterval(tick, 30_000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <span className={cn('k-mono k-clock inline-flex items-center gap-2 text-white/40', className)}>
      <span className="k-dot-live" aria-hidden="true" />
      {label} {time} WAT
    </span>
  )
}
