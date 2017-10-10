'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Box = require('grommet/components/Box');

var _Box2 = _interopRequireDefault(_Box);

var _Heading = require('grommet/components/Heading');

var _Heading2 = _interopRequireDefault(_Heading);

var _Button = require('grommet/components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Layer = require('grommet/components/Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _oauthGoogleIcon = require('./oauth-google-icon');

var _oauthGoogleIcon2 = _interopRequireDefault(_oauthGoogleIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OauthModal = function OauthModal(props) {
  if (props.showOauthModal) {
    return _react2.default.createElement(
      _Layer2.default,
      { className: 'oauth-modal', align: 'center', closer: true, onClose: props.onClose },
      _react2.default.createElement(
        _Box2.default,
        { pad: 'medium', justify: 'between' },
        _react2.default.createElement(
          _Heading2.default,
          { tag: 'h2' },
          props.heading
        ),
        _react2.default.createElement(_Button2.default, { className: 'oauth-modal__button--panoptes', label: props.signInLabel, onClick: props.login, primary: true }),
        _react2.default.createElement(
          _Button2.default,
          { className: 'oauth-modal__button--google', onClick: props.loginWithGoogle, plain: true },
          _react2.default.createElement(_oauthGoogleIcon2.default, { className: 'oauth-modal__google-icon' }),
          _react2.default.createElement(
            'span',
            { className: 'oauth-modal__google-label' },
            props.signInGoogleLabel
          )
        )
      )
    );
  }

  return null;
};

OauthModal.defaultProps = {
  heading: 'Sign In',
  login: function login() {},
  loginWithGoogle: function loginWithGoogle() {},
  onClose: function onClose() {},
  showOauthModal: false,
  signInGoogleLabel: 'Sign in with Google',
  signInLabel: 'Sign in or Register'
};

OauthModal.propTypes = {
  heading: _propTypes2.default.string,
  login: _propTypes2.default.func,
  loginWithGoogle: _propTypes2.default.func,
  onClose: _propTypes2.default.func,
  showOauthModal: _propTypes2.default.bool,
  signInGoogleLabel: _propTypes2.default.string,
  signInLabel: _propTypes2.default.string
};

exports.default = OauthModal;