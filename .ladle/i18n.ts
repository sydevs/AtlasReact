import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from '../public/locales/en/common.json'
import enEvents from '../public/locales/en/events.json'
import frCommon from '../public/locales/fr/common.json'
import frEvents from '../public/locales/fr/events.json'

// A self-contained i18next instance for Ladle.
//
// The app loads locale JSON over HTTP (VITE_HOST) via i18next-http-backend;
// Ladle has no backend, so we bundle the en/fr namespaces as static resources
// instead. Stories render this instance through <I18nextProvider> (see
// components.tsx), which both useTranslation() and useLocale() read from — so
// story text resolves offline without touching the app's HTTP-backed singleton.
//
// Interpolation mirrors src/config/i18n.ts: Ruby-style %{var} delimiters, shared
// with the Rails backend that owns these JSON files.
const storyI18n = i18n.createInstance()

storyI18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common', 'events'],
  resources: {
    en: { common: enCommon, events: enEvents },
    fr: { common: frCommon, events: frEvents },
  },
  interpolation: {
    escapeValue: false,
    prefix: '%{',
    suffix: '}',
  },
  react: { useSuspense: false },
})

export default storyI18n
