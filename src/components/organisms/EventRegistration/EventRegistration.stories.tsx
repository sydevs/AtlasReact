import type { Story, StoryDefault } from '@ladle/react'

// Not in the organisms barrel (reached only via the lazy event-panel); import
// from the co-located file.
import { StoryWrapper, StorySection } from '../../ladle'

import { RegistrationButton } from './EventRegistration'

import { mockEvent } from '@/mocks/events'
import { Event } from '@/types'

export default { title: 'Organisms' } satisfies StoryDefault

// External registration renders an outbound link instead of opening the modal.
const externalEvent: Event = {
  ...mockEvent,
  registrationMode: 'external',
  externalRegistrationUrl: 'https://example.com/register',
}

/**
 * EventRegistration — the registration call-to-action. Native registration opens
 * an in-app modal (its form is private to the module); external registration
 * links out to the host's own page.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection
      description="Native registration opens the in-app registration modal on press."
      title="Native"
    >
      <RegistrationButton event={mockEvent} />
    </StorySection>

    <StorySection
      description="External registration links out to the host's own page."
      title="External"
    >
      <RegistrationButton event={externalEvent} />
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Event Registration'
