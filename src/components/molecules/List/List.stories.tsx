import type { Story, StoryDefault } from '@ladle/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { List } from './List'

import { ListItem } from '@/components/molecules/ListItem'

export default { title: 'Molecules' } satisfies StoryDefault

/**
 * List — a scroll-shadowed `<ul>` container for ListItem rows. It only provides
 * the scroll affordance and overflow; the rows carry their own styling.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection title="Basic">
      <div className="max-w-md">
        <List>
          <ListItem count={12} href="#area" label="Cambridge" />
          <ListItem count={7} href="#area" label="Oxford" />
          <ListItem count={3} href="#area" label="London" />
        </List>
      </div>
    </StorySection>

    <StorySection title="With Subtitles">
      <div className="max-w-md">
        <List>
          <ListItem count={12} href="#area" label="Cambridge" subtitle="Cambridgeshire" />
          <ListItem count={7} href="#area" label="Oxford" subtitle="Oxfordshire" />
        </List>
      </div>
    </StorySection>

    <StorySection background="neutral" theme="dark" title="Dark Surface">
      <div className="max-w-md">
        <List>
          <ListItem count={12} href="#area" label="Cambridge" />
          <ListItem count={7} href="#area" label="Oxford" />
        </List>
      </div>
    </StorySection>

    <StorySection inContext={true} title="Examples">
      <div className="max-w-md rounded-lg border border-divider overflow-hidden">
        <List>
          <ListItem count={12} href="#area" label="Cambridge" subtitle="Cambridgeshire" />
          <ListItem count={7} href="#area" label="Oxford" subtitle="Oxfordshire" />
          <ListItem count={3} href="#area" label="London" subtitle="Greater London" />
        </List>
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'List'
