import type { Story, StoryDefault } from '@ladle/react'

import { DateTime } from 'luxon'

import {
  StoryWrapper,
  StorySection,
  StoryGrid,
  StoryGridHeader,
  StoryGridHeaderRow,
  StoryGridHeaderCell,
  StoryGridBody,
  StoryGridRow,
  StoryGridCell,
} from '../../ladle'

import { Chip, TimezoneChip } from './Chip'

import { EventIcon, OnlineCallIcon } from '@/components/atoms/Icons'

export default {
  title: 'Atoms / Feedback',
} satisfies StoryDefault

const colors = ['primary', 'secondary', 'default'] as const

/**
 * Chip — a compact, uppercase label built on NextUI's Chip with app defaults.
 * Showcases the colour × emphasis matrix, the icon slot, the TimezoneChip, and
 * how chips read on a dark surface.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection
      description="Colour (NextUI palette) × emphasis (tailwind-variants)."
      title="Variants"
    >
      <StoryGrid>
        <StoryGridHeader>
          <StoryGridHeaderRow>
            <StoryGridHeaderCell />
            <StoryGridHeaderCell>solid</StoryGridHeaderCell>
            <StoryGridHeaderCell>subtle</StoryGridHeaderCell>
          </StoryGridHeaderRow>
        </StoryGridHeader>
        <StoryGridBody>
          {colors.map((color) => (
            <StoryGridRow key={color}>
              <StoryGridCell isLabel>{color}</StoryGridCell>
              <StoryGridCell>
                <Chip color={color} emphasis="solid">
                  online
                </Chip>
              </StoryGridCell>
              <StoryGridCell>
                <Chip color={color} emphasis="subtle">
                  online
                </Chip>
              </StoryGridCell>
            </StoryGridRow>
          ))}
        </StoryGridBody>
      </StoryGrid>
    </StorySection>

    <StorySection title="With Icon">
      <div className="flex flex-wrap items-center gap-2">
        <Chip icon={<EventIcon size={14} />}>course</Chip>
        <Chip color="secondary" icon={<OnlineCallIcon size={14} />}>
          online
        </Chip>
      </div>
    </StorySection>

    <StorySection
      description="TimezoneChip shows the offset in a tooltip on hover."
      title="Timezone"
    >
      <TimezoneChip time={DateTime.fromISO('2026-07-04T09:30', { zone: 'Europe/London' })} />
    </StorySection>

    <StorySection background="neutral" theme="dark" title="Dark Surface">
      <div className="flex flex-wrap items-center gap-2">
        <Chip>online</Chip>
        <Chip color="secondary">Français</Chip>
        <Chip icon={<EventIcon size={14} />}>weekly</Chip>
      </div>
    </StorySection>

    <StorySection inContext={true} title="Examples">
      <div className="flex flex-wrap items-center gap-1">
        <Chip>online</Chip>
        <Chip color="secondary">Français</Chip>
        <Chip icon={<EventIcon size={14} />}>weekly</Chip>
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Chip'
