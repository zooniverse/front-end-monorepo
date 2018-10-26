'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _grommet = require('grommet');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LogoutButton = function LogoutButton(_ref) {
  var className = _ref.className,
      label = _ref.label,
      logout = _ref.logout;

  return _react2.default.createElement(_grommet.Button, { className: className, type: 'button', onClick: logout, label: label, plain: true });
};

LogoutButton.defaultProps = {
  className: 'zoo-header__button--as-link',
  label: 'Logout',
  logout: function logout() {}
};

LogoutButton.propTypes = {
  className: _propTypes2.default.string,
  label: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
  logout: _propTypes2.default.func.isRequired
};

exports.default = LogoutButton;
//# sourceMappingURL=logout-button.js.map