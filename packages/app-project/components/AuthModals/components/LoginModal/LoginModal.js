import counterpart from 'counterpart'
import { Box, Button, FormField, Layer, TextInput } from 'grommet'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import en from './locales/en'

counterpart.registerTranslations('en', en)

export default class LoginModal extends Component {
  constructor () {
    super()
    this.firstInput = React.createRef()
  }

  componentDidMount () {
    this.firstInput.current.focus()
  }

  render () {
    const {
      canLogin,
      closeLoginModal,
      formState,
      loading,
      updateField,
      submit
    } = this.props

    return (
      <Layer
        onClickOutside={closeLoginModal}
        onEsc={closeLoginModal}
      >
        <Box pad='medium'>
          <FormField
            htmlFor='login-modal-login'
            label={counterpart('LoginModal.username')}
            name='login'
          >
            <TextInput
              disabled={loading}
              id='login-modal-login'
              name='login'
              onChange={updateField}
              ref={this.firstInput}
              value={formState.login}
            />
          </FormField>
          <FormField
            htmlFor='login-modal-password'
            label={counterpart('LoginModal.password')}
            name='login'
          >
            <TextInput
              disabled={loading}
              id='login-modal-password'
              name='password'
              onChange={updateField}
              type='password'
              value={formState.password}
            />
          </FormField>
          <Button
            disabled={!canLogin || loading}
            label={counterpart('LoginModal.login')}
            onClick={submit}
          />
        </Box>
      </Layer>
    )
  }
}

LoginModal.propTypes = {
  formState: PropTypes.shape({
    login: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  submit: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired,
}
