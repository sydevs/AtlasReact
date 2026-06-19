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
import { lexicalToHtml } from '@/lib/shape'
import { Event } from '@/types'
import { Chip } from '@/components/atoms/Chip'

const DOMPurify = createDOMPurify(window)

type EventPanelProps = {
  event: Event
}

export function EventPanel({ event }: EventPanelProps) {
  const { t } = useTranslation('events')
  const { locale, languageNames } = useLocale()

  const online = event.eventType === 'online'
  const languageCode = event.languages[0] ?? ''
  const next = event.schedule?.upcomingDates?.[0]
  const hasTiming = (event.schedule?.upcomingDates?.length ?? 0) > 0
  const descriptionHtml = lexicalToHtml(event.description)

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
          <RegistrationButton className="flex-grow-[3]" event={event} />
          <ShareButton className="flex-grow" event={event} />
        </div>
        <div className="mt-5 flex flex-col gap-4">
          {!hasTiming && <EventContactDetails isHighlighted event={event} />}

          {hasTiming && <EventTimingDetails convertTimeZone={online} event={event} />}

          <EventLocationDetails event={event} />

          {hasTiming && <EventContactDetails event={event} />}
        </div>
      </div>
    </>
  )
}
