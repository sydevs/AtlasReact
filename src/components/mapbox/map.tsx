import { useCallback, useEffect, useState } from 'react';
import ReactMapGL, { GeoJSONSource, GeolocateControl, Layer, MapMouseEvent, MapRef, Source } from 'react-map-gl';
import { clusterLayer, selectedPointLayer, unclusteredPointLayer, selectedAreaLayer, boundsLayer } from './layers';
import { useNavigationState, useViewState } from "@/config/store";
import { useQuery } from '@tanstack/react-query';
import api from '@/config/api';
import { useLocation, useNavigate } from 'react-router';
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
const DEBUG_PADDING = false

export function computePadding(isMd: boolean) {
  const mapRect = document.getElementById('mapbox')?.getBoundingClientRect()
  const mainRect = document.getElementById('main')?.getBoundingClientRect()

  if (!mapRect || !mainRect) return { top: 20, bottom: 20, left: 20, right: 20 }

  return {
    top: 20,
    bottom: 20 + (!isMd ? mapRect.bottom - mainRect.top : 0),
    left: 20 + (isMd ? mainRect.right - mainRect.left : 0),
    right: 20,
  }
}

export default function Mapbox() {
  let navigate = useNavigate();
  const mapRef = useRef<MapRef>(null);
  const { zoom, latitude, longitude, setViewState, selection, boundary } = useViewState(
    useShallow((s) => ({
      zoom: s.zoom, latitude: s.latitude, longitude: s.longitude,
      selection: s.selection, boundary: s.boundary,
      setViewState: s.setViewState,
    })),
  );
  const location = useLocation();
  const setNavigationState = useNavigationState(s => s.setNavigationState);
  const { isMd } = useBreakpoint("md");
  const { locale } = useLocale();
  const { theme } = useTheme();

  // TODO: Remove this debug code (DEBUG_PADDING)
  const [ padding, setPadding ] = useState({ top: 20, bottom: 20, left: 20, right: 20 })

  const { data } = useQuery({
    queryKey: ['geojson'],
    queryFn: () => api.getGeojson()
  });

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
      navigate(feature.properties?.path)

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

  useEffect(() => {
    if (!mapRef.current) return
    const map = mapRef.current

    const updatePadding = (evt?: Event) => {
      const mapRect = map.getCanvas().getBoundingClientRect()
      const mainRect = document.getElementById('main')?.getBoundingClientRect()

      if (!mapRect || !mainRect) return

      const padding = {
        top: 20,
        bottom: 20 + (!isMd ? mapRect.bottom - mainRect.top : 0),
        left: 20 + (isMd ? mainRect.right - mainRect.left : 0),
        right: 20,
      }

      if (evt?.type) {
        map.setPadding(padding)
      } else {
        map.easeTo({ padding })
      }

      if (DEBUG_PADDING) {
        console.log('updatePadding', mapRect, mainRect, "=>", padding)
        setPadding(padding)
      }
    }

    updatePadding()
    window.addEventListener('resize', updatePadding)
    window.addEventListener('orientationchange', updatePadding)
    window.addEventListener('scroll', updatePadding)

    return () => {
      window.removeEventListener('resize', updatePadding)
      window.removeEventListener('orientationchange', updatePadding)
      window.removeEventListener('scroll', updatePadding)
    }
  }, [mapRef, isMd, location])

  return (
    <ReactMapGL
      id="mapbox"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESSTOKEN}
      mapStyle={MAP_STYLES[theme]}
      //{...viewState}
      onMoveEnd={evt => setViewState(evt.viewState)}
      onClick={selectFeature}
      onMouseMove={hoverOnFeature}
      style={{ width: '100%', height: '100%' }}
      interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
      reuseMaps
      attributionControl={false}
      // @ts-ignore - Language is a valid property
      language={locale} // TOOD: Make sure this switches when locale changes
      ref={mapRef}
    >
      {DEBUG_PADDING &&
        <div className='absolute border-3 border-dashed border-red-700 pointer-events-none' style={padding} />}
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
