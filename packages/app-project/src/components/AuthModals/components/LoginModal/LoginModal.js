import counterpart from 'counterpart'
import { Anchor, Box, Button, Form, FormField, Layer, Text, TextInput } from 'grommet'
import { Modal } from '@zooniverse/react-components'
import Link from 'next/link'
import { bool, func, string } from 'prop-types'
import React, { Component } from 'react'

import en from './locales/en'

counterpart.registerTranslations('en', en)

class LoginModal extends Component {
  constructor () {
    super()
    this.firstInput = React.createRef()
  }

  componentDidMount () {
    console.log(this.firstInput)
    // current is coming back null. Why?
    // this.firstInput.current.focus()
  }

  render () {
    const { 
      className,
      closeLoginModal,
      error,
      loading,
      onSubmit
    } = this.props

    return (
      <Modal
        active
        className={className}
        closeFn={closeLoginModal}
        title={counterpart('LoginModal.title')}
      >
        <Box pad='medium'>
          <Form onSubmit={onSubmit}>

            <FormField
              label={counterpart('LoginModal.username')}
              htmlFor='auth-modal-login'
            >
              <TextInput
                disabled={loading}
                id='auth-modal-login'
                name='login'
                ref={this.firstInput}
                required
              />
            </FormField>

            <FormField
              label={counterpart('LoginModal.password')}
              htmlFor='auth-modal-password'
            >
              <TextInput
                disabled={loading}
                id='auth-modal-password'
                name='password'
                type='password'
                required
              />
            </FormField>

            {error && (
              <Box pad='small'>
                <Text>
                  {counterpart(`LoginModal.errors.${error}`)}
                </Text>
              </Box>
            )}
            <Box
              align='center'
              margin={{ top: 'medium' }}
              pad={{ top: 'small' }}
            >
              <Button
                disabled={loading}
                label={counterpart('LoginModal.title')}
                primary
                type='submit'
              />
            </Box>
          </Form>
          <Box align='center' margin={{ top: 'medium' }}>
            <Link href='https://www.zooniverse.org/reset-password' passHref>
              <Anchor size='small'>
                {counterpart('LoginModal.forgetPassword')}
              </Anchor>
            </Link>
          </Box>
        </Box>
      </Modal>
    )
  }
}

LoginModal.propTypes = {
  closeLoginModal: func.isRequired,
  error: string,
  loading: bool.isRequired,
  onSubmit: func.isRequired
}

LoginModal.defaultProps = {
  error: ''
}

export default LoginModal
