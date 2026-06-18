import type { Story, StoryDefault } from '@ladle/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { LightboxImage } from './LightboxImage'

export default {
  title: 'Atoms / Media',
} satisfies StoryDefault

/**
 * LightboxImage — a clickable thumbnail that opens the full-resolution image in
 * a blurred-backdrop modal. Pass a thumbnailUrl + imageUrl plus any NextUI
 * Image props.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection
      description="Click the thumbnail to open the full image in a lightbox modal."
      title="Variants"
    >
      <LightboxImage
        alt="Atlas placeholder"
        imageUrl="https://picsum.photos/seed/atlas/1200/800"
        thumbnailUrl="https://picsum.photos/seed/atlas/400/300"
        width={300}
      />
    </StorySection>

    <StorySection
      description="Image props such as radius pass through to the thumbnail."
      title="Sizes"
    >
      <div className="flex flex-wrap items-end gap-4">
        <LightboxImage
          alt="Small placeholder"
          imageUrl="https://picsum.photos/seed/venue/1200/800"
          radius="lg"
          thumbnailUrl="https://picsum.photos/seed/venue/200/150"
          width={160}
        />
        <LightboxImage
          alt="Large placeholder"
          imageUrl="https://picsum.photos/seed/region/1200/800"
          radius="lg"
          thumbnailUrl="https://picsum.photos/seed/region/400/300"
          width={280}
        />
      </div>
    </StorySection>

    <StorySection inContext={true} title="Examples">
      <div className="flex flex-wrap gap-2">
        {['one', 'two', 'three'].map((seed) => (
          <LightboxImage
            key={seed}
            alt={`Gallery ${seed}`}
            imageUrl={`https://picsum.photos/seed/${seed}/1200/800`}
            radius="md"
            thumbnailUrl={`https://picsum.photos/seed/${seed}/160/120`}
            width={120}
          />
        ))}
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Lightbox Image'
