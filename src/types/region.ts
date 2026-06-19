import z from 'zod'

// Shared geo primitives for derived view-models.
export const BoundsSchema = z.tuple([z.number(), z.number(), z.number(), z.number()])
export const PositionSchema = z.tuple([z.number(), z.number()])

// SahajCloud region taxonomy. The widget routes city→area and center→venue
// (see src/lib/shape/path.ts), but the backend `level` values are these.
export const RegionLevelSchema = z.enum(['country', 'region', 'city', 'center'])
export type RegionLevel = z.infer<typeof RegionLevelSchema>

// One entry of the nested-docs `breadcrumbs` chain (country → … → self). At
// depth=1 `doc` is a numeric region id; deeper populations may inline the doc.
export const BreadcrumbSchema = z.object({
  doc: z.union([z.number(), z.object({ id: z.number() }).passthrough()]).nullish(),
  label: z.string().nullish(),
})

// Populated region reference — the subset selected in the geojson feed's
// `populate[regions]` and on raw region reads.
export const RegionRefSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string().nullish(),
  level: RegionLevelSchema,
  subtitle: z.string().nullish(),
  breadcrumbs: z.array(BreadcrumbSchema).nullish(),
})
export type RegionRef = z.infer<typeof RegionRefSchema>

// Raw region document from `GET /api/regions` (depth=1 resolves `parent`).
// Mapbox-resolved regions leave latitude/longitude/radius null; the ISO country
// code survives only on legacyData (used for flags + localized country names).
export const RegionDocSchema = RegionRefSchema.extend({
  mapboxId: z.string().nullish(),
  parent: z.union([RegionRefSchema, z.number(), z.null()]).optional(),
  latitude: z.number().nullish(),
  longitude: z.number().nullish(),
  radius: z.number().nullish(),
  legacyData: z.object({ countryCode: z.string().nullish() }).passthrough().nullish(),
})
export type RegionDoc = z.infer<typeof RegionDocSchema>

// Derived list item for a child region shown under a country/region page.
export const RegionListItemSchema = z.object({
  id: z.number(),
  slug: z.string(),
  level: RegionLevelSchema,
  name: z.string(),
  subtitle: z.string().nullish(),
  eventCount: z.number(),
  path: z.string(),
})
export type RegionListItem = z.infer<typeof RegionListItemSchema>

// Derived view-model for a region page (level=region): its child areas (cities).
export const RegionSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  eventCount: z.number(),
  bounds: BoundsSchema.nullable(),
  path: z.string(),
  parentPath: z.string().nullish(),
  areas: z.array(RegionListItemSchema),
})
export type Region = z.infer<typeof RegionSchema>
