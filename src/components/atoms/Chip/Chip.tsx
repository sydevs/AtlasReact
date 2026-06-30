import React from 'react'
import { Chip as NextUIChip, type ChipProps as NextUIChipProps } from '@nextui-org/react'
import { tv, type VariantProps } from 'tailwind-variants'

import { IconSvgProps } from '@/types'

// Reference tailwind-variants usage for the design system (see DESIGN_SYSTEM.md).
// Content is always uppercased; `emphasis` is a design-system variant exposed for
// the component library (previewed in Chip.stories) — the app uses the default.
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

export type ChipProps = {
  children: React.ReactNode
  icon?: React.ReactElement<IconSvgProps>
  emphasis?: VariantProps<typeof chipContent>['emphasis']
} & NextUIChipProps

export function Chip({ children, icon, emphasis, ...props }: ChipProps) {
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
