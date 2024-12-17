// originally written by @imoaazahmed

import { useMemo } from "react";
import i18n from "@/config/i18n";

export default function useLocale() {
  const languageNames = useMemo(() => {
    return new Intl.DisplayNames(i18n.resolvedLanguage, { type: "language" });
  }, [i18n.resolvedLanguage]);

  return {
    locale: i18n.resolvedLanguage || "en",
    setLocale: i18n.changeLanguage,
    languageNames
  };
};
