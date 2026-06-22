import { renderToStaticMarkup } from 'react-dom/server'
import { describe, it, expect } from 'vitest'

import { Dropdown, DropdownItem } from './Dropdown'

// Node-only SSR assertions (see `.claude/rules/tests.md`). The panel is closed on
// first render (and portaled + positioned by Floating UI on the client), so we
// assert the trigger contract and that the panel content is absent until opened.
// Interactive behaviour (open, placement, flip/shift, dismiss) lives in Ladle /
// the browser.

describe('Dropdown', () => {
  it('renders the trigger as a focusable button and keeps the panel closed', () => {
    const html = renderToStaticMarkup(
      <Dropdown trigger={<span>Open</span>}>
        <DropdownItem href="#">Panel content</DropdownItem>
      </Dropdown>,
    )

    expect(html).toContain('role="button"')
    expect(html).toContain('aria-haspopup="menu"')
    expect(html).toContain('aria-expanded="false"')
    expect(html).toContain('tabindex="0"')
    expect(html).toContain('Open')
    // Closed by default → the portaled panel (and its content) is not in the SSR output.
    expect(html).not.toContain('Panel content')
  })
})

describe('DropdownItem', () => {
  it('renders an <a> for links (href) and a <button> for actions', () => {
    const link = renderToStaticMarkup(<DropdownItem href="/events">Events</DropdownItem>)

    expect(link).toContain('<a')
    expect(link).toContain('href="/events"')

    const action = renderToStaticMarkup(<DropdownItem>Français</DropdownItem>)

    expect(action).toContain('<button')
    expect(action).toContain('type="button"')
  })
})
