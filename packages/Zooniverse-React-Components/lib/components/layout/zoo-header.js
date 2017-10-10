'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Header = require('grommet/components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Anchor = require('grommet/components/Anchor');

var _Anchor2 = _interopRequireDefault(_Anchor);

var _Menu = require('grommet/components/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _zooniverseLogo = require('../zooniverse-logo');

var _zooniverseLogo2 = _interopRequireDefault(_zooniverseLogo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ZooHeader = function ZooHeader(props) {
  return _react2.default.createElement(
    _Header2.default,
    { justify: 'between', className: 'zoo-header', direction: 'row', size: 'small', responsive: true },
    _react2.default.createElement(
      _Menu2.default,
      { align: 'center', direction: 'row', size: 'small', responsive: false, inline: true },
      props.logoHomeLink && props.logoHomeLink,
      _react2.default.createElement(
        'ul',
        { className: 'zoo-header__nav-list' },
        props.mainHeaderNavList.map(function (navItem, i) {
          return _react2.default.createElement(
            'li',
            { key: 'navItem-' + i, className: 'zoo-header__nav-list-item', style: { display: 'inline-block' } },
            navItem
          );
        })
      )
    ),
    props.authContainer && props.authContainer
  );
};

ZooHeader.defaultProps = {
  authContainer: null,
  logoHomeLink: _react2.default.createElement(
    _Anchor2.default,
    { className: 'zoo-header__link', href: 'http://www.zooniverse.org' },
    _react2.default.createElement(_zooniverseLogo2.default, { height: '1.25em', width: '1.25em' })
  ),
  mainHeaderNavList: [_react2.default.createElement(_Anchor2.default, { className: 'zoo-header__link--small', href: 'http://www.zooniverse.org/projects', label: 'Projects' }), _react2.default.createElement(_Anchor2.default, { className: 'zoo-header__link--small', href: 'http://www.zooniverse.org/about', label: 'About' }), _react2.default.createElement(_Anchor2.default, { className: 'zoo-header__link--small', href: 'http://www.zooniverse.org/get-involved', label: 'Get Involved' }), _react2.default.createElement(_Anchor2.default, { className: 'zoo-header__link--small', href: 'http://www.zooniverse.org/talk', label: 'Talk' }), _react2.default.createElement(_Anchor2.default, { className: 'zoo-header__link--small', href: 'http://www.zooniverse.org/lab', label: 'Build A Project' })]
};

ZooHeader.propTypes = {
  authContainer: _propTypes2.default.node,
  logoHomeLink: _propTypes2.default.node.isRequired,
  mainHeaderNavList: _propTypes2.default.arrayOf(_propTypes2.default.node).isRequired
};

exports.default = ZooHeader;