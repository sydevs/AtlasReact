import type { Story, StoryDefault } from '@ladle/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { Navbar } from './Navbar'

export default { title: 'Molecules' } satisfies StoryDefault

/**
 * Navbar — the app's top bar: ATLAS brand, nav links, theme switch, and language
 * selector, built from primitives. Shows the default and bordered surfaces.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection title="Default">
      <Navbar />
    </StorySection>

    <StorySection title="Bordered">
      <div className="border border-divider rounded-lg overflow-hidden">
        <Navbar className="border-b border-divider" />
      </div>
    </StorySection>

    <StorySection inContext={true} title="Examples">
      <div className="border border-divider rounded-lg overflow-hidden">
        <Navbar className="border-b border-divider" />
        <div className="p-6 text-sm text-gray-11">Page content sits below the navbar.</div>
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Navbar'
