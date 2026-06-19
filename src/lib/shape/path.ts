import type { RegionLevel } from '@/types'
import type { Region } from '@/types/payload/payload-types'

/**
 * Maps a SahajCloud region `level` to the widget's flat route base.
 *
 * The backend taxonomy is `country / region / city / center`; the widget keeps
 * its long-standing `country / region / area / venue` routes (city → area,
 * center → venue), so user-facing URLs stay stable across the migration. The
 * `satisfies` ties this map to the generated `Region['level']` union, so a new
 * backend level fails the type-check until it's routed here.
 */
export const LEVEL_ROUTES = {
  country: 'countries',
  region: 'regions',
  city: 'areas',
  center: 'venues',
} as const satisfies Record<Region['level'], string>

/** Flat route for a region, e.g. `regionPath('city', 'antwerpen')` → `/areas/antwerpen`. */
export const regionPath = (level: RegionLevel, slug: string): string =>
  `/${LEVEL_ROUTES[level]}/${slug}`

/** Flat route for an event detail page (events are keyed by numeric id, not slug). */
export const eventPath = (id: number): string => `/events/${id}`
