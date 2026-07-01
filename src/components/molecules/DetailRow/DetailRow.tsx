import { type ReactNode } from 'react'
import { tv } from 'tailwind-variants'

import { AnchorIcon } from '@/components/atoms/Icons'
import { Link } from '@/components/atoms/Link'

// The leading square slot owns its own tone, so callers just drop a bare icon in:
// - `icon` (default): a brand-tinted icon (location, host contact).
// - `highlight`: fill the slot and invert the icon — the emphasised host-contact
//   card that leads the stack when an event has no upcoming date.
// - `plain`: a self-styled slot (e.g. the timing date badge), left untinted.
const detailRow = tv({
  slots: {
    iconBox: 'text-center border border-primary-4 rounded-sm w-11 h-11',
  },
  variants: {
    tone: {
      icon: { iconBox: 'text-primary' },
      highlight: { iconBox: 'bg-primary-4 text-background' },
      plain: {},
    },
  },
  defaultVariants: { tone: 'icon' },
})

export type DetailRowProps = {
  /** Primary label; becomes a link when `url` is set. */
  title: ReactNode
  /** Secondary text shown under the title. */
  content: ReactNode
  /** Optional link target for the title. */
  url?: string
  /** Render the title as an external link (adds the anchor icon + new-tab rel). */
  isExternal?: boolean
  /** Leading-slot appearance: a tinted icon (default), the highlighted fill, or an untinted slot. */
  tone?: 'icon' | 'highlight' | 'plain'
  /** Visual for the leading square slot (an icon, a date badge, etc.). */
  children: ReactNode
}

/**
 * A generic labelled row: a leading square slot, then a title (optionally an
 * internal/external link) over secondary content. Presentational only — callers
 * pass the icon/badge and copy. Used to build the event detail cards.
 *
 * Variants:
 * - `url` + `isExternal` — turn the title into an internal or external link.
 * - `tone` — the leading slot's appearance. The slot owns the icon tint, so
 *   callers pass a bare icon rather than styling it themselves.
 */
export function DetailRow({
  isExternal = false,
  tone = 'icon',
  title,
  content,
  url,
  children,
}: DetailRowProps) {
  const { iconBox } = detailRow({ tone })

  return (
    <div className="flex-center-y gap-3">
      <div className={iconBox()}>{children}</div>
      <div className="flex flex-col gap-0.5">
        {url ? (
          <Link
            anchorIcon={isExternal && <AnchorIcon />}
            className="group gap-x-0.5 text-md text-foreground font-medium"
            href={url}
            isExternal={isExternal}
            rel="noreferrer noopener"
            showAnchorIcon={isExternal}
          >
            {title}
          </Link>
        ) : (
          <div className="text-md font-medium">{title}</div>
        )}
        <div className="text-base text-gray-11 max-w-72">{content}</div>
      </div>
    </div>
  )
}
