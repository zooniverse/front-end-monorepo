'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MobileNavigationMenu = MobileNavigationMenu;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _grommet = require('grommet');

var _grommetIcons = require('grommet-icons');

var _withMobileView = require('./with-mobile-view');

var _withMobileView2 = _interopRequireDefault(_withMobileView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MobileNavigationMenu(props) {
  function createKeyedAnchorItem(navItem, i) {
    return _react2.default.cloneElement(navItem, { key: 'navItem-' + i });
  };

  // TO DO: look into why the Grommet Menu component does not use the props defined for pad
  // Even if defined it still uses its default prop of none
  if (props.isMobile) {
    return _react2.default.createElement(
      _grommet.Menu,
      {
        className: 'mobile-navigation-menu',
        icon: _react2.default.createElement(_grommetIcons.Menu, { size: 'xsmall' }),
        dropAlign: { right: 'right', top: 'top' }
      },
      props.mobileNavList.map(function (navItem, i) {
        return createKeyedAnchorItem(navItem, i);
      }),
      props.isAdmin && props.adminNavLink
    );
  }

  return null;
}

MobileNavigationMenu.defaultProps = {
  adminNavLink: _react2.default.createElement(_grommet.Anchor, { className: 'zoo-header__link--small', href: 'http://www.zooniverse.org/admin', label: 'Admin' }),
  isAdmin: false,
  isMobile: false,
  mobileNavList: [_react2.default.createElement(_grommet.Anchor, { className: 'zoo-header__link--small', href: 'http://www.zooniverse.org/', label: 'Zooniverse' }), _react2.default.createElement(_grommet.Anchor, { className: 'zoo-header__link--small', href: 'http://www.zooniverse.org/projects', label: 'Projects' }), _react2.default.createElement(_grommet.Anchor, { className: 'zoo-header__link--small', href: 'http://www.zooniverse.org/about', label: 'About' }), _react2.default.createElement(_grommet.Anchor, { className: 'zoo-header__link--small', href: 'http://www.zooniverse.org/get-involved', label: 'Get Involved' }), _react2.default.createElement(_grommet.Anchor, { className: 'zoo-header__link--small', href: 'http://www.zooniverse.org/talk', label: 'Talk' }), _react2.default.createElement(_grommet.Anchor, { className: 'zoo-header__link--small', href: 'http://www.zooniverse.org/lab', label: 'Build A Project' })]
};

MobileNavigationMenu.propTypes = {
  adminNavLink: _propTypes2.default.node,
  isAdmin: _propTypes2.default.bool,
  isMobile: _propTypes2.default.bool,
  mobileNavList: _propTypes2.default.arrayOf(_propTypes2.default.node).isRequired
};

exports.default = (0, _withMobileView2.default)(MobileNavigationMenu);