import type { StoryDefault } from '@ladle/react'

import { LightboxImage } from '@/components/atoms'

export default { title: 'Atoms / Lightbox Image' } satisfies StoryDefault

export const Default = () => (
  <LightboxImage
    alt="Atlas placeholder"
    imageUrl="https://picsum.photos/seed/atlas/1200/800"
    thumbnailUrl="https://picsum.photos/seed/atlas/400/300"
    width={300}
  />
)
