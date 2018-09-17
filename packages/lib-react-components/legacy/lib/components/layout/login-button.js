'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LoginButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _grommet = require('grommet');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LoginButton(_ref) {
  var className = _ref.className,
      label = _ref.label,
      login = _ref.login,
      plain = _ref.plain,
      toggleModal = _ref.toggleModal;

  return _react2.default.createElement(_grommet.Button, { type: 'button', className: className, onClick: login || toggleModal, label: label, plain: plain });
};

LoginButton.defaultProps = {
  className: 'zoo-header__button--as-link',
  label: 'Sign in',
  login: null,
  plain: true,
  toggleModal: null
};

LoginButton.propTypes = {
  className: _propTypes2.default.string,
  label: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
  login: _propTypes2.default.func,
  plain: _propTypes2.default.bool,
  toggleModal: _propTypes2.default.func
};
//# sourceMappingURL=login-button.js.map