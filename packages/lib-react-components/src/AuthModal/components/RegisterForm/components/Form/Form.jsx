import { bool, func, object } from 'prop-types'
import {
  Anchor,
  Box,
  Button,
  CheckBox,
  FormField,
  Grid,
  ResponsiveContext,
  Text,
  TextInput
} from 'grommet'
import { useContext } from 'react'

import FieldLabel from '../../../../shared/components/FieldLabel'
import withCustomFormik from '../../../../../helpers/withCustomFormik'
import { useTranslation } from '../../../../../translations/i18n'

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

const PrivacyPolicyLink = () => {
  const { t } = useTranslation()
  return (
    <Anchor href='/privacy' size='small'>{t('AuthModal.RegisterForm.privacyLink')}</Anchor>
  )
}

// default form field box layout.
const contentProps = {
  direction: 'row',
  gap: 'xsmall'
}

const DEFAULT_VALUES = {
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
const DEFAULT_HANDLER = () => true
const DEFAULT_OBJECT = {}

function Form({
  errors = DEFAULT_OBJECT,
  handleBlur = DEFAULT_HANDLER,
  handleChange = DEFAULT_HANDLER,
  handleSubmit = DEFAULT_HANDLER,
  isSubmitting = false,
  values = DEFAULT_VALUES
}) {
  const { t } = useTranslation()
  const size = useContext(ResponsiveContext)

  const userNameFieldHelp = (values.underageWithParent)
    ? t('AuthModal.RegisterForm.underageNotRealName')
    : t('AuthModal.RegisterForm.usernameHelp')
  const privacyAgreementLabel = (values.underageWithParent)
    ? <Text>{t('AuthModal.RegisterForm.underageConsent')}</Text>
    : <Text>{t('AuthModal.RegisterForm.privacyAgreement')}</Text>
  const emailListSignUpLabel = (values.underageWithParent)
    ? <Text>{t('AuthModal.RegisterForm.underageEmailSignUp')}</Text>
    : <Text>{t('AuthModal.RegisterForm.emailListSignUp')}</Text>
  const emailInputLabel = (values.underageWithParent)
    ? <FieldLabel>{t('AuthModal.RegisterForm.underageEmail')}</FieldLabel>
    : <FieldLabel>{t('AuthModal.RegisterForm.email')}</FieldLabel>

  return (
    <Box as='form' onSubmit={handleSubmit} margin={{ top: 'small' }}>
      <Box>
        <FormField htmlFor={underageWithParentFieldId}>
          <CheckBox
            autoFocus
            checked={values.underageWithParent}
            disabled={isSubmitting}
            focusIndicator
            id={underageWithParentFieldId}
            label={<Text>{t('AuthModal.RegisterForm.underageWithParent')}</Text>}
            name='underageWithParent'
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormField>
      </Box>
      <Grid columns={size === 'small' ? ['1fr'] : ['1fr', '1fr']} gap='medium'>
        <Box>
          <FormField
            error={errors.username}
            help={userNameFieldHelp}
            htmlFor={userNameFieldId}
            label={<FieldLabel>{t('AuthModal.RegisterForm.username')}</FieldLabel>}
            required
          >
            <TextInput
              autoComplete='username'
              disabled={isSubmitting}
              focusIndicator
              id={userNameFieldId}
              name='username'
              onBlur={handleBlur}
              onChange={handleChange}
              pattern='[a-zA-Z0-9_\-.]+'
              placeholder={t('AuthModal.RegisterForm.usernamePlaceholder')}
              required
              title={t('AuthModal.RegisterForm.usernamePatternHelp')}
              type='text'
              value={values.username}
            />
          </FormField>

          <FormField
            htmlFor={passwordFieldId}
            label={<FieldLabel>{t('AuthModal.RegisterForm.password')}</FieldLabel>}
            required
          >
            <TextInput
              autoComplete='new-password'
              disabled={isSubmitting}
              focusIndicator
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
            label={
              <FieldLabel>
                {t('AuthModal.RegisterForm.passwordConfirm')}
              </FieldLabel>
            }
            required
          >
            <TextInput
              autoComplete='password'
              disabled={isSubmitting}
              focusIndicator
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
            label={emailInputLabel}
            required
          >
            <TextInput
              autoComplete='email'
              disabled={isSubmitting}
              focusIndicator
              id={emailFieldId}
              name='email'
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={t('AuthModal.RegisterForm.emailPlaceholder')}
              required
              type='email'
              value={values.email}
            />
          </FormField>

          <FormField
            error={errors.emailConfirm}
            htmlFor={emailConfirmFieldId}
            label={
              <FieldLabel>
                {t('AuthModal.RegisterForm.emailConfirm')}
              </FieldLabel>
            }
            required
          >
            <TextInput
              autoComplete='email'
              disabled={isSubmitting}
              focusIndicator
              id={emailConfirmFieldId}
              name='emailConfirm'
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={t('AuthModal.RegisterForm.emailPlaceholder')}
              required
              type='email'
              value={values.emailConfirm}
            />
          </FormField>

          <FormField
            help={t('AuthModal.RegisterForm.realNameHelp')}
            htmlFor={realNameFieldId}
            label={<FieldLabel>{t('AuthModal.RegisterForm.realName')}</FieldLabel>}
          >
            <TextInput
              autoComplete='name'
              disabled={isSubmitting}
              focusIndicator
              id={realNameFieldId}
              name='realName'
              onChange={handleChange}
              onBlur={handleBlur}
              pattern='[^@]+'
              placeholder={t('AuthModal.RegisterForm.realNamePlaceholder')}
              title={t('AuthModal.RegisterForm.realNamePatternHelp')}
              type='text'
              value={values.realName}
            />
          </FormField>
        </Box>
      </Grid>

      <Box margin={{ top: 'xsmall' }}>
        <FormField
          contentProps={contentProps}
          error={errors.privacyAgreement}
          htmlFor={privacyAgreementFieldId}
          required
        >
          <CheckBox
            checked={values.privacyAgreement}
            disabled={isSubmitting}
            focusIndicator
            id={privacyAgreementFieldId}
            label={privacyAgreementLabel}
            name='privacyAgreement'
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <Text>
            (<PrivacyPolicyLink />)
          </Text>
        </FormField>

        <FormField htmlFor={emailListSignUpFieldId}>
          <CheckBox
            checked={values.emailListSignUp}
            disabled={isSubmitting}
            focusIndicator
            id={emailListSignUpFieldId}
            label={emailListSignUpLabel}
            name='emailListSignUp'
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormField>

        <FormField htmlFor={betaListSignUpFieldId}>
          <CheckBox
            checked={values.betaListSignUp}
            disabled={isSubmitting}
            focusIndicator
            id={betaListSignUpFieldId}
            label={<Text>{t('AuthModal.RegisterForm.betaListSignUp')}</Text>}
            name='betaListSignUp'
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormField>
      </Box>

      <Button
        disabled={isSubmitting}
        label={
          isSubmitting
            ? t('AuthModal.RegisterForm.registering')
            : t('AuthModal.RegisterForm.register')
        }
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
  values: object
}

export default withCustomFormik(Form)
