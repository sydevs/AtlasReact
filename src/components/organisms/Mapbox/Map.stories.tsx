import type { StoryDefault } from '@ladle/react'

import { MapProvider } from 'react-map-gl'

import { Mapbox } from '@/components/organisms'

export default { title: 'Organisms / Mapbox / Map' } satisfies StoryDefault

// Map coverage is intentionally light: the map needs VITE_MAPBOX_ACCESSTOKEN and
// fetches live GeoJSON from the Atlas API. Without a token we show a notice.
const hasToken = Boolean(import.meta.env.VITE_MAPBOX_ACCESSTOKEN)

export const Map = () =>
  hasToken ? (
    <div className="h-[70vh] w-full">
      <MapProvider>
        <Mapbox />
      </MapProvider>
    </div>
  ) : (
    <NeedsToken what="the live map" />
  )
Map.storyName = 'Map (needs token)'

function NeedsToken({ what }: { what: string }) {
  return (
    <div className="max-w-md rounded border border-default-200 p-4 text-sm text-default-600">
      Set <code>VITE_MAPBOX_ACCESSTOKEN</code> in <code>.env.local</code> to preview {what}.
    </div>
  )
}
