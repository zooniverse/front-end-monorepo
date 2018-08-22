'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledNavListItem = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  &:first-child {\n    font-weight: bold;\n    letter-spacing: 1px;\n    margin-bottom: 0.5em;\n    text-transform: uppercase;\n  }\n\n  &:not(:first-child) {\n    color: ', ';\n  }\n  font-size: 0.8em;\n  font-weight: bold;\n'], ['\n  &:first-child {\n    font-weight: bold;\n    letter-spacing: 1px;\n    margin-bottom: 0.5em;\n    text-transform: uppercase;\n  }\n\n  &:not(:first-child) {\n    color: ', ';\n  }\n  font-size: 0.8em;\n  font-weight: bold;\n']);

exports.default = NavListItem;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _grommet = require('grommet');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _styledTheming = require('styled-theming');

var _styledTheming2 = _interopRequireDefault(_styledTheming);

var _lib = require('../../lib');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledNavListItem = exports.StyledNavListItem = (0, _styledComponents2.default)(_grommet.Anchor)(_templateObject, (0, _styledTheming2.default)('mode', { light: '#5C5C5C', dark: 'inherit' }));

function NavListItem(_ref) {
  var colorTheme = _ref.colorTheme,
      label = _ref.label,
      url = _ref.url;

  return _react2.default.createElement(
    _styledComponents.ThemeProvider,
    { theme: { mode: colorTheme } },
    _react2.default.createElement(
      StyledNavListItem,
      { href: url },
      label
    )
  );
}

NavListItem.defaultProps = {
  colorTheme: 'light'
};

NavListItem.propTypes = {
  colorTheme: _propTypes2.default.oneOf(['light', 'dark']),
  label: _propTypes2.default.string.isRequired,
  url: _propTypes2.default.string.isRequired
};
//# sourceMappingURL=NavListItem.js.map