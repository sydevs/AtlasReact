import React, { useState } from 'react';
import MapGL, { GeolocateControl, Layer, Source } from 'react-map-gl';
import type { Map as MapboxMap } from 'mapbox-gl';
import { clusterLayer, selectedPointLayer, unclusteredPointLayer } from './layers';
import { useEffect } from 'react';
import { Location } from '@/types/locations';
import { useViewState } from "@/config/store";

declare global {
  interface WindowEventHandlersEventMap {
    "map:selection": CustomEvent<Location | null>;
    "map:zoom": CustomEvent<number>;
  }
}

export default function Mapbox() {
  const [ selection, setSelection ] = useState<Location | null>(null);
  const setViewState = useViewState(s => s.setViewState);

  //useMapImage({ mapRef: map, url: marker, name: 'marker', sdf: true });

  return (
    <MapGL
      id="mapbox"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESSTOKEN}
      mapStyle="mapbox://styles/sydevadmin/ck7g6nag70rn11io09f45odkq"
      //{...viewState}
      onMoveEnd={evt => setViewState(evt.viewState)}
      style={{ width: '100%', height: '100%' }}
      interactiveLayerIds={['events']}
      reuseMaps
      attributionControl={false}
    >
      <Source
        id="venues"
        type="geojson"
        data="https://atlas.sydevelopers.com/api/geojson.json"
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
      >
        <Layer {...clusterLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
      {selection && (
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
        </Source>
      )}
      <GeolocateControl />
    </MapGL>
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
