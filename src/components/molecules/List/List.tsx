import { useCallback, useEffect, useRef, useState } from 'react'

// Replaces NextUI's ScrollShadow: a scroll listener toggles top/bottom fade
// overlays so the edges only shade when there's more content to scroll to. The
// gradients fade into `background`, matching the surrounding panel.
export function List({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLUListElement>(null)
  const [shadow, setShadow] = useState({ top: false, bottom: false })

  const update = useCallback(() => {
    const el = ref.current

    if (!el) return

    const { scrollTop, scrollHeight, clientHeight } = el

    setShadow({ top: scrollTop > 1, bottom: scrollTop + clientHeight < scrollHeight - 1 })
  }, [])

  useEffect(() => {
    update()
    const el = ref.current

    el?.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      el?.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  // Re-measure when the list contents change (filtering, navigation).
  useEffect(update, [children, update])

  return (
    <div className="relative min-h-0">
      {shadow.top && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-background to-transparent" />
      )}
      <ul ref={ref} className="h-full overflow-y-auto scroll-p-0 scroll-m-0">
        {children}
      </ul>
      {shadow.bottom && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 bg-gradient-to-t from-background to-transparent" />
      )}
    </div>
  )
}
