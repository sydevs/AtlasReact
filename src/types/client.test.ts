import { describe, it, expect } from 'vitest'

import { ClientSchema } from './client'

describe('ClientSchema', () => {
  it('parses a client with a locale and initial path', () => {
    const parsed = ClientSchema.parse({
      name: 'Host Site',
      domain: 'host.example',
      locale: 'en',
      initialPath: '/search',
    })

    expect(parsed).toMatchObject({ locale: 'en', initialPath: '/search' })
  })

  it('allows null locale and initialPath', () => {
    const parsed = ClientSchema.parse({
      name: 'Host Site',
      domain: 'host.example',
      locale: null,
      initialPath: null,
    })

    expect(parsed.locale).toBeNull()
  })

  it('rejects a missing domain', () => {
    expect(() =>
      ClientSchema.parse({ name: 'Host Site', locale: null, initialPath: null }),
    ).toThrow()
  })
})
