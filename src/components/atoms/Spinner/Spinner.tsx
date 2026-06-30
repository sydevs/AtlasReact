import { tv, type VariantProps } from 'tailwind-variants'

// A pure CSS spinner (two rings, one spinning) — replaces NextUI's Spinner with
// no library dependency. Color keys onto the brand/neutral 12-step tokens.
const spinner = tv({
  slots: {
    base: 'flex flex-col items-center justify-center gap-2',
    circle: 'animate-spin rounded-full border-solid border-t-transparent',
    label: 'text-sm text-gray-11',
  },
  variants: {
    color: {
      primary: { circle: 'border-primary-9' },
      secondary: { circle: 'border-secondary-9' },
      default: { circle: 'border-gray-9' },
      // Inherit the surrounding text colour — used by Button so the spinner
      // matches the label across every colour/variant.
      current: { circle: 'border-current' },
    },
    size: {
      sm: { circle: 'h-5 w-5 border-2' },
      md: { circle: 'h-8 w-8 border-[3px]' },
      lg: { circle: 'h-10 w-10 border-4' },
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
})

export type SpinnerProps = VariantProps<typeof spinner> & {
  label?: string
  className?: string
}

export function Spinner({ color, size, label, className }: SpinnerProps) {
  const { base, circle, label: labelClass } = spinner({ color, size })

  return (
    <div aria-live="polite" className={base({ className })} role="status">
      <span aria-hidden="true" className={circle()} />
      {label && <span className={labelClass()}>{label}</span>}
      {!label && <span className="sr-only">Loading</span>}
    </div>
  )
}
