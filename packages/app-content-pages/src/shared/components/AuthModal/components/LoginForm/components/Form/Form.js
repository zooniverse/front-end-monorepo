/* eslint-disable jsx-a11y/no-autofocus */
import { SpacedText } from '@zooniverse/react-components'
import withCustomFormik from '@zooniverse/react-components/helpers/withCustomFormik'
import { Anchor, Box, Button, FormField, TextInput } from 'grommet'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'

import FieldLabel from '../../../../shared/components/FieldLabel'

export const userNameFieldId = 'LoginForm_login'
export const passwordFieldId = 'LoginForm_password'

function Form ({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) {
  const { t } = useTranslation('components')
  return (
    <Box as='form' onSubmit={handleSubmit} margin={{ top: 'small' }}>

      <FormField
        error={errors.login && touched.login && errors.login}
        htmlFor={userNameFieldId}
        label={<FieldLabel>{t('LoginForm.login')}</FieldLabel>}
      >
        <TextInput
          autoFocus
          disabled={isSubmitting}
          id={userNameFieldId}
          name='login'
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder={t('LoginForm.placeholder')}
          required
          type='text'
          value={values.login}
        />
      </FormField>

      <FormField
        error={errors.password && touched.password && errors.password}
        htmlFor={passwordFieldId}
        label={<FieldLabel>{t('LoginForm.password')}</FieldLabel>}
      >
        <TextInput
          disabled={isSubmitting}
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
        <Link href='/reset-password' passHref>
          <Anchor size='small'>
            <SpacedText>
              {t('LoginForm.forgot')}
            </SpacedText>
          </Anchor>
        </Link>
      </Box>

      <Button
        disabled={isSubmitting}
        label={t('LoginForm.signIn')}
        primary
        type='submit'
      />
    </Box>
  )
}

Form.defaultProps = {
  errors: {},
  handleBlur: () => { },
  handleChange: () => { },
  handleSubmit: () => { },
  isSubmitting: false,
  touched: {},
  values: {
    login: '',
    password: ''
  }
}

Form.propTypes = {
  errors: PropTypes.object,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  touched: PropTypes.object,
  values: PropTypes.object
}

export default withCustomFormik(Form)
export { Form }