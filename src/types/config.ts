import z from 'zod'

// `GET /api/globals/sy-atlas-config` — atlas-wide default map view, used as a
// fallback when a client has no home region.
export const AtlasConfigSchema = z.object({
  defaultMapCenter: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  defaultZoomLevel: z.number(),
})
export type AtlasConfig = z.infer<typeof AtlasConfigSchema>
