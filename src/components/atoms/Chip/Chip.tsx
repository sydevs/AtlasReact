import React from 'react'
import { Chip as NextUIChip, ChipProps, Tooltip } from '@nextui-org/react'
import { DateTime } from 'luxon'
import { useTranslation } from 'react-i18next'
import { tv, type VariantProps } from 'tailwind-variants'

import { IconSvgProps } from '@/types'

// Reference tailwind-variants usage for the design system (see DESIGN_SYSTEM.md).
// Content is always uppercased; `emphasis` is a design-system variant exposed for
// the component library (previewed in chip.stories) — the app uses the default.
const chipContent = tv({
  base: 'uppercase',
  variants: {
    emphasis: {
      solid: 'font-bold',
      subtle: 'font-medium',
    },
  },
  defaultVariants: {
    emphasis: 'solid',
  },
})

type Props = {
  children: React.ReactNode
  icon?: React.ReactElement<IconSvgProps>
  emphasis?: VariantProps<typeof chipContent>['emphasis']
} & ChipProps

export function Chip({ children, icon, emphasis, ...props }: Props) {
  return (
    <NextUIChip
      classNames={{
        content: chipContent({ emphasis }),
      }}
      color="primary"
      radius="sm"
      size="sm"
      startContent={icon}
      variant="flat"
      {...props}
    >
      {children}
    </NextUIChip>
  )
}

type TimezoneChipProps = {
  time: DateTime
  delay?: number
} & ChipProps

export function TimezoneChip({ time, delay = 0, ...props }: TimezoneChipProps) {
  const { t } = useTranslation('events')
  const tooltip = t('timing.converted_to', {
    timezone: time.toFormat('ZZZZZ'),
    offset: time.toFormat('Z'),
  })

  return (
    <Tooltip className="max-w-64" closeDelay={0} content={tooltip} delay={delay} placement="top">
      <abbr>
        {' '}
        {/* Tooltip wrapper needed for forwardRef to work */}
        <Chip color="primary" size="sm" variant="light" {...props}>
          {time.toFormat('ZZZZ')}
        </Chip>
      </abbr>
    </Tooltip>
  )
}
