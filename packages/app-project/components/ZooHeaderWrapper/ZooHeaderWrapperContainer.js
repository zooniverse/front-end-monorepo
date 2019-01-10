import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ZooHeader } from '@zooniverse/react-components'

@inject('store')
@observer
export default class ZooHeaderWrapperContainer extends Component {
  createUserProp () {
    const { user } = this.props.store
    return (user.isLoggedIn)
      ? {
          display_name: user.display_name
        }
      : {}
  }

  render () {
    const user = this.createUserProp()
    return (
      <ZooHeader
        user={user}
        signIn={() => console.log('signIn')}
        signOut={() => console.log('signOut')}
      />
    )
  }
}
