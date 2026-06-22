import type { Story, StoryDefault } from '@ladle/react'

import { Button } from '@nextui-org/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { Dropdown, DropdownItem } from './Dropdown'

import { LanguageIcon, LocationIcon, DownArrowIcon } from '@/components/atoms/Icons'

export default {
  title: 'Atoms / Form',
} satisfies StoryDefault

const sizes = ['sm', 'md', 'lg'] as const

/**
 * Dropdown — a portaled popover with viewport-aware placement (flip/shift) built
 * on Floating UI. `DropdownItem` renders an `<a>` for links (`href`) and a
 * `<button>` for actions (`onClick`). Panel chrome uses NextUI semantic tokens,
 * so it follows light/dark + the accent theme (see the dark surface below).
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection description="Panel min-width scales with the size prop." title="Sizes">
      <div className="flex flex-wrap gap-4">
        {sizes.map((size) => (
          <StorySection key={size} title={size} variant="subsection">
            <Dropdown
              size={size}
              trigger={
                <Button endContent={<DownArrowIcon size={16} />} variant="bordered">
                  {size}
                </Button>
              }
            >
              <DropdownItem href="#" size={size}>
                Menu item 1
              </DropdownItem>
              <DropdownItem href="#" size={size}>
                Menu item 2
              </DropdownItem>
              <DropdownItem href="#" size={size}>
                Menu item 3
              </DropdownItem>
            </Dropdown>
          </StorySection>
        ))}
      </div>
    </StorySection>

    <StorySection
      description="DropdownItem renders an <a> for href links and a <button> for onClick actions."
      title="Links vs. actions"
    >
      <Dropdown
        trigger={
          <Button startContent={<LocationIcon size={18} />} variant="bordered">
            Open menu
          </Button>
        }
      >
        <DropdownItem href="#">Link item (anchor)</DropdownItem>
        <DropdownItem onClick={() => {}}>Action item (button)</DropdownItem>
        <DropdownItem className="text-primary" onClick={() => {}}>
          Active action
        </DropdownItem>
      </Dropdown>
    </StorySection>

    <StorySection
      description="The panel opens on side and flips/shifts to stay on screen. Portaled, so it is never clipped by an overflow ancestor."
      title="Placement"
    >
      <div className="flex flex-wrap gap-6">
        {(['bottom', 'top', 'left', 'right'] as const).map((side) => (
          <StorySection key={side} title={`side="${side}"`} variant="subsection">
            <Dropdown
              align="center"
              side={side}
              trigger={<Button variant="flat">Open {side}</Button>}
            >
              <DropdownItem href="#">Menu item 1</DropdownItem>
              <DropdownItem href="#">Menu item 2</DropdownItem>
            </Dropdown>
          </StorySection>
        ))}
      </div>
    </StorySection>

    <StorySection background="neutral" theme="dark" title="Dark Surface">
      <Dropdown
        trigger={
          <Button startContent={<LanguageIcon size={18} />} variant="bordered">
            Language
          </Button>
        }
      >
        <DropdownItem className="text-primary" onClick={() => {}}>
          English
        </DropdownItem>
        <DropdownItem onClick={() => {}}>Français</DropdownItem>
      </Dropdown>
    </StorySection>

    <StorySection inContext={true} title="Examples">
      <div className="flex items-center gap-4 text-default-700">
        <span className="text-sm">Filter</span>
        <Dropdown
          align="end"
          trigger={
            <Button startContent={<LocationIcon size={18} />} variant="bordered">
              All countries
            </Button>
          }
        >
          <DropdownItem onClick={() => {}}>All countries</DropdownItem>
          <DropdownItem onClick={() => {}}>India</DropdownItem>
          <DropdownItem onClick={() => {}}>France</DropdownItem>
        </Dropdown>
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Dropdown'
