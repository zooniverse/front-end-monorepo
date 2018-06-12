'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CheckBox = require('grommet/components/CheckBox');

var _CheckBox2 = _interopRequireDefault(_CheckBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AdminCheckbox = function AdminCheckbox(props) {
  return _react2.default.createElement(_CheckBox2.default, {
    checked: props.checked,
    id: 'admin-checkbox',
    name: 'admin-checkbox',
    label: props.label,
    onChange: props.onChange,
    toggle: true
  });
};

AdminCheckbox.defaultProps = {
  checked: false,
  label: 'Admin Mode',
  onChange: function onChange() {}
};

AdminCheckbox.propTypes = {
  checked: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  onChange: _propTypes2.default.func
};

exports.default = AdminCheckbox;