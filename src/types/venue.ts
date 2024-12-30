import { EventSlimSchema } from "./event";
import z from "zod"

export const VenueCoreSchema = z.object({
  id: z.number(),
  path: z.string(),
  label: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

export const VenueSlimSchema = z.object({
  eventCount: z.number(),
}).merge(VenueCoreSchema)

export const VenueSchema = z.object({
  url: z.string(),
  parentPath: z.string(),
  events: z.array(EventSlimSchema),
}).merge(VenueCoreSchema)

export type Venue = z.infer<typeof VenueSchema>
export type VenueSlim = z.infer<typeof VenueSlimSchema>
