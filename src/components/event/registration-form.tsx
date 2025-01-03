import { Input, Textarea, Button, Form, Select, SelectItem, InputProps, Alert } from "@nextui-org/react";
import { Event } from "@/types";
import { useForm } from "react-hook-form"
import { Registration, RegistrationSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/config/api";
import { useMutation } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";

type Props = {
  event: Event;
  setSubmitted: (value: boolean) => void;
};

const INPUT_STYLE = {
  variant: "bordered",
  radius: "none",
} as {
  variant: InputProps["variant"],
  radius: InputProps["radius"],
}

export default function RegistrationForm({ event, setSubmitted }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Registration>({ resolver: zodResolver(RegistrationSchema) });
  const { t } = useTranslation('events');

  const mutation = useMutation({
    scope: { id: `registration-for-${event.id}` },
    mutationFn: (newRegistration: Registration) => {
      return api.createRegistration(event.id, newRegistration);
    },
    onSuccess: () => setSubmitted(true),
  })

  return (
    <Form
      className="gap-4 flex flex-col justify-center"
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
    >
      <Select
        {...register("startingAt", { required: true })}
        {...INPUT_STYLE}
        label={t('registration.starting_date')}
        isRequired
        errorMessage={errors.startingAt?.message}
        isInvalid={!!errors.startingAt}
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

      <Button className="w-full rounded-sm text-white font-semibold tracking-wider" color="primary" type="submit" isLoading={mutation.isPending}>
        {t('registration.submit')}
      </Button>

      {mutation.isError &&
        <Alert
          className="mt-4"
          color="secondary"
          title="Something went wrong"
          description={mutation.error.message}
        />}

      <Alert
        className="mt-4"
        color="primary"
        title={t('registration.online_notice_title')}
        description={t('registration.online_notice')}
        variant="bordered"
        size="xs"
        hideIconWrapper
      />

    </Form>
  );
}
