import React from 'react';
import PropTypes from 'prop-types';

import MobileNavigationMenu from './mobile-navigation-menu';
import LoginButton from './login-button';
import OauthModal from './oauth-modal';

// TO DO: Add registration button if useOauth is false

export default function SignedOutUserNavigation(props) {
  return (
    <div>
      <LoginButton toggleModal={props.toggleModal} />
      {props.useOauth &&
        <OauthModal
          login={props.login}
          loginWithGoogle={props.loginWithGoogle}
          onClose={props.toggleModal}
          showOauthModal={props.showOauthModal}
        />}
      <MobileNavigationMenu adminNavLink={props.adminNavLink} mobileNavList={props.mobileNavList} />
    </div>
  );
}

SignedOutUserNavigation.defaultProps = {
  login: () => {},
  loginWithGoogle: null,
  showOauthModal: false,
  toggleModal: () => {},
  useOauth: false
};

SignedOutUserNavigation.propTypes = {
  login: PropTypes.func,
  loginWithGoogle: PropTypes.func,
  showOauthModal: PropTypes.bool,
  toggleModal: PropTypes.func,
  useOauth: PropTypes.bool
}
