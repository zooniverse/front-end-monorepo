import counterpart from 'counterpart'
import React from 'react'
import PropTypes from 'prop-types'
import { Anchor, Box, Button, CheckBox, Grid, Text, FormField, TextInput } from 'grommet'
import styled from 'styled-components'
import Link from 'next/link'
import FieldLabel from '../../../../shared/components/FieldLabel'
import withFormik from '../../../../shared/components/withFormik'
import en from '../../locales/en'

counterpart.registerTranslations('en', en)

export const userNameFieldId = 'RegisterForm_username'
export const passwordFieldId = 'RegisterForm_password'
export const passwordConfirmFieldId = 'RegisterForm_password_confirm'
export const emailFieldId = 'RegisterForm_email'
export const emailConfirmFieldId = 'RegisterForm_email_confirm'
export const realNameFieldId = 'RegisterForm_real_name'
export const privacyAgreementFieldId = 'RegisterForm_privacy_agreement'
export const emailListSignUpFieldId = 'RegisterForm_email_list_sign_up'
export const betaListSignUpFieldId = 'RegisterForm_beta_list_sign_up'
export const underageWithParentFieldId = 'RegisterForm_underage_with_parent'

const PrivacyPolicyLink = () => (
  <Link href='/privacy' passHref>
    <Anchor size='small'>{counterpart('RegisterForm.privacyLink')}</Anchor>
  </Link>
)

const CheckBoxFormField = styled(FormField)`
  > div {
    border-color: transparent;
  }
`

function Form ({ errors, onBlurEvent, onChangeEvent, onSubmitEvent, isSubmitting, values }) {
  const userNameFieldHelp = (values.underageWithParent)
    ? counterpart('RegisterForm.underageNotRealName')
    : counterpart('RegisterForm.usernameHelp')
  const privacyAgreementLabel = (values.underageWithParent)
    ? <Text>{counterpart('RegisterForm.underageConsent')}{' '}(<PrivacyPolicyLink />)</Text>
    : <Text>{counterpart('RegisterForm.privacyAgreement')}{' '}(<PrivacyPolicyLink />)</Text>
  const emailListSignUpLabel = (values.underageWithParent)
    ? <Text>{counterpart('RegisterForm.underageEmailSignUp')}</Text>
    : <Text>{counterpart('RegisterForm.emailListSignUp')}</Text>
  const emailInputLabel = (values.underageWithParent)
    ? <FieldLabel>{counterpart('RegisterForm.underageEmail')}</FieldLabel>
    : <FieldLabel>{counterpart('RegisterForm.email')}</FieldLabel>

  return (
    <Box as='form' onSubmit={onSubmitEvent} margin={{ top: 'small' }}>
      <Box>
        <CheckBoxFormField
          htmlFor={underageWithParentFieldId}
        >
          <CheckBox
            checked={values.underageWithParent}
            disabled={isSubmitting}
            id={underageWithParentFieldId}
            label={<Text>{counterpart('RegisterForm.underageWithParent')}</Text>}
            name='underageWithParent'
            onChange={onChangeEvent}
            onBlur={onBlurEvent}
          />
        </CheckBoxFormField>
      </Box>
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
              onBlur={onBlurEvent}
              onChange={onChangeEvent}
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
              onChange={onChangeEvent}
              onBlur={onBlurEvent}
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
              onChange={onChangeEvent}
              onBlur={onBlurEvent}
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
            label={emailInputLabel}
            required
          >
            <TextInput
              disabled={isSubmitting}
              id={emailFieldId}
              name='email'
              onChange={onChangeEvent}
              onBlur={onBlurEvent}
              placeholder={counterpart('RegisterForm.emailPlaceholder')}
              required
              type='email'
              value={values.email}
            />
          </FormField>

          <FormField
            error={errors.emailConfirm}
            htmlFor={emailConfirmFieldId}
            label={<FieldLabel>{counterpart('RegisterForm.emailConfirm')}</FieldLabel>}
            required
          >
            <TextInput
              disabled={isSubmitting}
              id={emailConfirmFieldId}
              name='emailConfirm'
              onChange={onChangeEvent}
              onBlur={onBlurEvent}
              placeholder={counterpart('RegisterForm.emailPlaceholder')}
              required
              type='email'
              value={values.emailConfirm}
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
              onChange={onChangeEvent}
              onBlur={onBlurEvent}
              placeholder={counterpart('RegisterForm.realNamePlaceholder')}
              type='text'
              value={values.realName}
            />
          </FormField>
        </Box>
      </Grid>

      <Box margin={{ top: 'xsmall' }}>
        <CheckBoxFormField
          error={errors.privacyAgreement}
          htmlFor={privacyAgreementFieldId}
          required
        >
          <CheckBox
            checked={values.privacyAgreement}
            disabled={isSubmitting}
            id={privacyAgreementFieldId}
            label={privacyAgreementLabel}
            name='privacyAgreement'
            onChange={onChangeEvent}
            onBlur={onBlurEvent}
            required
          />
        </CheckBoxFormField>

        <CheckBoxFormField
          htmlFor={emailListSignUpFieldId}
        >
          <CheckBox
            checked={values.emailListSignUp}
            disabled={isSubmitting}
            id={emailListSignUpFieldId}
            label={emailListSignUpLabel}
            name='emailListSignUp'
            onChange={onChangeEvent}
            onBlur={onBlurEvent}
          />
        </CheckBoxFormField>

        <CheckBoxFormField
          htmlFor={betaListSignUpFieldId}
        >
          <CheckBox
            checked={values.betaListSignUp}
            disabled={isSubmitting}
            id={betaListSignUpFieldId}
            label={<Text>{counterpart('RegisterForm.betaListSignUp')}</Text>}
            name='betaListSignUp'
            onChange={onChangeEvent}
            onBlur={onBlurEvent}
          />
        </CheckBoxFormField>
      </Box>

      <Button
        disabled={isSubmitting}
        label={(isSubmitting) ? counterpart('RegisterForm.registering') : counterpart('RegisterForm.register')}
        primary
        type='submit'
      />
    </Box>
  )
}

Form.defaultProps = {
  errors: {},
  onBlurEvent: () => {},
  onChangeEvent: () => {},
  onSubmitEvent: () => {},
  isSubmitting: false,
  values: {
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
}

Form.propTypes = {
  errors: PropTypes.object,
  onBlurEvent: PropTypes.func,
  onChangeEvent: PropTypes.func,
  onSubmitEvent: PropTypes.func,
  isSubmitting: PropTypes.bool,
  values: PropTypes.object
}

export default withFormik(Form)
export { Form }
