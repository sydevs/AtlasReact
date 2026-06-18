import type { StoryDefault } from '@ladle/react'

import { EventImages } from '@/components/molecules'
import { mockEventImages } from '@/mocks/events'

export default { title: 'Molecules / Event Images' } satisfies StoryDefault

export const Default = () => (
  <div className="max-w-md">
    <EventImages images={mockEventImages} />
  </div>
)

export const Single = () => (
  <div className="max-w-md">
    <EventImages images={[mockEventImages[0]]} />
  </div>
)

export const Empty = () => (
  <div className="max-w-md">
    <EventImages images={[]} />
  </div>
)
