import type { LayerProps } from 'react-map-gl'

type Props = {
  id: string
} & LayerProps

export const clusterLayer: Props = {
  id: 'clusters',
  type: 'symbol',
  source: 'events',
  filter: ['has', 'point_count'],
  layout: {
    'icon-allow-overlap': true,
    'icon-ignore-placement': true,
    'icon-image': 'cluster',
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
    'text-size': 12,
  },
  paint: {
    // White count sits on the opaque `cluster` sprite (not the basemap), so it
    // stays legible on both the light and dark map styles — no theming needed.
    'text-color': '#FFFFFF',
  },
}

export const unclusteredPointLayer: Props = {
  id: 'unclustered-point',
  type: 'symbol',
  source: 'events',
  filter: ['!', ['has', 'point_count']],
  layout: {
    'icon-anchor': 'bottom',
    'icon-size': 0.85,
    'icon-ignore-placement': true,
    'icon-image': 'point',
  },
}

export const selectedPointLayer: LayerProps = {
  id: 'selected-point',
  type: 'symbol',
  source: 'selection',
  //filter: ['has', 'point_count'],
  layout: {
    'icon-anchor': 'bottom',
    'icon-size': 0.85,
    'icon-ignore-placement': true,
    'icon-image': 'selected',
  },
}

export const selectedAreaLayer: LayerProps = {
  id: 'selected-area',
  type: 'symbol',
  source: 'selection',
  layout: {
    'icon-size': 1.25,
    'icon-ignore-placement': true,
    'icon-image': 'cluster-selected',
  },
}

export const boundsLayer: LayerProps = {
  id: 'selected-bounds',
  type: 'line',
  source: 'bounds',
  layout: {
    'line-join': 'round',
    'line-cap': 'round',
  },
  paint: {
    // Debug-only layer (rendered behind DEBUG_BOUNDARY in Map.tsx); the neutral
    // mid-grey reads on both basemaps, so it needs no theme-aware variant.
    'line-color': '#888',
    'line-width': 4,
  },
}
