import type { Story, StoryDefault } from '@ladle/react'

import { MapProvider } from 'react-map-gl'

import { StoryWrapper, StorySection } from '../../ladle'

import { SearchBar } from './SearchBar'

export default { title: 'Molecules' } satisfies StoryDefault

// SearchBar embeds a Mapbox geocoder (the MapSearch organism). With a `header`
// set it renders the collapsed header state instead of the live geocoder, so
// these stories always pass `header` and stay offline. MapProvider supplies the
// map context in case the search box is toggled open in `ladle serve`.

/**
 * SearchBar — the sticky top search affordance: collapses to a location header
 * with a search toggle, optionally an online-only filter switch, a return arrow,
 * and a mobile "jump to events" link. Always shown collapsed (header set).
 */
export const Default: Story = () => (
  <MapProvider>
    <StoryWrapper>
      <StorySection title="Variants">
        <div className="flex flex-col gap-6">
          <StorySection title="Minimal" variant="subsection">
            <SearchBar header="Cambridge" />
          </StorySection>

          <StorySection title="Maximal" variant="subsection">
            <SearchBar
              filterable
              backHref="#search"
              eventCount={12}
              header="Cambridge"
              subheader="Free meditation classes near you"
            />
          </StorySection>
        </div>
      </StorySection>

      <StorySection title="Collapsed">
        <SearchBar
          eventCount={12}
          header="Cambridge"
          subheader="Free meditation classes near you"
        />
      </StorySection>

      <StorySection
        description="Adds the online-only filter switch below the header."
        title="Filterable"
      >
        <SearchBar filterable eventCount={8} header="Cambridge" />
      </StorySection>

      <StorySection
        description="A return arrow navigates back to the previous view."
        title="With Return Link"
      >
        <SearchBar backHref="#search" header="Saturday Morning Meditation" />
      </StorySection>

      <StorySection inContext={true} title="Examples">
        <div className="max-w-md rounded-lg border border-divider overflow-hidden">
          <SearchBar
            filterable
            eventCount={12}
            header="Cambridge"
            subheader="Free meditation classes near you"
          />
          <div className="p-6 text-sm text-default-600">Events list renders below the bar.</div>
        </div>
      </StorySection>

      <div />
    </StoryWrapper>
  </MapProvider>
)

Default.storyName = 'Search Bar'
