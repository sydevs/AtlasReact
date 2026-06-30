import type { Story, StoryDefault } from '@ladle/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { ListHeader } from './ListHeader'

import { List } from '@/components/molecules/List'
import { ListItem } from '@/components/molecules/ListItem'

export default { title: 'Molecules' } satisfies StoryDefault

/**
 * ListHeader — a centered title with an up-arrow return link, used atop a drilled
 * list view (e.g. a region's areas) to navigate back up the hierarchy.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection title="Default">
      <div className="max-w-md">
        <ListHeader backHref="#region" title="Cambridge" />
      </div>
    </StorySection>

    <StorySection title="Long Title">
      <div className="max-w-md">
        <ListHeader backHref="#region" title="Greater London and the South East" />
      </div>
    </StorySection>

    <StorySection background="neutral" theme="dark" title="Dark Surface">
      <div className="max-w-md">
        <ListHeader backHref="#region" title="Cambridge" />
      </div>
    </StorySection>

    <StorySection inContext={true} title="Examples">
      <div className="max-w-md rounded-lg border border-divider overflow-hidden">
        <ListHeader backHref="#region" title="Cambridgeshire" />
        <List>
          <ListItem count={12} href="#area" label="Cambridge" />
          <ListItem count={4} href="#area" label="Ely" />
        </List>
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'List Header'
