import { Image } from '@nextui-org/react'
import { Autoplay, Pagination, A11y, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { EventImage } from '@/types'

export function EventImages({ images }: { images: EventImage[] }) {
  if (images.length === 0) return null

  return (
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
      {images.map((image) => (
        <SwiperSlide key={image.url} className="p-6 pb-10">
          <Image
            isBlurred
            alt={image.altText}
            className="rounded-lg aspect-[4/3] object-cover"
            height="100%"
            src={image.url}
            width="100%"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
