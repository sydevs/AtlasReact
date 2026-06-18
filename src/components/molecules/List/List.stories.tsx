import type { Story, StoryDefault } from '@ladle/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { List } from './List'

import { ListItem } from '@/components/molecules/ListItem'

export default { title: 'Molecules / Display' } satisfies StoryDefault

/**
 * List — a scroll-shadowed `<ul>` container for ListItem rows. It only provides
 * the scroll affordance and overflow; the rows carry their own styling.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection title="Basic">
      <div className="max-w-md">
        <List>
          <ListItem count={12} label="Cambridge" link="#area" />
          <ListItem count={7} label="Oxford" link="#area" />
          <ListItem count={3} label="London" link="#area" />
        </List>
      </div>
    </StorySection>

    <StorySection title="With Subtitles">
      <div className="max-w-md">
        <List>
          <ListItem count={12} label="Cambridge" link="#area" subtitle="Cambridgeshire" />
          <ListItem count={7} label="Oxford" link="#area" subtitle="Oxfordshire" />
        </List>
      </div>
    </StorySection>

    <StorySection background="neutral" theme="dark" title="Dark Surface">
      <div className="max-w-md">
        <List>
          <ListItem count={12} label="Cambridge" link="#area" />
          <ListItem count={7} label="Oxford" link="#area" />
        </List>
      </div>
    </StorySection>

    <StorySection inContext={true} title="Examples">
      <div className="max-w-md rounded-lg border border-divider overflow-hidden">
        <List>
          <ListItem count={12} label="Cambridge" link="#area" subtitle="Cambridgeshire" />
          <ListItem count={7} label="Oxford" link="#area" subtitle="Oxfordshire" />
          <ListItem count={3} label="London" link="#area" subtitle="Greater London" />
        </List>
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'List'
