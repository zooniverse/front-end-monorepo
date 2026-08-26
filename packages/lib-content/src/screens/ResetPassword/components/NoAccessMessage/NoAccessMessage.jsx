import { Box, Heading, Paragraph } from 'grommet'
import { useTranslation } from '@translations/i18n'
import ResetPasswordHeading from '../ResetPasswordHeading/ResetPasswordHeading'

export default function NoAccessMessage () {
  
  const { t } = useTranslation()

  return (
    <Box>
      <ResetPasswordHeading />
      <Paragraph>
        {t('ResetPassword.NoAccessMessage.body')}
      </Paragraph>
    </Box>
  )

}