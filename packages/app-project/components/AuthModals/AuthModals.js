import PropTypes from 'prop-types'
import React from 'react'

import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'

export default function AuthModals (props) {
  const {
    closeLoginModal,
    closeRegisterModal,
    showLoginModal,
    showRegisterModal
  } = props

  return (
    <>
      {showLoginModal && (
        <LoginModal closeLoginModal={closeLoginModal} />
      )}
      {showRegisterModal && (
        <RegisterModal closeRegisterModal={closeRegisterModal} />
      )}
    </>
  )
}

AuthModals.propTypes = {
  showLoginModal: PropTypes.bool,
  showRegisterModal: PropTypes.bool
}

AuthModals.defaultProps = {
  showLoginModal: false,
  showRegisterModal: false
}
