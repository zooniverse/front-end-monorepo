'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n  display: block\n  fill: white\n  height: 100%\n  width: auto\n'], ['\n  display: block\n  fill: white\n  height: 100%\n  width: auto\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _grommet = require('grommet');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var StyledSVG = _styledComponents2.default.svg(_templateObject);

function CloseIcon() {
  return _react2.default.createElement(
    StyledSVG,
    { viewBox: '0 0 32 32' },
    _react2.default.createElement(
      'defs',
      null,
      _react2.default.createElement(
        'filter',
        { id: 'shadow' },
        _react2.default.createElement('feDropShadow', { dx: '4', dy: '8', stdDeviation: '4' })
      )
    ),
    _react2.default.createElement('path', {
      style: { style: 'filter:url(#shadow)' },
      d: 'M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM21.657 10.344c-0.39-0.39-1.023-0.39-1.414 0l-4.242 4.242-4.242-4.242c-0.39-0.39-1.024-0.39-1.415 0s-0.39 1.024 0 1.414l4.242 4.242-4.242 4.242c-0.39 0.39-0.39 1.024 0 1.414s1.024 0.39 1.415 0l4.242-4.242 4.242 4.242c0.39 0.39 1.023 0.39 1.414 0s0.39-1.024 0-1.414l-4.242-4.242 4.242-4.242c0.391-0.391 0.391-1.024 0-1.414z'
    })
  );
}

exports.default = CloseIcon;