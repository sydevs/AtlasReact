import z from 'zod'

import { EventSlimSchema } from './event'
import { BoundsSchema } from './region'

// An "area" is a region with level='city'. Derived view-model for its page:
// geojson-derived bounds (Mapbox-resolved cities have no stored coords) plus the
// events held there.
export const AreaSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  subtitle: z.string().nullish(),
  eventCount: z.number(),
  bounds: BoundsSchema.nullable(),
  path: z.string(),
  parentPath: z.string().nullish(),
  events: z.array(EventSlimSchema),
})
export type Area = z.infer<typeof AreaSchema>
