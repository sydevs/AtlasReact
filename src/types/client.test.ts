import { describe, it, expect } from 'vitest'

import { ClientSchema } from './client'

describe('ClientSchema', () => {
  it('parses a client with a locale and initial path', () => {
    expect(() =>
      ClientSchema.parse({
        name: 'Host Site',
        domain: 'host.example',
        locale: 'en',
        initialPath: '/search',
      }),
    ).not.toThrow()
  })

  it('allows null locale and initialPath', () => {
    expect(() =>
      ClientSchema.parse({
        name: 'Host Site',
        domain: 'host.example',
        locale: null,
        initialPath: null,
      }),
    ).not.toThrow()
  })

  it('rejects a missing domain', () => {
    expect(() =>
      ClientSchema.parse({ name: 'Host Site', locale: null, initialPath: null }),
    ).toThrow()
  })
})
