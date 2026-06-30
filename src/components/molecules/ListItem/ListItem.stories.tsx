import type { Story, StoryDefault } from '@ladle/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { ListItem } from './ListItem'

import { List } from '@/components/molecules/List'

export default { title: 'Molecules' } satisfies StoryDefault

/**
 * ListItem — a single navigable row (label, optional subtitle, count, trailing
 * arrow) used to drill through the country → region → area hierarchy.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection title="Variants">
      <div className="flex max-w-md flex-col gap-6">
        <StorySection title="Minimal" variant="subsection">
          <ListItem count={12} href="#area" label="Cambridge" />
        </StorySection>

        <StorySection title="Maximal" variant="subsection">
          <ListItem count={7} href="#area" label="Oxford" subtitle="Oxfordshire" />
        </StorySection>
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

Default.storyName = 'List Item'
