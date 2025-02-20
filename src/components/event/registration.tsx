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
} from "@nextui-org/react";
import { Event, EventRegistration, EventTiming } from "@/types";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form"
import { Registration, RegistrationSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/config/api";
import { useMutation } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import { AnchorIcon } from "../icons";
import { useState } from "react";
import { ShareContent } from "./share";
import useLocale from "@/hooks/use-locale";

const INPUT_STYLE = {
  variant: "bordered",
  radius: "none",
} as {
  variant: InputProps["variant"],
  radius: InputProps["radius"],
}

type RegistrationButtonProps = {
  event: Event;
} & ButtonProps;

export function RegistrationButton({ event, ...buttonProps }: RegistrationButtonProps) {
  if (!event.registration || !event.timing) return null;
  const {t} = useTranslation('events');
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const isNative = event.registration.mode == 'native'

  if (isNative) {
    return (
      <>
        <Button
          color="primary"
          variant="flat"
          onPress={onOpen}
          {...buttonProps}
        >
          <span className="font-semibold tracking-wider">
            {t('registration.register_now')}
          </span>
        </Button>
        <RegistrationModal
          eventId={event.id}
          eventLabel={event.label}
          eventUrl={event.url}
          eventTiming={event.timing}
          eventRegistration={event.registration}
          isOnline={event.online}
          isOpen={isOpen} onOpenChange={onOpenChange} />
      </>
    );
  } else {
    return (
      <Button
        color="primary"
        variant="flat"
        as={Link}
        href={event.registration.externalUrl}
        target="_blank"
        {...buttonProps}
      >
        <span className="font-semibold tracking-wider">
          {t('registration.register_now')}
        </span>
        <AnchorIcon className="text-primary" />
      </Button>
    );
  }
}

type RegistrationModalProps = {
  eventId: number;
  eventLabel: string;
  eventUrl: string;
  eventTiming: EventTiming;
  eventRegistration: EventRegistration;
  isOnline: boolean;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function RegistrationModal({
  eventId, eventLabel, eventUrl, eventTiming, eventRegistration, isOnline,
  isOpen, onOpenChange
}: RegistrationModalProps) {
  const [ submitted, setSubmitted ] = useState(false);
  const { t } = useTranslation('events');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Registration>({ resolver: zodResolver(RegistrationSchema) });

  const mutation = useMutation({
    scope: { id: `registration-for-${eventId}` },
    mutationFn: (newRegistration: Registration) => {
      return api.createRegistration(eventId, newRegistration);
    },
    onSuccess: () => {
      setSubmitted(true)
      reset()
    },
  })

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="bottom-center"
      backdrop="blur"
      onClose={() => setSubmitted(false)}
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
                {submitted ? 
                  <div className="text-center flex flex-col gap-3">
                    <p>{t('registration.followup')}</p>
                    <div className="font-semibold mt-2">
                      {t('registration.invite_friend')}
                    </div>
                    <ShareContent label={eventLabel} url={eventUrl} />
                  </div> :
                  <>
                    <RegistrationFields timingOptions={eventTiming} registrationOptions={eventRegistration} register={register} errors={errors} />

                    {mutation.isError &&
                      <Alert
                        className="mt-4"
                        color="secondary"
                        title="Something went wrong"
                        description={mutation.error.message}
                      />}
                  </>}
                
                {isOnline &&
                    <Alert
                      classNames={{ base: "mt-3" }}
                      color="primary"
                      title={t('registration.online_notice_title')}
                      description={t('registration.online_notice')}
                      variant="bordered"
                      hideIconWrapper
                    />}
              </ModalBody>
              <ModalFooter>
                {submitted ? 
                  <Button color="primary" variant="flat" onPress={onClose}>
                    {t('registration.okay')}
                  </Button> :
                  <>
                    <Button variant="flat" onPress={onClose} isDisabled={mutation.isPending}>
                      {t('registration.cancel')}
                    </Button>
                    <Button color="primary" variant="flat" type="submit" isLoading={mutation.isPending}>
                      {t('registration.submit')}
                    </Button>
                  </>}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Form>
    </Modal>
  );
}

type RegistrationFieldsProps = {
  timingOptions: EventTiming;
  registrationOptions: EventRegistration;
  register: UseFormRegister<Registration>;
  errors: FieldErrors<Registration>;
}

export function RegistrationFields({ timingOptions, registrationOptions, register, errors }: RegistrationFieldsProps) {
  const { t } = useTranslation('events');
  const { locale } = useLocale();

  return (
    <div className="flex flex-col gap-4">
      <Select
        {...register("startingAt", { required: true })}
        {...INPUT_STYLE}
        label={t('registration.starting_date')}
        isRequired
        errorMessage={errors.startingAt && t('errors.starting_at')}
        isInvalid={!!errors.startingAt}
        defaultSelectedKeys={[timingOptions.upcomingDates[0]?.toISOString()]}
      >
        {timingOptions.upcomingDates.map((date) => {
          let dateTime = DateTime.fromJSDate(date).setLocale(locale);
          return (
            <SelectItem key={date.toISOString()} value={date.toISOString()} textValue={dateTime.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)} className="capitalize">
              {dateTime.toRelativeCalendar()} - {dateTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)}
            </SelectItem>
          )
        })}
      </Select>

      <Input
        {...register("name", { required: true })}
        {...INPUT_STYLE}
        label={t('registration.name')}
        type="text"
        isRequired
        errorMessage={errors.name && t('errors.name')}
        isInvalid={!!errors.name}
      />

      <Input
        {...register("email", { required: true })}
        {...INPUT_STYLE}
        label={t('registration.email')}
        type="email"
        isRequired
        errorMessage={errors.email && t('errors.email')}
        isInvalid={!!errors.email}
      />
      
      {registrationOptions.questions.map((question, index) => 
        <Textarea
          {...register(`questions.${question}`)}
          {...INPUT_STYLE}
          label={t(`questions.${question}`)}
          key={index}
          errorMessage={errors.questions?.[question]?.message}
          isInvalid={!!errors.questions?.[question]}
        />
      )}

      <p className="text-xs text-center">
        {t('registration.privacy_policy')}
      </p>
    </div>
  );
}
