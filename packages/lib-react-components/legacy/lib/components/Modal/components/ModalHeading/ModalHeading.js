'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n  color: white\n  font-size: 1rem\n  font-weight: bold\n  letter-spacing: 0.18em\n  margin: 0\n  text-shadow: 0 2px 2px rgba(0,0,0,0.22);\n  text-transform: uppercase\n'], ['\n  color: white\n  font-size: 1rem\n  font-weight: bold\n  letter-spacing: 0.18em\n  margin: 0\n  text-shadow: 0 2px 2px rgba(0,0,0,0.22);\n  text-transform: uppercase\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  height: 1rem\n  width: 1rem\n\n  svg {\n    opacity: 0.7\n  }\n\n  &:active svg,\n  &:hover svg {\n    opacity: 1\n  }\n'], ['\n  height: 1rem\n  width: 1rem\n\n  svg {\n    opacity: 0.7\n  }\n\n  &:active svg,\n  &:hover svg {\n    opacity: 1\n  }\n']);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _grommet = require('grommet');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _en = require('./locales/en');

var _en2 = _interopRequireDefault(_en);

var _CloseIcon = require('../CloseIcon');

var _CloseIcon2 = _interopRequireDefault(_CloseIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

_counterpart2.default.registerTranslations('en', _en2.default);

var Heading = _styledComponents2.default.h5(_templateObject);

var StyledButton = (0, _styledComponents2.default)(_grommet.Button)(_templateObject2);

function ModalHeading(_ref) {
  var closeFn = _ref.closeFn,
      title = _ref.title;

  return _react2.default.createElement(
    _grommet.Box,
    {
      align: 'center',
      background: 'teal',
      direction: 'row',
      gap: 'large',
      justify: 'between',
      pad: { horizontal: 'medium', vertical: 'xsmall' }
    },
    _react2.default.createElement(
      Heading,
      null,
      title
    ),
    _react2.default.createElement(
      StyledButton,
      {
        a11yTitle: (0, _counterpart2.default)('ModalHeading.close'),
        onClick: closeFn
      },
      _react2.default.createElement(_CloseIcon2.default, null)
    )
  );
}

ModalHeading.propTypes = {
  closeFn: _propTypes2.default.func.isRequired,
  title: _propTypes2.default.string.isRequired
};

exports.default = ModalHeading;
//# sourceMappingURL=ModalHeading.js.map