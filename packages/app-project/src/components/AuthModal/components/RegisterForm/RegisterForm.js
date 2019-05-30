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
  const { validate, onSubmit } = props
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
        validate={validate}
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
        }) => {
          const userNameFieldHelp = (values.underageWithParent) ?
            `${counterpart('RegisterForm.usernameHelp')} ${counterpart('RegisterForm.underageNotRealName')}` :
            counterpart('RegisterForm.usernameHelp')
          const privacyAgreementLabel = (values.underageWithParent) ?
            <Text>{counterpart('RegisterForm.underageConsent')}{' '}(<PrivacyPolicyLink />)</Text> :
            <Text>{counterpart('RegisterForm.privacyAgreement')}{' '}(<PrivacyPolicyLink />)</Text>
          const emailListSignUpLabel = (values.underageWithParent) ?
            <Text>{counterpart('RegisterForm.underageEmail')}</Text> :
            <Text>{counterpart('RegisterForm.emailListSignUp')}</Text>

          console.log('validationerrors', errors, touched)
          return (
            <Box as='form' onSubmit={handleSubmit} margin={{ top: 'small' }}>
              <Grid columns={['1fr', '1fr']} gap='medium'>
                <Box>
                  <FormField
                    error={errors.username}
                    help={userNameFieldHelp}
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
                      pattern='[a-zA-Z0-9_\-.]+'
                      placeholder={counterpart('RegisterForm.usernamePlaceholder')}
                      required
                      title={counterpart('RegisterForm.usernamePatternHelp')}
                      type='text'
                      value={values.username}
                    />
                  </FormField>

                  <FormField
                    htmlFor={passwordFieldId}
                    label={<FieldLabel>{counterpart('RegisterForm.password')}</FieldLabel>}
                    required
                  >
                    <TextInput
                      disabled={isSubmitting}
                      id={passwordFieldId}
                      minLength={8}
                      name='password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      type='password'
                      value={values.password}
                    />
                  </FormField>

                  <FormField
                    error={errors.passwordConfirm}
                    htmlFor={passwordConfirmFieldId}
                    label={<FieldLabel>{counterpart('RegisterForm.passwordConfirm')}</FieldLabel>}
                    required
                  >
                    <TextInput
                      disabled={isSubmitting}
                      id={passwordConfirmFieldId}
                      minLength={8}
                      name='passwordConfirm'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      type='password'
                      value={values.passwordConfirm}
                    />
                  </FormField>
                </Box>

                <Box>
                  <FormField
                    error={errors.email}
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
                      required
                      type='email'
                      value={values.email}
                    />
                  </FormField>

                  <FormField
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

              <Box margin={{ top: 'xsmall' }}>
                <FormField
                  htmlFor={privacyAgreementFieldId}
                  required
                >
                  <CheckBox
                    checked={values.privacyAgreement}
                    disabled={isSubmitting}
                    id={privacyAgreementFieldId}
                    label={privacyAgreementLabel}
                    name="privacyAgreement"
                    onChange={handleChange}
                    required
                  />
                </FormField>

                <FormField
                  htmlFor={emailListSignUpFieldId}
                >
                  <CheckBox
                    checked={values.emailListSignUp}
                    disabled={isSubmitting}
                    id={emailListSignUpFieldId}
                    label={emailListSignUpLabel}
                    name="emailListSignUp"
                    onChange={handleChange}
                  />
                </FormField>

                <FormField
                  htmlFor={betaListSignUpFieldId}
                >
                  <CheckBox
                    checked={values.betaListSignUp}
                    disabled={isSubmitting}
                    id={betaListSignUpFieldId}
                    label={<Text>{counterpart('RegisterForm.betaListSignUp')}</Text>}
                    name="betaListSignUp"
                    onChange={handleChange}
                  />
                </FormField>

                <FormField
                  htmlFor={underageWithParentFieldId}
                >
                  <CheckBox
                    checked={values.underageWithParent}
                    disabled={isSubmitting}
                    id={underageWithParentFieldId}
                    label={<Text>{counterpart('RegisterForm.underageWithParent')}</Text>}
                    name="underageWithParent"
                    onChange={handleChange}
                  />
                </FormField>
              </Box>

              <Button
                disabled={isSubmitting}
                label={counterpart('RegisterForm.register')}
                primary
                type='submit'
              />
            </Box>
          )}}
      </Formik>
    </Box>
  )
}

RegisterForm.propTypes = {
}

RegisterForm.defaultProps = {
}

export default RegisterForm
