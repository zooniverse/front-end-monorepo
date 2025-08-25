/* eslint-disable jsx-a11y/no-autofocus */
import { Anchor, Box, Button, FormField, TextInput } from 'grommet'
import { bool, func, object } from 'prop-types'

import SpacedText from '../../../../../SpacedText/SpacedText'
import withCustomFormik from '../../../../../helpers/withCustomFormik'
import { useTranslation } from '../../../../../translations/i18n'
import FieldLabel from '../../../../shared/components/FieldLabel'

export const userNameFieldId = 'LoginForm_login'
export const passwordFieldId = 'LoginForm_password'

const DEFAULT_VALUES = {
  login: '',
  password: ''
}
const DEFAULT_HANDLER = () => true
const DEFAULT_OBJECT = {}

function Form({
  errors = DEFAULT_OBJECT,
  handleBlur = DEFAULT_HANDLER,
  handleChange = DEFAULT_HANDLER,
  handleSubmit = DEFAULT_HANDLER,
  isSubmitting = false,
  touched = DEFAULT_OBJECT,
  values = DEFAULT_VALUES
}) {
  const { t } = useTranslation()
  return (
    <Box as='form' onSubmit={handleSubmit} margin={{ top: 'small' }}>

      <FormField
        error={errors.login && touched.login && errors.login}
        htmlFor={userNameFieldId}
        label={<FieldLabel>{t('AuthModal.LoginForm.login')}</FieldLabel>}
      >
        <TextInput
          autoComplete='username'
          autoFocus
          disabled={isSubmitting}
          focusIndicator
          id={userNameFieldId}
          name='login'
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={t('AuthModal.LoginForm.placeholder')}
          required
          type='text'
          value={values.login}
        />
      </FormField>

      <FormField
        error={errors.password && touched.password && errors.password}
        htmlFor={passwordFieldId}
        label={<FieldLabel>{t('AuthModal.LoginForm.password')}</FieldLabel>}
      >
        <TextInput
          autocomplete='password'
          disabled={isSubmitting}
          focusIndicator
          id={passwordFieldId}
          name='password'
          onChange={handleChange}
          onBlur={handleBlur}
          required
          type='password'
          value={values.password}
        />
      </FormField>

      <Box align='center' margin={{ bottom: 'small' }}>
        <Anchor href='/reset-password' size='small'>
          <SpacedText>
            {t('AuthModal.LoginForm.forgot')}
          </SpacedText>
        </Anchor>
      </Box>

      <Button
        disabled={isSubmitting}
        label={t('AuthModal.LoginForm.signIn')}
        primary
        type='submit'
      />
    </Box>
  )
}

Form.propTypes = {
  errors: object,
  handleBlur: func,
  handleChange: func,
  handleSubmit: func,
  isSubmitting: bool,
  touched: object,
  values: object
}

export default withCustomFormik(Form)
