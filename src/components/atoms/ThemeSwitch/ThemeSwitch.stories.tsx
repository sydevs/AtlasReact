import type { Story, StoryDefault } from '@ladle/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { ThemeSwitch } from './ThemeSwitch'

export default {
  title: 'Molecules',
} satisfies StoryDefault

/**
 * ThemeSwitch — toggles light/dark mode via useTheme, rendering a sun or moon
 * icon for the active theme. Takes no props.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection
      description="Click to toggle the app theme; the glyph reflects the current mode."
      title="Variants"
    >
      <ThemeSwitch />
    </StorySection>

    <StorySection inContext={true} title="Examples">
      <div className="flex items-center gap-3 text-gray-12">
        <span className="text-sm">Appearance</span>
        <ThemeSwitch />
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Theme Switch'
