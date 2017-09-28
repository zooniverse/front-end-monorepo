import React from 'react';
import PropTypes from 'prop-types';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Layer from 'grommet/components/Layer';

const OauthModal = (props) => {
  if (props.showOauthModal) {
    return (
      <Layer className="oauth-modal" align="center" closer={true} onClose={props.onClose}>
        <Box pad="medium" justify="between">
          <Heading tag="h2">{props.heading}</Heading>
          <Button className="oauth-modal__button--panoptes" label={props.signInLabel} onClick={props.login} primary={true} />
          <Button className="oauth-modal__button--google" onClick={props.loginWithGoogle} plain={true}>
            <img className="oauth-modal__google-logo" src="../images/btn_google_dark_normal_ios.svg" alt="" />
            {props.signInGoogleLabel}
          </Button>
        </Box>
      </Layer>
    );
  }

  return null;
};

OauthModal.defaultProps = {
  heading: 'Sign In',
  login: () => {},
  loginWithGoogle: () => {},
  onClose: () => {},
  showOauthModal: false,
  signInGoogleLabel: 'Sign in with Google',
  signInLabel: 'Sign in or Register'
};

OauthModal.propTypes = {
  heading: PropTypes.string,
  login: PropTypes.func,
  loginWithGoogle: PropTypes.func,
  onClose: PropTypes.func,
  showOauthModal: PropTypes.bool,
  signInGoogleLabel: PropTypes.string,
  signInLabel: PropTypes.string
};

export default OauthModal;
