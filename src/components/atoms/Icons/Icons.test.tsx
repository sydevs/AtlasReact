import { renderToStaticMarkup } from 'react-dom/server'
import { describe, it, expect } from 'vitest'

import { CloseIcon } from '.'

// Node-only component test (mirrors WeMeditateWeb): no jsdom / Testing Library.
// Presentational components are asserted via their SSR markup with
// renderToStaticMarkup — this file is the template for component coverage in
// this repo (see `.claude/rules/tests.md`). Hover/portal/interaction behaviour
// belongs in Ladle and the browser, not here.

describe('icon components', () => {
  it('renders an accessible, presentational svg with a path', () => {
    const html = renderToStaticMarkup(<CloseIcon />)

    expect(html).toContain('<svg')
    expect(html).toContain('role="presentation"')
    expect(html).toContain('aria-hidden="true"')
    expect(html).toContain('<path')
  })

  it('forwards the size prop to the rendered svg', () => {
    const html = renderToStaticMarkup(<CloseIcon size={48} />)

    expect(html).toContain('width="48"')
    expect(html).toContain('height="48"')
  })
})
