import counterpart from 'counterpart'
import { Box, Button, Form, FormField, Layer, Text } from 'grommet'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import en from './locales/en'
import withOnlyRenderOnBrowser from '../../shared/components/withOnlyRenderOnBrowser'

counterpart.registerTranslations('en', en)

@withOnlyRenderOnBrowser
export default class LoginModal extends Component {
  constructor () {
    super()
    this.firstInput = React.createRef()
  }

  componentDidMount () {
    this.focusOnInput()
  }

  focusOnInput () {
    const firstInputNode = this.firstInput.current.childContainerRef
    const firstInputElement = firstInputNode.querySelector('input')
    firstInputElement.focus()
  }

  render () {
    const {
      closeLoginModal,
      error,
      loading,
      onSubmit
    } = this.props

    return (
      <Layer
        onClickOutside={closeLoginModal}
        onEsc={closeLoginModal}
      >
        <Box pad='medium'>
          <Form onSubmit={onSubmit}>
            <FormField
              disabled={loading}
              label={counterpart('LoginModal.username')}
              name='login'
              ref={this.firstInput}
              required
            />
            <FormField
              disabled={loading}
              label={counterpart('LoginModal.password')}
              name='password'
              required
            />
            {error && (
              <Box pad='small'>
                <Text>
                  {counterpart(`LoginModal.errors.${error}`)}
                </Text>
              </Box>
            )}
            <Box align='center' margin={{ top: 'medium' }}>
              <Button
                disabled={loading}
                type='submit'
                label={counterpart('LoginModal.login')}
                primary
              />
            </Box>
          </Form>
        </Box>
      </Layer>
    )
  }
}

LoginModal.propTypes = {
  closeLoginModal: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

LoginModal.defaultProps = {
  error: ''
}
