'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _grommet = require('grommet');

var _styledComponents = require('styled-components');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _en = require('./locales/en');

var _en2 = _interopRequireDefault(_en);

var _grommetTheme = require('@zooniverse/grommet-theme');

var _grommetTheme2 = _interopRequireDefault(_grommetTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_counterpart2.default.registerTranslations('en', _en2.default);

function AdminCheckbox(_ref) {
  var checked = _ref.checked,
      colorTheme = _ref.colorTheme,
      label = _ref.label,
      onChange = _ref.onChange,
      theme = _ref.theme;

  return _react2.default.createElement(
    _grommet.Grommet,
    { theme: theme },
    _react2.default.createElement(
      _styledComponents.ThemeProvider,
      { theme: { mode: colorTheme } },
      _react2.default.createElement(_grommet.CheckBox, {
        checked: checked,
        id: 'admin-checkbox',
        name: 'admin-checkbox',
        label: label,
        onChange: onChange,
        toggle: true
      })
    )
  );
};

AdminCheckbox.defaultProps = {
  checked: false,
  colorTheme: 'light',
  label: (0, _counterpart2.default)('AdminCheckbox.label'),
  onChange: function onChange() {},
  theme: _grommetTheme2.default
};

AdminCheckbox.propTypes = {
  checked: _propTypes2.default.bool,
  colorTheme: _propTypes2.default.oneOf(['light', 'dark']),
  label: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  theme: _propTypes2.default.object
};

exports.default = AdminCheckbox;
//# sourceMappingURL=AdminCheckbox.js.map