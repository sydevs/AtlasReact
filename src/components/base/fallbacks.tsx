import { Alert, Spinner } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

export function LoadingFallback() {
  const { t } = useTranslation('common');

  return (
    <div className="flex-center w-full h-full p-10 bg-background">
      <Spinner label={t('loading')} color="secondary" />
    </div>
  );
}

export function ErrorFallback({ error }: { error: any }) {
  return (
    <div className="flex-center w-full h-full p-10 bg-background">
      <Alert color="danger" title="Sahaj Atlas" description={error.message} classNames={{ base: "max-w-xs" }} />
    </div>
  );
}