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

// ShareContent — the copyable URL + social-links block, reused by the event
// share dialog (composed by EventView) and the registration "thank you" screen.
export { ShareContent } from './ShareContent'
export type { ShareContentProps } from './ShareContent'

export { ImageCarousel } from './ImageCarousel'
export type { Slide } from './ImageCarousel'

export { EventSoonChip } from './EventSoon'
export type { EventSoonChipProps } from './EventSoon'

export { EventMetadata } from './EventMetadata'
export type { EventMetadataProps } from './EventMetadata'
