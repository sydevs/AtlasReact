import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Select,
  SelectItem,
  InputProps,
  Alert,
  Button,
  useDisclosure,
  Textarea,
  Input,
  Link,
  ButtonProps,
} from '@nextui-org/react'
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { DateTime } from 'luxon'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

import { AnchorIcon } from '@/components/atoms/Icons'
import { ShareContent } from '@/components/molecules/EventShare'
import api from '@/config/api'
import { Registration, RegistrationSchema } from '@/types'
import { Event, EventRegistration, EventTiming } from '@/types'
import useLocale from '@/hooks/use-locale'

const INPUT_STYLE = {
  variant: 'bordered',
  radius: 'none',
} as {
  variant: InputProps['variant']
  radius: InputProps['radius']
}

type RegistrationButtonProps = {
  event: Event
} & ButtonProps

export function RegistrationButton({ event, ...buttonProps }: RegistrationButtonProps) {
  if (!event.registration || !event.timing) return null
  const { t } = useTranslation('events')
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const isNative = event.registration.mode == 'native'

  if (isNative) {
    return (
      <>
        <Button color="primary" variant="flat" onPress={onOpen} {...buttonProps}>
          <span className="font-semibold tracking-wider">{t('registration.register_now')}</span>
        </Button>
        <RegistrationModal
          eventId={event.id}
          eventLabel={event.label}
          eventRegistration={event.registration}
          eventTiming={event.timing}
          eventUrl={event.url}
          isOnline={event.online}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      </>
    )
  } else {
    return (
      <Button
        as={Link}
        color="primary"
        href={event.registration.externalUrl}
        target="_blank"
        variant="flat"
        {...buttonProps}
      >
        <span className="font-semibold tracking-wider">{t('registration.register_now')}</span>
        <AnchorIcon className="text-primary" />
      </Button>
    )
  }
}

type RegistrationModalProps = {
  eventId: number
  eventLabel: string
  eventUrl: string
  eventTiming: EventTiming
  eventRegistration: EventRegistration
  isOnline: boolean
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export function RegistrationModal({
  eventId,
  eventLabel,
  eventUrl,
  eventTiming,
  eventRegistration,
  isOnline,
  isOpen,
  onOpenChange,
}: RegistrationModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const { t } = useTranslation('events')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Registration>({ resolver: zodResolver(RegistrationSchema) })

  const mutation = useMutation({
    scope: { id: `registration-for-${eventId}` },
    mutationFn: (newRegistration: Registration) => {
      return api.createRegistration(eventId, newRegistration)
    },
    onSuccess: () => {
      setSubmitted(true)
      reset()
    },
  })

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      placement="bottom-center"
      onClose={() => setSubmitted(false)}
      onOpenChange={onOpenChange}
    >
      <Form
        className="gap-4 flex flex-col justify-center"
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h2 className="text-center text-xl font-semibold flex-grow mt-2">
                  {t(submitted ? 'registration.thank_you' : 'registration.register_now')}
                </h2>
              </ModalHeader>
              <ModalBody>
                {submitted ? (
                  <div className="text-center flex flex-col gap-3">
                    <p>{t('registration.followup')}</p>
                    <div className="font-semibold mt-2">{t('registration.invite_friend')}</div>
                    <ShareContent label={eventLabel} url={eventUrl} />
                  </div>
                ) : (
                  <>
                    <RegistrationFields
                      errors={errors}
                      register={register}
                      registrationOptions={eventRegistration}
                      timingOptions={eventTiming}
                    />

                    {mutation.isError && (
                      <Alert
                        className="mt-4"
                        color="secondary"
                        description={mutation.error.message}
                        title="Something went wrong"
                      />
                    )}
                  </>
                )}

                {isOnline && (
                  <Alert
                    hideIconWrapper
                    classNames={{ base: 'mt-3' }}
                    color="primary"
                    description={t('registration.online_notice')}
                    title={t('registration.online_notice_title')}
                    variant="bordered"
                  />
                )}
              </ModalBody>
              <ModalFooter>
                {submitted ? (
                  <Button color="primary" variant="flat" onPress={onClose}>
                    {t('registration.okay')}
                  </Button>
                ) : (
                  <>
                    <Button isDisabled={mutation.isPending} variant="flat" onPress={onClose}>
                      {t('registration.cancel')}
                    </Button>
                    <Button
                      color="primary"
                      isLoading={mutation.isPending}
                      type="submit"
                      variant="flat"
                    >
                      {t('registration.submit')}
                    </Button>
                  </>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Form>
    </Modal>
  )
}

type RegistrationFieldsProps = {
  timingOptions: EventTiming
  registrationOptions: EventRegistration
  register: UseFormRegister<Registration>
  errors: FieldErrors<Registration>
}

export function RegistrationFields({
  timingOptions,
  registrationOptions,
  register,
  errors,
}: RegistrationFieldsProps) {
  const { t } = useTranslation('events')
  const { locale } = useLocale()

  return (
    <div className="flex flex-col gap-4">
      <Select
        {...register('startingAt', { required: true })}
        {...INPUT_STYLE}
        isRequired
        defaultSelectedKeys={[timingOptions.upcomingDates[0]?.toISOString()]}
        errorMessage={errors.startingAt && t('errors.starting_at')}
        isInvalid={!!errors.startingAt}
        label={t('registration.starting_date')}
      >
        {timingOptions.upcomingDates.map((date) => {
          let dateTime = DateTime.fromJSDate(date).setLocale(locale)

          return (
            <SelectItem
              key={date.toISOString()}
              className="capitalize"
              textValue={dateTime.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
              value={date.toISOString()}
            >
              {dateTime.toRelativeCalendar()} -{' '}
              {dateTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
            </SelectItem>
          )
        })}
      </Select>

      <Input
        {...register('name', { required: true })}
        {...INPUT_STYLE}
        isRequired
        errorMessage={errors.name && t('errors.name')}
        isInvalid={!!errors.name}
        label={t('registration.name')}
        type="text"
      />

      <Input
        {...register('email', { required: true })}
        {...INPUT_STYLE}
        isRequired
        errorMessage={errors.email && t('errors.email')}
        isInvalid={!!errors.email}
        label={t('registration.email')}
        type="email"
      />

      {registrationOptions.questions.map((question, index) => (
        <Textarea
          {...register(`questions.${question}`)}
          {...INPUT_STYLE}
          key={index}
          errorMessage={errors.questions?.[question]?.message}
          isInvalid={!!errors.questions?.[question]}
          label={t(`questions.${question}`)}
        />
      ))}

      <p className="text-xs text-center">{t('registration.privacy_policy')}</p>
    </div>
  )
}
