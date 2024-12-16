import { Input, Textarea, Button, Form, Select, SelectItem, InputProps, Alert } from "@nextui-org/react";
import { Event } from "@/types";
import i18n from "@/config/i18n";
import { useForm } from "react-hook-form"
import { Registration, RegistrationSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/config/api";
import { useMutation } from "@tanstack/react-query";

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

  console.log(errors)

  const DATE_FORMAT = new Intl.DateTimeFormat(i18n.resolvedLanguage, {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
  })

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
        label="Starting date"
        isRequired
        errorMessage={errors.startingAt?.message}
        isInvalid={!!errors.startingAt}
      >
        {event.timing.upcomingDates.map((date) => (
          <SelectItem key={date.toISOString()}>{DATE_FORMAT.format(date)}</SelectItem>
        ))}
      </Select>

      <Input
        {...register("name", { required: true })}
        {...INPUT_STYLE}
        label="Name"
        isRequired
        errorMessage={errors.name?.message}
        isInvalid={!!errors.name}
      />

      <Input
        {...register("email", { required: true })}
        {...INPUT_STYLE}
        label="Email"
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

      <p className="text-xs text-center">By submitting you confirm you agree to receive follow up messages about this and similar events, in accordance with our privacy policy.</p>
      <Button className="w-full rounded-sm" color="primary" type="submit" isLoading={mutation.isPending}>
        Register
      </Button>

      {mutation.isError &&
        <Alert className="mt-4" color="secondary" title="Something went wrong" type="error">
          {mutation.error.message}
        </Alert>}
    </Form>
  );
}
