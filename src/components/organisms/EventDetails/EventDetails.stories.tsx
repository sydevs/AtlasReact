import type { Story, StoryDefault } from '@ladle/react'

// Not in the organisms barrel (reached only via the lazy event-panel); import
// from the co-located file.
import { StoryWrapper, StorySection } from '../../ladle'

import {
  EventContactDetails,
  EventTimingDetails,
  EventLocationDetails,
  EventDetail,
} from './EventDetails'

import { CalendarIcon } from '@/components/atoms/Icons'
import { mockEvent } from '@/mocks/events'

export default { title: 'Organisms' } satisfies StoryDefault

/**
 * EventDetails — the individual detail cards rendered inside an EventPanel:
 * contact, timing, and location, plus the generic EventDetail row primitive
 * they're built on.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection title="Contact">
      <div className="max-w-md">
        <StorySection title="Default" variant="subsection">
          <EventContactDetails contact={mockEvent.contact!} />
        </StorySection>
        <StorySection title="Highlighted" variant="subsection">
          <EventContactDetails isHighlighted contact={mockEvent.contact!} />
        </StorySection>
      </div>
    </StorySection>

    <StorySection title="Timing">
      <div className="max-w-md">
        <EventTimingDetails timing={mockEvent.timing!} />
      </div>
    </StorySection>

    <StorySection title="Location">
      <div className="max-w-md">
        <EventLocationDetails location={mockEvent.location} />
      </div>
    </StorySection>

    <StorySection
      description="The generic detail row primitive with a custom icon slot."
      title="Detail Row"
    >
      <div className="max-w-md">
        <EventDetail
          isExternal
          content="2 hours"
          title="A generic detail row"
          url="https://example.com"
        >
          <div className="flex-center h-full text-primary">
            <CalendarIcon />
          </div>
        </EventDetail>
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Event Details'
