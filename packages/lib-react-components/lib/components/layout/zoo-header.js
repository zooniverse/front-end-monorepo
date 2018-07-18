'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZooHeader = ZooHeader;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _grommet = require('grommet');

var _withMobileView = require('./with-mobile-view');

var _withMobileView2 = _interopRequireDefault(_withMobileView);

var _zooniverseLogo = require('../zooniverse-logo');

var _zooniverseLogo2 = _interopRequireDefault(_zooniverseLogo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ZooHeader(props) {
  return _react2.default.createElement(
    _grommet.Header,
    { justify: 'between', className: 'zoo-header', direction: 'row', size: 'small' },
    _react2.default.createElement(
      _grommet.Menu,
      { align: 'center', direction: 'row', size: 'small', responsive: false, inline: true },
      props.logoHomeLink && props.logoHomeLink,
      !props.isMobile && _react2.default.createElement(
        'ul',
        { className: 'zoo-header__nav-list' },
        props.mainHeaderNavList.map(function (navItem, i) {
          return _react2.default.createElement(
            'li',
            {
              key: 'navItem-' + i,
              className: 'zoo-header__nav-list-item zoo-header__nav-list-item--main'
            },
            navItem
          );
        }),
        props.isAdmin && _react2.default.createElement(
          'li',
          { className: 'zoo-header__nav-list-item zoo-header__nav-list-item--main' },
          props.adminNavLink
        )
      )
    ),
    props.authContainer && props.authContainer
  );
}

ZooHeader.defaultProps = {
  adminNavLink: _react2.default.createElement(_grommet.Anchor, { className: 'zoo-header__link--small', href: 'http://www.zooniverse.org/admin', label: 'Admin' }),
  authContainer: null,
  isAdmin: false,
  logoHomeLink: _react2.default.createElement(
    _grommet.Anchor,
    { className: 'zoo-header__link', href: 'http://www.zooniverse.org' },
    _react2.default.createElement(_zooniverseLogo2.default, { height: '1.25em', width: '1.25em' })
  ),
  mainHeaderNavList: [_react2.default.createElement(_grommet.Anchor, { className: 'zoo-header__link--small', href: 'http://www.zooniverse.org/projects', label: 'Projects' }), _react2.default.createElement(_grommet.Anchor, { className: 'zoo-header__link--small', href: 'http://www.zooniverse.org/about', label: 'About' }), _react2.default.createElement(_grommet.Anchor, { className: 'zoo-header__link--small', href: 'http://www.zooniverse.org/get-involved', label: 'Get Involved' }), _react2.default.createElement(_grommet.Anchor, { className: 'zoo-header__link--small', href: 'http://www.zooniverse.org/talk', label: 'Talk' }), _react2.default.createElement(_grommet.Anchor, { className: 'zoo-header__link--small', href: 'http://www.zooniverse.org/lab', label: 'Build A Project' })]
};

ZooHeader.propTypes = {
  adminNavLink: _propTypes2.default.node,
  authContainer: _propTypes2.default.node,
  isAdmin: _propTypes2.default.bool,
  logoHomeLink: _propTypes2.default.node.isRequired,
  mainHeaderNavList: _propTypes2.default.arrayOf(_propTypes2.default.node).isRequired
};

exports.default = (0, _withMobileView2.default)(ZooHeader);