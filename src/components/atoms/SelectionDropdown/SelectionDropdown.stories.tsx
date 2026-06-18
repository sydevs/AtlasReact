import type { Story, StoryDefault } from '@ladle/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { SelectionDropdown } from './SelectionDropdown'

import { LocationIcon } from '@/components/atoms/Icons'

export default {
  title: 'Atoms / Form',
} satisfies StoryDefault

const options = [
  { value: 'all', label: 'All countries' },
  { value: 'india', label: 'India' },
  { value: 'france', label: 'France' },
  { value: 'australia', label: 'Australia' },
]

/**
 * SelectionDropdown — a NextUI single-select dropdown with a bordered trigger.
 * Optionally takes a startContent icon; the trigger reflects the chosen value.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection description="A bordered trigger over a single-selection menu." title="Variants">
      <div className="w-64">
        <SelectionDropdown options={options} />
      </div>
    </StorySection>

    <StorySection description="An icon rendered in the trigger's start slot." title="With Icon">
      <div className="w-64">
        <SelectionDropdown options={options} startContent={<LocationIcon size={18} />} />
      </div>
    </StorySection>

    <StorySection background="neutral" theme="dark" title="Dark Surface">
      <div className="w-64">
        <SelectionDropdown options={options} startContent={<LocationIcon size={18} />} />
      </div>
    </StorySection>

    <StorySection inContext={true} title="Examples">
      <div className="flex flex-wrap gap-3">
        <div className="w-56">
          <SelectionDropdown options={options} startContent={<LocationIcon size={18} />} />
        </div>
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Selection Dropdown'
