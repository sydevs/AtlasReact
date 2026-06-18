import type { StoryDefault } from '@ladle/react'

// event-panel is intentionally not in the organisms barrel (lazy-loaded; see
// organisms/index.ts), so import it by direct path.
import { EventPanel } from '@/components/organisms/event-panel'
import { mockEvent } from '@/mocks/events'

export default { title: 'Organisms / Event Panel' } satisfies StoryDefault

export const InPerson = () => (
  <div className="max-w-md border border-default-200">
    <EventPanel event={mockEvent} />
  </div>
)

export const Online = () => (
  <div className="max-w-md border border-default-200">
    <EventPanel event={{ ...mockEvent, online: true, languageCode: 'fr' }} />
  </div>
)

export const NoImages = () => (
  <div className="max-w-md border border-default-200">
    <EventPanel event={{ ...mockEvent, images: [] }} />
  </div>
)
