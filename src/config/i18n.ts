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
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    detection: {
      lookupQuerystring: 'locale',
    },
    resources: {
      en: {
        translation: {
          get_directions: "Get Directions",
          register: "Register",
        }
      },
      fr: {
        translation: {
          get_directions: "Obtenir l'itinéraire",
          register: "Registre",
        }
      },
    }
  });

export default i18n;