import type { EventImage } from '@/types'

import { describe, it, expect } from 'vitest'

import { imagesToSlides } from './slides'

// Pure logic spec for the images → lightbox-slides mapping. Node-only, no heavy
// UI imports (the helper's imports are type-only), so it stays in the fast lane.

describe('imagesToSlides', () => {
  it('maps url to src and alt to both alt and description', () => {
    const images: EventImage[] = [
      { url: 'https://img/1.jpg', thumbnailURL: 'https://img/1-thumb.jpg', alt: 'Hall' },
    ]

    expect(imagesToSlides(images)).toEqual([
      { src: 'https://img/1.jpg', alt: 'Hall', description: 'Hall' },
    ])
  })

  it('preserves order and leaves alt/description undefined when alt is missing', () => {
    const images: EventImage[] = [
      { url: 'https://img/a.jpg', thumbnailURL: 'https://img/a-t.jpg', alt: 'A' },
      { url: 'https://img/b.jpg', thumbnailURL: 'https://img/b-t.jpg' },
    ]

    const slides = imagesToSlides(images)

    expect(slides.map((s) => s.src)).toEqual(['https://img/a.jpg', 'https://img/b.jpg'])
    expect(slides[1].alt).toBeUndefined()
    expect(slides[1].description).toBeUndefined()
  })

  it('returns an empty array for no images', () => {
    expect(imagesToSlides([])).toEqual([])
  })
})
