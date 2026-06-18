import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from '../public/locales/en/common.json'
import enEvents from '../public/locales/en/events.json'
import frCommon from '../public/locales/fr/common.json'
import frEvents from '../public/locales/fr/events.json'

import { i18nSharedOptions } from '@/config/i18n-options'

// A self-contained i18next instance for Ladle.
//
// The app loads locale JSON over HTTP (VITE_HOST) via i18next-http-backend;
// Ladle has no backend, so we bundle the en/fr namespaces as static resources
// instead. Stories render this instance through <I18nextProvider> (see
// components.tsx), which both useTranslation() and useLocale() read from — so
// story text resolves offline without touching the app's HTTP-backed singleton.
//
// Namespaces and the Ruby-style %{...} delimiters come from the shared options
// (src/config/i18n-options.ts) so they stay in lockstep with the app.
const storyI18n = i18n.createInstance()

storyI18n.use(initReactI18next).init({
  lng: 'en',
  ...i18nSharedOptions,
  resources: {
    en: { common: enCommon, events: enEvents },
    fr: { common: frCommon, events: frEvents },
  },
  react: { useSuspense: false },
})

export default storyI18n
