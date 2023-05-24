import PropTypes from 'prop-types'
import { Box, Heading, Text } from 'grommet'
import { useTranslation } from 'next-i18next'
import Form from './components/Form'

function RegisterForm ({ generalError, validate, onSubmit }) {
  const { t } = useTranslation('components')
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

  return (
    <Box width='large'>
      <Heading size='small' margin={{ bottom: 'xsmall', top: 'none' }}>
        {t('RegisterForm.heading')}
      </Heading>
      <Text>
        {t('RegisterForm.instruction')}
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
