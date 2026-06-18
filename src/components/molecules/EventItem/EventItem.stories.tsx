import type { StoryDefault } from '@ladle/react'

import { EventItem } from '@/components/molecules'
import { mockEventSlim, mockEventSlimOnline } from '@/mocks/events'

export default { title: 'Molecules / Event Item' } satisfies StoryDefault

export const InPerson = () => (
  <div className="max-w-md">
    <EventItem event={mockEventSlim} />
  </div>
)

export const Online = () => (
  <div className="max-w-md">
    <EventItem event={mockEventSlimOnline} />
  </div>
)

export const FarAway = () => (
  <div className="max-w-md">
    <EventItem event={{ ...mockEventSlim, distance: 128 }} />
  </div>
)
