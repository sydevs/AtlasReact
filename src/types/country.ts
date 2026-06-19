import z from 'zod'

import { BoundsSchema, RegionListItemSchema } from './region'

// A country is a region with level='country'. These derived view-models carry
// the geojson-derived eventCount/bounds and the ISO code (from legacyData) that
// drives the flag + localized country name.

export const CountrySlimSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  countryCode: z.string().nullish(),
  eventCount: z.number(),
  path: z.string(),
})
export type CountrySlim = z.infer<typeof CountrySlimSchema>

export const CountrySchema = CountrySlimSchema.extend({
  bounds: BoundsSchema.nullable(),
  children: z.array(RegionListItemSchema),
})
export type Country = z.infer<typeof CountrySchema>
