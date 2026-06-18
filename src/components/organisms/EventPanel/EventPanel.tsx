import createDOMPurify from 'dompurify'
import { useTranslation } from 'react-i18next'

import { EventSoonChip } from '@/components/molecules/EventSoon'
import { RegistrationButton } from '@/components/organisms/EventRegistration'
import { EventImages } from '@/components/molecules/EventImages'
import { ShareButton } from '@/components/molecules/EventShare'
import {
  EventContactDetails,
  EventLocationDetails,
  EventTimingDetails,
} from '@/components/organisms/EventDetails'
import { useLocale } from '@/hooks/use-locale'
import { Event } from '@/types'
import { Chip } from '@/components/atoms/Chip'

const DOMPurify = createDOMPurify(window)

type EventPanelProps = {
  event: Event
}

export function EventPanel({ event }: EventPanelProps) {
  const { t } = useTranslation('events')
  const { locale, languageNames } = useLocale()

  return (
    <>
      <div className="flex w-full justify-center items-center">
        <EventImages images={event.images} />
      </div>
      <div className="flex flex-col gap-3 px-8 pt-3 pb-12">
        <h1
          className={`
          text-[24px] font-semibold leading-7 tracking-wide
          ${event.images.length > 0 ? '' : 'pl-5 mt-3'}
        `}
        >
          {event.label}
        </h1>
        <div className="flex gap-1">
          {event.timing && (
            <EventSoonChip firstDate={event.timing.firstDate} online={event.online} />
          )}
          {event.online && <Chip>{t('details.online')}</Chip>}
          {event.languageCode.split('-')[0] !== locale.split('-')[0] && (
            <Chip color="secondary">{languageNames.of(event.languageCode)}</Chip>
          )}
        </div>
        {event.descriptionHtml && (
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(event.descriptionHtml, {
                USE_PROFILES: { html: true },
                ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'del', 'br'],
                ALLOWED_ATTR: ['href'],
                ADD_ATTR: ['target'],
              }),
            }}
            className="flex flex-col gap-2 my-2 colored-links normal-nums"
          />
        )}
        {event.registration && (
          <div className="flex-center-x gap-1">
            <RegistrationButton className="flex-grow-[3]" event={event} />
            <ShareButton className="flex-grow" event={event} />
          </div>
        )}
        <div className="mt-5 flex flex-col gap-4">
          {event.contact && !event.timing && (
            <EventContactDetails isHighlighted contact={event.contact} />
          )}

          {event.timing && event.timing.upcomingDates.length > 0 && (
            <EventTimingDetails convertTimeZone={event.online} timing={event.timing} />
          )}

          {event.location && <EventLocationDetails location={event.location} />}

          {event.contact && event.timing && <EventContactDetails contact={event.contact} />}
        </div>
      </div>
    </>
  )
}
