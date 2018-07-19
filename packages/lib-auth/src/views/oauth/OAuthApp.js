import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import LoginPopup from './components/LoginPopup'
import LogoutPopup from './components/LogoutPopup'
import TimeoutPopup from './components/TimeoutPopup'
import TimeoutWarningPopup from './components/TimeoutWarningPopup'

function storeMapper (stores) {
  return {
    store: stores.store.ui
  }
}

@inject(storeMapper)
@observer
class OAuthApp extends React.Component {
  render () {
    const {
      reset,
      showLoginPopup,
      showLogoutPopup,
      showTimeoutPopup,
      showTimeoutWarningPopup,
    } = this.props.store

    if (showLoginPopup) {
      return <LoginPopup closeFn={reset} />
    }

    if (showTimeoutPopup) {
      return <TimeoutPopup closeFn={reset} />
    }
    
    if (showTimeoutWarningPopup) {
      return <TimeoutWarningPopup closeFn={reset} />
    }


    if (showLogoutPopup) {
      return <LogoutPopup closeFn={reset} />
    }

    return null
  }
}

OAuthApp.propTypes = {
  store: PropTypes.shape({
    reset: PropTypes.func,
    showLoginPopup: PropTypes.bool,
    showLogoutPopup: PropTypes.bool,
    showTimeoutPopup: PropTypes.bool,
    showTimeoutWarningPopup: PropTypes.bool,
  })
}

OAuthApp.defaultProps = {
  store: {
    showLoginPopup: false,
    showLogoutPopup: false,
    showTimeoutPopup: false,
    showTimeoutWarningPopup: false,
  }
}

export default OAuthApp
