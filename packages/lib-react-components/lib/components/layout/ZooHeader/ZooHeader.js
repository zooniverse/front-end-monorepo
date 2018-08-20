'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledLogoAnchor = exports.StyledHeader = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  color: #B2B2B2;\n  font-size: 1em;\n'], ['\n  color: #B2B2B2;\n  font-size: 1em;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  border-bottom: 2px solid transparent;\n  color: #B2B2B2;\n  margin-right: 2em;\n  vertical-align: text-bottom;\n\n  &:hover, &:focus {\n    border-bottom-color: #00979D;\n  }\n'], ['\n  border-bottom: 2px solid transparent;\n  color: #B2B2B2;\n  margin-right: 2em;\n  vertical-align: text-bottom;\n\n  &:hover, &:focus {\n    border-bottom-color: #00979D;\n  }\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _grommet = require('grommet');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _NavListItem = require('./components/NavListItem');

var _NavListItem2 = _interopRequireDefault(_NavListItem);

var _zooniverseLogo = require('../../zooniverse-logo');

var _zooniverseLogo2 = _interopRequireDefault(_zooniverseLogo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledHeader = exports.StyledHeader = (0, _styledComponents2.default)(_grommet.Box)(_templateObject);

var StyledLogoAnchor = exports.StyledLogoAnchor = (0, _styledComponents2.default)(_grommet.Anchor)(_templateObject2);

var ZooHeader = function ZooHeader(props) {
  var adminNavLinkLabel = props.adminNavLinkLabel,
      adminNavLinkURL = props.adminNavLinkURL,
      authContainer = props.authContainer,
      isAdmin = props.isAdmin,
      mainHeaderNavListLabels = props.mainHeaderNavListLabels,
      mainHeaderNavListURLs = props.mainHeaderNavListURLs;


  return _react2.default.createElement(
    StyledHeader,
    {
      background: 'black',
      direction: 'row',
      fill: 'horizontal',
      justify: 'between',
      pad: { horizontal: 'medium', vertical: 'small' },
      responsive: false,
      tag: 'header'
    },
    _react2.default.createElement(
      _grommet.Box,
      {
        align: 'center',
        direction: 'row',
        responsive: false
      },
      _react2.default.createElement(
        StyledLogoAnchor,
        { href: 'http://www.zooniverse.org' },
        _react2.default.createElement(_zooniverseLogo2.default, { height: '1.25em', width: '1.25em' })
      ),
      _react2.default.createElement(
        _grommet.Box,
        {
          direction: 'row',
          justify: 'start',
          responsive: false,
          tag: 'nav'
        },
        mainHeaderNavListURLs.map(function (url, i) {
          return _react2.default.createElement(_NavListItem2.default, {
            key: url,
            label: mainHeaderNavListLabels[i],
            url: url
          });
        }),
        isAdmin && _react2.default.createElement(_NavListItem2.default, {
          label: adminNavLinkLabel,
          url: adminNavLinkURL
        })
      )
    ),
    _react2.default.createElement(_grommet.Menu, {
      label: 'Menu',
      items: mainHeaderNavListURLs.map(function (url, i) {
        return { label: mainHeaderNavListLabels[i], href: url };
      })
    }),
    authContainer && authContainer
  );
};

ZooHeader.defaultProps = {
  adminNavLinkLabel: 'Admin',
  adminNavLinkURL: 'http://www.zooniverse.org/admin',
  authContainer: null,
  isAdmin: false,
  mainHeaderNavListLabels: ['Projects', 'About', 'Get Involved', 'Talk', 'Build'],
  mainHeaderNavListURLs: ['http://www.zooniverse.org/projects', 'http://www.zooniverse.org/about', 'http://www.zooniverse.org/get-involved', 'http://www.zooniverse.org/talk', 'http://www.zooniverse.org/lab']
};

ZooHeader.propTypes = {
  adminNavLinkLabel: _propTypes2.default.string,
  adminNavLinkURL: _propTypes2.default.string,
  authContainer: _propTypes2.default.node,
  isAdmin: _propTypes2.default.bool,
  mainHeaderNavListLabels: _propTypes2.default.arrayOf(_propTypes2.default.string),
  mainHeaderNavListURLs: _propTypes2.default.arrayOf(_propTypes2.default.string)
};

exports.default = ZooHeader;
//# sourceMappingURL=ZooHeader.js.map