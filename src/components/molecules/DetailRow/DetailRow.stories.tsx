import type { Story, StoryDefault } from '@ladle/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { DetailRow } from './DetailRow'

import { CallIcon, LocationIcon } from '@/components/atoms/Icons'

export default { title: 'Molecules' } satisfies StoryDefault

// A bare leading-slot icon — the slot's `tone` tints it, so callers don't.
const Icon = () => (
  <div className="flex-center h-full">
    <LocationIcon />
  </div>
)

const Phone = () => (
  <div className="flex-center h-full">
    <CallIcon size={32} />
  </div>
)

// A leading-slot date badge (as the event timing card uses) — a self-styled slot.
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
 * link via `url`/`isExternal`. The slot's `tone` owns its tint — `icon` (default),
 * `highlight` (filled), or `plain` (self-styled, e.g. a date badge). The event
 * detail cards (timing, location, host contact) build on it.
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
            <Phone />
          </DetailRow>
        </StorySection>
      </div>
    </StorySection>

    <StorySection
      description="`tone` sets the leading slot's appearance: a tinted icon (default), the brand-filled highlight (the emphasised contact card), or an untinted self-styled slot."
      title="Tone"
    >
      <div className="flex max-w-md flex-col gap-6">
        <StorySection title="icon (default)" variant="subsection">
          <DetailRow content="123 Peace Street, London" title="Meditation Centre">
            <Icon />
          </DetailRow>
        </StorySection>

        <StorySection title="highlight" variant="subsection">
          <DetailRow
            isExternal
            content="Call for the next class time"
            title="Contact for timing"
            tone="highlight"
            url="tel:+442012345678"
          >
            <Phone />
          </DetailRow>
        </StorySection>

        <StorySection title="plain (self-styled slot, e.g. a date badge)" variant="subsection">
          <DetailRow content="Every Tuesday, 7:00 PM" title="Weekly class" tone="plain">
            <DateBadge />
          </DetailRow>
        </StorySection>
      </div>
    </StorySection>

    <StorySection inContext={true} title="Examples">
      <div className="flex max-w-md flex-col gap-4">
        <DetailRow content="Every Tuesday, 7:00 PM" title="Weekly class" tone="plain">
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
          <Phone />
        </DetailRow>
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Detail Row'
