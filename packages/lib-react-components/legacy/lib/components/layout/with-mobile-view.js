'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = withMobileView;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MAX_MOBILE_WIDTH = 1080;

function withMobileView(WrappedComponent) {
  var WithMobileView = function (_React$Component) {
    _inherits(WithMobileView, _React$Component);

    function WithMobileView() {
      _classCallCheck(this, WithMobileView);

      var _this = _possibleConstructorReturn(this, (WithMobileView.__proto__ || Object.getPrototypeOf(WithMobileView)).call(this));

      _this.state = {
        isMobile: false
      };

      _this._resizeTimeout = NaN;
      _this.handleResize = _this.handleResize.bind(_this);
      _this.handleResize();
      return _this;
    }

    _createClass(WithMobileView, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (window) window.addEventListener('resize', this.handleResize);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (window) window.removeEventListener('resize', this.handleResize);
        clearTimeout(this._resizeTimeout);
      }
    }, {
      key: 'handleResize',
      value: function handleResize() {
        var _this2 = this;

        if (!isNaN(this._resizeTimeout)) {
          clearTimeout(this._resizeTimeout);
        }

        if (window) {
          this._resizeTimeout = setTimeout(function () {
            _this2.setState({
              isMobile: window.innerWidth <= MAX_MOBILE_WIDTH
            }, function () {
              _this2._resizeTimeout = NaN;
            });
          }, 100);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, _extends({ isMobile: this.state.isMobile }, this.props));
      }
    }]);

    return WithMobileView;
  }(_react2.default.Component);

  WithMobileView.displayName = 'WithMobileView(' + getDisplayName(WrappedComponent) + ')';
  return WithMobileView;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
//# sourceMappingURL=with-mobile-view.js.map