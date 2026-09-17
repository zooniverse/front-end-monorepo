import { Box, Text } from 'grommet'
import { useTranslation } from 'next-i18next/pages'

export default function ErrorPlaceholder() {
  const { t } = useTranslation('screens')
  return <Box align='center' pad='large'><Text>{t('Collect.placeholders.error')}</Text></Box>
}