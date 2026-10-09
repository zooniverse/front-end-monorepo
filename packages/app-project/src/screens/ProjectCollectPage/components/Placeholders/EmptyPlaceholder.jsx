import { Text } from 'grommet'
import { useTranslation } from 'next-i18next/pages'

export default function EmptyPlaceholder() {
  const { t } = useTranslation('screens')
  return <Text>{t('Collect.placeholders.empty')}</Text>
}
