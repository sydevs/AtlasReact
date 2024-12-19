// originally written by @imoaazahmed

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export default function useLocale() {
  const { i18n } = useTranslation()
  const [ locale, setLocale ] = useState(i18n.resolvedLanguage || "en");
  const languageNames = useMemo(() => {
    return new Intl.DisplayNames(locale, { type: "language" });
  }, [locale]);
  const regionNames = useMemo(() => {
    return new Intl.DisplayNames(locale, { type: "region" });
  }, [locale]);

  return {
    locale: locale,
    languageNames,
    regionNames,
    setLocale: (locale: string) => {
      i18n.changeLanguage(locale)
      setLocale(locale)
    },
  };
};
