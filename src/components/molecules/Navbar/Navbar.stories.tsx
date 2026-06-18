import type { Story, StoryDefault } from '@ladle/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { Navbar } from './Navbar'

export default { title: 'Molecules / Sections' } satisfies StoryDefault

/**
 * Navbar — the app's top bar: ATLAS brand, nav links, theme switch, and language
 * selector, built on NextUI's Navbar. Shows the default and bordered surfaces.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection title="Default">
      <Navbar />
    </StorySection>

    <StorySection title="Bordered">
      <div className="border border-divider rounded-lg overflow-hidden">
        <Navbar isBordered />
      </div>
    </StorySection>

    <StorySection background="neutral" theme="dark" title="Dark Surface">
      <div className="border border-divider rounded-lg overflow-hidden">
        <Navbar isBordered />
      </div>
    </StorySection>

    <StorySection inContext={true} title="Examples">
      <div className="border border-divider rounded-lg overflow-hidden">
        <Navbar isBordered />
        <div className="p-6 text-sm text-default-600">Page content sits below the navbar.</div>
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Navbar'
