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
import { Event } from "@/types";
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
        <RegistrationModal event={event} isOpen={isOpen} onOpenChange={onOpenChange} />
      </>
    );
  } else {
    return (
      <Link
        className="group w-full"
        href={event.registration.externalUrl}
        target="_blank"
      >
        <Button
          color="primary"
          variant="flat"
          {...buttonProps}
        >
          <span className="font-semibold tracking-wider">
            {t('registration.register_now')}
          </span>
          <AnchorIcon className="text-primary" />
        </Button>
      </Link>
    );
  }
}

type RegistrationModalProps = {
  event: Event;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export function RegistrationModal({ event, isOpen, onOpenChange }: RegistrationModalProps) {
  const [ submitted, setSubmitted ] = useState(false);
  const { t } = useTranslation('events');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Registration>({ resolver: zodResolver(RegistrationSchema) });

  const mutation = useMutation({
    scope: { id: `registration-for-${event.id}` },
    mutationFn: (newRegistration: Registration) => {
      return api.createRegistration(event.id, newRegistration);
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
      placement="top-center"
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
                {t(submitted ? 'registration.thank_you' : 'registration.register_now')}
              </ModalHeader>
              <ModalBody>
                {submitted ? 
                  <div className="text-center flex flex-col gap-3">
                    <p>{t('registration.followup')}</p>
                    <div className="font-semibold mt-2">
                      {t('registration.invite_friend')}
                    </div>
                    <ShareContent label={event.label} url={event.url} />
                  </div> :
                  <>
                    <RegistrationFields event={event} register={register} errors={errors} />

                    {mutation.isError &&
                      <Alert
                        className="mt-4"
                        color="secondary"
                        title="Something went wrong"
                        description={mutation.error.message}
                      />}
                  </>}
                
                {event.online &&
                    <Alert
                      className="mt-4"
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
  event: Event;
  register: UseFormRegister<Registration>;
  errors: FieldErrors<Registration>;
}

export function RegistrationFields({ event, register, errors }: RegistrationFieldsProps) {
  const { t } = useTranslation('events');

  return (
    <>
      <Select
        {...register("startingAt", { required: true })}
        {...INPUT_STYLE}
        label={t('registration.starting_date')}
        isRequired
        errorMessage={errors.startingAt?.message}
        isInvalid={!!errors.startingAt}
        defaultSelectedKeys={[event.timing.upcomingDates[0]?.toISOString()]}
      >
        {event.timing.upcomingDates.map((date) => {
          let dateTime = DateTime.fromJSDate(date);
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
        errorMessage={errors.name?.message}
        isInvalid={!!errors.name}
      />

      <Input
        {...register("email", { required: true })}
        {...INPUT_STYLE}
        label={t('registration.email')}
        type="email"
        isRequired
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
      />
      
      {event.registration.questions.map((question, index) => 
        <Textarea
          {...register(`questions.${question.slug}`)}
          {...INPUT_STYLE}
          label={question.title}
          key={index}
          errorMessage={errors.questions?.[question.slug]?.message}
          isInvalid={!!errors.questions?.[question.slug]}
        />
      )}

      <p className="text-xs text-center">
        {t('registration.privacy_policy')}
      </p>
    </>
  );
}
