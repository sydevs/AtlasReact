import type { Story, StoryDefault } from '@ladle/react'

// event-view is intentionally not in the organisms barrel (lazy-loaded; see
// organisms/index.ts), so import it from its co-located file.
import { StoryWrapper, StorySection } from '../../ladle'

import { EventView } from './EventView'

import { mockEvent } from '@/mocks/events'

export default { title: 'Organisms' } satisfies StoryDefault

/**
 * EventView — the full event detail panel (header, images, description,
 * timing/location/contact cards, registration). Shown for an in-person event,
 * an online event, and an event with no images.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection description="A recurring in-person event." title="In Person">
      <div className="max-w-md border border-gray-6">
        <EventView event={mockEvent} />
      </div>
    </StorySection>

    <StorySection description="An online event in French." title="Online">
      <div className="max-w-md border border-gray-6">
        <EventView event={{ ...mockEvent, eventType: 'online', languages: ['fr'] }} />
      </div>
    </StorySection>

    <StorySection description="An event without images." title="No Images">
      <div className="max-w-md border border-gray-6">
        <EventView event={{ ...mockEvent, images: [] }} />
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Event View'
