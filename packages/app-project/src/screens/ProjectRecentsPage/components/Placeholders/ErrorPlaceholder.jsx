import { Box, Paragraph } from 'grommet'
import { useTranslation } from 'next-i18next/pages'

function ErrorPlaceholder() {
  const { t } = useTranslation('screens')

  return (
    <Box fill align='center' pad={{ vertical: 'large' }}>
      <Paragraph>{t('ProjectRecents.error')}</Paragraph>
    </Box>
  )
}

export default ErrorPlaceholder
