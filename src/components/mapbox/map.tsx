import { useState, useCallback } from 'react';
import ReactMapGL, { GeolocateControl, Layer, Source, ViewStateChangeEvent } from 'react-map-gl';
import { clusterLayer, selectedPointLayer, unclusteredPointLayer } from './layers';
import { useEffect } from 'react';
import { useViewState } from "@/config/store";
import { useQuery } from '@tanstack/react-query';
import api from '@/config/api';

//const MapGL = ReactMapGL({})

export default function Mapbox() {
  const [ selection, setSelection ] = useState<Location | null>(null);
  const setViewState = useViewState(s => s.setViewState);

  const { data, isLoading, error } = useQuery({
    queryKey: ['geojson'],
    queryFn: () => api.getGeojson()
  });

  //useMapImage({ mapRef: map, url: marker, name: 'marker', sdf: true });

  const updateViewState = useCallback((evt: ViewStateChangeEvent) => setViewState(evt.viewState), [setViewState]);

  console.log('geojson', data)
  return (
    <ReactMapGL
      id="mapbox"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESSTOKEN}
      mapStyle="mapbox://styles/sydevadmin/ck7g6nag70rn11io09f45odkq"
      //{...viewState}
      onMoveEnd={updateViewState}
      style={{ width: '100%', height: '100%' }}
      interactiveLayerIds={['venues']}
      reuseMaps
      attributionControl={false}
    >
      {data &&
        <Source
          id="venues"
          type="geojson"
          data={data}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>}
      {selection &&
        <Source
          id="selection"
          type="geojson"
          data={{
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [selection.longitude, selection.latitude],
              },
            }]
          }}
        >
          <Layer {...selectedPointLayer} /> 
        </Source>}
      <GeolocateControl />
    </ReactMapGL>
  );
}

/*type UseMapImageOptions = {
  mapRef: React.MutableRefObject<any>;
  url: string;
  name: string;
  sdf?: boolean;
}

export function useMapImage({ mapRef, url, name, sdf = false }: UseMapImageOptions) {
  React.useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap() as MapboxMap;

      map.loadImage(url, (error, image) => {
        if (error) throw error;
        if (image && !map.hasImage(name)) map.addImage(name, image, { sdf });
      });
    }
  }, [mapRef.current]);
}*/
