import { useBreakpoint } from "@/config/responsive";
import { EasingOptions, PaddingOptions, LngLatBoundsLike } from "mapbox-gl";
import { useCallback } from "react";
import { useMap } from "react-map-gl";
import { create } from "zustand/react";

type PaddingState = {
  padding: PaddingOptions,
  setPadding: (padding: PaddingOptions) => void,
}

export const usePaddingState = create<PaddingState>((set) => ({
  padding: { left: 20, right: 20, top: 20, bottom: 20 },
  setPadding: (padding) => set(() => ({ padding })),
}))

export default function useMapbox() {
  const { mapbox } = useMap();
  const { isMd } = useBreakpoint("md");
  const padding = usePaddingState(s => s.padding);
  const setPadding = usePaddingState(s => s.setPadding);

  const changePadding = (pad: number | PaddingOptions) => {
    if (typeof pad === 'number') {
      setPadding({ left: pad, right: pad, top: pad, bottom: pad })
    } else {
      setPadding({ left: pad.left || 0, right: pad.right || 0, top: pad.top || 0, bottom: pad.bottom || 0 })
    }
  }

  return {
    mapbox,
    padding,
    setPadding: changePadding,
    updatePadding: useCallback(() => {
      if (!mapbox) return
      const mapRect = mapbox.getCanvas().getBoundingClientRect()
      const mainRect = document.getElementById('main')?.getBoundingClientRect()

      if (!mapRect || !mainRect) return

      const padding = {
        left: 20 + (isMd ? mainRect.right - mainRect.left : 0),
        right: 20,
        top: 20,
        bottom: 20 + (!isMd ? mapRect.bottom - mainRect.top : 0),
      }

      changePadding(padding)
      return padding
    }, [mapbox, isMd, changePadding]),
    fitBounds: useCallback((bounds: LngLatBoundsLike) => {
      console.log('fitBounds', bounds, mapbox?.getCanvas()?.getBoundingClientRect())
      mapbox?.fitBounds(bounds, { padding })
    }, [mapbox, padding]),
    moveMap: useCallback((options: EasingOptions) => {
      if (!mapbox) return

      if (options.padding) {
        changePadding(options.padding)
        mapbox.easeTo(options)
      } else {
        mapbox.easeTo({ ...options, padding })
      }
    }, [mapbox, padding]),
  };
};
