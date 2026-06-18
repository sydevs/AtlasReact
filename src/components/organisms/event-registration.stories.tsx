import type { StoryDefault } from '@ladle/react'

// Not in the organisms barrel (reached only via the lazy event-panel); direct import.
import { RegistrationButton, RegistrationModal } from '@/components/organisms/event-registration'
import { mockEvent } from '@/mocks/events'

export default { title: 'Organisms / Event Registration' } satisfies StoryDefault

export const Button = () => <RegistrationButton event={mockEvent} />

export const ModalOpen = () => (
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
)
ModalOpen.storyName = 'Modal (open)'
