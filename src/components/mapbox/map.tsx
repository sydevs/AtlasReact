import { useCallback } from 'react';
import ReactMapGL, { GeoJSONSource, GeolocateControl, Layer, MapMouseEvent, MapRef, Source, ViewStateChangeEvent } from 'react-map-gl';
import { clusterLayer, selectedPointLayer, unclusteredPointLayer } from './layers';
import { useViewState } from "@/config/store";
import { useQuery } from '@tanstack/react-query';
import api from '@/config/api';
import { useNavigate } from 'react-router';
import { useRef } from 'react';
import { useBreakpoint } from '@/config/responsive';
import i18n from '@/config/i18n';

//const MapGL = ReactMapGL({})

export default function Mapbox() {
  let navigate = useNavigate();
  const mapRef = useRef<MapRef>(null);
  const selection = useViewState(s => s.selection);
  const setViewState = useViewState(s => s.setViewState);
  const { isMd } = useBreakpoint("md");
  const { isLg } = useBreakpoint("lg");

  const { data } = useQuery({
    queryKey: ['geojson'],
    queryFn: () => api.getGeojson()
  });

  //useMapImage({ mapRef: map, url: marker, name: 'marker', sdf: true });

  const updateViewState = useCallback((evt: ViewStateChangeEvent) => {
    setViewState(evt.viewState)
  }, [setViewState]);

  const selectFeature = useCallback((evt: MapMouseEvent) => {
    if (!evt.features || !evt.features.length || !mapRef.current) return
    const feature = evt.features[0]

    if (feature.layer?.id === clusterLayer.id) {
      const source = mapRef.current.getSource("events") as GeoJSONSource;
      source.getClusterExpansionZoom(feature.properties?.cluster_id, (err, zoom) => {
        if (err || !mapRef.current) return console.error(err)
  
        mapRef.current.easeTo({
          // @ts-ignore
          center: feature.geometry.coordinates,
          zoom: (zoom || mapRef.current.getZoom()) + 1,
          duration: 500
        });
      });
    } else if (feature.layer?.id === unclusteredPointLayer.id) {
      console.log(feature.properties)
      navigate(`/${feature.properties?.type}/${feature.properties?.id}`)
    }
  }, [mapRef]);

  const hoverOnFeature = useCallback((evt: MapMouseEvent) => {
    if (!mapRef.current) return

    // This is in order to render a clickable cursor on hover
    mapRef.current.getCanvas().style.cursor = evt.features?.length ? 'pointer' : ''
  }, [mapRef])

  return (
    <ReactMapGL
      id="mapbox"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESSTOKEN}
      mapStyle="mapbox://styles/sydevadmin/ck7g6nag70rn11io09f45odkq"
      //{...viewState}
      onMoveEnd={updateViewState}
      onClick={selectFeature}
      onMouseMove={hoverOnFeature}
      padding={{
        top: 0,
        bottom: 0,
        right: 0,
        left: isMd ? 320 : (isLg ? 528 : 0),
      }}
      style={{ width: '100%', height: '100%' }}
      interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
      reuseMaps
      attributionControl={false}
      // @ts-ignore - Language is a valid property
      language={i18n.resolvedLanguage}
      ref={mapRef}
    >
      {data &&
        <Source
          id="events"
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
