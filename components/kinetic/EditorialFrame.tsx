/**
 * A quiet editorial frame: fixed margin notes that make the page feel composed
 * rather than merely stacked. Decorative, so it is hidden from assistive tech
 * and disappears below very wide screens where it would crowd the content.
 */
export function EditorialFrame() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 hidden 2xl:block">
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <p className="k-mono k-vert text-[0.5rem] text-white/25">
          Mr Iridescent · Portfolio 2026
        </p>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <p className="k-mono k-vert rotate-180 text-[0.5rem] text-white/25">
          Lagos · 06.52°N 03.38°E
        </p>
      </div>
      <span className="absolute left-4 top-24 h-8 w-px bg-white/15" />
      <span className="absolute left-4 bottom-24 h-8 w-px bg-white/15" />
      <span className="absolute right-4 top-24 h-8 w-px bg-white/15" />
      <span className="absolute right-4 bottom-24 h-8 w-px bg-white/15" />
    </div>
  )
}
