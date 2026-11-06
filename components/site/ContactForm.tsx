'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Mail,
  MessageCircle,
  Send,
  Sparkles,
} from 'lucide-react'
import { services, site, whatsappLink } from '@/lib/profile'

const projectTypes = [
  'Growth hacking / market entry',
  'Public relations / reputation management',
  'Content, film, or creative direction',
  'Digital product delivery architecture',
  'Custom software development',
  'Workflow automation / AI enablement',
  'Growth partnership for a brand',
  'Security / DevSecOps',
  'Creative / brand system',
  'Speaking or press',
  'Something else',
]

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [reference, setReference] = useState('')
  const [serviceSlug, setServiceSlug] = useState<string | null>(null)
  const [name, setName] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setServiceSlug(params.get('service'))
  }, [])

  const service = useMemo(
    () => services.find((item) => item.slug === serviceSlug),
    [serviceSlug]
  )

  const whatsappFallback = whatsappLink(
    `Hi David — I tried the contact form${name ? ` (${name})` : ''} and would like to talk about a project.`
  )

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return

    const form = event.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      company: String(data.get('company') ?? '').trim(),
      projectType: String(data.get('projectType') ?? '').trim(),
      service: String(data.get('service') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
      'bot-field': String(data.get('bot-field') ?? ''),
    }

    setStatus('sending')
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok || result.ok !== true) {
        throw new Error(
          result.message ||
            'The message could not be sent right now. Email me@mriridescent.africa or use WhatsApp.'
        )
      }

      setReference(result.reference ?? '')
      setStatus('sent')
      form.reset()
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'The message could not be sent right now. Email me@mriridescent.africa or use WhatsApp.'
      )
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.07] p-7 sm:p-9">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
          <CheckCircle2 className="h-5 w-5" />
        </span>
        <h2 className="display mt-6 text-3xl text-white">Message received.</h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55">
          Thank you{name ? `, ${name.split(' ')[0]}` : ''}. I read every message
          myself and will reply within two business days.
          {reference ? (
            <>
              {' '}
              Your reference is{' '}
              <span className="font-mono text-emerald-200/80">{reference}</span>.
            </>
          ) : null}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp instead
          </a>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="btn btn-ghost"
          >
            Send another message
          </button>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-white/10 bg-ink-soft p-6 sm:p-8"
    >
      {service && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-[#67e8f9]/25 bg-[#67e8f9]/[0.05] p-4">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#67e8f9]" />
          <div>
            <p className="text-sm font-medium text-white">
              You are asking about{' '}
              {service.name.charAt(0).toLowerCase() + service.name.slice(1)}.
            </p>
            <p className="mt-1 text-xs leading-relaxed text-white/45">
              Add the context that matters: what exists today, what is stuck, and
              what a good outcome looks like.
            </p>
          </div>
        </div>
      )}

      <input type="hidden" name="service" value={service?.slug ?? ''} />
      <p className="hidden" aria-hidden="true">
        <label>
          Do not fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-white">
          Start a conversation
        </h2>
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/30">
          Replies in ~2 days
        </span>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/40"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-white/30 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/40"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-white/30 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="company"
            className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/40"
          >
            Company / organisation
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Optional"
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 focus:border-white/30 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="projectType"
            className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/40"
          >
            What is this about?
          </label>
          <select
            id="projectType"
            name="projectType"
            className="mt-2 w-full rounded-xl border border-white/10 bg-ink-soft px-4 py-3 text-sm text-white focus:border-white/30 focus:outline-none"
          >
            {projectTypes.map((type) => (
              <option key={type} value={type} className="bg-ink-soft">
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="message"
          className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/40"
        >
          The context
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={7}
          placeholder="What are you building, what is getting in the way, and what would make this a success?"
          className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-relaxed text-white placeholder:text-white/25 focus:border-white/30 focus:outline-none"
        />
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="mt-5 flex items-start gap-3 rounded-xl border border-rose-400/25 bg-rose-400/[0.07] p-4 text-sm text-rose-100"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p>{error}</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
              <a
                href={site.emailHref}
                className="inline-flex items-center gap-1.5 font-medium text-white underline decoration-white/25 underline-offset-4 hover:decoration-white"
              >
                <Mail className="h-3.5 w-3.5" />
                Email {site.email}
              </a>
              <a
                href={whatsappFallback}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-white/70 underline decoration-white/20 underline-offset-4 hover:text-white hover:decoration-white/40"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Send it on WhatsApp instead
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-[0.68rem] leading-relaxed text-white/30">
          Please do not include credentials, secrets, or confidential client data
          in this form.
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn btn-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'sending' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send message
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </div>

      <p className="mt-4 flex items-center gap-1.5 text-[0.65rem] text-white/25">
        <ArrowUpRight className="h-3 w-3" />
        Delivered privately to {site.name}. Your address is used only to reply.
      </p>
    </form>
  )
}
