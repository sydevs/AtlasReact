import type { Story, StoryDefault } from '@ladle/react'

import { ListItem } from '@/components/molecules'

export default { title: 'Molecules / List Item' } satisfies StoryDefault

export const Default = () => (
  <div className="max-w-md">
    <ListItem count={12} label="Cambridge" link="/areas/cambridge" />
  </div>
)

export const WithSubtitle = () => (
  <div className="max-w-md">
    <ListItem count={7} label="Oxford" link="/areas/oxford" subtitle="Oxfordshire" />
  </div>
)

export const Playground: Story<{
  label: string
  subtitle: string
  count: number
}> = ({ label, subtitle, count }) => (
  <div className="max-w-md">
    <ListItem count={count} label={label} link="/areas/example" subtitle={subtitle} />
  </div>
)
Playground.args = { label: 'Cambridge', subtitle: 'Cambridgeshire', count: 12 }
Playground.argTypes = {
  label: { control: { type: 'text' } },
  subtitle: { control: { type: 'text' } },
  count: { control: { type: 'number' } },
}
