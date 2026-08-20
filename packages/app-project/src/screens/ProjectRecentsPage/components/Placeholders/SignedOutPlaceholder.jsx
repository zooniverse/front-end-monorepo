import { Box, Paragraph } from 'grommet'
import { useTranslation } from 'next-i18next/pages'

function SignedOutPlaceholder() {
  const { t } = useTranslation('screens')

  return (
    <Box fill align='center' pad={{ vertical: 'large' }}>
      <Paragraph>{t('ProjectRecents.signedOut')}</Paragraph>
    </Box>
  )
}

export default SignedOutPlaceholder
