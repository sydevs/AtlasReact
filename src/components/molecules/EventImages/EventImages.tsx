import { Suspense, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Autoplay, Pagination, A11y, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { imagesToSlides } from './slides'

import { Lightbox } from '@/components/atoms/Lightbox'
import { EventImage } from '@/types'

export function EventImages({ images }: { images: EventImage[] }) {
  const { t } = useTranslation('events')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  if (images.length === 0) return null

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
        enabled={images.length > 1}
        grabCursor={true}
        loop={true}
        modules={[Autoplay, Pagination, A11y, EffectFade]}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 5,
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.url} className="p-6 pb-10">
            <button
              aria-label={image.alt ?? t('details.view_photo')}
              className="block w-full cursor-zoom-in"
              type="button"
              onClick={() => openAt(index)}
            >
              <img
                alt={image.alt ?? undefined}
                className="h-full w-full rounded-lg aspect-[4/3] object-cover"
                src={image.url}
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Mounted only once a photo is tapped, so the lazy YARL chunk (library +
          CSS) is fetched on first open rather than with the carousel. */}
      {open && (
        <Suspense fallback={null}>
          <Lightbox
            isOpen
            index={activeIndex}
            slides={imagesToSlides(images)}
            onClose={() => setOpen(false)}
          />
        </Suspense>
      )}
    </>
  )
}
