import type { StoryDefault } from '@ladle/react'

import { MapProvider } from 'react-map-gl'

import { SearchBar } from '@/components/molecules'

export default { title: 'Molecules / Search Bar' } satisfies StoryDefault

// SearchBar embeds a Mapbox geocoder (the MapSearch organism). With a `header`
// set it renders the collapsed header state instead of the geocoder, so these
// stories don't need a live map. MapProvider supplies the map context in case
// the search box is toggled open in `ladle serve`.
export const Collapsed = () => (
  <MapProvider>
    <SearchBar eventCount={12} header="Cambridge" subheader="Free meditation classes near you" />
  </MapProvider>
)

export const Filterable = () => (
  <MapProvider>
    <SearchBar filterable eventCount={8} header="Cambridge" />
  </MapProvider>
)

export const WithReturnLink = () => (
  <MapProvider>
    <SearchBar header="Saturday Morning Meditation" returnLink="/search" />
  </MapProvider>
)
