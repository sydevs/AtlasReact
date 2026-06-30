import type { BBox, Position } from 'geojson'

import { boundsOfPoints } from '@/lib/geo'

/**
 * Derives hierarchy aggregates (event counts, bounding boxes) from the GeoJSON
 * event feed. SahajCloud regions carry no `eventCount`/`bounds`, so each
 * country/region/area/venue's totals are computed from the events that fall
 * under it — matched by the event region's `breadcrumbs` ancestry.
 */

/** A geolocated event reduced to what hierarchy aggregation needs. */
export type GeoEvent = {
  /** `[longitude, latitude]`, or `null` for online / coordinate-less events. */
  point: Position | null
  /** Region ids of the event's full ancestry (country → … → city/center), inclusive. */
  ancestorIds: number[]
}

type Breadcrumb = { doc?: number | { id: number } | null }

/**
 * The region-id ancestry encoded in a populated region's `breadcrumbs`
 * (country → … → self). At `depth=1` each `doc` is a numeric id; deeper
 * populations may inline the region object, so both are handled.
 */
export const ancestorIdsFromBreadcrumbs = (
  breadcrumbs: Breadcrumb[] | null | undefined,
): number[] =>
  (breadcrumbs ?? [])
    .map((crumb) => (typeof crumb.doc === 'number' ? crumb.doc : (crumb.doc?.id ?? null)))
    .filter((id): id is number => id !== null)

/** Events whose ancestry includes `regionId` (i.e. that fall under that region). */
export const eventsUnder = <T extends GeoEvent>(events: T[], regionId: number): T[] =>
  events.filter((event) => event.ancestorIds.includes(regionId))

/** Number of events under a region. */
export const countUnder = (events: GeoEvent[], regionId: number): number =>
  eventsUnder(events, regionId).length

/** Bounding box of the located events under a region, or `null` if none are located. */
export const boundsUnder = (events: GeoEvent[], regionId: number): BBox | null =>
  boundsOfPoints(
    eventsUnder(events, regionId)
      .map((event) => event.point)
      .filter((point): point is Position => point !== null),
  )
