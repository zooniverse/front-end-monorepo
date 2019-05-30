import counterpart from 'counterpart'
import React from 'react'
import { Formik } from 'formik'
import { Anchor, Box, Button, CheckBox, Grid, Heading, Text, FormField, TextInput } from 'grommet'
import Link from 'next/link'

import en from './locales/en'
import FieldLabel from '../../shared/components/FieldLabel'

counterpart.registerTranslations('en', en)

const userNameFieldId = 'RegisterForm_username'
const passwordFieldId = 'RegisterForm_password'
const passwordConfirmFieldId = 'RegisterForm_password_confirm'
const emailFieldId = 'RegisterForm_email'
const realNameFieldId = 'RegisterForm_real_name'
const privacyAgreementFieldId = 'RegisterForm_privacy_agreement'
const emailListSignUpFieldId = 'RegisterForm_email_list_sign_up'
const betaListSignUpFieldId = 'RegisterForm_beta_list_sign_up'
const underageWithParentFieldId = 'RegisterForm_underage_with_parent'

const PrivacyPolicyLink = () => (
  <Link href='/privacy' passHref>
    <Anchor size='small'>{counterpart('RegisterForm.privacyLink')}</Anchor>
  </Link>
)

function RegisterForm (props) {
  const { onSubmit } = props
  const initialValues = {
    betaListSignUp: false,
    email: '',
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
        {counterpart('RegisterForm.heading')}
      </Heading>
      <Text>
        {counterpart('RegisterForm.instruction')}
      </Text>

      <Formik
        initialValues={initialValues}
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
              <Grid columns={['1fr', '1fr']} gap='medium'>
                <Box>
                  <FormField
                    error={errors.username && touched.username && errors.username}
                    help={counterpart('RegisterForm.usernameHelp')}
                    htmlFor={userNameFieldId}
                    label={<FieldLabel>{counterpart('RegisterForm.username')}</FieldLabel>}
                    required
                  >
                    <TextInput
                      autoFocus
                      disabled={isSubmitting}
                      id={userNameFieldId}
                      name='username'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder={counterpart('RegisterForm.usernamePlaceholder')}
                      type='text'
                      value={values.username}
                    />
                  </FormField>

                  <FormField
                    error={errors.password && touched.password && errors.password}
                    htmlFor={passwordFieldId}
                    label={<FieldLabel>{counterpart('RegisterForm.password')}</FieldLabel>}
                    required
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

                  <FormField
                    error={errors.passwordConfirm && touched.passwordConfirm && errors.passwordConfirm}
                    htmlFor={passwordConfirmFieldId}
                    label={<FieldLabel>{counterpart('RegisterForm.passwordConfirm')}</FieldLabel>}
                    required
                  >
                    <TextInput
                      disabled={isSubmitting}
                      id={passwordConfirmFieldId}
                      name='password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type='password'
                      value={values.passwordConfirm}
                    />
                  </FormField>
                </Box>

                <Box>
                  <FormField
                    error={errors.email && touched.email && errors.email}
                    htmlFor={emailFieldId}
                    label={<FieldLabel>{counterpart('RegisterForm.email')}</FieldLabel>}
                    required
                  >
                    <TextInput
                      disabled={isSubmitting}
                      id={emailFieldId}
                      name='email'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={counterpart('RegisterForm.emailPlaceholder')}
                      type='email'
                      value={values.email}
                    />
                  </FormField>

                  <FormField
                    error={errors.realName && touched.realName && errors.realName}
                    help={counterpart('RegisterForm.realNameHelp')}
                    htmlFor={realNameFieldId}
                    label={<FieldLabel>{counterpart('RegisterForm.realName')}</FieldLabel>}
                  >
                    <TextInput
                      disabled={isSubmitting}
                      id={realNameFieldId}
                      name='realName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder={counterpart('RegisterForm.realNamePlaceholder')}
                      type='text'
                      value={values.realName}
                    />
                  </FormField>
                </Box>
              </Grid>


              <FormField
                error={errors.privacyAgreement && touched.privacyAgreement && errors.privacyAgreement}
                htmlFor={privacyAgreementFieldId}
                required
              >
                <CheckBox
                  checked={values.privacyAgreement}
                  disabled={isSubmitting}
                  id={privacyAgreementFieldId}
                  label={<Text>{counterpart('RegisterForm.privacyAgreement')}{' '}(<PrivacyPolicyLink />)</Text>}
                  onChange={handleChange}
                />
              </FormField>

              <FormField
                error={errors.emailListSignUp && touched.emailListSignUp && errors.emailListSignUp}
                htmlFor={emailListSignUpFieldId}
              >
                <CheckBox
                  checked={values.emailListSignUp}
                  disabled={isSubmitting}
                  id={emailListSignUpFieldId}
                  label={<Text>{counterpart('RegisterForm.emailListSignUp')}</Text>}
                  onChange={handleChange}
                />
              </FormField>

              <FormField
                error={errors.betaListSignUp && touched.betaListSignUp && errors.betaListSignUp}
                htmlFor={betaListSignUpFieldId}
              >
                <CheckBox
                  checked={values.betaListSignUp}
                  disabled={isSubmitting}
                  id={betaListSignUpFieldId}
                  label={<Text>{counterpart('RegisterForm.betaListSignUp')}</Text>}
                  onChange={handleChange}
                />
              </FormField>

              <FormField
                error={errors.underageWithParent && touched.underageWithParent && errors.underageWithParent}
                htmlFor={underageWithParentFieldId}
              >
                <CheckBox
                  checked={values.underageWithParent}
                  disabled={isSubmitting}
                  id={underageWithParentFieldId}
                  label={<Text>{counterpart('RegisterForm.underageWithParent')}</Text>}
                  onChange={handleChange}
                />
              </FormField>

              <Button
                disabled={isSubmitting}
                label={counterpart('RegisterForm.register')}
                primary
                type='submit'
              />
            </Box>
          )}
      </Formik>
    </Box>
  )
}

RegisterForm.propTypes = {
}

RegisterForm.defaultProps = {
}

export default RegisterForm
