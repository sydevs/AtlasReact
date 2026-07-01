// Atoms — smallest building blocks; render from props alone.
// Public import surface: `import { Chip } from '@/components/atoms'`.
// See DESIGN_SYSTEM.md. (Components inside src/components import each other by
// direct path — e.g. '@/components/atoms/Chip' — not through this barrel, to
// avoid import cycles.)
//
// Explicit named exports only (no `export *`), so each folder's public surface
// is its primary component(s) + `Props` type. `Icons/` is the one icon-set
// module that keeps a wildcard re-export. See DESIGN_SYSTEM.md.
export * from './Icons'

export { Alert } from './Alert'
export type { AlertProps } from './Alert'

export { Button } from './Button'
export type { ButtonProps } from './Button'

export { Checkbox } from './Checkbox'
export type { CheckboxProps } from './Checkbox'

export { Chip } from './Chip'
export type { ChipProps } from './Chip'

export { Dropdown, DropdownItem } from './Dropdown'
export type { DropdownProps, DropdownItemProps } from './Dropdown'

export { LoadingFallback, ErrorFallback } from './Fallbacks'

export { Link } from './Link'
export type { LinkProps } from './Link'

export { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal'
export type { ModalProps } from './Modal'

export { LanguageSelector } from './LanguageSelector'

export { Lightbox } from './Lightbox'
export type { LightboxProps, LightboxSlide } from './Lightbox'

export { Panel } from './Panel'
export type { PanelProps } from './Panel'

export { Spinner } from './Spinner'
export type { SpinnerProps } from './Spinner'

export { ThemeSwitch } from './ThemeSwitch'
export type { ThemeSwitchProps } from './ThemeSwitch'
