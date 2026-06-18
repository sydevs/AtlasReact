import type { Story, StoryDefault } from '@ladle/react'

// Not in the organisms barrel (reached only via the lazy event-panel); import
// from the co-located file.
import { StoryWrapper, StorySection } from '../../ladle'

import { RegistrationButton, RegistrationModal } from './EventRegistration'

import { mockEvent } from '@/mocks/events'

export default { title: 'Organisms' } satisfies StoryDefault

/**
 * EventRegistration — the registration call-to-action button and the modal it
 * opens (with the native registration fields). The modal is shown open so its
 * contents render in the canvas.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection description="Opens the registration modal on press." title="Button">
      <RegistrationButton event={mockEvent} />
    </StorySection>

    <StorySection description="The registration modal in its open state." title="Modal">
      <RegistrationModal
        isOpen
        eventId={mockEvent.id}
        eventLabel={mockEvent.label}
        eventRegistration={mockEvent.registration!}
        eventTiming={mockEvent.timing!}
        eventUrl={mockEvent.url}
        isOnline={mockEvent.online}
        onOpenChange={() => {}}
      />
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Event Registration'
