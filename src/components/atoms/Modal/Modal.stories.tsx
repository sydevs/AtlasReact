import type { Story, StoryDefault } from '@ladle/react'

import { useState } from 'react'

import { StoryWrapper, StorySection } from '../../ladle'

import { Modal, ModalHeader, ModalBody, ModalFooter, ModalClose } from './Modal'

import { Button } from '@/components/atoms/Button'

export default {
  title: 'Atoms',
} satisfies StoryDefault

/** Modal — a Radix Dialog that portals into the themed widget root. */
export const Default: Story = () => {
  const [open, setOpen] = useState(false)

  return (
    <StoryWrapper>
      <StorySection
        description="Controlled by an external open state (isOpen/onOpenChange)."
        title="Controlled dialog"
      >
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

      <StorySection
        description="Uncontrolled: a `trigger` opens it and <ModalClose> closes it."
        title="Trigger dialog"
      >
        <Modal trigger={<Button color="primary">Invite a friend</Button>}>
          <ModalHeader>Invite a friend</ModalHeader>
          <ModalBody>
            <p className="text-sm text-gray-11">
              Share this event with someone who might enjoy a free meditation class.
            </p>
          </ModalBody>
          <ModalFooter>
            <ModalClose>
              <Button variant="flat">Cancel</Button>
            </ModalClose>
            <ModalClose>
              <Button color="primary" variant="flat">
                Done
              </Button>
            </ModalClose>
          </ModalFooter>
        </Modal>
      </StorySection>

      <div />
    </StoryWrapper>
  )
}

Default.storyName = 'Modal'
