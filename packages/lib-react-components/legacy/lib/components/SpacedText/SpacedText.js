'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n  letter-spacing: 0.1em\n  text-transform: uppercase\n'], ['\n  letter-spacing: 0.1em\n  text-transform: uppercase\n']);

var _grommet = require('grommet');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledText = (0, _styledComponents2.default)(_grommet.Text)(_templateObject);

function SpacedText(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ['children']);

  return _react2.default.createElement(
    StyledText,
    props,
    children
  );
}

SpacedText.defaultProps = {
  margin: 'none',
  size: 'small',
  weight: 'normal'
};

exports.default = SpacedText;
//# sourceMappingURL=SpacedText.js.map