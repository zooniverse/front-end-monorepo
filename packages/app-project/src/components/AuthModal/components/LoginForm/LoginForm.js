/* eslint-disable jsx-a11y/no-autofocus */
import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Formik } from 'formik'
import { Anchor, Box, Button, Heading, Text, FormField, TextInput } from 'grommet'
import Link from 'next/link'
import { func } from 'prop-types'
import React from 'react'

import en from './locales/en'
import FieldLabel from '../../shared/components/FieldLabel'

counterpart.registerTranslations('en', en)

const textColors = { }
const userNameFieldId = 'LoginForm_login'
const passwordFieldId = 'LoginForm_password'

function LoginForm (props) {
  const { onSubmit } = props
  return (
    <Box width='medium'>
      <Heading size='small' color={textColors} margin={{ bottom: 'xsmall', top: 'none' }}>
        {counterpart('LoginForm.heading')}
      </Heading>
      <Text color={textColors}>
        {counterpart('LoginForm.instruction')}
      </Text>

      <Formik
        initialValues={{ login: '', password: '' }}
        validate={validateLogin}
        onSubmit={onSubmit}
      >
        {({
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <Box as='form' onSubmit={handleSubmit} margin={{ top: 'small' }}>

            <FormField
              error={errors.login && touched.login && errors.login}
              htmlFor={userNameFieldId}
              label={<FieldLabel>{counterpart('LoginForm.login')}</FieldLabel>}
            >
              <TextInput
                autoFocus
                disabled={isSubmitting}
                id={userNameFieldId}
                name='login'
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder={counterpart('LoginForm.placeholder')}
                type='text'
                value={values.login}
              />
            </FormField>

            <FormField
              error={errors.password && touched.password && errors.password}
              htmlFor={passwordFieldId}
              label={<FieldLabel>{counterpart('LoginForm.password')}</FieldLabel>}
            >
              <TextInput
                disabled={isSubmitting}
                id={passwordFieldId}
                name='password'
                onChange={handleChange}
                onBlur={handleBlur}
                type='password'
                value={values.password}
              />
            </FormField>

            <Box align='center' margin={{ bottom: 'small' }}>
              <Link href='/reset-password' passHref>
                <Anchor size='small'>
                  <SpacedText>
                    {counterpart('LoginForm.forgot')}
                  </SpacedText>
                </Anchor>
              </Link>
            </Box>

            <Button
              disabled={isSubmitting}
              label={counterpart('LoginForm.signIn')}
              primary
              type='submit'
            />
          </Box>
        )}
      </Formik>
    </Box>
  )
}

LoginForm.defaultProps = {
  onSubmit: () => {}
}

LoginForm.propTypes = {
  onSubmit: func.isRequired
}

export default LoginForm

function validateLogin (values) {
  let errors = {}
  if (!values.login) {
    errors.login = 'Required'
  }
  return errors
}
