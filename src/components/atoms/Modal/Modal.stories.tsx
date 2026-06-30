import type { Story, StoryDefault } from '@ladle/react'

import { useState } from 'react'

import { StoryWrapper, StorySection } from '../../ladle'

import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal'

import { Button } from '@/components/atoms/Button'

export default {
  title: 'Atoms',
} satisfies StoryDefault

/** Modal — a Radix Dialog that portals into the themed widget root. */
export const Default: Story = () => {
  const [open, setOpen] = useState(false)

  return (
    <StoryWrapper>
      <StorySection description="Opens a centred dialog with a blurred backdrop." title="Dialog">
        <Button color="primary" onClick={() => setOpen(true)}>
          Open modal
        </Button>
        <Modal backdrop="blur" isOpen={open} onOpenChange={setOpen}>
          <ModalHeader>Invite a friend</ModalHeader>
          <ModalBody>
            <p className="text-sm text-gray-11">
              Share this event with someone who might enjoy a free meditation class.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" variant="flat" onClick={() => setOpen(false)}>
              Done
            </Button>
          </ModalFooter>
        </Modal>
      </StorySection>

      <div />
    </StoryWrapper>
  )
}

Default.storyName = 'Modal'
