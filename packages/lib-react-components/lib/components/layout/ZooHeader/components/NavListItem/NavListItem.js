'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledNavListItem = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  border-bottom: 2px solid transparent;\n  color: #B2B2B2;\n  display: inline-block;\n  font-size: .75em;\n  font-weight: 700;\n  letter-spacing: 0.15em;\n  line-height: 2em;\n  margin-right: 2em;\n  text-decoration: none !important;\n  text-transform: uppercase;\n  white-space: nowrap;\n\n  &:visited {\n    color: #B2B2B2;\n  }\n\n  &:hover, &:focus {\n    border-bottom-color: #00979D;\n  }\n'], ['\n  border-bottom: 2px solid transparent;\n  color: #B2B2B2;\n  display: inline-block;\n  font-size: .75em;\n  font-weight: 700;\n  letter-spacing: 0.15em;\n  line-height: 2em;\n  margin-right: 2em;\n  text-decoration: none !important;\n  text-transform: uppercase;\n  white-space: nowrap;\n\n  &:visited {\n    color: #B2B2B2;\n  }\n\n  &:hover, &:focus {\n    border-bottom-color: #00979D;\n  }\n']);

exports.default = NavListItem;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _grommet = require('grommet');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledNavListItem = exports.StyledNavListItem = (0, _styledComponents2.default)(_grommet.Anchor)(_templateObject);

function NavListItem(_ref) {
  var label = _ref.label,
      url = _ref.url;

  return _react2.default.createElement(
    StyledNavListItem,
    { href: url },
    label
  );
}

NavListItem.propTypes = {
  label: _propTypes2.default.string.isRequired,
  url: _propTypes2.default.string.isRequired
};