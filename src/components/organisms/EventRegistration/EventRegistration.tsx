import {
  type Control,
  type FieldErrors,
  type UseFormRegister,
  type UseFormRegisterReturn,
  Controller,
  useForm,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { DateTime } from 'luxon'
import { useTranslation } from 'react-i18next'
import { type ReactNode, useState } from 'react'
import clsx from 'clsx'

import { AnchorIcon } from '@/components/atoms/Icons'
import { Button, type ButtonProps } from '@/components/atoms/Button'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/atoms/Modal'
import { Alert } from '@/components/atoms/Alert'
import { Select, SelectItem } from '@/components/atoms/Select'
import { ShareContent } from '@/components/molecules/EventShare'
import api from '@/config/api'
import { Registration, RegistrationSchema } from '@/types'
import { Event } from '@/types'
import { isOnline } from '@/lib/shape'
import { useLocale } from '@/hooks/use-locale'

// The registration questions enabled on this event (each `true` boolean → a field).
function enabledQuestions(event: Event): string[] {
  const questions = event.registrationQuestions

  if (!questions) return []

  return Object.entries(questions)
    .filter(([, enabled]) => enabled)
    .map(([key]) => key)
}

export type RegistrationButtonProps = {
  event: Event
} & ButtonProps

export function RegistrationButton({ event, ...buttonProps }: RegistrationButtonProps) {
  const { t } = useTranslation('events')
  const [isOpen, setIsOpen] = useState(false)

  // External registration: just link out (Button renders an <a> when given href).
  if (event.registrationMode === 'external') {
    if (!event.externalRegistrationUrl) return null

    return (
      <Button
        color="primary"
        href={event.externalRegistrationUrl}
        rel="noopener noreferrer"
        target="_blank"
        variant="flat"
        {...buttonProps}
      >
        <span className="font-semibold tracking-wider">{t('registration.register_now')}</span>
        <AnchorIcon className="text-primary" />
      </Button>
    )
  }

  // In-app registration needs at least one upcoming date to register against.
  const upcomingDates = event.schedule?.upcomingDates ?? []

  if (upcomingDates.length === 0) return null

  return (
    <>
      <Button color="primary" variant="flat" onClick={() => setIsOpen(true)} {...buttonProps}>
        <span className="font-semibold tracking-wider">{t('registration.register_now')}</span>
      </Button>
      <RegistrationModal
        eventId={event.id}
        eventTitle={event.title}
        eventUrl={event.webUrl ?? ''}
        isOnline={isOnline(event)}
        isOpen={isOpen}
        questions={enabledQuestions(event)}
        upcomingDates={upcomingDates}
        onOpenChange={setIsOpen}
      />
    </>
  )
}

type RegistrationModalProps = {
  eventId: number
  eventTitle: string
  eventUrl: string
  upcomingDates: Date[]
  questions: string[]
  isOnline: boolean
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

function RegistrationModal({
  eventId,
  eventTitle,
  eventUrl,
  upcomingDates,
  questions,
  isOnline,
  isOpen,
  onOpenChange,
}: RegistrationModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const { t } = useTranslation('events')

  const {
    register,
    control,
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

  // Reset the thank-you state on close too: the footer buttons call this
  // directly (a controlled prop change Radix's onOpenChange doesn't observe),
  // so without this the next open would show the thank-you screen, not the form.
  const close = () => {
    onOpenChange(false)
    setSubmitted(false)
  }

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      placement="bottom"
      onOpenChange={(open) => {
        onOpenChange(open)
        if (!open) setSubmitted(false)
      }}
    >
      <form className="flex flex-col" onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <ModalHeader className="mt-2 text-center text-xl">
          {t(submitted ? 'registration.thank_you' : 'registration.register_now')}
        </ModalHeader>
        <ModalBody>
          {submitted ? (
            <div className="text-center flex flex-col gap-3">
              <p>{t('registration.followup')}</p>
              <div className="font-semibold mt-2">{t('registration.invite_friend')}</div>
              <ShareContent label={eventTitle} url={eventUrl} />
            </div>
          ) : (
            <>
              <RegistrationFields
                control={control}
                errors={errors}
                questions={questions}
                register={register}
                upcomingDates={upcomingDates}
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
              hideIcon
              className="mt-3"
              color="primary"
              description={t('registration.online_notice')}
              title={t('registration.online_notice_title')}
              variant="bordered"
            />
          )}
        </ModalBody>
        <ModalFooter>
          {submitted ? (
            <Button color="primary" variant="flat" onClick={close}>
              {t('registration.okay')}
            </Button>
          ) : (
            <>
              <Button disabled={mutation.isPending} variant="flat" onClick={close}>
                {t('registration.cancel')}
              </Button>
              <Button color="primary" isLoading={mutation.isPending} type="submit" variant="flat">
                {t('registration.submit')}
              </Button>
            </>
          )}
        </ModalFooter>
      </form>
    </Modal>
  )
}

// Shared field chrome (label + control + error) — single-use compositions kept
// private to the registration form.
const FIELD_INPUT =
  'w-full h-10 rounded-none border bg-background px-3 text-sm text-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-focus'

function Field({
  label,
  required,
  error,
  htmlFor,
  children,
}: {
  label: ReactNode
  required?: boolean
  error?: ReactNode
  htmlFor?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium" htmlFor={htmlFor}>
        {label}
        {required && ' *'}
      </label>
      {children}
      {error && <span className="text-xs text-danger-11">{error}</span>}
    </div>
  )
}

function LabeledInput({
  label,
  required,
  error,
  type = 'text',
  registration,
}: {
  label: ReactNode
  required?: boolean
  error?: ReactNode
  type?: string
  registration: UseFormRegisterReturn
}) {
  return (
    <Field error={error} htmlFor={registration.name} label={label} required={required}>
      <input
        className={clsx(FIELD_INPUT, error ? 'border-danger-7' : 'border-gray-7')}
        id={registration.name}
        type={type}
        {...registration}
      />
    </Field>
  )
}

function LabeledTextarea({
  label,
  error,
  registration,
}: {
  label: ReactNode
  error?: ReactNode
  registration: UseFormRegisterReturn
}) {
  return (
    <Field error={error} htmlFor={registration.name} label={label}>
      <textarea
        className={clsx(FIELD_INPUT, 'h-auto py-2', error ? 'border-danger-7' : 'border-gray-7')}
        id={registration.name}
        rows={3}
        {...registration}
      />
    </Field>
  )
}

type RegistrationFieldsProps = {
  upcomingDates: Date[]
  questions: string[]
  register: UseFormRegister<Registration>
  control: Control<Registration>
  errors: FieldErrors<Registration>
}

function RegistrationFields({
  upcomingDates,
  questions,
  register,
  control,
  errors,
}: RegistrationFieldsProps) {
  const { t } = useTranslation('events')
  const { locale } = useLocale()

  return (
    <div className="flex flex-col gap-4">
      {/* The form value is the ISO string; RegistrationSchema's z.coerce.date()
          turns it into a Date on submit, so we bridge the controlled Radix Select
          through a Controller and cast across that string↔Date coercion seam. */}
      <Controller
        control={control}
        defaultValue={upcomingDates[0]?.toISOString() as unknown as Date}
        name="startingAt"
        render={({ field }) => (
          <Field
            required
            error={errors.startingAt && t('errors.starting_at')}
            label={t('registration.starting_date')}
          >
            <Select
              ariaLabel={t('registration.starting_date')}
              isInvalid={!!errors.startingAt}
              value={field.value as unknown as string}
              onBlur={field.onBlur}
              onValueChange={field.onChange}
            >
              {upcomingDates.map((date) => {
                const dateTime = DateTime.fromJSDate(date).setLocale(locale)

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
          </Field>
        )}
        rules={{ required: true }}
      />

      <LabeledInput
        required
        error={errors.name && t('errors.name')}
        label={t('registration.name')}
        registration={register('name', { required: true })}
        type="text"
      />

      <LabeledInput
        required
        error={errors.email && t('errors.email')}
        label={t('registration.email')}
        registration={register('email', { required: true })}
        type="email"
      />

      {questions.map((question, index) => (
        <LabeledTextarea
          key={index}
          error={errors.questions?.[question]?.message}
          label={t(`questions.${question}`)}
          registration={register(`questions.${question}`)}
        />
      ))}

      <p className="text-xs text-center">{t('registration.privacy_policy')}</p>
    </div>
  )
}
