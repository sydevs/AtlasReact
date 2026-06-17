---
description: Mapbox / react-map-gl patterns — layers, sources, view state, turf.
globs:
  - "src/components/mapbox/**/*.ts"
  - "src/components/mapbox/**/*.tsx"
  - "src/hooks/use-mapbox.ts"
alwaysApply: false
---

# Map (Mapbox GL + react-map-gl)

The map is the heart of the app and its hottest render path. Treat it carefully.

## Layer definitions live in `layers.ts`

- Define every layer's `id`, `type`, `paint`, and `layout` in
  `src/components/mapbox/layers.ts` and spread it into `<Layer {...clusterLayer} />`.
  **Never inline paint/layout objects in JSX** — they'd be recreated every render
  and the map would reflow. Existing layers: `clusterLayer`,
  `unclusteredPointLayer`, `selectedPointLayer`, `selectedAreaLayer`, `boundsLayer`.
- `interactiveLayerIds` on `<ReactMapGL>` must list exactly the layers that
  respond to clicks/hover. Keep it in sync when adding a clickable layer.
- Map styles (light/dark) are referenced by Mapbox style URL in `map.tsx`
  (`MAP_STYLES`); theme switches via `useTheme()`.

## Sources and clustering

- Event points come from the `events` GeoJSON source with clustering
  (`cluster`, `clusterMaxZoom`, `clusterRadius`). Cluster expansion uses
  `getClusterExpansionZoom` on the `GeoJSONSource` — follow the existing pattern
  in `selectFeature` rather than re-implementing zoom math.
- GeoJSON is fetched via React Query (`queryKey: ['geojson']`) from
  `api.getGeojson()`. Don't fetch it ad-hoc in components — read from the cache.

## View state lives in zustand, not local state

- `useViewState` (`src/config/store.ts`) holds `zoom/latitude/longitude/selection/boundary`.
  Read it with a **`useShallow` selector** (as `map.tsx` does) so the map only
  re-renders when the fields it uses change.
- Drive imperative camera moves through `useMapbox().moveMap(...)` / padding
  helpers — don't call `map.flyTo` directly from components.

## Geo helpers

Use `@turf/*` (`bbox`, `bbox-polygon`, `circle`) for geometry math (bounding
boxes for regions/areas, approximate-location circles). Don't hand-roll
lat/lng arithmetic.

## Gotchas

- `worldview` and `language` are set from the active locale (`MAP_WORLDVIEWS`,
  `useLocale`). When adding a locale, check whether it needs a worldview entry.
- The few `// @ts-ignore` lines are deliberate (react-map-gl type gaps for
  `language`/`coordinates`). Don't "fix" them by loosening types elsewhere; keep
  the ignore narrow and commented.
