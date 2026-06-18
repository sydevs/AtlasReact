import type { StoryDefault } from '@ladle/react'

import { EventsList } from '@/components/organisms'
import { mockEventSlim, mockEventSlimList } from '@/mocks/events'

export default { title: 'Organisms / Events List' } satisfies StoryDefault

// EventsList is the presentational list (events passed in via props). Its sibling
// DynamicEventsList fetches by coordinates over the network, so it isn't storied
// here — stories stay offline.
export const Default = () => (
  <div className="max-w-md">
    <EventsList events={mockEventSlimList} />
  </div>
)

export const Single = () => (
  <div className="max-w-md">
    <EventsList events={[mockEventSlim]} />
  </div>
)

export const Empty = () => (
  <div className="max-w-md">
    <EventsList events={[]} />
  </div>
)
