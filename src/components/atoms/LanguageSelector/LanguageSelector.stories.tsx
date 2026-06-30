import type { Story, StoryDefault } from '@ladle/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { LanguageSelector } from './LanguageSelector'

export default {
  title: 'Atoms',
} satisfies StoryDefault

/**
 * LanguageSelector — a dropdown listing the app's supported locales, showing the
 * active locale code beside a language icon. Reads/writes locale via useLocale.
 * Takes no props.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection
      description="The active locale code with a dropdown of supported languages."
      title="Variants"
    >
      <LanguageSelector />
    </StorySection>

    <StorySection inContext={true} title="Examples">
      <div className="flex items-center gap-4 text-default-700">
        <span className="text-sm">Language</span>
        <LanguageSelector />
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Language Selector'
