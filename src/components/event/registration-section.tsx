import { Event } from "@/types";
import { useState } from "react";
import { ShareIcon, PlusSquareIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";
import RegistrationForm from "./registration-form";

type Props = {
  event: Event;
  onShareOpen: () => void;
};

export default function RegistrationSection({ event, onShareOpen }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation('events');

  return (
    <>
      <div className="flex flex-row my-5 gap-5 space-around justify-center align-middle">
        <img src="/graphics/leaves.svg" className="h-12 object-fit -rotate-90 flip" />
        <div className="text-center text-lg">
          <h3 className="mb-1.5">{t('registration.register_now')}</h3>
          <div className="text-xs italic">
            {event.category == 'course' ?
              t('timing.descriptor.sessions', { count: event.timing.recurrenceCount || 0 }) :
              t('timing.descriptor.ongoing')}
          </div>
        </div>
        <img src="/graphics/leaves.svg" className="h-12 object-fit rotate-90" />
      </div>
      {submitted ?
        <>
          <div className="bg-circle-pattern bg-fit bg-center bg-no-repeat flex flex-col justify-center items-center px-10 py-24 -mx-6 gap-7 text-center">
            <div className="max-w-64 text-2xl mt-4">{t("registration.confirmation")}</div>
            <div className="max-w-48 text-lg italic font-normal">{t("registration.followup")}</div>
          </div>
          <div className="flex my-5 gap-5 space-around justify-center align-middle font-bold text-sm leading-4">
            <div className="w-32 flex items-center justify-center gap-2.5 cursor-pointer opacity-80 hover:opacity-100" onClick={() => setSubmitted(false)}>
              <PlusSquareIcon className="text-[2.5em]" />
              <span>{t("registration.register_again")}</span>
            </div>
            <div className="w-32 flex items-center justify-center gap-2.5 cursor-pointer opacity-80 hover:opacity-100" onClick={onShareOpen}>
              <ShareIcon className="text-[2.5em]" />
              <span>{t("registration.invite_friend")}</span>
            </div>
          </div>
        </> :
        <RegistrationForm
          event={event}
          setSubmitted={setSubmitted}
        />}
    </>
  );
}
