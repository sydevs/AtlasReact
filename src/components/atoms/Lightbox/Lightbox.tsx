import YARLightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

/**
 * A single lightbox slide.
 *
 * Structurally a subset of the library's `SlideImage` (plus the Captions
 * plugin's `description`), but defined here so callers can build slides without
 * importing the browser-only lightbox package — only the lazy impl below does.
 */
export interface LightboxSlide {
  /** Full-resolution image URL. */
  src: string
  /** Accessible alt text. */
  alt?: string
  /** Caption text shown by the Captions plugin. */
  description?: string
}

export interface LightboxProps {
  /** Slides to display, in navigation order. */
  slides: LightboxSlide[]
  /** Whether the overlay is open. */
  open: boolean
  /** Index of the initially-shown slide. */
  index: number
  /** Called when the user dismisses the lightbox (Esc, backdrop, close button). */
  close: () => void
}

/**
 * Full-screen image lightbox wrapping `yet-another-react-lightbox`.
 *
 * It imports the library and its CSS, so it is loaded lazily through the
 * directory barrel (`React.lazy`) — never statically — keeping YARL and its
 * styles out of the initial bundle until a photo is opened. The widget's
 * JS-injected CSS picks up the lazily-loaded stylesheet, so it works embedded.
 *
 * Captions render each slide's `description`; Zoom handles scroll, double-click/
 * tap and pinch. Thumbnails and the prev/next carousel only matter for
 * multi-slide groups, so they are dropped for a single slide.
 */
export function Lightbox({ slides, open, index, close }: LightboxProps) {
  const single = slides.length <= 1
  const plugins = single ? [Captions, Zoom] : [Captions, Thumbnails, Zoom]

  return (
    <YARLightbox
      close={close}
      index={index}
      open={open}
      plugins={plugins}
      // A single slide has nowhere to navigate, so drop the prev/next arrows
      // (YARL would otherwise show them and wrap back to the same image).
      render={single ? { buttonPrev: () => null, buttonNext: () => null } : undefined}
      slides={slides}
      zoom={{ scrollToZoom: true }}
    />
  )
}
