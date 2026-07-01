import { type ReactNode } from 'react'

import { AnchorIcon } from '@/components/atoms/Icons'
import { Link } from '@/components/atoms/Link'

export type DetailRowProps = {
  /** Primary label; becomes a link when `url` is set. */
  title: ReactNode
  /** Secondary text shown under the title. */
  content: ReactNode
  /** Optional link target for the title. */
  url?: string
  /** Render the title as an external link (adds the anchor icon + new-tab rel). */
  isExternal?: boolean
  /** Visual for the leading square slot (an icon, date badge, etc.). */
  children: ReactNode
}

/**
 * A generic labelled row: a bordered square icon slot on the left, then a title
 * (optionally an internal/external link) over secondary content. Presentational
 * only — callers pass the icon and copy. Used to build the event detail cards.
 */
export function DetailRow({ isExternal = false, title, content, url, children }: DetailRowProps) {
  return (
    <div className="flex-center-y gap-3">
      <div className="text-center border border-primary-4 rounded-sm w-11 h-11">{children}</div>
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
