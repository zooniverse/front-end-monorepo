import { Box, Heading, Text } from 'grommet'
import { func, string } from 'prop-types'

import Form from './components/Form'
import { useTranslation } from '../../../translations/i18n'

const DEFAULT_VALUES = {
  login: '',
  password: ''
}
const DEFAULT_HANDLER = () => true

function LoginForm ({
  generalError = '',
  onSubmit = DEFAULT_HANDLER
}) {
  const { t } = useTranslation()
  return (
    <Box width='medium'>
      <Heading size='small' margin={{ bottom: 'xsmall', top: 'none' }}>
        {t('AuthModal.LoginForm.heading')}
      </Heading>
      <Text>
        {t('AuthModal.LoginForm.instruction')}
      </Text>

      {generalError &&
        <Text color={{ light: 'status-critical', dark: 'status-error' }} role='alert'>{generalError}</Text>}

      <Form
        initialValues={DEFAULT_VALUES}
        onSubmit={onSubmit}
      />
    </Box>
  )
}

LoginForm.propTypes = {
  generalError: string,
  onSubmit: func.isRequired
}

export default LoginForm
