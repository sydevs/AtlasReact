import type { Story, StoryDefault } from '@ladle/react'

import { DateTime } from 'luxon'

import { Chip, TimezoneChip, EventIcon } from '@/components/atoms'

export default { title: 'Atoms / Chip' } satisfies StoryDefault

export const Default = () => <Chip>online</Chip>

export const Colors = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Chip color="primary">primary</Chip>
    <Chip color="secondary">secondary</Chip>
    <Chip color="default">default</Chip>
  </div>
)

export const Emphasis = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Chip emphasis="solid">solid</Chip>
    <Chip emphasis="subtle">subtle</Chip>
  </div>
)

export const WithIcon = () => <Chip icon={<EventIcon size={14} />}>course</Chip>

export const TimeZone = () => (
  <TimezoneChip time={DateTime.fromISO('2026-07-04T09:30', { zone: 'Europe/London' })} />
)
TimeZone.storyName = 'TimezoneChip (tooltip on hover)'

export const Playground: Story<{
  label: string
  emphasis: 'solid' | 'subtle'
  color: 'primary' | 'secondary' | 'default'
}> = ({ label, emphasis, color }) => (
  <Chip color={color} emphasis={emphasis}>
    {label}
  </Chip>
)
Playground.args = { label: 'online', emphasis: 'solid', color: 'primary' }
Playground.argTypes = {
  emphasis: { options: ['solid', 'subtle'], control: { type: 'inline-radio' } },
  color: { options: ['primary', 'secondary', 'default'], control: { type: 'inline-radio' } },
}
