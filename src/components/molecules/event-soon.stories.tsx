import type { StoryDefault } from '@ladle/react'

import { DateTime } from 'luxon'

import { EventSoonChip } from '@/components/molecules'

export default { title: 'Molecules / Event Soon Chip' } satisfies StoryDefault

// EventSoonChip only renders when the date is "soon" relative to now: within
// 1 hour for online events, within 1 week for in-person ones. These stories use
// dates offset from now so the chip is actually visible; the FixedDate story
// shows the null-render case with a stable date far outside the window.
const soonInPerson = DateTime.now().plus({ days: 3 }).toJSDate()
const soonOnline = DateTime.now().plus({ minutes: 30 }).toJSDate()
const fixedDate = new Date('2026-07-04T09:30:00Z')

export const InPerson = () => <EventSoonChip firstDate={soonInPerson} online={false} />

export const Online = () => <EventSoonChip online firstDate={soonOnline} />

export const NotSoonRendersNothing = () => <EventSoonChip firstDate={fixedDate} online={false} />
