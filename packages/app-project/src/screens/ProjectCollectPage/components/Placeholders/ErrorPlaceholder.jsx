import { Text } from 'grommet'
import { useTranslation } from 'next-i18next/pages'

export default function ErrorPlaceholder() {
  const { t } = useTranslation('screens')
  return <Text>{t('Collect.placeholders.error')}</Text>
}