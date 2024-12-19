import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { LanguageIcon } from "@/components/icons";
import { supportedLanguages } from "@/config/i18n";
import useLocale from "@/hooks/use-locale";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
  const { locale, setLocale, languageNames } = useLocale();
  const { t } = useTranslation('common');

  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="font-semibold text-md text-default-500 uppercase flex flex-row gap-1 items-center hover:opacity-hover cursor-pointer">
          <LanguageIcon />
          {locale}
        </div>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label={t('language_selector')}
        selectedKeys={locale}
        selectionMode="single"
        variant="faded"
        onSelectionChange={({ currentKey }) => setLocale(currentKey || "en")}
      >
        {supportedLanguages.map((l) => 
          <DropdownItem key={l} value={l} className={locale == l ? "text-primary-700" : ""}>{languageNames.of(l)}</DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}