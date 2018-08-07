'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styledTheming = require('styled-theming');

var _styledTheming2 = _interopRequireDefault(_styledTheming);

var _grommetTheme = require('@zooniverse/grommet-theme');

var _grommetTheme2 = _interopRequireDefault(_grommetTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var whichTealColorForTheme = (0, _styledTheming2.default)('mode', {
  light: _grommetTheme2.default.global.colors.brand,
  dark: _grommetTheme2.default.global.colors.lightTeal
});

exports.default = whichTealColorForTheme;