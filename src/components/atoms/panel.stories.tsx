import type { Story, StoryDefault } from '@ladle/react'

import { Panel } from '@/components/atoms'

export default { title: 'Atoms / Panel' } satisfies StoryDefault

export const Default = () => (
  <Panel>
    <div className="p-4">Panel content</div>
  </Panel>
)

export const Playground: Story<{ width: number }> = ({ width }) => (
  <Panel width={width}>
    <div className="p-4">Panel content</div>
  </Panel>
)
Playground.args = { width: 400 }
Playground.argTypes = { width: { control: { type: 'number' } } }
