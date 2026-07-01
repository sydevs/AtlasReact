import type { Story, StoryDefault } from '@ladle/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { ShareButton, ShareContent } from './EventShare'

import { mockEvent } from '@/mocks/events'

export default { title: 'Molecules' } satisfies StoryDefault

/**
 * EventShare — share affordances for an event: the trigger Button (ShareButton)
 * and the copyable URL snippet plus social links it reveals (ShareContent, also
 * reused by the registration "thank you" screen). The modal that wraps them is
 * private to the module.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection
      description="The trigger button that opens the share modal on press."
      title="Share Button"
    >
      <ShareButton event={mockEvent} />
    </StorySection>

    <StorySection
      description="The URL snippet and social share links rendered directly."
      title="Share Content"
    >
      <div className="max-w-sm">
        <ShareContent label={mockEvent.title} url={mockEvent.webUrl ?? ''} />
      </div>
    </StorySection>

    <StorySection inContext={true} title="Examples">
      <div className="flex max-w-md items-center justify-end gap-2 rounded-lg border border-divider p-4">
        <span className="text-sm text-gray-11">{mockEvent.title}</span>
        <ShareButton event={mockEvent} />
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Event Share'
