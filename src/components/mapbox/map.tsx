import MapGL, { GeolocateControl, Layer, Source } from 'react-map-gl';
import api from "@/config/api";
import { useQuery } from '@tanstack/react-query';
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from './layers';

interface MapProps {
  onZoom: (zoom: number) => void;
}

export default function Mapbox({ onZoom }: MapProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['geojson'],
    queryFn: () => api.getGeojson(),
  });

  return (
    <MapGL
      id="mapbox"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESSTOKEN}
      mapStyle="mapbox://styles/sydevadmin/ck7g6nag70rn11io09f45odkq"
      //{...viewState}
      //onMove={evt => setViewState(evt.viewState)}
      onZoomEnd={evt => onZoom(evt.viewState.zoom)}
      style={{ width: '100%', height: '100%' }}
      interactiveLayerIds={['events']}
      reuseMaps
      attributionControl={false}
    >

      <Source
        id="earthquakes"
        type="geojson"
        data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
      <Source id='geojson' type="geojson" data={data}>
        <Layer
          id='events'
          type='fill'
          paint={{
            'fill-color': {
              property: 'percentile',
              stops: [
                [0, '#3288bd'],
                [1, '#66c2a5'],
                [2, '#abdda4'],
                [3, '#e6f598'],
                [4, '#ffffbf'],
                [5, '#fee08b'],
                [6, '#fdae61'],
                [7, '#f46d43'],
                [8, '#d53e4f']
              ]
            },
            'fill-opacity': 0.8
          }}
        />
      </Source>
      <GeolocateControl />
    </MapGL>
  );
}