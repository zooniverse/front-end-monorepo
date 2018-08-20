'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _grommet = require('grommet');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _grommetTheme = require('@zooniverse/grommet-theme');

var _grommetTheme2 = _interopRequireDefault(_grommetTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ModalBody(_ref) {
  var children = _ref.children,
      colorTheme = _ref.colorTheme;

  var background = _grommetTheme2.default[colorTheme].colors.modal.background;
  return _react2.default.createElement(
    _grommet.Box,
    {
      background: background,
      pad: 'medium'
    },
    children
  );
}

ModalBody.propTypes = {
  children: _propTypes2.default.node.isRequired,
  colorTheme: _propTypes2.default.oneOf(['light', 'dark'])
};

ModalBody.defaultProps = {
  colorTheme: 'light'
};

exports.default = ModalBody;