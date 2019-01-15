import counterpart from 'counterpart'
import { Box, Button, FormField, Layer, TextInput } from 'grommet'
import PropTypes from 'prop-types'
import React from 'react'

import en from './locales/en'

counterpart.registerTranslations('en', en)

export default function LoginModal (props) {
  const { canLogin, closeLoginModal, formState, updateField, submit } = props
  return (
    <Layer onClickOutside={closeLoginModal}>
      <Box pad='medium'>
        <FormField
          htmlFor='login-modal-login'
          label='Username or e-mail address'
          name='login'
        >
          <TextInput
            id='login-modal-login'
            name='login'
            onChange={updateField}
            value={formState.login}
          />
        </FormField>
        <FormField
          htmlFor='login-modal-password'
          label='Password'
          name='login'
        >
          <TextInput
            id='login-modal-password'
            name='password'
            onChange={updateField}
            type='password'
            value={formState.password}
          />
        </FormField>
        <Button
          disabled={!canLogin}
          label='Login'
          onClick={submit}
        />
      </Box>
    </Layer>
  )
}

LoginModal.propTypes = {
  formState: PropTypes.shape({
    login: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  submit: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired,
}
