import type { Story, StoryDefault } from '@ladle/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { DetailRow } from './DetailRow'

import { CallIcon, LocationIcon } from '@/components/atoms/Icons'

export default { title: 'Molecules' } satisfies StoryDefault

// A leading-slot icon (the common case).
const Icon = () => (
  <div className="flex-center h-full text-primary">
    <LocationIcon />
  </div>
)

// A leading-slot date badge (as the event timing card uses).
const DateBadge = () => (
  <>
    <div className="bg-primary-4 py-0.5 text-xs font-semibold">MAR</div>
    <div className="flex h-6 items-center justify-center text-md font-semibold text-gray-11">
      18
    </div>
  </>
)

/**
 * DetailRow — a generic labelled row: a leading square slot (icon or badge) then a
 * title over secondary content. The title is plain text, or an internal/external
 * link when `url`/`isExternal` are set; `highlighted` fills the slot with the
 * brand tint. The event detail cards (timing, location, host contact) build on it.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection
      description="The title is plain, an internal link, or an external link."
      title="Variants"
    >
      <div className="flex max-w-md flex-col gap-6">
        <StorySection title="Plain (no link)" variant="subsection">
          <DetailRow content="123 Peace Street, London" title="Meditation Centre">
            <Icon />
          </DetailRow>
        </StorySection>

        <StorySection title="Internal link" variant="subsection">
          <DetailRow content="See the venue page" title="Cambridge Centre" url="#venue">
            <Icon />
          </DetailRow>
        </StorySection>

        <StorySection title="External link (isExternal)" variant="subsection">
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
        </StorySection>
      </div>
    </StorySection>

    <StorySection
      description="`highlighted` fills the leading slot with the brand tint — used for the emphasised host-contact card that leads the stack when an event has no upcoming date."
      title="Highlighted"
    >
      <div className="flex max-w-md flex-col gap-6">
        <StorySection title="Default slot" variant="subsection">
          <DetailRow
            isExternal
            content="Call for the next class time"
            title="Contact for timing"
            url="tel:+442012345678"
          >
            <div className="flex-center h-full text-primary">
              <CallIcon size={32} />
            </div>
          </DetailRow>
        </StorySection>

        <StorySection title="highlighted" variant="subsection">
          <DetailRow
            highlighted
            isExternal
            content="Call for the next class time"
            title="Contact for timing"
            url="tel:+442012345678"
          >
            <div className="flex-center h-full">
              <CallIcon size={32} />
            </div>
          </DetailRow>
        </StorySection>
      </div>
    </StorySection>

    <StorySection
      description="The leading slot is a free-form `children` — an icon, or a date badge like the timing card."
      title="Icon slot"
    >
      <div className="flex max-w-md flex-col gap-6">
        <StorySection title="Icon" variant="subsection">
          <DetailRow content="123 Peace Street, London" title="Meditation Centre">
            <Icon />
          </DetailRow>
        </StorySection>

        <StorySection title="Date badge" variant="subsection">
          <DetailRow content="Every Tuesday, 7:00 PM" title="Weekly class">
            <DateBadge />
          </DetailRow>
        </StorySection>
      </div>
    </StorySection>

    <StorySection inContext={true} title="Examples">
      <div className="flex max-w-md flex-col gap-4">
        <DetailRow content="Every Tuesday, 7:00 PM" title="Weekly class">
          <DateBadge />
        </DetailRow>
        <DetailRow
          isExternal
          content="123 Peace Street, London"
          title="Meditation Centre"
          url="#venue"
        >
          <Icon />
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
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Detail Row'
