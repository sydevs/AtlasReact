import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend, { HttpBackendOptions } from 'i18next-http-backend'

export const supportedLanguages = ['en', 'fr'];

i18n
  // Load translations from the backend
  .use(HttpBackend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init<HttpBackendOptions>({
    debug: true,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'events'],
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      prefix: '%{',
      suffix: '}',
    },
    detection: {
      lookupQuerystring: 'locale',
    },
    backend: {
      crossDomain: true,
      loadPath: (lng, ns) => `${import.meta.env.VITE_HOST}/locales/${lng}/${ns}.json`,
    },
  });

export default i18n;