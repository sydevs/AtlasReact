import z from "zod"

const CountryChildSchema = z.object({
  id: z.number(),
  path: z.string(),
  type: z.string(),
  label: z.string(),
  subtitle: z.string().nullish(),
  eventCount: z.number(),
})

export const CountryCoreSchema = z.object({
  id: z.number(),
  path: z.string(),
  code: z.string(),
  label: z.string(),
  eventCount: z.number(),
})

export const CountrySlimSchema = z.object({

}).merge(CountryCoreSchema)

export const CountrySchema = z.object({
  url: z.string(),
  bounds: z.tuple([z.number(), z.number(), z.number(), z.number()]),
  children: z.array(CountryChildSchema),
}).merge(CountryCoreSchema)

export type CountrySlimSchema = z.infer<typeof CountrySlimSchema>
export type CountrySchema = z.infer<typeof CountrySchema>
