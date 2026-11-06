'use client'

import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { services } from '@/lib/profile'

export function ServiceIntentNotice() {
  const [slug, setSlug] = useState<string | null>(null)

  useEffect(() => {
    setSlug(new URLSearchParams(window.location.search).get('service'))
  }, [])

  const service = services.find((item) => item.slug === slug)

  if (!service) return null

  return (
    <div className="mb-5 flex items-start gap-3 rounded-xl border border-[#67e8f9]/25 bg-[#67e8f9]/[0.05] p-4">
      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#67e8f9]" />
      <div>
        <p className="text-sm font-medium text-white">
          You are asking about{' '}
          {service.name.charAt(0).toLowerCase() + service.name.slice(1)}.
        </p>
        <p className="mt-1 text-xs leading-relaxed text-white/45">
          Add the context that matters: what exists today, what is stuck, and
          what a good outcome looks like. I read every message myself.
        </p>
      </div>
      <input type="hidden" name="service" value={service.slug} />
    </div>
  )
}
