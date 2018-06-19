'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UserMenu;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Menu = require('grommet/components/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function UserMenu(props) {
  var createKeyedAnchorItem = function createKeyedAnchorItem(navItem, i) {
    return _react2.default.cloneElement(navItem, { key: 'navItem-' + i });
  };

  return _react2.default.createElement(
    _Menu2.default,
    { className: 'zoo-header-menu', label: props.user.display_name, dropAlign: { right: 'right', top: 'top' } },
    props.userMenuNavList.map(function (navItem, i) {
      return createKeyedAnchorItem(navItem, i);
    })
  );
};

UserMenu.defaultProps = {
  user: { display_name: '' }
};

UserMenu.propTypes = {
  user: _propTypes2.default.shape({
    display_name: _propTypes2.default.string
  }).isRequired,
  userMenuNavList: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string])).isRequired
};