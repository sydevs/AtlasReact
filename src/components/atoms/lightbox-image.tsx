import { Modal, ModalContent, Image, useDisclosure, ImageProps } from '@nextui-org/react'

type LightboxImageProps = {
  thumbnailUrl: string
  imageUrl: string
} & ImageProps

export function LightboxImage({ thumbnailUrl, imageUrl, ...imageProps }: LightboxImageProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <div className="cursor-zoom-in hover:opacity-hover transition-opacity" onClick={onOpen}>
        <Image {...imageProps} src={thumbnailUrl} />
      </div>
      <Modal
        backdrop="blur"
        classNames={{
          closeButton: 'z-[100] transition',
        }}
        isOpen={isOpen}
        size="5xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(_onClose) => (
            <Image
              alt={imageProps.alt}
              height="100%"
              src={`https://app.requestly.io/delay/1000/${imageUrl}`}
              width="100%"
            />
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
