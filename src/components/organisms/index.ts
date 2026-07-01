// Organisms — complex, data-connected sections (React Query, the map, forms).
// Public import surface: `import { EventsList } from '@/components/organisms'`.
// See DESIGN_SYSTEM.md. Explicit named exports only. The Mapbox sub-module's
// layer/theme helpers are internal and not re-exported here (see
// .claude/rules/mapbox.md).
export { Mapbox, MapSearch } from './Mapbox'

export { EventsList, DynamicEventsList } from './EventsList'
export type { EventsListProps, DynamicEventsListProps } from './EventsList'

// NOTE: EventView / EventRegistration are deliberately NOT re-exported. The
// event detail page lazy-loads the panel
// (`lazy(() => import('@/components/organisms/EventView'))` in pages/event.tsx)
// to keep it out of the main chunk, and that family is only reached through that
// dynamic import. Re-exporting them here would pull them back into every barrel
// consumer's static graph and defeat the code-split. Import them by direct path.
