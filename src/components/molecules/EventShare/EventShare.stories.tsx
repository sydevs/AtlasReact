import type { Story, StoryDefault } from '@ladle/react'

import { useDisclosure } from '@nextui-org/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { ShareButton, ShareContent, ShareModal } from './EventShare'

import { mockEvent } from '@/mocks/events'

export default { title: 'Molecules / Interactive' } satisfies StoryDefault

/**
 * EventShare — share affordances for an event: a copyable URL snippet plus
 * social links (ShareContent), the trigger Button (ShareButton), and the modal
 * that wraps them (ShareModal).
 */
export const Default: Story = () => {
  const { isOpen, onOpenChange } = useDisclosure({ defaultOpen: true })

  return (
    <StoryWrapper>
      <StorySection
        description="The URL snippet and social share links rendered directly."
        title="Share Content"
      >
        <div className="max-w-sm">
          <ShareContent label={mockEvent.label} url={mockEvent.url} />
        </div>
      </StorySection>

      <StorySection
        description="The trigger button that opens the share modal on press."
        title="Share Button"
      >
        <ShareButton event={mockEvent} />
      </StorySection>

      <StorySection description="The modal, opened by default for this story." title="Share Modal">
        <ShareModal event={mockEvent} isOpen={isOpen} onOpenChange={onOpenChange} />
      </StorySection>

      <StorySection background="neutral" theme="dark" title="Dark Surface">
        <div className="max-w-sm">
          <ShareContent label={mockEvent.label} url={mockEvent.url} />
        </div>
      </StorySection>

      <StorySection inContext={true} title="Examples">
        <div className="flex max-w-md items-center justify-end gap-2 rounded-lg border border-divider p-4">
          <span className="text-sm text-default-600">{mockEvent.label}</span>
          <ShareButton event={mockEvent} />
        </div>
      </StorySection>

      <div />
    </StoryWrapper>
  )
}

Default.storyName = 'Event Share'
