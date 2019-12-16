import auth from 'panoptes-client/lib/auth'
import { inject, observer } from 'mobx-react'
import { func, shape } from 'prop-types'
import React, { Component } from 'react'
import counterpart from 'counterpart'

import LoginForm from './LoginForm'
import en from './locales/en'

counterpart.registerTranslations('en', en)

function storeMapper(stores) {
  const { client } = stores.store.auth
  const userStore = stores.store.user
  return {
    authClient: client,
    userStore
  }
}

class LoginFormContainer extends Component {
  constructor () {
    super()
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      error: ''
    }
  }

  async onSubmit (values, { setFieldError, setSubmitting }) {
    if (this.state.error) {
      this.setState({ error: '' })
    }

    try {
      const { authClient, userStore } = this.props
      const userResource = await authClient.signIn(values)
      userStore.set(userResource)
      this.props.closeModal()
      setSubmitting(false)
    } catch (error) {
      console.error(error)
      if (error && error.message === 'Invalid email or password.') {
        const errorMessage = counterpart('LoginForm.error')
        setFieldError('login', errorMessage)
        setFieldError('password', errorMessage)
      } else {
        this.setState({ error: error.message })
      }
      setSubmitting(false)
    }
  }

  render () {
    return (
      <LoginForm generalError={this.state.error} onSubmit={this.onSubmit} />
    )
  }
}

LoginFormContainer.propTypes = {
  authClient: shape({
    signIn: func
  }),
  closeModal: func.isRequired,
  store: shape({
    user: shape({
      set: func
    })
  })
}

LoginFormContainer.defaultProps = {
  authClient: auth,
  closeModal: () => {}
}

@inject(storeMapper)
@observer
class DecoratedLoginFormContainer extends LoginFormContainer { }

export default DecoratedLoginFormContainer
export { LoginFormContainer }
