import type { StoryDefault } from '@ladle/react'

import { EventMetadata } from '@/components/molecules'
import { mockEvent } from '@/mocks/events'

export default { title: 'Molecules / Event Metadata' } satisfies StoryDefault

// EventMetadata renders no visible UI — it injects SEO / OpenGraph / Schema.org
// JSON-LD tags into <head> via react-helmet-async. Inspect <head> in devtools.
export const Default = () => (
  <>
    <EventMetadata event={mockEvent} />
    <div className="max-w-md rounded border border-default-200 p-4 text-sm text-default-600">
      <p className="font-semibold text-foreground">EventMetadata renders nothing visible.</p>
      <p className="mt-1">
        It injects canonical, OpenGraph, and Schema.org JSON-LD tags into the document head for{' '}
        <span className="font-medium">{mockEvent.label}</span>. Open <code>&lt;head&gt;</code> in
        devtools to see them.
      </p>
    </div>
  </>
)
