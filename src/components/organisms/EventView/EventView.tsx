import createDOMPurify from 'dompurify'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { EventContactDetails, EventTimingDetails, EventLocationDetails } from './details'

import { EventSoonChip } from '@/components/molecules/EventSoon'
import { RegistrationForm } from '@/components/organisms/RegistrationForm'
import { ImageCarousel } from '@/components/molecules/ImageCarousel'
import { ShareContent } from '@/components/molecules/ShareContent'
import { Modal, ModalHeader, ModalBody } from '@/components/atoms/Modal'
import { Button } from '@/components/atoms/Button'
import { AnchorIcon } from '@/components/atoms/Icons'
import { useLocale } from '@/hooks/use-locale'
import { isOnline, lexicalToHtml, nextOccurrence } from '@/lib/shape'
import { Event } from '@/types'
import { Chip } from '@/components/atoms/Chip'

const DOMPurify = createDOMPurify(window)

// The registration questions enabled on this event (each `true` boolean → a field).
function enabledQuestions(event: Event): string[] {
  const questions = event.registrationQuestions

  if (!questions) return []

  return Object.entries(questions)
    .filter(([, enabled]) => enabled)
    .map(([key]) => key)
}

// The registration call-to-action. External events link straight out; native
// events (with at least one upcoming date) open the RegistrationForm in a Modal.
// EventView owns this decision so RegistrationForm can stay a config-driven form.
function RegisterAction({ event, className }: { event: Event; className?: string }) {
  const { t } = useTranslation('events')

  if (event.registrationMode === 'external') {
    if (!event.externalRegistrationUrl) return null

    return (
      <Button
        className={className}
        color="primary"
        href={event.externalRegistrationUrl}
        rel="noopener noreferrer"
        target="_blank"
        variant="flat"
      >
        <span className="font-semibold tracking-wider">{t('registration.register_now')}</span>
        <AnchorIcon className="text-primary" />
      </Button>
    )
  }

  const upcomingDates = event.schedule?.upcomingDates ?? []

  if (upcomingDates.length === 0) return null

  return (
    <Modal
      backdrop="blur"
      placement="bottom"
      trigger={
        <Button className={className} color="primary" variant="flat">
          <span className="font-semibold tracking-wider">{t('registration.register_now')}</span>
        </Button>
      }
    >
      <RegistrationForm
        eventId={event.id}
        eventTitle={event.title}
        eventUrl={event.webUrl ?? ''}
        isOnline={isOnline(event)}
        questions={enabledQuestions(event)}
        upcomingDates={upcomingDates}
      />
    </Modal>
  )
}

// The share call-to-action: a trigger that opens the "invite a friend" dialog
// wrapping the shared ShareContent block.
function ShareAction({ event, className }: { event: Event; className?: string }) {
  const { t } = useTranslation('events')

  return (
    <Modal
      trigger={
        <Button className={className} color="primary" variant="faded">
          <span className="font-semibold tracking-wider">{t('details.share')}</span>
        </Button>
      }
    >
      <ModalHeader className="flex flex-col gap-1">{t('registration.invite_friend')}</ModalHeader>
      <ModalBody className="pb-6">
        <ShareContent label={event.title} url={event.webUrl ?? ''} />
      </ModalBody>
    </Modal>
  )
}

export type EventViewProps = {
  event: Event
}

export function EventView({ event }: EventViewProps) {
  const { t } = useTranslation('events')
  const { locale, languageNames } = useLocale()

  const online = isOnline(event)
  const languageCode = event.languages[0] ?? ''
  const next = nextOccurrence(event)
  const descriptionHtml = lexicalToHtml(event.description)

  // The image alt doubles as the lightbox caption (today's behavior). Memoized so
  // a stable slides array is threaded to the carousel/lightbox across re-renders.
  const slides = useMemo(
    () =>
      event.images.map((image) => ({
        src: image.url,
        alt: image.alt ?? undefined,
        caption: image.alt ?? undefined,
      })),
    [event.images],
  )

  return (
    <>
      <div className="flex w-full justify-center items-center">
        <ImageCarousel slides={slides} />
      </div>
      <div className="flex flex-col gap-3 px-8 pt-3 pb-12">
        <h1
          className={`
          text-[24px] font-semibold leading-7 tracking-wide
          ${event.images.length > 0 ? '' : 'pl-5 mt-3'}
        `}
        >
          {event.title}
        </h1>
        <div className="flex gap-1">
          {next && <EventSoonChip firstDate={next} online={online} />}
          {online && <Chip>{t('details.online')}</Chip>}
          {languageCode && languageCode.split('-')[0] !== locale.split('-')[0] && (
            <Chip color="secondary">{languageNames.of(languageCode)}</Chip>
          )}
        </div>
        {descriptionHtml && (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(descriptionHtml, {
                USE_PROFILES: { html: true },
                ALLOWED_TAGS: [
                  'p',
                  'b',
                  'i',
                  'em',
                  'strong',
                  'a',
                  'ul',
                  'ol',
                  'li',
                  'del',
                  'br',
                  'h3',
                ],
                ALLOWED_ATTR: ['href'],
                ADD_ATTR: ['target'],
              }),
            }}
            className="flex flex-col gap-2 my-2 colored-links normal-nums"
          />
        )}
        <div className="flex-center-x gap-1">
          <RegisterAction className="flex-grow-[3]" event={event} />
          <ShareAction className="flex-grow" event={event} />
        </div>
        {/* The host-contact card's position and emphasis depend on whether the
            event has an upcoming occurrence, so EventView owns the ordering:
            contact-highlighted-first when there's no upcoming date, else
            timing → location → contact. */}
        <div className="mt-5 flex flex-col gap-4">
          {!next && <EventContactDetails isHighlighted event={event} />}

          {next && <EventTimingDetails convertTimeZone={online} event={event} />}

          <EventLocationDetails event={event} />

          {next && <EventContactDetails event={event} />}
        </div>
      </div>
    </>
  )
}
