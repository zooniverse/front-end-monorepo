"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nextID = 0;

function generateNextID() {
  nextID += 1;
  return nextID;
}

var ZooniverseLogo = function ZooniverseLogo(_ref) {
  var width = _ref.width,
      height = _ref.height,
      title = _ref.title,
      style = _ref.style;

  var logoID = generateNextID();
  return _react2.default.createElement(
    "svg",
    {
      role: "img",
      className: "zooniverse-logo",
      viewBox: "0 0 100 100",
      width: width,
      height: height,
      "aria-labelledby": "zooniverse-logo_" + logoID,
      style: style
    },
    _react2.default.createElement(
      "title",
      { id: "zooniverse-logo_" + logoID },
      title
    ),
    _react2.default.createElement(
      "g",
      { fill: "currentColor", stroke: "none", transform: "translate(50, 50)" },
      _react2.default.createElement("path", { d: "M 0 -45 A 45 45 0 0 1 0 45 A 45 45 0 0 1 0 -45 Z M 0 -30 A 30 30 0 0 0 0 30 A 30 30 0 0 0 0 -30 Z" }),
      _react2.default.createElement("path", { d: "M 0 -14 A 14 14 0 0 1 0 14 A 14 14 0 0 1 0 -14 Z" }),
      _react2.default.createElement("ellipse", { cx: "0", cy: "0", rx: "6", ry: "65", transform: "rotate(50)" })
    )
  );
};

var PropTypes = _react2.default.PropTypes;

ZooniverseLogo.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string)
};

ZooniverseLogo.defaultProps = {
  width: '1em',
  height: '1em',
  title: 'Zooniverse Logo',
  style: {}
};

exports.default = ZooniverseLogo;