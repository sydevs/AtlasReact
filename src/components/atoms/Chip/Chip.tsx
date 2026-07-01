import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

import { IconSvgProps } from '@/types'

// A compact, uppercase label — the design system's reference tailwind-variants
// component (see DESIGN_SYSTEM.md), now built directly on the Radix-semantic
// 12-step tokens instead of NextUI's Chip. `flat` is a soft tint, `light` is
// text-only; `emphasis` tunes the content weight.
const chip = tv({
  slots: {
    base: 'inline-flex items-center gap-1 rounded-sm',
    content: 'uppercase leading-none',
  },
  variants: {
    color: { primary: '', secondary: '', default: '' },
    variant: { flat: '', light: '' },
    size: {
      sm: { base: 'px-2 py-1 text-xs' },
      md: { base: 'px-2.5 py-1.5 text-sm' },
    },
    emphasis: {
      solid: { content: 'font-bold' },
      subtle: { content: 'font-medium' },
    },
  },
  compoundVariants: [
    { color: 'primary', variant: 'flat', class: { base: 'bg-primary-3 text-primary-11' } },
    { color: 'secondary', variant: 'flat', class: { base: 'bg-secondary-3 text-secondary-11' } },
    { color: 'default', variant: 'flat', class: { base: 'bg-gray-3 text-gray-12' } },
    { color: 'primary', variant: 'light', class: { base: 'text-primary-11' } },
    { color: 'secondary', variant: 'light', class: { base: 'text-secondary-11' } },
    { color: 'default', variant: 'light', class: { base: 'text-gray-12' } },
  ],
  defaultVariants: {
    color: 'primary',
    variant: 'flat',
    size: 'sm',
    emphasis: 'solid',
  },
})

export type ChipProps = VariantProps<typeof chip> & {
  children: React.ReactNode
  icon?: React.ReactElement<IconSvgProps>
  className?: string
}

export function Chip({ children, icon, color, variant, size, emphasis, className }: ChipProps) {
  const slots = chip({ color, variant, size, emphasis })

  return (
    <span className={slots.base({ className })}>
      {icon}
      <span className={slots.content()}>{children}</span>
    </span>
  )
}
