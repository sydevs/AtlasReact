import { describe, it, expect } from 'vitest'

import { ClientSchema } from './client'

const client = {
  id: 7,
  name: 'Host Site',
  locale: 'en',
  color1: '#000000',
  allowedDomains: 'host.example\nwww.host.example',
  clientId: 'sahaj-atlas-client',
  region: { id: 28, slug: 'belgium', level: 'country', name: 'Belgium' },
  legacyConfig: { default_view: 'map' },
}

describe('ClientSchema', () => {
  it('parses a client with a resolved home region', () => {
    const parsed = ClientSchema.parse(client)

    expect(parsed.locale).toBe('en')
    expect(parsed.region).toMatchObject({ slug: 'belgium', level: 'country' })
  })

  it('allows a null locale and an unset region', () => {
    const parsed = ClientSchema.parse({ id: 7, name: 'Host Site', locale: null })

    expect(parsed.locale).toBeNull()
  })

  it('rejects a missing id', () => {
    expect(() => ClientSchema.parse({ name: 'Host Site', locale: 'en' })).toThrow()
  })
})
