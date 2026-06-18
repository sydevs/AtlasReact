import type { Story, StoryDefault } from '@ladle/react'

import { ListHeader } from '@/components/molecules'

export default { title: 'Molecules / List Header' } satisfies StoryDefault

export const Default = () => (
  <div className="max-w-md">
    <ListHeader returnLink="/" title="Cambridge" />
  </div>
)

export const Playground: Story<{ title: string }> = ({ title }) => (
  <div className="max-w-md">
    <ListHeader returnLink="/" title={title} />
  </div>
)
Playground.args = { title: 'Cambridge' }
Playground.argTypes = {
  title: { control: { type: 'text' } },
}
