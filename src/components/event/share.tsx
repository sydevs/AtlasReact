import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Snippet,
  Link,
} from "@nextui-org/react";
import {
  FacebookIcon,
  EmailIcon,
  LinkedinIcon,
  TwitterIcon,
  FlipboardIcon,
} from "@/components/icons";
import { Event } from "@/types";

type Props = {
  event: Event;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export default function ShareModal({
  event,
  isOpen,
  onOpenChange,
} : Props) {
  const label = encodeURI(event.label)
  const url = encodeURI(event.url)
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
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Invite a friend</ModalHeader>
        <ModalBody>
          <div>
            <Snippet color="secondary" className="text-sm w-full">
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
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
