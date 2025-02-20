import type { LayerProps } from 'react-map-gl';

type Props = {
  id: string;
} & LayerProps;

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
    'text-color': '#FFFFFF',
  },
};

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
};

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
};

export const selectedAreaLayer: LayerProps = {
  id: 'selected-area',
  type: 'symbol',
  source: 'selection',
  layout: {
    'icon-size': 1.25,
    'icon-ignore-placement': true,
    'icon-image': 'cluster-selected',
  },
};

export const boundsLayer: LayerProps = {
  id: 'selected-bounds',
  type: 'line',
  source: 'bounds',
  layout: {
    'line-join': 'round',
    'line-cap': 'round'
  },
  paint: {
    'line-color': '#888',
    'line-width': 4
  }
};
