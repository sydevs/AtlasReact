// Molecules — small compositions of atoms; data passed in via props.
// Public import surface: `import { SearchBar } from '@/components/molecules'`.
// See DESIGN_SYSTEM.md. Explicit named exports only — each folder surfaces its
// primary component(s) + `Props` type; single-use internals stay private.
export { Navbar } from './Navbar'
export type { NavbarProps } from './Navbar'

export { SearchBar } from './SearchBar'
export type { SearchBarProps } from './SearchBar'

// DetailRow — a generic labelled icon row; the event detail cards build on it.
export { DetailRow } from './DetailRow'
export type { DetailRowProps } from './DetailRow'

// List also surfaces its ListHeader sub-component (back link + title).
export { List, ListHeader } from './List'
export type { ListHeaderProps } from './List'

export { ListItem } from './ListItem'
export type { ListItemProps } from './ListItem'

export { EventItem } from './EventItem'
export type { EventItemProps } from './EventItem'

export { EventTime } from './EventTime'
export type { EventTimeProps } from './EventTime'

// EventShare exposes its trigger button and the shared share-content block
// (reused by the registration "thank you" screen); the modal is private.
export { ShareButton, ShareContent } from './EventShare'
export type { ShareButtonProps, ShareContentProps } from './EventShare'

export { EventImages } from './EventImages'

export { EventSoonChip } from './EventSoon'
export type { EventSoonChipProps } from './EventSoon'

export { EventMetadata } from './EventMetadata'
export type { EventMetadataProps } from './EventMetadata'
