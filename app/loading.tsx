export default function LoadingPage() {
  return (
    <div
      className="flex min-h-[70vh] items-center justify-center px-6 py-32"
      role="status"
      aria-live="polite"
    >
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3">
          <span className="iridescent-dot animate-pulse" aria-hidden="true" />
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/45">
            Loading
          </p>
        </div>

        <div className="mt-8 space-y-3" aria-hidden="true">
          <div className="h-3 w-11/12 rounded-full bg-white/[0.07]" />
          <div className="h-3 w-8/12 rounded-full bg-white/[0.05]" />
          <div className="h-3 w-10/12 rounded-full bg-white/[0.04]" />
        </div>

        <span className="sr-only">Loading page content…</span>
      </div>
    </div>
  )
}
