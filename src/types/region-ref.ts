import z from 'zod'

// Low-level region primitives referenced by *events* and *clients* (which embed a
// region), split out from the region view-model in `region.ts` to break the
// import cycle: `event.ts` needs `RegionRef`, and the `Region` view-model needs
// `EventSlim`. Keeping these here (no import of `event.ts`) enforces a clean DAG
// region-ref → event → region.

// SahajCloud region taxonomy. The widget builds hierarchical URLs from the slug
// chain (see src/lib/shape/path.ts); the backend `level` values are these.
export const RegionLevelSchema = z.enum(['country', 'region', 'city', 'center'])
export type RegionLevel = z.infer<typeof RegionLevelSchema>

// One entry of the nested-docs `breadcrumbs` chain (country → … → self). At the
// feed's depth (region is one hop from the event) `doc` is a numeric region id;
// on a direct region read it populates to `{ id, slug, level }` — the slug chain
// that builds nested paths. Both shapes are accepted so a single schema covers
// feed and region reads.
export const BreadcrumbSchema = z.object({
  doc: z
    .union([
      z.number(),
      z
        .object({
          id: z.number(),
          slug: z.string().nullish(),
          level: RegionLevelSchema.nullish(),
        })
        .passthrough(),
    ])
    .nullish(),
  label: z.string().nullish(),
})
export type Breadcrumb = z.infer<typeof BreadcrumbSchema>

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
