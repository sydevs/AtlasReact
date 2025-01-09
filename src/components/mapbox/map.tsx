import { useCallback, useEffect } from 'react';
import ReactMapGL, { GeoJSONSource, GeolocateControl, Layer, MapMouseEvent, PaddingOptions, Source } from 'react-map-gl';
import { clusterLayer, selectedPointLayer, unclusteredPointLayer, selectedAreaLayer, boundsLayer } from './layers';
import { useNavigationState, useViewState } from "@/config/store";
import { useQuery } from '@tanstack/react-query';
import api from '@/config/api';
import { useLocation, useNavigate } from 'react-router';
import { useBreakpoint } from '@/config/responsive';
import useLocale from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';
import { useShallow } from 'zustand/react/shallow';
import useMapbox from '@/hooks/use-mapbox';

const MAP_STYLES = {
  light: "mapbox://styles/sydevadmin/ck7g6nag70rn11io09f45odkq",
  dark: "mapbox://styles/sydevadmin/cl4nw934f001j14l8jnof3a7w",
}

const DEBUG_BOUNDARY = false
const DEBUG_PADDING = false

export default function Mapbox() {
  let navigate = useNavigate();
  const { mapbox, padding, updatePadding, moveMap } = useMapbox();
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

  const { data } = useQuery({
    queryKey: ['geojson'],
    queryFn: () => api.getGeojson()
  });

  const selectFeature = useCallback((evt: MapMouseEvent) => {
    if (!evt.features || !evt.features.length || !mapbox) return
    const feature = evt.features[0]

    if (feature.layer?.id === clusterLayer.id) {
      const source = mapbox.getSource("events") as GeoJSONSource;
      source.getClusterExpansionZoom(feature.properties?.cluster_id, (err, zoom) => {
        if (err || !mapbox) return console.error(err)
  
        moveMap({
          // @ts-ignore
          center: feature.geometry.coordinates,
          zoom: (zoom || mapbox.getZoom()) + 1,
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
  }, [navigate, mapbox, zoom, latitude, longitude, setNavigationState]);

  const hoverOnFeature = useCallback((evt: MapMouseEvent) => {
    if (!mapbox) return

    // This is in order to render a clickable cursor on hover
    mapbox.getCanvas().style.cursor = evt.features?.length ? 'pointer' : ''
  }, [mapbox])

  useEffect(() => {
    if (!mapbox) return

    const resetPadding = (evt?: Event) => {
      const padding = updatePadding()

      if (evt?.type || mapbox.isEasing()) {
        mapbox.setPadding(padding as PaddingOptions)
      } else {
        moveMap({ padding })
      }
    }

    resetPadding()
    window.addEventListener('resize', resetPadding)
    window.addEventListener('orientationchange', resetPadding)
    window.addEventListener('scroll', resetPadding)

    return () => {
      window.removeEventListener('resize', resetPadding)
      window.removeEventListener('orientationchange', resetPadding)
      window.removeEventListener('scroll', resetPadding)
    }
  }, [mapbox, isMd, location])

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
