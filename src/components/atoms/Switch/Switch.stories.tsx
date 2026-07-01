import type { Story, StoryDefault } from '@ladle/react'

import { useState } from 'react'

import { StoryWrapper, StorySection } from '../../ladle'

import { Switch } from './Switch'

export default {
  title: 'Atoms',
} satisfies StoryDefault

/** Switch — a Radix toggle on the brand tokens. */
export const Default: Story = () => {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)

  return (
    <StoryWrapper>
      <StorySection description="Colour × on/off." title="Variants">
        <div className="flex flex-wrap items-center gap-6">
          <Switch checked color="primary" />
          <Switch checked color="secondary" />
          <Switch checked color="default" />
          <Switch checked={false} color="primary" />
        </div>
      </StorySection>

      <StorySection title="With label (controlled)">
        <div className="flex flex-col gap-3">
          <Switch checked={a} color="primary" onCheckedChange={setA}>
            Show online classes
          </Switch>
          <Switch checked={b} color="secondary" size="sm" onCheckedChange={setB}>
            Compact, secondary
          </Switch>
        </div>
      </StorySection>

      <div />
    </StoryWrapper>
  )
}

Default.storyName = 'Switch'
