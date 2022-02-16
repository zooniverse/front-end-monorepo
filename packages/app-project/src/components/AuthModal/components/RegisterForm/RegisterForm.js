import PropTypes from 'prop-types'
import { Box, Heading, Text } from 'grommet'
import Form from './components/Form'
import { useTranslation } from 'next-i18next'

function RegisterForm ({ generalError, validate, onSubmit }) {
  const initialValues = {
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

  const { t } = useTranslation('components')

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

      <Form initialValues={initialValues} onSubmit={onSubmit} validate={validate} />
    </Box>
  )
}

RegisterForm.propTypes = {
  generalError: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  validate: PropTypes.func
}

RegisterForm.defaultProps = {
  generalError: '',
  validate: () => {}
}

export default RegisterForm
