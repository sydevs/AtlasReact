import type { LightboxSlide } from '@/components/atoms/Lightbox'
import type { EventImage } from '@/types'

/**
 * Map an event's images to lightbox slides. The alt text doubles as the caption
 * (`description`) shown by YARL's Captions plugin. Pure and type-only in its
 * imports, so it's unit-testable without loading the lightbox library.
 */
export function imagesToSlides(images: EventImage[]): LightboxSlide[] {
  return images.map((image) => ({
    src: image.url,
    alt: image.altText,
    description: image.altText,
  }))
}
