import { Paragraph } from 'grommet'
import { useTranslation } from 'next-i18next/pages'

function ErrorPlaceholder() {
  const { t } = useTranslation('screens')

  return (
    <Paragraph>{t('ProjectRecents.error')}</Paragraph>
  )
}

export default ErrorPlaceholder
