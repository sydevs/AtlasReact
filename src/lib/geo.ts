import type { BBox, FeatureCollection, Point, Position } from 'geojson'

import { bbox } from '@turf/bbox'
import { distance } from '@turf/distance'

/**
 * Geometry helpers for deriving region geometry from the GeoJSON event feed.
 *
 * SahajCloud regions resolved from Mapbox carry no stored lat/lng/bounds (those
 * fields are only set for manually-entered locations), so the map's bounding
 * boxes and centers are computed here from the event points that fall under each
 * region. Uses `@turf/*` for the math — never hand-rolled lat/lng arithmetic.
 */

/**
 * Bounding box `[west, south, east, north]` of a set of `[lng, lat]` points, or
 * `null` when the set is empty (e.g. a region whose events are all online).
 */
export const boundsOfPoints = (points: Position[]): BBox | null => {
  if (points.length === 0) return null

  const collection: FeatureCollection<Point> = {
    type: 'FeatureCollection',
    features: points.map((coordinates) => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates },
      properties: {},
    })),
  }

  return bbox(collection)
}

/** Center `[longitude, latitude]` of a bounding box. */
export const centerOfBounds = (b: BBox): Position => [(b[0] + b[2]) / 2, (b[1] + b[3]) / 2]

/** Great-circle distance in kilometres between two `[longitude, latitude]` points. */
export const distanceKm = (from: Position, to: Position): number =>
  distance(from, to, { units: 'kilometers' })
