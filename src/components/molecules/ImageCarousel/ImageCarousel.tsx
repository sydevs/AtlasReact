import { Suspense, lazy, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Autoplay, Pagination, A11y, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

/** One carousel slide; also shown full-screen in the lightbox. */
export type Slide = {
  /** Full-resolution image URL. */
  src: string
  /** Accessible alt text. */
  alt?: string
  /** Caption shown under the image in the lightbox. */
  caption?: string
}

// The lightbox wraps yet-another-react-lightbox and its CSS, so it is imported
// lazily (its own chunk) — never statically — keeping YARL out of the initial
// bundle until a photo is opened. Render it inside a <Suspense> boundary.
const Lightbox = lazy(() => import('./lightbox').then((m) => ({ default: m.Lightbox })))

export function ImageCarousel({ slides }: { slides: Slide[] }) {
  const { t } = useTranslation('events')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  if (slides.length === 0) return null

  const openAt = (index: number) => {
    setActiveIndex(index)
    setOpen(true)
  }

  return (
    <>
      <Swiper
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        enabled={slides.length > 1}
        grabCursor={true}
        loop={true}
        modules={[Autoplay, Pagination, A11y, EffectFade]}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 5,
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.src} className="p-6 pb-10">
            <button
              aria-label={slide.alt ?? t('details.view_photo')}
              className="block w-full cursor-zoom-in"
              type="button"
              onClick={() => openAt(index)}
            >
              <img
                alt={slide.alt ?? undefined}
                className="w-full rounded-lg aspect-[4/3] object-cover"
                src={slide.src}
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Mounted only once a photo is tapped, so the lazy YARL chunk (library +
          CSS) is fetched on first open rather than with the carousel. */}
      {open && (
        <Suspense fallback={null}>
          <Lightbox isOpen index={activeIndex} slides={slides} onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </>
  )
}
