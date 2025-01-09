import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Snippet,
  Link,
  Button,
  ButtonProps,
  useDisclosure,
} from "@nextui-org/react";
import {
  FacebookIcon,
  EmailIcon,
  LinkedinIcon,
  TwitterIcon,
  FlipboardIcon,
} from "@/components/icons";
import { Event } from "@/types";
import { useTranslation } from "react-i18next";

type ShareButtonProps = {
  event: Event;
} & ButtonProps;

export function ShareButton({
  event,
  ...buttonProps
} : ShareButtonProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = useTranslation('events');

  return (
    <>
      <Button
        color="primary"
        variant="faded"
        onPress={onOpen}
        {...buttonProps}
      >
        <span className="font-semibold tracking-wider">
          {t('details.share')}
        </span>
      </Button>
      <ShareModal event={event} isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}

type ShareModalProps = {
  event: Event;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export default function ShareModal({
  event,
  isOpen,
  onOpenChange,
} : ShareModalProps) {
  const { t } = useTranslation('events');

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{t('registration.invite_friend')}</ModalHeader>
        <ModalBody>
          <ShareContent label={event.label} url={event.url} />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}

type ShareContentProps = {
  label: string;
  url: string;
};

export function ShareContent({
  label,
  url,
} : ShareContentProps) {
  label = encodeURI(label)
  url = encodeURI(url)
  const socials = [
    {
      url: `mailto:?subject=${label}&body=${url}`,
      icon: EmailIcon,
    },
    {
      url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      icon: FacebookIcon,
    },
    {
      url: `https://x.com/intent/tweet?text=${url}`,
      icon: TwitterIcon,
    },
    {
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      icon: LinkedinIcon,
    },
    {
      url: `https://share.flipboard.com/bookmarklet/popout?v=2&title=${label}&url=${url}`,
      icon: FlipboardIcon,
    }
  ];

  return (
    <>
      <div>
        <Snippet color="secondary" className="text-sm w-full" hideSymbol={true}>
          {url}
        </Snippet>
      </div>
      <div className="flex flex-row gap-4 mt-2 justify-center">
        {socials.map((social, index) => (
          <Link key={index} href={social.url} target="_blank" rel="noopener noreferrer">
            <social.icon size={36} />
          </Link>
        ))}
      </div>
    </>
  );
}
