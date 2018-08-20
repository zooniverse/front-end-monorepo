"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OauthGoogleIcon;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OauthGoogleIcon(_ref) {
  var className = _ref.className;

  return _react2.default.createElement(
    "svg",
    { className: className ? className : null, width: "46px", height: "46px", viewBox: "0 0 46 46", version: "1.1" },
    _react2.default.createElement(
      "defs",
      null,
      _react2.default.createElement(
        "filter",
        { x: "-50%", y: "-50%", width: "200%", height: "200%", filterUnits: "objectBoundingBox", id: "filter-1" },
        _react2.default.createElement("feOffset", { dx: "0", dy: "1", "in": "SourceAlpha", result: "shadowOffsetOuter1" }),
        _react2.default.createElement("feGaussianBlur", { stdDeviation: "0.5", "in": "shadowOffsetOuter1", result: "shadowBlurOuter1" }),
        _react2.default.createElement("feColorMatrix", { values: "0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.168 0", "in": "shadowBlurOuter1", type: "matrix", result: "shadowMatrixOuter1" }),
        _react2.default.createElement("feOffset", { dx: "0", dy: "0", "in": "SourceAlpha", result: "shadowOffsetOuter2" }),
        _react2.default.createElement("feGaussianBlur", { stdDeviation: "0.5", "in": "shadowOffsetOuter2", result: "shadowBlurOuter2" }),
        _react2.default.createElement("feColorMatrix", { values: "0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.084 0", "in": "shadowBlurOuter2", type: "matrix", result: "shadowMatrixOuter2" }),
        _react2.default.createElement(
          "feMerge",
          null,
          _react2.default.createElement("feMergeNode", { "in": "shadowMatrixOuter1" }),
          _react2.default.createElement("feMergeNode", { "in": "shadowMatrixOuter2" }),
          _react2.default.createElement("feMergeNode", { "in": "SourceGraphic" })
        )
      ),
      _react2.default.createElement("rect", { id: "path-2", x: "0", y: "0", width: "40", height: "40", rx: "2" }),
      _react2.default.createElement("rect", { id: "path-3", x: "5", y: "5", width: "38", height: "38", rx: "1" })
    ),
    _react2.default.createElement(
      "g",
      { id: "Google-Button", stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" },
      _react2.default.createElement("g", { id: "9-PATCH", transform: "translate(-608.000000, -219.000000)" }),
      _react2.default.createElement(
        "g",
        { id: "btn_google_dark_normal", transform: "translate(-1.000000, -1.000000)" },
        _react2.default.createElement(
          "g",
          { id: "button", transform: "translate(4.000000, 4.000000)", filter: "url(#filter-1)" },
          _react2.default.createElement(
            "g",
            { id: "button-bg" },
            _react2.default.createElement("use", { fill: "#4285F4", fillRule: "evenodd", xlinkHref: "#path-2" }),
            _react2.default.createElement("use", { fill: "none", xlinkHref: "#path-2" }),
            _react2.default.createElement("use", { fill: "none", xlinkHref: "#path-2" }),
            _react2.default.createElement("use", { fill: "none", xlinkHref: "#path-2" })
          )
        ),
        _react2.default.createElement(
          "g",
          { id: "button-bg-copy" },
          _react2.default.createElement("use", { fill: "#FFFFFF", fillRule: "evenodd", xlinkHref: "#path-3" }),
          _react2.default.createElement("use", { fill: "none", xlinkHref: "#path-3" }),
          _react2.default.createElement("use", { fill: "none", xlinkHref: "#path-3" }),
          _react2.default.createElement("use", { fill: "none", xlinkHref: "#path-3" })
        ),
        _react2.default.createElement(
          "g",
          { id: "logo_googleg_48dp", transform: "translate(15.000000, 15.000000)" },
          _react2.default.createElement("path", { d: "M17.64,9.20454545 C17.64,8.56636364 17.5827273,7.95272727 17.4763636,7.36363636 L9,7.36363636 L9,10.845 L13.8436364,10.845 C13.635,11.97 13.0009091,12.9231818 12.0477273,13.5613636 L12.0477273,15.8195455 L14.9563636,15.8195455 C16.6581818,14.2527273 17.64,11.9454545 17.64,9.20454545 L17.64,9.20454545 Z", id: "Shape", fill: "#4285F4" }),
          _react2.default.createElement("path", { d: "M9,18 C11.43,18 13.4672727,17.1940909 14.9563636,15.8195455 L12.0477273,13.5613636 C11.2418182,14.1013636 10.2109091,14.4204545 9,14.4204545 C6.65590909,14.4204545 4.67181818,12.8372727 3.96409091,10.71 L0.957272727,10.71 L0.957272727,13.0418182 C2.43818182,15.9831818 5.48181818,18 9,18 L9,18 Z", id: "Shape", fill: "#34A853" }),
          _react2.default.createElement("path", { d: "M3.96409091,10.71 C3.78409091,10.17 3.68181818,9.59318182 3.68181818,9 C3.68181818,8.40681818 3.78409091,7.83 3.96409091,7.29 L3.96409091,4.95818182 L0.957272727,4.95818182 C0.347727273,6.17318182 0,7.54772727 0,9 C0,10.4522727 0.347727273,11.8268182 0.957272727,13.0418182 L3.96409091,10.71 L3.96409091,10.71 Z", id: "Shape", fill: "#FBBC05" }),
          _react2.default.createElement("path", { d: "M9,3.57954545 C10.3213636,3.57954545 11.5077273,4.03363636 12.4404545,4.92545455 L15.0218182,2.34409091 C13.4631818,0.891818182 11.4259091,0 9,0 C5.48181818,0 2.43818182,2.01681818 0.957272727,4.95818182 L3.96409091,7.29 C4.67181818,5.16272727 6.65590909,3.57954545 9,3.57954545 L9,3.57954545 Z", id: "Shape", fill: "#EA4335" }),
          _react2.default.createElement("path", { d: "M0,0 L18,0 L18,18 L0,18 L0,0 Z", id: "Shape" })
        ),
        _react2.default.createElement("g", { id: "handles_square" })
      )
    )
  );
}
//# sourceMappingURL=oauth-google-icon.js.map