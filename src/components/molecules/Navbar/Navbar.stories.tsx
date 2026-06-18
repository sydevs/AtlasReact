import type { StoryDefault } from '@ladle/react'

import { Navbar } from '@/components/molecules'

export default { title: 'Molecules / Navbar' } satisfies StoryDefault

export const Default = () => <Navbar />

export const Bordered = () => (
  <div className="border border-divider rounded-lg overflow-hidden">
    <Navbar isBordered />
  </div>
)
