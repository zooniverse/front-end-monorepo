'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = undefined;

var _grommet = require('grommet');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _grommetTheme = require('@zooniverse/grommet-theme');

var _grommetTheme2 = _interopRequireDefault(_grommetTheme);

var _WithLayer = require('./WithLayer');

var _WithLayer2 = _interopRequireDefault(_WithLayer);

var _ModalBody = require('./components/ModalBody');

var _ModalBody2 = _interopRequireDefault(_ModalBody);

var _ModalHeading = require('./components/ModalHeading');

var _ModalHeading2 = _interopRequireDefault(_ModalHeading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Modal(_ref) {
  var children = _ref.children,
      closeFn = _ref.closeFn,
      colorTheme = _ref.colorTheme,
      theme = _ref.theme,
      title = _ref.title;

  return _react2.default.createElement(
    _grommet.Grommet,
    { theme: theme },
    _react2.default.createElement(_ModalHeading2.default, { closeFn: closeFn, title: title }),
    _react2.default.createElement(
      _ModalBody2.default,
      { colorTheme: colorTheme },
      children
    )
  );
}

Modal.propTypes = {
  children: _propTypes2.default.node.isRequired,
  closeFn: _propTypes2.default.func,
  colorTheme: _propTypes2.default.oneOf(['light', 'dark']),
  title: _propTypes2.default.string.isRequired,
  theme: _propTypes2.default.object
};

Modal.defaultProps = {
  colorTheme: 'light',
  theme: _grommetTheme2.default
};

exports.default = (0, _WithLayer2.default)(Modal);
exports.Modal = Modal;