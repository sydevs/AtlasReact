import type { Story, StoryDefault } from '@ladle/react'
import type { ComponentType } from 'react'

import { lazy } from 'react'

import { StoryWrapper, StorySection } from '../../ladle'

import { Panel } from './Panel'

export default {
  title: 'Molecules',
} satisfies StoryDefault

const Placeholder = ({ label }: { label: string }) => (
  <div className="p-4">
    <p className="font-semibold text-gray-12">{label}</p>
    <p className="mt-2 text-sm text-gray-11">
      The panel wraps its children in a Suspense boundary (LoadingFallback) and an ErrorBoundary
      (ErrorFallback).
    </p>
  </div>
)

// A child whose lazy import never resolves, so the Panel's Suspense fallback
// (LoadingFallback) stays on screen for the story.
const NeverResolves = lazy(() => new Promise<{ default: ComponentType }>(() => {}))

// A child that throws during render, so the Panel's ErrorBoundary renders
// ErrorFallback with the thrown message.
const AlwaysThrows = () => {
  throw new Error('Could not load this view.')
}

/**
 * Panel — the side container that holds list/detail views beside the map. It
 * provides the scrollable surface plus a Suspense boundary (LoadingFallback) and
 * an ErrorBoundary (ErrorFallback), and its desktop width is configurable.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection
      description="The default panel surface with placeholder content."
      title="Variants"
    >
      <Panel>
        <Placeholder label="Default panel" />
      </Panel>
    </StorySection>

    <StorySection
      description="The panel's own fallbacks, shown by a child that suspends or throws."
      title="States"
    >
      <StorySection title="Loading — Suspense → LoadingFallback" variant="subsection">
        <Panel width={320}>
          <NeverResolves />
        </Panel>
      </StorySection>

      <StorySection title="Error — ErrorBoundary → ErrorFallback" variant="subsection">
        <Panel width={320}>
          <AlwaysThrows />
        </Panel>
      </StorySection>
    </StorySection>

    <StorySection description="Desktop width is set via the width prop." title="Widths">
      <div className="flex flex-wrap gap-4">
        <Panel width={320}>
          <Placeholder label="width = 320" />
        </Panel>
        <Panel width={400}>
          <Placeholder label="width = 400 (default)" />
        </Panel>
        <Panel width={520}>
          <Placeholder label="width = 520" />
        </Panel>
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Panel'
