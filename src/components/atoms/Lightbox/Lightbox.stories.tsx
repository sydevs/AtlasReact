import type { Story, StoryDefault } from '@ladle/react'

import { useState } from 'react'
import { Button } from '@nextui-org/react'

import { StoryWrapper, StorySection } from '../../ladle'

import { Lightbox, type LightboxSlide } from './Lightbox'

export default {
  title: 'Atoms / Media',
} satisfies StoryDefault

const single: LightboxSlide[] = [
  {
    src: 'https://picsum.photos/seed/atlas-hall/1600/1000',
    alt: 'Meditation hall',
    description: 'Meditation hall',
  },
]

const gallery: LightboxSlide[] = [
  {
    src: 'https://picsum.photos/seed/atlas-hall/1600/1000',
    alt: 'Meditation hall',
    description: 'A sunlit meditation hall',
  },
  {
    src: 'https://picsum.photos/seed/atlas-group/1200/1600',
    alt: 'Group session',
    description: 'A group meditating together',
  },
  {
    src: 'https://picsum.photos/seed/atlas-garden/1600/1066',
    alt: 'Garden venue',
    description: 'An outdoor garden venue',
  },
]

/** Opens a lightbox from a button so its overlay, keyboard nav and zoom can be exercised. */
function LightboxDemo({ slides, label }: { slides: LightboxSlide[]; label: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button color="primary" onPress={() => setOpen(true)}>
        {label}
      </Button>
      <Lightbox close={() => setOpen(false)} index={0} open={open} slides={slides} />
    </>
  )
}

/**
 * Lightbox overlay showing a single image (zoom + caption only) and a
 * multi-image gallery (prev/next, ←/→ keys, a thumbnail strip, per-slide
 * captions, and scroll/double-click/pinch zoom). Click a button to open; Esc,
 * the backdrop or the close button dismisses it.
 */
export const Default: Story = () => (
  <StoryWrapper>
    <StorySection
      description="One slide: zoom and caption only — the thumbnail strip and prev/next arrows collapse."
      title="Single Image"
    >
      <LightboxDemo label="Open single image" slides={single} />
    </StorySection>

    <StorySection
      description="Several slides: prev/next arrows, ←/→ keys, a thumbnail strip and per-slide captions."
      title="Multi-Image Gallery"
    >
      <LightboxDemo label="Open gallery" slides={gallery} />
    </StorySection>

    <StorySection inContext={true} title="Examples">
      <div className="flex flex-col gap-3">
        <p className="text-sm text-default-600">
          In the app the event photo carousel opens this lightbox on the tapped image; here a button
          stands in for that trigger.
        </p>
        <LightboxDemo label="Open captioned gallery" slides={gallery} />
      </div>
    </StorySection>

    <div />
  </StoryWrapper>
)

Default.storyName = 'Lightbox'
