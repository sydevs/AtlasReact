import { type ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { tv, type VariantProps } from 'tailwind-variants'

import { overlayContainer } from '@/lib/overlay'

// A modal dialog built on @radix-ui/react-dialog, replacing NextUI's Modal suite.
// It portals into the theme root (the widget wrapper) — not document.body — so
// the overlay inherits the brand CSS vars and the light/dark class, fixing the
// long-standing embedded-overlay theming gap noted in providers.tsx.
const modal = tv({
  slots: {
    overlay: 'fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in',
    wrapper: 'fixed inset-0 z-50 flex justify-center p-4',
    content:
      'relative flex w-full max-w-md flex-col gap-1 rounded-lg bg-background text-foreground shadow-xl outline-none max-h-full overflow-y-auto',
  },
  variants: {
    placement: {
      center: { wrapper: 'items-center' },
      bottom: { wrapper: 'items-end sm:items-center' },
    },
    backdrop: {
      blur: { overlay: 'backdrop-blur-sm' },
      opaque: {},
      transparent: { overlay: 'bg-transparent' },
    },
  },
  defaultVariants: { placement: 'center', backdrop: 'opaque' },
})

export type ModalProps = VariantProps<typeof modal> & {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  /** Accessible dialog label when no <ModalHeader> is rendered. */
  ariaLabel?: string
  children: ReactNode
  className?: string
}

export function Modal({
  isOpen,
  onOpenChange,
  placement,
  backdrop,
  ariaLabel,
  children,
  className,
}: ModalProps) {
  const slots = modal({ placement, backdrop })

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal container={overlayContainer()}>
        <Dialog.Overlay className={slots.overlay()} />
        <div className={slots.wrapper()}>
          <Dialog.Content aria-label={ariaLabel} className={slots.content({ className })}>
            {children}
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

// The header doubles as the dialog's accessible title (Radix requires one).
export function ModalHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Dialog.Title className={`px-6 pt-5 pb-2 text-lg font-semibold ${className ?? ''}`}>
      {children}
    </Dialog.Title>
  )
}

export function ModalBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`flex flex-col gap-3 px-6 py-2 ${className ?? ''}`}>{children}</div>
}

export function ModalFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex justify-end gap-2 px-6 pt-2 pb-5 ${className ?? ''}`}>{children}</div>
  )
}
