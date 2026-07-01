import type { Story, StoryDefault } from '@ladle/react'

import { MapProvider } from 'react-map-gl'

import { StoryWrapper, StorySection } from '../../ladle'

import { Mapbox } from './Map'

export default { title: 'Molecules' } satisfies StoryDefault

// Map coverage is intentionally light: the map needs VITE_MAPBOX_ACCESSTOKEN and
// fetches live GeoJSON from the Atlas API. Without a token we show a notice.
const hasToken = Boolean(import.meta.env.VITE_MAPBOX_ACCESSTOKEN)

/**
 * Mapbox — the full interactive map (clustered event points, selection, camera).
 * It needs VITE_MAPBOX_ACCESSTOKEN and live data, so the story is light: it
 * renders the real map when a token is present, otherwise a "needs token" notice.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection title="Map">
      {hasToken ? (
        <div className="h-[70vh] w-full">
          <MapProvider>
            <Mapbox />
          </MapProvider>
        </div>
      ) : (
        <div className="max-w-md rounded border border-gray-6 p-4 text-sm text-gray-11">
          Set <code>VITE_MAPBOX_ACCESSTOKEN</code> in <code>.env.local</code> to preview the live
          map.
        </div>
      )}
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Map'
