'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

export function SentNotice() {
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setSent(params.get('sent') === 'true')
  }, [])

  if (!sent) return null

  return (
    <div
      role="status"
      className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-400/25 bg-emerald-400/10 p-4 text-sm text-emerald-100"
    >
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
      <p>
        Message received. I will reply within two business days. If it is urgent,
        email me directly.
      </p>
    </div>
  )
}
