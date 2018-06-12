'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nextID = 0;

function generateNextID() {
  nextID += 1;
  return nextID;
}

var ZooniverseLogo = function ZooniverseLogo(_ref) {
  var className = _ref.className,
      width = _ref.width,
      height = _ref.height,
      title = _ref.title,
      style = _ref.style;

  var logoID = generateNextID();
  return _react2.default.createElement(
    'svg',
    {
      role: 'img',
      viewBox: '0 0 100 100',
      width: width,
      height: height,
      'aria-labelledby': 'zooniverse-logo_' + logoID,
      style: style,
      className: className
    },
    _react2.default.createElement(
      'title',
      { id: 'zooniverse-logo_' + logoID },
      title
    ),
    _react2.default.createElement(
      'g',
      { fill: 'currentColor', stroke: 'none', transform: 'translate(50, 50)' },
      _react2.default.createElement('path', { d: 'M 0 -45 A 45 45 0 0 1 0 45 A 45 45 0 0 1 0 -45 Z M 0 -30 A 30 30 0 0 0 0 30 A 30 30 0 0 0 0 -30 Z' }),
      _react2.default.createElement('path', { d: 'M 0 -14 A 14 14 0 0 1 0 14 A 14 14 0 0 1 0 -14 Z' }),
      _react2.default.createElement('ellipse', { cx: '0', cy: '0', rx: '6', ry: '65', transform: 'rotate(50)' })
    )
  );
};

ZooniverseLogo.propTypes = {
  width: _propTypes2.default.string,
  height: _propTypes2.default.string,
  title: _propTypes2.default.string,
  style: _propTypes2.default.objectOf(_propTypes2.default.string),
  className: _propTypes2.default.string
};

ZooniverseLogo.defaultProps = {
  width: '1em',
  height: '1em',
  title: 'Zooniverse Logo',
  style: {},
  className: ''
};

exports.default = ZooniverseLogo;