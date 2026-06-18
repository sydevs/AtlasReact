import type { Story, StoryDefault } from '@ladle/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { ListItem } from './ListItem'

import { List } from '@/components/molecules/List'

export default { title: 'Molecules / Display' } satisfies StoryDefault

/**
 * ListItem — a single navigable row (label, optional subtitle, count, trailing
 * arrow) used to drill through the country → region → area hierarchy.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection title="Variants">
      <div className="flex max-w-md flex-col gap-6">
        <StorySection title="Minimal" variant="subsection">
          <ListItem count={12} label="Cambridge" link="#area" />
        </StorySection>

        <StorySection title="Maximal" variant="subsection">
          <ListItem count={7} label="Oxford" link="#area" subtitle="Oxfordshire" />
        </StorySection>
      </div>
    </StorySection>

    <StorySection background="neutral" theme="dark" title="Dark Surface">
      <div className="max-w-md">
        <ListItem count={3} label="London" link="#area" subtitle="Greater London" />
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

Default.storyName = 'List Item'
