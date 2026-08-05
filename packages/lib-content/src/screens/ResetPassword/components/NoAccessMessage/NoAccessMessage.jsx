import { Box, Heading, Paragraph } from 'grommet'
import { useTranslation } from '@translations/i18n'

export default function NoAccessMessage () {
  
  const { t } = useTranslation()

  return (
    <Box>
      <Heading level={1}>
        {t('ResetPassword.common.header')}
      </Heading>
      <Paragraph>
        {t('ResetPassword.NoAccessMessage.body')}
      </Paragraph>
    </Box>
  )

}