import type { Story, StoryDefault } from '@ladle/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { DetailRow } from './DetailRow'

import { CallIcon, LocationIcon } from '@/components/atoms/Icons'

export default { title: 'Molecules' } satisfies StoryDefault

/**
 * DetailRow — a generic labelled row (leading icon slot + title over content),
 * with the title optionally an internal or external link. The event detail
 * cards (timing, location, host contact) are all built from it.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection description="Plain row, external link, and a date-badge slot." title="Variants">
      <div className="flex max-w-md flex-col gap-4">
        <DetailRow content="123 Peace Street, London" title="Meditation Centre">
          <div className="flex-center h-full text-primary">
            <LocationIcon />
          </div>
        </DetailRow>

        <DetailRow
          isExternal
          content="Call +44 20 1234 5678"
          title="Contact the host"
          url="tel:+442012345678"
        >
          <div className="flex-center h-full text-primary">
            <CallIcon size={32} />
          </div>
        </DetailRow>

        <DetailRow content="Every Tuesday, 7:00 PM" title="Weekly class">
          <div className="bg-primary-4 py-0.5 text-xs font-semibold">MAR</div>
          <div className="flex h-6 items-center justify-center text-md font-semibold text-gray-11">
            18
          </div>
        </DetailRow>
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Detail Row'
