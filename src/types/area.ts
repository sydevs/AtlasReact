import { EventSlimSchema } from "./event";
import z from "zod"

export const AreaCoreSchema = z.object({
  id: z.number(),
  label: z.string(),
})

export const AreaSlimSchema = z.object({
  eventCount: z.number(),
}).merge(AreaCoreSchema)

export const AreaSchema = z.object({
  parentId: z.number(),
  parentType: z.string(),
  events: z.array(EventSlimSchema),
}).merge(AreaCoreSchema)

export type Area = z.infer<typeof AreaSchema>
export type AreaSlim = z.infer<typeof AreaSlimSchema>
