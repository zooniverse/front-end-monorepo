import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'

import RegisterModal from './RegisterModal'

@inject('store')
@observer
class RegisterModalContainer extends Component {
  render () {
    return (
      <RegisterModal />
    )
  }
}

RegisterModalContainer.propTypes = {
}

RegisterModalContainer.defaultProps = {
}

export default RegisterModalContainer
