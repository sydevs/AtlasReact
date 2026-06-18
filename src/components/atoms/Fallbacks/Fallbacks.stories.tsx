import type { StoryDefault } from '@ladle/react'

import { LoadingFallback, ErrorFallback } from '@/components/atoms'

export default { title: 'Atoms / Fallbacks' } satisfies StoryDefault

export const Loading = () => (
  <div className="h-64 w-full">
    <LoadingFallback />
  </div>
)

export const Errored = () => (
  <div className="h-64 w-full">
    <ErrorFallback error={new Error('Something went wrong fetching events.')} />
  </div>
)
Errored.storyName = 'Error'
