import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import AuthModals from './AuthModals'

@inject('store')
@observer
class AuthModalsContainer extends Component {
  render () {
    return (
      <AuthModals />
    )
  }
}

AuthModalsContainer.propTypes = {
}

AuthModalsContainer.defaultProps = {
}

export default AuthModalsContainer
