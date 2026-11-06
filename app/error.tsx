'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="aurora grain relative flex min-h-[80vh] items-center overflow-hidden py-32">
      <div className="shell relative">
        <div className="max-w-xl">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/10">
            <AlertTriangle className="h-6 w-6 text-red-300" />
          </span>

          <p className="eyebrow mt-8">Something broke</p>

          <h1 className="display mt-5 text-5xl text-white sm:text-6xl">
            This one is{' '}
            <span className="iridescent-text italic">on me.</span>
          </h1>

          <p className="mt-6 text-base leading-relaxed text-white/55">
            An unexpected error interrupted the page. You can try again, head
            home, or email me if it keeps happening — a real person reads those
            messages.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <button onClick={reset} className="btn btn-primary">
              <RefreshCw className="h-4 w-4" />
              Try again
            </button>
            <Link href="/" className="btn btn-ghost">
              Go home
            </Link>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <details className="mt-10 rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <summary className="cursor-pointer text-sm text-white/50 hover:text-white/80">
                Error details (development only)
              </summary>
              <pre className="mt-4 overflow-auto text-xs leading-relaxed text-red-300">
                {error.message}
              </pre>
            </details>
          )}
        </div>
      </div>
    </section>
  )
}
