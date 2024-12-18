import { useCallback } from 'react';
import ReactMapGL, { GeoJSONSource, GeolocateControl, Layer, MapMouseEvent, MapRef, Source, ViewStateChangeEvent } from 'react-map-gl';
import { clusterLayer, selectedPointLayer, unclusteredPointLayer, selectedAreaLayer, boundsLayer } from './layers';
import { useNavigationState, useViewState } from "@/config/store";
import { useQuery } from '@tanstack/react-query';
import api from '@/config/api';
import { useNavigate } from 'react-router';
import { useRef } from 'react';
import { useBreakpoint } from '@/config/responsive';
import useLocale from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';
import { useShallow } from 'zustand/react/shallow';

const MAP_STYLES = {
  light: "mapbox://styles/sydevadmin/ck7g6nag70rn11io09f45odkq",
  dark: "mapbox://styles/sydevadmin/cl4nw934f001j14l8jnof3a7w",
}

const DEBUG_BOUNDARY = false

export default function Mapbox() {
  let navigate = useNavigate();
  const mapRef = useRef<MapRef>(null);
  const { zoom, latitude, longitude, setViewState, selection, boundary } = useViewState(
    useShallow((s) => ({
      zoom: s.zoom, latitude: s.latitude, longitude: s.longitude, selection: s.selection, boundary: s.boundary,
      setViewState: s.setViewState,
    })),
  );
  const setNavigationState = useNavigationState(s => s.setNavigationState);
  const { isMd } = useBreakpoint("md");
  const { isLg } = useBreakpoint("lg");
  const { locale } = useLocale();
  const { theme } = useTheme();

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
      navigate(`/${feature.properties?.type}/${feature.properties?.id}`)

      if (feature.properties?.type === "event") {
        setNavigationState({
          returnPath: location.pathname,
          returnViewState: { zoom, latitude, longitude },
        });
      }
    }
  }, [navigate, mapRef, zoom, latitude, longitude, setNavigationState]);

  const hoverOnFeature = useCallback((evt: MapMouseEvent) => {
    if (!mapRef.current) return

    // This is in order to render a clickable cursor on hover
    mapRef.current.getCanvas().style.cursor = evt.features?.length ? 'pointer' : ''
  }, [mapRef])

  return (
    <ReactMapGL
      id="mapbox"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESSTOKEN}
      mapStyle={MAP_STYLES[theme]}
      //{...viewState}
      onMoveEnd={updateViewState}
      onClick={selectFeature}
      onMouseMove={hoverOnFeature}
      padding={{
        top: 20,
        bottom: 20,
        right: 20,
        left: isMd ? 340 : (isLg ? 548 : 20),
      }}
      style={{ width: '100%', height: '100%' }}
      interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
      reuseMaps
      attributionControl={false}
      // @ts-ignore - Language is a valid property
      language={locale}
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
          <Layer {...(selection.approximate ? selectedAreaLayer : selectedPointLayer)} /> 
        </Source>}
      {DEBUG_BOUNDARY && boundary &&
        <Source
          id="bounds"
          type="geojson"
          data={boundary}
        >
          <Layer {...boundsLayer} /> 
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
