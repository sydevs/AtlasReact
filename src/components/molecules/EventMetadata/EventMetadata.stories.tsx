import type { Story, StoryDefault } from '@ladle/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { EventMetadata } from './EventMetadata'

import { mockEvent } from '@/mocks/events'

export default { title: 'Molecules / Display' } satisfies StoryDefault

/**
 * EventMetadata — injects SEO / OpenGraph / Schema.org JSON-LD tags into the
 * document head via react-helmet-async. It renders no visible UI; inspect
 * `<head>` in devtools to see the emitted tags.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection title="Head Tags">
      <EventMetadata event={mockEvent} />
      <div className="max-w-md rounded border border-default-200 p-4 text-sm text-default-600">
        <p className="font-semibold text-foreground">EventMetadata renders nothing visible.</p>
        <p className="mt-1">
          It injects canonical, OpenGraph, and Schema.org JSON-LD tags into the document head for{' '}
          <span className="font-medium">{mockEvent.title}</span>. Open <code>&lt;head&gt;</code> in
          devtools to see them.
        </p>
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Event Metadata'
