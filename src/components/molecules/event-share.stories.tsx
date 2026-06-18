import type { StoryDefault } from '@ladle/react'

import { useDisclosure } from '@nextui-org/react'

import { ShareButton, ShareContent, ShareModal } from '@/components/molecules'
import { mockEvent } from '@/mocks/events'

export default { title: 'Molecules / Event Share' } satisfies StoryDefault

export const Button = () => <ShareButton event={mockEvent} />

export const Content = () => (
  <div className="max-w-sm">
    <ShareContent label={mockEvent.label} url={mockEvent.url} />
  </div>
)

export const ModalOpen = () => {
  const { isOpen, onOpenChange } = useDisclosure({ defaultOpen: true })

  return <ShareModal event={mockEvent} isOpen={isOpen} onOpenChange={onOpenChange} />
}
ModalOpen.storyName = 'Modal (open)'
