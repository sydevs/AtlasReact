import type { Story, StoryDefault } from '@ladle/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { EventImages } from './EventImages'

import { mockEventImages } from '@/mocks/events'

export default { title: 'Molecules' } satisfies StoryDefault

/**
 * EventImages — an autoplaying Swiper carousel of an event's photos. With a
 * single image the swiper is disabled; with none it renders nothing.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection title="Carousel">
      <div className="max-w-md">
        <EventImages images={mockEventImages} />
      </div>
    </StorySection>

    <StorySection description="A single image disables paging and autoplay." title="Single Image">
      <div className="max-w-md">
        <EventImages images={[mockEventImages[0]]} />
      </div>
    </StorySection>

    <StorySection description="No images renders nothing (empty below)." title="Empty">
      <div className="max-w-md text-sm text-default-500">
        <EventImages images={[]} />
        (no carousel)
      </div>
    </StorySection>

    <StorySection background="neutral" theme="dark" title="Dark Surface">
      <div className="max-w-md">
        <EventImages images={mockEventImages} />
      </div>
    </StorySection>

    <StorySection inContext={true} title="Examples">
      <div className="max-w-md rounded-lg border border-divider overflow-hidden">
        <EventImages images={mockEventImages} />
        <div className="px-6 pb-6">
          <div className="text-lg font-semibold">Saturday Morning Meditation</div>
          <div className="text-sm text-default-600">Town Hall, Cambridge</div>
        </div>
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Event Images'
