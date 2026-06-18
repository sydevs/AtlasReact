import type { Story, StoryDefault } from '@ladle/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { Panel } from './Panel'

export default {
  title: 'Atoms / Layout',
} satisfies StoryDefault

const Placeholder = ({ label }: { label: string }) => (
  <div className="p-4">
    <p className="font-semibold text-default-700">{label}</p>
    <p className="mt-2 text-sm text-default-500">
      The panel wraps its children in a Suspense boundary (LoadingFallback) and an ErrorBoundary
      (ErrorFallback).
    </p>
  </div>
)

/**
 * Panel — the side container that holds list/detail views beside the map. It
 * provides the scrollable surface plus the Suspense + error boundary, and its
 * desktop width is configurable.
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

    <StorySection background="neutral" theme="dark" title="Dark Surface">
      <Panel>
        <Placeholder label="Panel on a dark surface" />
      </Panel>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Panel'
