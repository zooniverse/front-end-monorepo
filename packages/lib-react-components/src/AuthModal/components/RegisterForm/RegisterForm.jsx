import { func, string } from 'prop-types'
import { Box, Heading, Text } from 'grommet'

import Form from './components/Form'
import { useTranslation } from '../../../translations/i18n'

const DEFAULT_VALUES = {
  betaListSignUp: false,
  email: '',
  emailConfirm: '',
  emailListSignUp: false,
  password: '',
  passwordConfirm: '',
  privacyAgreement: false,
  realName: '',
  username: '',
  underageWithParent: false
}
const DEFAULT_HANDLER = () => true

function RegisterForm ({
  generalError = '',
  validate = DEFAULT_HANDLER,
  onSubmit = DEFAULT_HANDLER
}) {
  const { t } = useTranslation()

  return (
    <Box width='large'>
      <Heading size='small' margin={{ bottom: 'xsmall', top: 'none' }}>
        {t('AuthModal.RegisterForm.heading')}
      </Heading>
      <Text>
        {t('AuthModal.RegisterForm.instruction')}
      </Text>

      {generalError &&
        <Text color={{ light: 'status-critical', dark: 'status-error' }} role='alert'>{generalError}</Text>}

      <Form initialValues={DEFAULT_VALUES} onSubmit={onSubmit} validate={validate} />
    </Box>
  )
}

RegisterForm.propTypes = {
  generalError: string,
  onSubmit: func.isRequired,
  validate: func
}

export default RegisterForm
