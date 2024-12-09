import type { LayerProps } from 'react-map-gl';

export const clusterLayer: LayerProps = {
  id: 'clusters',
  type: 'symbol',
  source: 'venues',
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
    'text-color': '#FFFFFF',
  },
};

/*export const clusterCountLayer: LayerProps = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'venues',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12
  }
};*/

export const unclusteredPointLayer: LayerProps = {
  id: 'unclustered-point',
  type: 'symbol',
  source: 'venues',
  filter: ['!', ['has', 'point_count']],
  layout: {
    'icon-anchor': 'bottom',
    'icon-size': 0.85,
    'icon-ignore-placement': true,
    'icon-image': 'point',
    'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
    'text-size': 12,
  },
  paint: {
    'text-color': '#FFFFFF',
  },
};

export const selectedPointLayer: LayerProps = {
  id: 'selected-point',
  type: 'symbol',
  source: 'selection',
  filter: ['has', 'point_count'],
  layout: {
    'icon-anchor': 'bottom',
    'icon-size': 0.85,
    'icon-ignore-placement': true,
    'icon-image': 'selected',
    'text-font': ['Iosevka Term Web', 'DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
    'text-size': 12,
  },
  paint: {
    'text-color': '#FFFFFF',
  },
};
