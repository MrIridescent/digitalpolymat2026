'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Minus, Plus } from 'lucide-react'
import { KineticIcon } from '@/components/kinetic/KineticIcon'
import type { Service } from '@/lib/profile'

type ServicesIndexProps = {
  services: readonly Service[]
}

export function ServicesIndex({ services }: ServicesIndexProps) {
  const [open, setOpen] = useState(0)
  const reduceMotion = useReducedMotion()

  return (
    <div className="border-t border-white/10">
      {services.map((service, index) => {
        const expanded = open === index
        const panelId = `service-panel-${service.slug}`

        return (
          <div key={service.slug} className="k-row !block" data-open={expanded}>
            <button
              type="button"
              onClick={() => setOpen(expanded ? -1 : index)}
              aria-expanded={expanded}
              aria-controls={panelId}
              className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 py-6 text-left sm:gap-6"
            >
              <span className="k-row__num">{String(index + 1).padStart(2, '0')}</span>
              <span className="min-w-0">
                <span className="k-row__title block">{service.name}</span>
                <span className="mt-2 block font-mono text-[0.56rem] uppercase tracking-[0.16em] text-white/35">
                  {service.kicker}
                </span>
              </span>
              <span
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                  expanded
                    ? 'border-[color:var(--acid)] bg-[color:var(--acid)] text-[color:var(--acid-ink)]'
                    : 'border-white/15 text-white/50'
                }`}
                aria-hidden="true"
              >
                {expanded ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {expanded ? (
                <motion.div
                  id={panelId}
                  key="panel"
                  initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduceMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid gap-6 pb-8 sm:grid-cols-[auto_1fr] sm:gap-8 sm:pl-12">
                    <span className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-[color:var(--acid)] sm:inline-flex">
                      <KineticIcon name={service.icon} size={22} />
                    </span>
                    <div>
                      <p className="max-w-2xl text-sm leading-relaxed text-white/55">
                        {service.summary}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {service.deliverables.map((item) => (
                          <span
                            key={item}
                            className="border border-white/10 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-white/40"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                        <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-[color:var(--acid)]">
                          {service.engagement}
                        </span>
                        <Link
                          href={service.href ?? '/services'}
                          className="k-link inline-flex items-center gap-1.5 text-xs font-medium text-white/60"
                        >
                          Read the offer
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
