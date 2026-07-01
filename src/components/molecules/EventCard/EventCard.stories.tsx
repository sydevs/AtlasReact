import type { Story, StoryDefault } from '@ladle/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { EventCard } from './EventCard'

import { List } from '@/components/molecules/List'
import { mockEventSlim, mockEventSlimOnline } from '@/mocks/events'

export default { title: 'Molecules / List' } satisfies StoryDefault

/**
 * EventCard — a single event row (title, location, recurrence, time, status
 * chips, distance) used in the events list. Driven entirely by an `EventSlim`.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection title="In Person">
      <div className="max-w-md">
        <EventCard event={mockEventSlim} />
      </div>
    </StorySection>

    <StorySection title="Online">
      <div className="max-w-md">
        <EventCard event={mockEventSlimOnline} />
      </div>
    </StorySection>

    <StorySection description="A large distance surfaces the kilometre badge." title="Far Away">
      <div className="max-w-md">
        <EventCard event={{ ...mockEventSlim, distance: 128 }} />
      </div>
    </StorySection>

    <StorySection inContext={true} title="Examples">
      <div className="max-w-md rounded-lg border border-divider overflow-hidden">
        <List>
          <EventCard event={mockEventSlim} />
          <EventCard event={mockEventSlimOnline} />
          <EventCard event={{ ...mockEventSlim, distance: 128 }} />
        </List>
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Event Card'
