import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Formik } from 'formik'
import { Anchor, Box, Button, Heading, Text, FormField, TextInput } from 'grommet'
import Link from 'next/link'
import { func } from 'prop-types'
import React from 'react'

import en from './locales/en'

counterpart.registerTranslations('en', en)

const userNameFieldId = 'LoginForm_login'
const passwordFieldId =  'LoginForm_password'

const textColors = { dark: 'white', light: 'black' }

const Label = (props) => (
  <SpacedText
    color={textColors}
    weight='bold'
    {...props}
  />
)

function LoginForm (props) {
  const { onSubmit } = props
  return (
    <Box>
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
          values,
          /* and other goodies */
        }) => (
          <Box as='form' onSubmit={handleSubmit} margin={{ top: 'small' }}>

            <FormField
              error={errors.login && touched.login && errors.login}
              htmlFor={userNameFieldId}
              label={<Label>{counterpart('LoginForm.login')}</Label>}
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
              label={<Label>{counterpart('LoginForm.password')}</Label>}
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
  onSubmit: func
}

export default LoginForm

function validateLogin (values) {
  let errors = {}
  if (!values.login) {
    errors.login = 'Required'
  }
  return errors
}
