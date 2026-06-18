import type { StoryDefault } from '@ladle/react'

import { List, ListItem } from '@/components/molecules'

export default { title: 'Molecules / List' } satisfies StoryDefault

export const Default = () => (
  <div className="max-w-md">
    <List>
      <ListItem count={12} label="Cambridge" link="/areas/cambridge" />
      <ListItem count={7} label="Oxford" link="/areas/oxford" />
      <ListItem count={3} label="London" link="/areas/london" />
    </List>
  </div>
)

export const WithSubtitles = () => (
  <div className="max-w-md">
    <List>
      <ListItem count={12} label="Cambridge" link="/areas/cambridge" subtitle="Cambridgeshire" />
      <ListItem count={7} label="Oxford" link="/areas/oxford" subtitle="Oxfordshire" />
    </List>
  </div>
)
