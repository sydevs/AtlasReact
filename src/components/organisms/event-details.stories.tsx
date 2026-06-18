import type { StoryDefault } from '@ladle/react'

// Not in the organisms barrel (reached only via the lazy event-panel); direct import.
import {
  EventContactDetails,
  EventTimingDetails,
  EventLocationDetails,
  EventDetail,
} from '@/components/organisms/event-details'
import { CalendarIcon } from '@/components/atoms'
import { mockEvent } from '@/mocks/events'

export default { title: 'Organisms / Event Details' } satisfies StoryDefault

export const Contact = () => <EventContactDetails contact={mockEvent.contact!} />

export const ContactHighlighted = () => (
  <EventContactDetails isHighlighted contact={mockEvent.contact!} />
)

export const Timing = () => <EventTimingDetails timing={mockEvent.timing!} />

export const Location = () => <EventLocationDetails location={mockEvent.location} />

export const Generic = () => (
  <EventDetail isExternal content="2 hours" title="A generic detail row" url="https://example.com">
    <div className="flex-center h-full text-primary">
      <CalendarIcon />
    </div>
  </EventDetail>
)
