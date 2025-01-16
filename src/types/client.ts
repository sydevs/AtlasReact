import z from "zod"

export const ClientSchema = z.object({
  name: z.string(),
  domain: z.string(),
  basePath: z.string(),
})

export type Client = z.infer<typeof ClientSchema>
