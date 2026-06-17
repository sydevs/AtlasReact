import { Alert, Spinner } from '@nextui-org/react'
import { useTranslation } from 'react-i18next'

export function LoadingFallback() {
  const { t } = useTranslation('common')

  return (
    <div className="flex-center w-full h-full p-10 bg-background">
      <Spinner color="secondary" label={t('loading')} />
    </div>
  )
}

export function ErrorFallback({ error }: { error: any }) {
  return (
    <div className="flex-center w-full h-full p-10 bg-background">
      <Alert
        classNames={{ base: 'max-w-xs' }}
        color="danger"
        description={error.message}
        title="Sahaj Atlas"
      />
    </div>
  )
}
