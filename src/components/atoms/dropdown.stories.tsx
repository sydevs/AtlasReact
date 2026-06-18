import type { StoryDefault } from '@ladle/react'

import { SelectionDropdown, LocationIcon } from '@/components/atoms'

export default { title: 'Atoms / Selection Dropdown' } satisfies StoryDefault

const options = [
  { value: 'all', label: 'All countries' },
  { value: 'india', label: 'India' },
  { value: 'france', label: 'France' },
  { value: 'australia', label: 'Australia' },
]

export const Default = () => (
  <div className="w-64">
    <SelectionDropdown options={options} />
  </div>
)

export const WithStartContent = () => (
  <div className="w-64">
    <SelectionDropdown options={options} startContent={<LocationIcon size={18} />} />
  </div>
)
