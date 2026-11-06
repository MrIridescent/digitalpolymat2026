'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, MessageCircle, X } from 'lucide-react'
import { shareIntent } from '@/lib/share'
import { whatsappLink } from '@/lib/profile'

const leadIn: Record<string, string> = {
  hiring: 'You were sent here for a hiring conversation.',
  'build-partner': 'You were sent here because there is a product to build.',
  referral: 'Someone thought this work was worth passing on.',
  collaboration: 'You were sent here for a possible collaboration.',
  speaking: 'You were sent here for a speaking or press conversation.',
  general: 'Someone thought this was worth a look.',
}

export function ReferralBanner() {
  const pathname = usePathname()
  const [slug, setSlug] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (pathname === '/share') return
    const params = new URLSearchParams(window.location.search)
    const via = params.get('via')
    if (!shareIntent(via)) return
    try {
      if (window.sessionStorage.getItem(`iridescent:via-dismissed:${via}`)) return
    } catch {
      // Storage can be blocked; still show the banner once.
    }
    setSlug(via)
    setVisible(true)
  }, [pathname])

  const intent = shareIntent(slug)

  function dismiss() {
    if (slug) {
      try {
        window.sessionStorage.setItem(`iridescent:via-dismissed:${slug}`, '1')
      } catch {
        // Ignore.
      }
    }
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && intent && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-3 top-20 z-40 mx-auto max-w-2xl rounded-2xl border border-[#67e8f9]/25 bg-[#0b0d12]/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:inset-x-5"
          role="status"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#67e8f9]/30 bg-[#67e8f9]/10 text-[#67e8f9]">
              <ArrowUpRight className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white">
                {leadIn[intent.slug] ?? leadIn.general}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-white/45">
                {intent.audience}. Start with the part that matters to you.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <Link
                  href={`${intent.ctaHref}?via=${intent.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#67e8f9] hover:text-white"
                >
                  {intent.ctaLabel}
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
                <a
                  href={whatsappLink(
                    `Hi David — someone shared your site with me (${intent.label.toLowerCase()}). I would like to talk.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-200/80 hover:text-white"
                >
                  <MessageCircle className="h-3 w-3" />
                  WhatsApp
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/40 hover:border-white/30 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
