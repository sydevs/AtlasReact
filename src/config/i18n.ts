import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

/*
 * Potential backends:
 * https://github.com/i18next/i18next-http-backend
 * https://www.accent.reviews (self-hosted)
 * https://crowdin.com/pricing (good ui)
 * https://locize.com/pricing.html (native integration)
 * https://tolgee.io/pricing
 */

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    //debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      prefix: '%{',
      suffix: '}',
    },
    detection: {
      lookupQuerystring: 'locale',
    },
    resources: {
      en: {
        events: {
          get_directions: "Get Directions",
          register: "Register",
          hosted_from: "Hosted from %{city}",
          recurrence: {
            daily: "Daily",
            monday: "Mondays",
            tuesday: "Tuesdays",
            wednesday: "Wednesdays",
            thursday: "Thursdays",
            friday: "Fridays",
            saturday: "Saturdays",
            sunday: "Sundays",
            weekly_1: "Every %{weekday}",
            weekly_2: "Every 2nd %{weekday}",
            monthly_1st: "1st %{weekday} of Every Month",
            monthly_2nd: "2nd %{weekday} of Every Month",
            monthly_3rd: "3rd %{weekday} of Every Month",
            monthly_4th: "4th %{weekday} of Every Month",
            monthly_last: "Last %{weekday} of Every Month",
          },
          timing_labels: {
            sessions_one: "One-time event",
            sessions_other: "%{count}-session course",
            ongoing: "This class is on-going",
          }
        },
      },
      fr: {
        events: {
          get_directions: "Obtenir l'itinéraire",
          register: "Registre",
        }
      },
    }
  });

export default i18n;