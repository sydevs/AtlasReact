import type { Story, StoryDefault } from '@ladle/react'

// event-panel is intentionally not in the organisms barrel (lazy-loaded; see
// organisms/index.ts), so import it from its co-located file.
import { StoryWrapper, StorySection } from '../../ladle'

import { EventPanel } from './EventPanel'

import { mockEvent } from '@/mocks/events'

export default { title: 'Organisms' } satisfies StoryDefault

/**
 * EventPanel — the full event detail panel (header, images, description,
 * timing/location/contact cards, registration). Shown for an in-person event,
 * an online event, and an event with no images, plus on a dark surface.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection description="A recurring in-person event." title="In Person">
      <div className="max-w-md border border-default-200">
        <EventPanel event={mockEvent} />
      </div>
    </StorySection>

    <StorySection description="An online event in French." title="Online">
      <div className="max-w-md border border-default-200">
        <EventPanel event={{ ...mockEvent, online: true, languageCode: 'fr' }} />
      </div>
    </StorySection>

    <StorySection description="An event without images." title="No Images">
      <div className="max-w-md border border-default-200">
        <EventPanel event={{ ...mockEvent, images: [] }} />
      </div>
    </StorySection>

    <StorySection background="neutral" theme="dark" title="Dark Surface">
      <div className="max-w-md border border-default-200">
        <EventPanel event={mockEvent} />
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Event Panel'
