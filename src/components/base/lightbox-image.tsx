import {
  Modal,
  ModalContent,
  Image,
  useDisclosure,
  ImageProps,
} from "@nextui-org/react";

type LightboxImageProps = {
  thumbnailUrl: string;
  imageUrl: string;
} & ImageProps

export default function LightboxImage({ thumbnailUrl, imageUrl, ...imageProps } : LightboxImageProps) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <div className="cursor-zoom-in hover:opacity-hover transition-opacity" onClick={onOpen}>
        <Image {...imageProps} src={thumbnailUrl} />
      </div>
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
            <Image src={`https://app.requestly.io/delay/1000/${imageUrl}`} alt={imageProps.alt} width="100%" height="100%" />
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
