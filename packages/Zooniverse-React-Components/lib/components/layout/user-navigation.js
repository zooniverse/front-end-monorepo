'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Anchor = require('grommet/components/Anchor');

var _Anchor2 = _interopRequireDefault(_Anchor);

var _Menu = require('grommet/components/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserNavigation = function UserNavigation(props) {
  var createKeyedAnchorItem = function createKeyedAnchorItem(navItem, i) {
    return _react2.default.cloneElement(navItem, { key: 'navItem-' + i });
  };

  return _react2.default.createElement(
    _Menu2.default,
    { className: 'user-navigation', align: 'center', direction: 'row', size: 'small', responsive: false, inline: true },
    props.userNavigationNavList.map(function (navItem, i) {
      return createKeyedAnchorItem(navItem, i);
    })
  );
};

UserNavigation.defaultProps = {
  userNavigationNavList: [_react2.default.createElement(_Anchor2.default, { className: 'zoo-header__link--small', href: 'http://www.zooniverse.org/notifications', label: 'Notifications' }), _react2.default.createElement(_Anchor2.default, { className: 'zoo-header__link--small', href: 'http://www.zooniverse.org/inbox', label: 'Messages' })]
};

UserNavigation.propTypes = {
  userNavigationNavList: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string])).isRequired
};

exports.default = UserNavigation;