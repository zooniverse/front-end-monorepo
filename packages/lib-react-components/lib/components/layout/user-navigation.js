'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserNavigation = UserNavigation;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _grommet = require('grommet');

var _withMobileView = require('./with-mobile-view');

var _withMobileView2 = _interopRequireDefault(_withMobileView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function UserNavigation(props) {
  var messagesLabel = props.isMobile ? _react2.default.createElement('i', { className: 'fa fa-bell-o fa-fw', 'aria-hidden': 'true', 'aria-label': props.messagesLabel }) : props.messagesLabel;
  var notificationsLabel = props.isMobile ? _react2.default.createElement('i', { className: 'fa fa-envelope-o fa-fw', 'aria-hidden': 'true', 'aria-label': props.notificationsLabel }) : props.notificationsLabel;

  return _react2.default.createElement(
    _grommet.Menu,
    { className: 'user-navigation', align: 'center', direction: 'row', size: 'small', responsive: false, inline: true },
    _react2.default.cloneElement(props.notificationsLink, { label: notificationsLabel }),
    _react2.default.cloneElement(props.messagesLink, { label: messagesLabel })
  );
}

UserNavigation.defaultProps = {
  isMobile: false,
  messagesLabel: "Messages",
  notificationsLabel: "Notifications",
  messagesLink: _react2.default.createElement(_grommet.Anchor, { className: 'zoo-header__link--small', href: 'http://www.zooniverse.org/inbox' }),
  notificationsLink: _react2.default.createElement(_grommet.Anchor, { className: 'zoo-header__link--small', href: 'http://www.zooniverse.org/notifications' })
};

UserNavigation.propTypes = {
  isMobile: _propTypes2.default.bool,
  messagesLabel: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]).isRequired,
  messagesLink: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]).isRequired,
  notificationsLabel: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]).isRequired,
  notificationsLink: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]).isRequired
};

exports.default = (0, _withMobileView2.default)(UserNavigation);