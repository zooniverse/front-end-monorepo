'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobileNavigationMenu = require('./mobile-navigation-menu');

var _mobileNavigationMenu2 = _interopRequireDefault(_mobileNavigationMenu);

var _userNavigation = require('./user-navigation');

var _userNavigation2 = _interopRequireDefault(_userNavigation);

var _userMenu = require('./user-menu');

var _userMenu2 = _interopRequireDefault(_userMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SignedInUserNavigation(props) {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_userNavigation2.default, {
      messagesLabel: props.messagesLabel,
      messagesLink: props.messagesLink,
      notificationsLabel: props.notificationsLabel,
      notificationsLink: props.notificationsLink
    }),
    _react2.default.createElement(_userMenu2.default, { user: props.user, userMenuNavList: props.userMenuNavList }),
    _react2.default.createElement(_mobileNavigationMenu2.default, { adminNavLink: props.adminNavLink, isAdmin: props.isAdmin, mobileNavList: props.mobileNavList })
  );
}

SignedInUserNavigation.defaultProps = {
  isAdmin: false,
  user: {}
};

SignedInUserNavigation.propTypes = {
  isAdmin: _propTypes2.default.bool,
  messagesLabel: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
  messagesLink: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
  notificationsLabel: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
  notificationsLink: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
  user: _propTypes2.default.object.isRequired,
  userMenuNavList: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string])).isRequired
};

exports.default = SignedInUserNavigation;