import type { Story, StoryDefault } from '@ladle/react'

// Not in the organisms barrel (reached only via the lazy event-panel); import
// from the co-located file.
import { StoryWrapper, StorySection } from '../../ladle'

import { EventDetails } from './EventDetails'

import { mockEvent } from '@/mocks/events'
import { Event } from '@/types'

export default { title: 'Organisms' } satisfies StoryDefault

// No upcoming occurrence → the host-contact card is highlighted and moves to the top.
const contactOnlyEvent: Event = { ...mockEvent, schedule: null }

/**
 * EventDetails — the stack of detail cards (timing, location, host contact)
 * rendered inside an EventPanel. The contact card's position and emphasis depend
 * on whether the event has an upcoming occurrence.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection
      description="Timing, location, and host-contact cards for a recurring venue event."
      title="Default"
    >
      <div className="max-w-md">
        <EventDetails event={mockEvent} />
      </div>
    </StorySection>

    <StorySection
      description="With no upcoming occurrence, the host-contact card is highlighted and shown first."
      title="Contact Only"
    >
      <div className="max-w-md">
        <EventDetails event={contactOnlyEvent} />
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Event Details'
