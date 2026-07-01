import { type ReactNode } from 'react'
import { tv } from 'tailwind-variants'

import { AnchorIcon } from '@/components/atoms/Icons'
import { Link } from '@/components/atoms/Link'

// The leading square icon slot. `highlighted` fills it with the brand tint (used
// for the emphasised "contact for timing" card that leads the stack when an event
// has no upcoming date); otherwise it's a bordered, transparent box.
const detailRow = tv({
  slots: {
    iconBox: 'text-center border border-primary-4 rounded-sm w-11 h-11',
  },
  variants: {
    highlighted: {
      true: { iconBox: 'bg-primary-4 text-background' },
      false: {},
    },
  },
  defaultVariants: { highlighted: false },
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
  /** Fill the leading icon slot with the brand tint to emphasise the row. */
  highlighted?: boolean
  /** Visual for the leading square slot (an icon, a date badge, etc.). */
  children: ReactNode
}

/**
 * A generic labelled row: a leading square icon slot, then a title (optionally an
 * internal/external link) over secondary content. Presentational only — callers
 * pass the icon/badge and copy. Used to build the event detail cards.
 *
 * Variants:
 * - `url` + `isExternal` — turn the title into an internal or external link.
 * - `highlighted` — fill the icon slot with the brand tint for an emphasised row.
 */
export function DetailRow({
  isExternal = false,
  highlighted = false,
  title,
  content,
  url,
  children,
}: DetailRowProps) {
  const { iconBox } = detailRow({ highlighted })

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
