import { useTranslation } from 'react-i18next'

import { Spinner } from '@/components/atoms/Spinner/Spinner'
import { Alert } from '@/components/atoms/Alert/Alert'

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
      <Alert className="max-w-xs" color="danger" description={error.message} title="Sahaj Atlas" />
    </div>
  )
}
