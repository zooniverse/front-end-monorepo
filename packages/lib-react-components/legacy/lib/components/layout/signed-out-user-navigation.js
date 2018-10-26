'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SignedOutUserNavigation;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobileNavigationMenu = require('./mobile-navigation-menu');

var _mobileNavigationMenu2 = _interopRequireDefault(_mobileNavigationMenu);

var _loginButton = require('./login-button');

var _loginButton2 = _interopRequireDefault(_loginButton);

var _oauthModal = require('./oauth-modal');

var _oauthModal2 = _interopRequireDefault(_oauthModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TO DO: Add registration button if useOauth is false

function SignedOutUserNavigation(props) {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_loginButton2.default, { toggleModal: props.toggleModal }),
    props.useOauth && _react2.default.createElement(_oauthModal2.default, {
      login: props.login,
      loginWithGoogle: props.loginWithGoogle,
      onClose: props.toggleModal,
      showOauthModal: props.showOauthModal
    }),
    _react2.default.createElement(_mobileNavigationMenu2.default, { adminNavLink: props.adminNavLink, mobileNavList: props.mobileNavList })
  );
}

SignedOutUserNavigation.defaultProps = {
  login: function login() {},
  loginWithGoogle: null,
  showOauthModal: false,
  toggleModal: function toggleModal() {},
  useOauth: false
};

SignedOutUserNavigation.propTypes = {
  login: _propTypes2.default.func,
  loginWithGoogle: _propTypes2.default.func,
  showOauthModal: _propTypes2.default.bool,
  toggleModal: _propTypes2.default.func,
  useOauth: _propTypes2.default.bool
};
//# sourceMappingURL=signed-out-user-navigation.js.map