import z from 'zod'

import { EventSlimSchema } from './event'
import { PositionSchema } from './region'

// A "venue" is a region with level='center'. Derived view-model for its page:
// the center point is derived from its events' coordinates (centers carry no
// stored lat/lng).
export const VenueSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  eventCount: z.number(),
  center: PositionSchema.nullable(),
  path: z.string(),
  parentPath: z.string().nullish(),
  events: z.array(EventSlimSchema),
})
export type Venue = z.infer<typeof VenueSchema>
