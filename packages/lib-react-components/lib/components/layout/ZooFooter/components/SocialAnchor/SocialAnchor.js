'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledSocialAnchor = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  padding: 0;\n  svg {\n    border-bottom: solid thin transparent;\n    fill: ', ';\n  }\n\n  svg:hover, svg:focus {\n    border-bottom: solid thin ', ';\n  }\n'], ['\n  padding: 0;\n  svg {\n    border-bottom: solid thin transparent;\n    fill: ', ';\n  }\n\n  svg:hover, svg:focus {\n    border-bottom: solid thin ', ';\n  }\n']);

exports.default = SocialAnchor;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _grommet = require('grommet');

var _grommetIcons = require('grommet-icons');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _lib = require('../../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// Note: I shouldn't have to define the fill color
// This is a bug in v2: https://github.com/grommet/grommet/issues/2141
var StyledSocialAnchor = exports.StyledSocialAnchor = (0, _styledComponents2.default)(_grommet.Anchor)(_templateObject, _lib.whichTealColorForTheme, _lib.whichTealColorForTheme);

function SocialAnchor(_ref) {
  var colorTheme = _ref.colorTheme,
      hrefs = _ref.hrefs,
      service = _ref.service;

  var icons = {
    facebook: _react2.default.createElement(_grommetIcons.FacebookOption, { size: 'small' }),
    instagram: _react2.default.createElement(_grommetIcons.Instagram, { size: 'small' }),
    twitter: _react2.default.createElement(_grommetIcons.Twitter, { size: 'small' })
  };

  return _react2.default.createElement(
    _styledComponents.ThemeProvider,
    { theme: { mode: colorTheme } },
    _react2.default.createElement(StyledSocialAnchor, {
      href: hrefs[service],
      a11yTitle: service,
      icon: icons[service]
    })
  );
}

SocialAnchor.defaultProps = {
  colorTheme: 'light',
  hrefs: {
    facebook: 'https://www.facebook.com/therealzooniverse',
    twitter: 'https://twitter.com/the_zooniverse',
    instagram: 'https://www.instagram.com/the.zooniverse/'
  }
};

SocialAnchor.propTypes = {
  colorTheme: _propTypes2.default.oneOf(['light', 'dark']),
  hrefs: _propTypes2.default.objectOf(_propTypes2.default.string),
  service: _propTypes2.default.string.isRequired
};