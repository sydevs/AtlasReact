import type { StoryDefault } from '@ladle/react'

import { MapProvider } from 'react-map-gl'

import { MapSearch } from '@/components/organisms'

export default { title: 'Organisms / Mapbox / Search' } satisfies StoryDefault

// The geocoder needs VITE_MAPBOX_ACCESSTOKEN to return results; without it we
// show a notice. MapProvider supplies the (empty) map context it reads.
const hasToken = Boolean(import.meta.env.VITE_MAPBOX_ACCESSTOKEN)

export const Search = () =>
  hasToken ? (
    <MapProvider>
      <div className="max-w-md">
        <MapSearch onSelect={() => {}} />
      </div>
    </MapProvider>
  ) : (
    <div className="max-w-md rounded border border-default-200 p-4 text-sm text-default-600">
      Set <code>VITE_MAPBOX_ACCESSTOKEN</code> in <code>.env.local</code> to preview the geocoder.
    </div>
  )
Search.storyName = 'Search (needs token)'
