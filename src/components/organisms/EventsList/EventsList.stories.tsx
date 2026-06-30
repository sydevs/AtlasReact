import type { Story, StoryDefault } from '@ladle/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { EventsList } from './EventsList'

import { mockEventSlim, mockEventSlimList } from '@/mocks/events'

export default { title: 'Organisms' } satisfies StoryDefault

/**
 * EventsList — the presentational list of events (events passed in via props).
 * Its sibling DynamicEventsList fetches by coordinates over the network, so it
 * isn't storied here; these stories stay offline.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection description="The full list with mixed online / in-person events." title="Default">
      <div className="max-w-md">
        <EventsList events={mockEventSlimList} />
      </div>
    </StorySection>

    <StorySection description="A single event." title="Single">
      <div className="max-w-md">
        <EventsList events={[mockEventSlim]} />
      </div>
    </StorySection>

    <StorySection description="No events to show." title="Empty">
      <div className="max-w-md">
        <EventsList events={[]} />
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Events List'
