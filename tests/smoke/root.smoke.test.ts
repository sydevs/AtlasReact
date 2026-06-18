import { describe, expect, test } from 'vitest'

import { fetchPreview, skipWithoutPreview } from './_helpers/preview'

// Smoke test: does the deployed Cloudflare Pages preview actually serve the app?
// This is the minimal "is the deploy alive" check — it fetches the root page and
// asserts the SPA shell is returned. It catches a broken build, a missing
// `_redirects` fallback, or a dead deploy. Deeper interaction coverage (clicking
// the map, entity routes, locales) is tracked for follow-up.

describe('root page', () => {
  test.skipIf(skipWithoutPreview)('serves the SPA shell at /', async () => {
    const res = await fetchPreview('/')

    expect(res.status).toBe(200)

    const html = await res.text()

    // The standalone build mounts into <div id="syatlas"> (see index.html).
    expect(html).toContain('id="syatlas"')
    expect(html).toMatch(/<title>[^<]*Sahaj Atlas/i)
  })
})
