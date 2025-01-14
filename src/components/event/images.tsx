import { Image } from "@nextui-org/react";
import { EventImage } from "@/types";
import { Autoplay, Pagination, A11y, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function EventImages({ images } : { images: EventImage[] }) {
  if (images.length === 0) return null;

  return (
    <Swiper
      enabled={images.length > 1}
      loop={true}
      grabCursor={true}
      modules={[Autoplay, Pagination, A11y, EffectFade]}
      pagination={{
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 5,
      }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
    >
      {images.map((image) => 
        <SwiperSlide key={image.url} className="p-6 pb-10">
          <Image
            src={image.url}
            alt={image.altText}
            width="100%"
            height="100%"
            className="rounded-lg aspect-[4/3] object-cover"
            isBlurred
          />
        </SwiperSlide>)}
    </Swiper>
  );
}
