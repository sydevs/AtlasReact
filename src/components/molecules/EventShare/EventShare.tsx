import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Modal, ModalHeader, ModalBody } from '@/components/atoms/Modal'
import { Button, type ButtonProps } from '@/components/atoms/Button'
import { Link } from '@/components/atoms/Link'
import {
  FacebookIcon,
  EmailIcon,
  LinkedinIcon,
  TwitterIcon,
  FlipboardIcon,
} from '@/components/atoms/Icons'
import { Event } from '@/types'

export type ShareButtonProps = {
  event: Event
} & ButtonProps

export function ShareButton({ event, ...buttonProps }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation('events')

  return (
    <>
      <Button color="primary" variant="faded" onClick={() => setIsOpen(true)} {...buttonProps}>
        <span className="font-semibold tracking-wider">{t('details.share')}</span>
      </Button>
      <ShareModal event={event} isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}

type ShareModalProps = {
  event: Event
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

function ShareModal({ event, isOpen, onOpenChange }: ShareModalProps) {
  const { t } = useTranslation('events')

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalHeader className="flex flex-col gap-1">{t('registration.invite_friend')}</ModalHeader>
      <ModalBody className="pb-6">
        <ShareContent label={event.title} url={event.webUrl ?? ''} />
      </ModalBody>
    </Modal>
  )
}

// Click-to-copy URL field — the custom replacement for NextUI's Snippet (which
// was rendered with hideSymbol, i.e. select-to-copy). Copies on click with a
// brief tint flash; the text stays selectable as a fallback.
function CopyField({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard
      ?.writeText(value)
      .then(() => {
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1500)
      })
      .catch(() => {})
  }

  return (
    <button
      aria-label="Copy link"
      className={`w-full select-all truncate rounded px-3 py-2 text-left text-sm text-secondary-11 transition-colors ${
        copied ? 'bg-secondary-5' : 'bg-secondary-3'
      }`}
      title={value}
      type="button"
      onClick={copy}
    >
      {value}
    </button>
  )
}

export type ShareContentProps = {
  label: string
  url: string
}

export function ShareContent({ label, url }: ShareContentProps) {
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
    },
  ]

  return (
    <>
      <div>
        <CopyField value={url} />
      </div>
      <div className="flex flex-row gap-4 mt-2 justify-center">
        {socials.map((social, index) => (
          <Link key={index} href={social.url} rel="noopener noreferrer" target="_blank">
            <social.icon size={36} />
          </Link>
        ))}
      </div>
    </>
  )
}
