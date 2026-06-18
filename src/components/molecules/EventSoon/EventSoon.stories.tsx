import type { Story, StoryDefault } from '@ladle/react'

import { DateTime } from 'luxon'

import { StoryWrapper, StorySection } from '../../ladle'

import { EventSoonChip } from './EventSoon'

export default { title: 'Molecules / Feedback' } satisfies StoryDefault

// EventSoonChip only renders when the date is "soon" relative to now: within
// 1 hour for online events, within 1 week for in-person ones. The visible
// stories use now-relative dates; the "renders nothing" case uses a fixed date
// far outside the window.
const soonInPerson = DateTime.now().plus({ days: 3 }).toJSDate()
const soonOnline = DateTime.now().plus({ minutes: 30 }).toJSDate()
const fixedDate = new Date('2026-07-04T09:30:00Z')

/**
 * EventSoonChip — a "starting soon / starting on …" chip that appears only when
 * an event's first date is imminent (1h for online, 1 week for in-person). It
 * renders nothing otherwise.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection title="In Person">
      <EventSoonChip firstDate={soonInPerson} online={false} />
    </StorySection>

    <StorySection title="Online">
      <EventSoonChip online firstDate={soonOnline} />
    </StorySection>

    <StorySection
      description="A date outside the window renders nothing (empty below)."
      title="Not Soon"
    >
      <div className="text-sm text-default-500">
        <EventSoonChip firstDate={fixedDate} online={false} />
        (no chip)
      </div>
    </StorySection>

    <StorySection background="neutral" theme="dark" title="Dark Surface">
      <EventSoonChip firstDate={soonInPerson} online={false} />
    </StorySection>

    <StorySection inContext={true} title="Examples">
      <div className="flex max-w-md items-center gap-1">
        <EventSoonChip firstDate={soonInPerson} online={false} />
        <span className="text-sm text-default-600">Saturday Morning Meditation</span>
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Event Soon'
