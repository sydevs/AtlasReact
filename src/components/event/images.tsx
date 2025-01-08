import {
  Modal,
  ModalContent,
  useDisclosure,
  Button,
  Image
} from "@nextui-org/react";
import React, { useEffect, useMemo } from "react";
import { EventImage } from "@/types";
import useImagePreloader from "@/hooks/use-image-preloader";

export default function EventImages({ images } : { images: EventImage[] }) {
  if (images.length === 0) return null;
  const [index, setIndex] = React.useState(0);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  useImagePreloader(images.map((image) => image.url));

  useEffect(() => {
    const interval = setInterval(() => {
      if (index >= images.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }, isOpen ? 8000 : 4000);

    return () => clearInterval(interval);
  }, [index, isOpen, images.length]);

  return (
    <div className="p-6">
      <EventImageCarousel
        images={images}
        index={index}
        setIndex={setIndex}
        onOpen={onOpen}
      />

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        size="5xl"
        classNames={{
          closeButton: "z-[100] transition",
        }}
      >
        <ModalContent>
          {(_onClose) => (
            <EventImageCarousel
              images={images}
              index={index}
              setIndex={setIndex}
              isLarge
            />
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

type EventImageCarouselProps = {
  images: EventImage[]
  index: number
  setIndex: (n: number) => void
  onOpen?: () => void
  isLarge?: boolean
}

function EventImageCarousel({
  images,
  index,
  setIndex,
  onOpen,
  isLarge = false
} : EventImageCarouselProps) {
  const image = useMemo(() => images[index], [index, images])

  return (
    <div className="relative">
      <Image
        src={image.url}
        alt={image.altText}
        width="100%"
        height="100%"
        className={`rounded-lg ${onOpen && 'cursor-zoom-in'}`}
        onClick={onOpen}
        isBlurred
      />
      {/*images.map((image, i) =>
        <Image
          key={image.url}
          src={image.url}
          alt={image.altText}
          width="100%"
          height="100%"
          onClick={onOpen}
          className={`
            ${index === i && 'absolute bottom-0 left-0 right-0 z-0 opacity-0 pointer-events-none'}
            ${onOpen && 'cursor-zoom-in'}
            transition-opacity
            rounded-sm
          `}
        />
      )*/}
      <div
        className={`
          absolute left-0 right-0 z-10
          ${isLarge ? 'bottom-5' : '-bottom-7'}
          flex-center-x gap-2
        `}
      >
        {images.map((_image, i) => 
          <Button
            key={i}
            className={`
              min-w-0 w-20 h-${isLarge ? 5 : 4}
              rounded-full shadow-md hover:opacity-hover
              ${i === index ? 'bg-primary' : ''}
            `}
            onPress={() => setIndex(i)}
          />
        )}
      </div>
    </div>
  )
}
