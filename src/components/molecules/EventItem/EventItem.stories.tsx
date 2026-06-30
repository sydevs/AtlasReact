import type { Story, StoryDefault } from '@ladle/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { EventItem } from './EventItem'

import { List } from '@/components/molecules/List'
import { mockEventSlim, mockEventSlimOnline } from '@/mocks/events'

export default { title: 'Molecules' } satisfies StoryDefault

/**
 * EventItem — a single event row (title, location, recurrence, time, status
 * chips, distance) used in the events list. Driven entirely by an `EventSlim`.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection title="In Person">
      <div className="max-w-md">
        <EventItem event={mockEventSlim} />
      </div>
    </StorySection>

    <StorySection title="Online">
      <div className="max-w-md">
        <EventItem event={mockEventSlimOnline} />
      </div>
    </StorySection>

    <StorySection description="A large distance surfaces the kilometre badge." title="Far Away">
      <div className="max-w-md">
        <EventItem event={{ ...mockEventSlim, distance: 128 }} />
      </div>
    </StorySection>

    <StorySection background="neutral" theme="dark" title="Dark Surface">
      <div className="max-w-md">
        <EventItem event={mockEventSlim} />
      </div>
    </StorySection>

    <StorySection inContext={true} title="Examples">
      <div className="max-w-md rounded-lg border border-divider overflow-hidden">
        <List>
          <EventItem event={mockEventSlim} />
          <EventItem event={mockEventSlimOnline} />
          <EventItem event={{ ...mockEventSlim, distance: 128 }} />
        </List>
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Event Item'
