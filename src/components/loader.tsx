import { Spinner, Alert } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

interface Props {
  data?: any;
  isLoading: boolean;
  error: Error | null;
  children: React.ReactNode;
}

export function Loading() {
  const { t } = useTranslation('common');
  return (
    <div className="w-100 h-100 p-10 flex justify-center items-center bg-panel-thin">
      <Spinner label={t('loading')} color="secondary" />
    </div>
  );
}

export default function Loader({ isLoading, data, error, children }: Props) {
  if (data && isLoading) {
    return <div className="relative">
      <Spinner color="secondary" size="sm" className="absolute top-4 right-4 z-1" />
      {children}
    </div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="p-10 bg-panel text-center">
        <Alert color="danger" title={error.message} />
      </div>
    );
  }

  return children;
}