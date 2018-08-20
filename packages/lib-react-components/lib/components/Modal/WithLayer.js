'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _grommet = require('grommet');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _grommetTheme = require('@zooniverse/grommet-theme');

var _grommetTheme2 = _interopRequireDefault(_grommetTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function WithLayer(WrappedComponent) {
  var theme = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _grommetTheme2.default;

  function HOC(_ref) {
    var active = _ref.active,
        closeFn = _ref.closeFn,
        props = _objectWithoutProperties(_ref, ['active', 'closeFn']);

    if (!active) {
      return null;
    }

    return _react2.default.createElement(
      _grommet.Grommet,
      { theme: theme },
      _react2.default.createElement(
        _grommet.Layer,
        {
          onClickOutside: closeFn,
          onEsc: closeFn,
          plain: true
        },
        _react2.default.createElement(WrappedComponent, _extends({}, props, { closeFn: closeFn }))
      )
    );
  }

  HOC.propTypes = {
    active: _propTypes2.default.bool,
    closeFn: _propTypes2.default.func
  };

  HOC.defaultProps = {
    active: false
  };

  return HOC;
}

exports.default = WithLayer;
//# sourceMappingURL=WithLayer.js.map