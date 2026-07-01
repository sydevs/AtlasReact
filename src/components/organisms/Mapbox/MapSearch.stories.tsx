import type { Story, StoryDefault } from '@ladle/react'

import { MapProvider } from 'react-map-gl'

import { StoryWrapper, StorySection } from '../../ladle'

import { MapSearch } from './MapSearch'

export default { title: 'Organisms' } satisfies StoryDefault

// The geocoder needs VITE_MAPBOX_ACCESSTOKEN to return results; without it we
// show a notice. MapProvider supplies the (empty) map context it reads.
const hasToken = Boolean(import.meta.env.VITE_MAPBOX_ACCESSTOKEN)

/**
 * MapSearch — the Mapbox geocoder search box used to recenter the map. It needs
 * VITE_MAPBOX_ACCESSTOKEN to return results, so the story renders the real
 * geocoder when a token is present, otherwise a "needs token" notice.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection title="Search">
      {hasToken ? (
        <MapProvider>
          <div className="max-w-md">
            <MapSearch onSelect={() => {}} />
          </div>
        </MapProvider>
      ) : (
        <div className="max-w-md rounded border border-gray-6 p-4 text-sm text-gray-11">
          Set <code>VITE_MAPBOX_ACCESSTOKEN</code> in <code>.env.local</code> to preview the
          geocoder.
        </div>
      )}
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Map Search'
