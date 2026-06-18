// Static fixtures for Ladle stories (and any future node tests). Typed against
// the zod-inferred entity types in src/types so a schema change surfaces here as
// a type error. Dates are fixed (never `new Date()`) so previews are stable.
import type { Event, EventImage, EventSlim } from '@/types'

export const mockEventImages: EventImage[] = [
  {
    url: 'https://picsum.photos/seed/atlas-hall/1200/800',
    thumbnailUrl: 'https://picsum.photos/seed/atlas-hall/400/300',
    altText: 'Meditation hall',
  },
  {
    url: 'https://picsum.photos/seed/atlas-group/1200/800',
    thumbnailUrl: 'https://picsum.photos/seed/atlas-group/400/300',
    altText: 'Group session',
  },
]

export const mockEventSlim: EventSlim = {
  id: 101,
  path: '/events/101',
  label: 'Saturday Morning Meditation',
  online: false,
  languageCode: 'en',
  category: 'dropin',
  recurrenceType: 'weekly_1',
  address: 'Town Hall, 5 Market St, Cambridge',
  latitude: 52.2053,
  longitude: 0.1218,
  nextDate: new Date('2026-07-04T09:30:00Z'),
  firstDate: new Date('2026-01-10T09:30:00Z'),
  duration: 1.5,
  timeZone: 'Europe/London',
  locationId: 8001,
  locationType: 'venue',
  distance: 3,
}

export const mockEventSlimOnline: EventSlim = {
  ...mockEventSlim,
  id: 102,
  path: '/events/102',
  label: 'Online Evening Meditation',
  online: true,
  languageCode: 'fr',
  address: 'Online',
  recurrenceType: 'daily',
  distance: 42,
}

export const mockEventSlimList: EventSlim[] = [
  mockEventSlim,
  mockEventSlimOnline,
  {
    ...mockEventSlim,
    id: 103,
    path: '/events/103',
    label: 'Beginners Course',
    category: 'course',
    recurrenceType: null,
    address: 'Community Centre, Oxford',
    distance: 18,
  },
]

export const mockEvent: Event = {
  id: 101,
  path: '/events/101',
  label: 'Saturday Morning Meditation',
  online: false,
  languageCode: 'en',
  category: 'dropin',
  url: 'https://atlas.example/events/101',
  description: 'A free weekly meditation class open to everyone, no experience needed.',
  descriptionHtml:
    '<p>A free weekly meditation class open to everyone, <strong>no experience needed</strong>.</p>',
  registration: {
    mode: 'native',
    maxParticipants: 30,
    participantCount: 12,
    questions: [],
  },
  timing: {
    type: 'recurring',
    localStartTime: '09:30',
    localEndTime: '11:00',
    duration: 1.5,
    timeZone: 'Europe/London',
    firstDate: new Date('2026-01-10T09:30:00Z'),
    lastDate: null,
    upcomingDates: [new Date('2026-07-04T09:30:00Z'), new Date('2026-07-11T09:30:00Z')],
    recurrenceCount: null,
    recurrenceType: 'weekly_1',
  },
  contact: { phoneName: 'Anna', phoneNumber: '+44 20 1234 5678' },
  images: mockEventImages,
  location: {
    countryCode: 'GB',
    regionCode: 'CAM',
    areaPath: '/areas/cambridge',
    venuePath: '/venues/town-hall',
    areaName: 'Cambridge',
    latitude: 52.2053,
    longitude: 0.1218,
    venue: {
      name: 'Town Hall',
      street: '5 Market St',
      city: 'Cambridge',
      directionsUrl: 'https://maps.example/dir',
      address: '5 Market St, Cambridge CB2 3QJ',
      postalCode: 'CB2 3QJ',
    },
  },
}
