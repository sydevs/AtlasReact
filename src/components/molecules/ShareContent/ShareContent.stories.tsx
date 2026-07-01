import type { Story, StoryDefault } from '@ladle/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { ShareContent } from './ShareContent'

import { Modal, ModalHeader, ModalBody } from '@/components/atoms/Modal'
import { Button } from '@/components/atoms/Button'

export default { title: 'Molecules' } satisfies StoryDefault

const label = 'Saturday Morning Meditation'
const url = 'https://atlas.example/e/1'

/**
 * ShareContent — a click-to-copy URL field plus social share links. Generic
 * (label + url); EventView composes it into a Modal for the event share dialog,
 * and the registration "thank you" screen reuses it directly.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection
      description="The copyable URL field and social share links."
      title="Share Content"
    >
      <div className="max-w-sm">
        <ShareContent label={label} url={url} />
      </div>
    </StorySection>

    <StorySection
      description="How EventView composes it: a trigger opens a Modal with an 'Invite a friend' header."
      title="In a Modal"
    >
      <Modal
        trigger={
          <Button color="primary" variant="faded">
            Share
          </Button>
        }
      >
        <ModalHeader className="flex flex-col gap-1">Invite a friend along</ModalHeader>
        <ModalBody className="pb-6">
          <ShareContent label={label} url={url} />
        </ModalBody>
      </Modal>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Share Content'
