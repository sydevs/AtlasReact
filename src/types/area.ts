import { EventSlimSchema } from "./event";
import z from "zod"

export const AreaCoreSchema = z.object({
  id: z.number(),
  path: z.string(),
  label: z.string(),
})

export const AreaSlimSchema = z.object({
  eventCount: z.number(),
  subtitle: z.string().optional(),
}).merge(AreaCoreSchema)

export const AreaSchema = z.object({
  url: z.string(),
  parentPath: z.string(),
  events: z.array(EventSlimSchema),
  latitude: z.number(),
  longitude: z.number(),
  radius: z.number(),
}).merge(AreaCoreSchema)

export type Area = z.infer<typeof AreaSchema>
export type AreaSlim = z.infer<typeof AreaSlimSchema>
