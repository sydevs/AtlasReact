import type { Story, StoryDefault } from '@ladle/react'

import { DateTime } from 'luxon'

import { StoryWrapper, StorySection } from '../../ladle'

import { EventTime } from './EventTime'

export default { title: 'Molecules' } satisfies StoryDefault

const nextDate = DateTime.fromISO('2026-07-04T09:30', { zone: 'Europe/London' })

/**
 * EventTime — renders an event's local start (and end, when a duration is given)
 * time, optionally followed by a timezone chip. Takes a luxon `DateTime`.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection title="Variants">
      <div className="flex flex-col gap-6">
        <StorySection title="Minimal" variant="subsection">
          <EventTime duration={null} nextDate={nextDate} timeZone="Europe/London" />
        </StorySection>

        <StorySection title="Maximal" variant="subsection">
          <EventTime showTimeZone duration={1.5} nextDate={nextDate} timeZone="Europe/London" />
        </StorySection>
      </div>
    </StorySection>

    <StorySection
      description="With a duration, the end time is appended after the start."
      title="With Duration"
    >
      <EventTime duration={1.5} nextDate={nextDate} timeZone="Europe/London" />
    </StorySection>

    <StorySection
      description="Pass showTimeZone to append the TimezoneChip (offset on hover)."
      title="Time Zone"
    >
      <div className="flex flex-col gap-2">
        <EventTime duration={1.5} nextDate={nextDate} timeZone="Europe/London" />
        <EventTime showTimeZone duration={1.5} nextDate={nextDate} timeZone="Europe/London" />
      </div>
    </StorySection>

    <StorySection background="neutral" theme="dark" title="Dark Surface">
      <EventTime showTimeZone duration={1.5} nextDate={nextDate} timeZone="Europe/London" />
    </StorySection>

    <StorySection inContext={true} title="Examples">
      <div className="max-w-md text-xs text-gray-500">
        <EventTime showTimeZone duration={1.5} nextDate={nextDate} timeZone="Europe/London" />
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Event Time'
