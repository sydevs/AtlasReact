import type { Story, StoryDefault } from '@ladle/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { LoadingFallback, ErrorFallback } from './Fallbacks'

export default {
  title: 'Atoms',
} satisfies StoryDefault

/**
 * Fallbacks — the suspense and error-boundary placeholders used while panels
 * load or fail. LoadingFallback shows a spinner; ErrorFallback surfaces the
 * thrown error's message in a danger alert.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection description="Shown via Suspense while a panel's data loads." title="Loading">
      <div className="h-64 w-full">
        <LoadingFallback />
      </div>
    </StorySection>

    <StorySection
      description="Rendered by the error boundary when a fetch or render throws."
      title="Error"
    >
      <div className="h-64 w-full">
        <ErrorFallback error={new Error('Something went wrong fetching events.')} />
      </div>
    </StorySection>

    <StorySection background="neutral" theme="dark" title="Dark Surface">
      <div className="h-64 w-full">
        <LoadingFallback />
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Fallbacks'
