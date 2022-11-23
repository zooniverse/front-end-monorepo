import auth from 'panoptes-client/lib/auth'
import { inject, observer } from 'mobx-react'
import { func, shape } from 'prop-types'
import { Component } from 'react'
import counterpart from 'counterpart'

import LoginForm from './LoginForm'
import en from './locales/en'

counterpart.registerTranslations('en', en)

class LoginFormContainer extends Component {
  constructor () {
    super()
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      error: ''
    }
  }

  onSubmit (values, { setFieldError, setSubmitting }) {
    if (this.state.error) this.setState({ error: '' })
    const { authClient, store } = this.props
    return authClient.signIn(values)
      .then(userResource => {
        setSubmitting(false)
        store.user.set(userResource)
        this.props.closeModal()
      })
      .catch(error => {
        console.error(error)
        if (error && error.message === 'Invalid email or password.') {
          const errorMessage = counterpart('LoginForm.error')
          setFieldError('login', errorMessage)
          setFieldError('password', errorMessage)
        } else {
          this.setState({ error: error.message })
        }

        setSubmitting(false)
      })
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

const DecoratedLoginFormContainer = inject('store')(observer(LoginFormContainer))

export default DecoratedLoginFormContainer
export { LoginFormContainer }
