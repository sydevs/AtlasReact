import { type ReactNode } from 'react'
import * as RadixSwitch from '@radix-ui/react-switch'
import { tv, type VariantProps } from 'tailwind-variants'

// A toggle switch built on @radix-ui/react-switch, replacing NextUI's Switch. The
// track keys onto the brand 12-step tokens (step 6 off → step 9 solid on).
const toggle = tv({
  slots: {
    root: 'relative shrink-0 cursor-pointer rounded-full bg-gray-6 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-focus disabled:opacity-disabled',
    thumb:
      'block rounded-full bg-white shadow transition-transform will-change-transform translate-x-[2px]',
  },
  variants: {
    color: {
      primary: { root: 'data-[state=checked]:bg-primary-9' },
      secondary: { root: 'data-[state=checked]:bg-secondary-9' },
      default: { root: 'data-[state=checked]:bg-gray-9' },
    },
    size: {
      sm: { root: 'h-5 w-9', thumb: 'h-4 w-4 data-[state=checked]:translate-x-[18px]' },
      md: { root: 'h-6 w-11', thumb: 'h-5 w-5 data-[state=checked]:translate-x-[22px]' },
    },
  },
  defaultVariants: { color: 'primary', size: 'md' },
})

export type SwitchProps = VariantProps<typeof toggle> & {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  id?: string
  /** Optional label rendered after the track. */
  children?: ReactNode
  className?: string
}

export function Switch({
  color,
  size,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  id,
  children,
  className,
}: SwitchProps) {
  const { root, thumb } = toggle({ color, size })

  const control = (
    <RadixSwitch.Root
      checked={checked}
      className={root({ className: children ? undefined : className })}
      defaultChecked={defaultChecked}
      disabled={disabled}
      id={id}
      onCheckedChange={onCheckedChange}
    >
      <RadixSwitch.Thumb className={thumb()} />
    </RadixSwitch.Root>
  )

  if (!children) return control

  return (
    <label className={`inline-flex cursor-pointer items-center gap-2 ${className ?? ''}`}>
      {control}
      <span className="text-sm">{children}</span>
    </label>
  )
}
