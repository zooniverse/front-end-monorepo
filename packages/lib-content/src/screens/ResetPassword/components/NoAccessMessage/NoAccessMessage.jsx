import { Box, Heading, Paragraph } from 'grommet'
import { useTranslation } from '@translations/i18n'
import ResetPasswordHeader from '../ResetPasswordHeader/ResetPasswordHeader'

export default function NoAccessMessage () {
  
  const { t } = useTranslation()

  return (
    <Box>
      <ResetPasswordHeader />
      <Paragraph>
        {t('ResetPassword.NoAccessMessage.body')}
      </Paragraph>
    </Box>
  )

}