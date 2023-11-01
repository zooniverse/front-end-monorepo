import { Box, Heading, Text } from 'grommet'
import { func, string } from 'prop-types'

import Form from './components/Form'
import { useTranslation } from '../../../translations/i18n'

function LoginForm (props) {
  const { t } = useTranslation()
  const { generalError, onSubmit, validate } = props
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
        initialValues={{ login: '', password: '' }}
        onSubmit={onSubmit}
      />
    </Box>
  )
}

LoginForm.defaultProps = {
  generalError: ''
}

LoginForm.propTypes = {
  generalError: string,
  onSubmit: func.isRequired
}

export default LoginForm
