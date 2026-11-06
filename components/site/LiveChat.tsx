'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, MessageCircle, Send, X } from 'lucide-react'
import { site, whatsappLink } from '@/lib/profile'

const prompts = [
  {
    label: 'Growth or market entry',
    text: 'Hi David — I want help breaking into a new market or network. The brand, audience, and goal are:',
  },
  {
    label: 'PR or reputation',
    text: 'Hi David — I need help with public relations or online reputation for a brand. The situation is:',
  },
  {
    label: 'Content, film, or direction',
    text: 'Hi David — I want to talk about content, shooting, editing, or creative direction. The project is:',
  },
  {
    label: 'I have a product to build',
    text: 'Hi David — I have a product I want to take from idea to launch. The context is:',
  },
  {
    label: 'Speaking or partnership',
    text: 'Hi David — I am reaching out about speaking, press, or a partnership. The details are:',
  },
]

export function LiveChat() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState<string>(site.whatsapp.defaultMessage)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const href = whatsappLink(message.trim() || site.whatsapp.defaultMessage)

  return (
    <div className="print:hidden" data-live-chat>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-x-4 bottom-24 z-[60] overflow-hidden rounded-2xl border border-white/15 bg-[#0b0d12]/98 shadow-[0_30px_90px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:left-auto sm:right-5 sm:w-[390px]"
            role="dialog"
            aria-modal="false"
            aria-labelledby="live-chat-title"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-emerald-400/[0.06] p-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                  <MessageCircle className="h-4 w-4" />
                  <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0b0d12] bg-emerald-400" />
                </span>
                <div>
                  <p id="live-chat-title" className="text-sm font-semibold text-white">
                    Chat with David
                  </p>
                  <p className="mt-0.5 text-[0.68rem] text-white/45">
                    Opens WhatsApp · I reply there
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-white/30 hover:text-white"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[calc(100svh-12rem)] overflow-y-auto p-4 sm:max-h-[62vh]">
              <p className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/35">
                Start with a template
              </p>
              <div className="mt-3 grid gap-2">
                {prompts.map((prompt) => (
                  <button
                    key={prompt.label}
                    type="button"
                    onClick={() => setMessage(prompt.text)}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-left text-xs text-white/65 transition-colors hover:border-emerald-400/30 hover:bg-emerald-400/[0.06] hover:text-white"
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>

              <label
                htmlFor="live-chat-message"
                className="mt-5 block font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/35"
              >
                Your message
              </label>
              <textarea
                id="live-chat-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={3}
                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-sm leading-relaxed text-white placeholder:text-white/25 focus:border-emerald-400/40 focus:outline-none"
                placeholder="What are you trying to build?"
              />

              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3.5 text-sm font-semibold text-[#04110c] transition-colors hover:bg-emerald-400"
              >
                <Send className="h-4 w-4" />
                Continue on WhatsApp
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
              </a>

              <p className="mt-3 text-center text-[0.62rem] leading-relaxed text-white/30">
                No account needed. The message opens in WhatsApp so we can keep
                the conversation in one place.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Close live chat' : 'Chat with David on WhatsApp'}
        className="fixed bottom-4 right-4 z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-500 text-sm font-semibold text-[#04110c] shadow-[0_16px_40px_rgba(16,185,129,0.35)] transition-transform hover:scale-[1.03] sm:bottom-5 sm:right-5 sm:h-auto sm:w-auto sm:gap-2 sm:rounded-full sm:px-4 sm:py-3.5"
      >
        {open ? <X className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
        <span className="hidden sm:inline">{open ? 'Close' : 'Chat'}</span>
        {!open && (
          <span className="ml-0.5 hidden h-2 w-2 rounded-full bg-[#04110c]/40 sm:block" />
        )}
      </button>
    </div>
  )
}
