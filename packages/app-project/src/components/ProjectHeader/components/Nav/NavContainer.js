import { inject, observer } from 'mobx-react'
import { bool } from 'prop-types'
import React, { Component } from 'react'

import Nav from './Nav'

function storeMapper (stores) {
  return {
    isLoggedIn: stores.store.user.isLoggedIn
  }
}

@inject(storeMapper)
@observer
class NavContainer extends Component {
  render () {
    return (
      <Nav isLoggedIn={this.props.isLoggedIn} />
    )
  }
}

NavContainer.propTypes = {
  isLoggedIn: bool
}

NavContainer.defaultProps = {
  isLoggedIn: false
}

export default NavContainer
