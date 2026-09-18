import { Box, Text } from 'grommet'
import { useTranslation } from 'next-i18next/pages'

export default function LoadingPlaceholder() {
  const { t } = useTranslation('screens')
  return <Box align='center' pad='large'><Text>{t('Collect.placeholders.loading')}</Text></Box>
}