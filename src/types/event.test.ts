import { describe, it, expect } from 'vitest'

import { EventSchema, EventSlimSchema } from './event'

import { mockEvent, mockEventSlim, mockEventSlimList } from '@/mocks/events'

// The fetchers parse every response through these schemas (src/config/api/fetch.ts),
// so a backend shape change should surface here as a parse error, not a runtime
// crash deep in the UI. We reuse the Ladle mocks (typed against the same schemas)
// as the happy-path fixtures and add a raw-wire payload to prove date coercion.

describe('EventSlimSchema', () => {
  it('parses the slim list fixtures', () => {
    expect(() => EventSlimSchema.array().parse(mockEventSlimList)).not.toThrow()
  })

  it('coerces ISO date strings from the wire into Date objects', () => {
    const parsed = EventSlimSchema.parse({
      ...mockEventSlim,
      nextDate: '2026-07-04T09:30:00Z',
      firstDate: '2026-01-10T09:30:00Z',
    })

    expect(parsed.nextDate).toBeInstanceOf(Date)
    expect(parsed.firstDate.toISOString()).toBe('2026-01-10T09:30:00.000Z')
  })

  it('rejects an unknown recurrence type', () => {
    expect(() =>
      EventSlimSchema.parse({ ...mockEventSlim, recurrenceType: 'fortnightly' }),
    ).toThrow()
  })

  it('rejects a missing required field', () => {
    expect(() => EventSlimSchema.parse({ ...mockEventSlim, latitude: undefined })).toThrow()
  })
})

describe('EventSchema', () => {
  it('parses the full event fixture (nested timing / location / images)', () => {
    const parsed = EventSchema.parse(mockEvent)

    expect(parsed.id).toBe(mockEvent.id)
    expect(parsed.location.countryCode).toBe('GB')
  })

  it('rejects a two-letter country code that is the wrong length', () => {
    const bad = { ...mockEvent, location: { ...mockEvent.location, countryCode: 'GBR' } }

    expect(() => EventSchema.parse(bad)).toThrow()
  })

  it('rejects an image url that is not a valid URL', () => {
    const bad = { ...mockEvent, images: [{ url: 'not-a-url', thumbnailUrl: 'also-bad' }] }

    expect(() => EventSchema.parse(bad)).toThrow()
  })
})
