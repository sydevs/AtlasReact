import type { Breadcrumb, RegionRef } from '@/types'

/**
 * Hierarchical, ancestry-based routes. A region's URL mirrors its breadcrumb slug
 * chain (country → … → self); an event appends its numeric id to that chain, e.g.
 * `/belgium/flanders/antwerp` and `/belgium/flanders/antwerp/downtown-hall/12345`.
 *
 * Region slugs are globally unique and never purely numeric, so `resolvePath`
 * keys off the **terminal segment alone** — variable depth (region-optional,
 * venue-optional) and the legacy flat URLs all resolve through one code path, and
 * pages canonicalize an incoming URL to the target's true breadcrumb path.
 */

/** Nested region path from an ordered slug chain, e.g. `['belgium','flanders'] → '/belgium/flanders'`. */
export const regionPath = (slugs: string[]): string => `/${slugs.join('/')}`

/**
 * Ordered ancestor slugs (country → … → self) from a populated breadcrumb chain.
 * Only breadcrumbs whose `doc` resolved to an object carry a slug; at the feed's
 * depth `doc` is a bare id, so those are skipped (the event page canonicalizes
 * from its own deeper read instead).
 */
export const ancestorSlugsFromBreadcrumbs = (
  breadcrumbs: Breadcrumb[] | null | undefined,
): string[] =>
  (breadcrumbs ?? [])
    .map((crumb) => (typeof crumb.doc === 'object' && crumb.doc ? crumb.doc.slug : null))
    .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0)

/**
 * Full nested path to a region reference, from its breadcrumb slug chain. Falls
 * back to the ref's own slug (a flat `/slug`) when the chain isn't populated —
 * still resolvable (terminal segment), just not yet canonical.
 */
export const regionRefPath = (ref: RegionRef): string => {
  const chain = ancestorSlugsFromBreadcrumbs(ref.breadcrumbs)

  return regionPath(chain.length ? chain : [ref.slug])
}

/** Canonical nested event path: its region's chain plus the numeric event id. */
export const eventPath = (region: RegionRef, id: number): string => `${regionRefPath(region)}/${id}`

/**
 * Minimal event route (numeric terminal only). Used where the region ancestry
 * isn't loaded — map cluster clicks and feed-derived list items — and canonicalized
 * to the full chain once the event page loads. (Removable once SahajCloud emits a
 * server `webPath` in the geojson feed — sydevs/SahajCloud#530.)
 */
export const eventStubPath = (id: number): string => `/${id}`

/** What an incoming pathname resolves to, keyed off its terminal segment. */
export type ResolvedPath = { kind: 'region'; slug: string } | { kind: 'event'; id: number } | null

/**
 * Resolve a pathname by its **terminal segment only**: an all-digits tail is an
 * event id; any other tail is a (globally unique) region slug. Depth-independent,
 * so every nested shape and the legacy flat URLs resolve identically. Returns null
 * for the root (no region/event segment) so the caller can fall back to the home view.
 */
export const resolvePath = (pathname: string): ResolvedPath => {
  const segments = pathname.split('/').filter(Boolean)
  const terminal = segments.at(-1)

  if (!terminal) return null
  if (/^\d+$/.test(terminal)) return { kind: 'event', id: Number(terminal) }

  return { kind: 'region', slug: decodeURIComponent(terminal) }
}
