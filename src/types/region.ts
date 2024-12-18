import { AreaSlimSchema } from "./area";
import z from "zod"

export const RegionCoreSchema = z.object({
  id: z.number(),
  label: z.string(),
  eventCount: z.number(),
})

export const RegionSlimSchema = z.object({

}).merge(RegionCoreSchema)

export const RegionSchema = z.object({
  parentId: z.string(),
  parentType: z.string(),
  areas: z.array(AreaSlimSchema),
  bounds: z.tuple([z.number(), z.number(), z.number(), z.number()]),
}).merge(RegionCoreSchema)

export type Region = z.infer<typeof RegionSchema>
export type RegionSlim = z.infer<typeof RegionSlimSchema>
