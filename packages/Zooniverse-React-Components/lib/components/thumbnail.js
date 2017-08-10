'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MAX_THUMBNAIL_DIMENSION = 999;

var Thumbnail = function (_React$Component) {
  _inherits(Thumbnail, _React$Component);

  function Thumbnail(props) {
    _classCallCheck(this, Thumbnail);

    var _this = _possibleConstructorReturn(this, (Thumbnail.__proto__ || Object.getPrototypeOf(Thumbnail)).call(this, props));

    _this.state = {
      failed: false
    };

    _this.handleError = _this.handleError.bind(_this);
    return _this;
  }

  _createClass(Thumbnail, [{
    key: 'getThumbnailSrc',
    value: function getThumbnailSrc(_ref) {
      var origin = _ref.origin,
          width = _ref.width,
          height = _ref.height,
          src = _ref.src;
      // eslint-disable-line class-methods-use-this
      var srcPath = src.split('//').pop();
      return origin + '/' + width + 'x' + height + '/' + srcPath;
    }
  }, {
    key: 'handleError',
    value: function handleError() {
      if (!this.state.failed) {
        this.setState({ failed: true });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var src = this.state.failed ? this.props.src : this.getThumbnailSrc(this.props);

      var dimensions = {
        width: null,
        height: null
      };

      var style = {
        maxWidth: this.props.width,
        maxHeight: this.props.height
      };

      if (this.props.format === 'mp4') {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'video',
            { width: '300', controls: true },
            _react2.default.createElement('source', { src: this.props.src, type: 'video/mp4' })
          )
        );
      }

      return _react2.default.createElement('img', _extends({ alt: '' }, this.props, { src: src }, dimensions, { style: style, onError: this.handleError }));
    }
  }]);

  return Thumbnail;
}(_react2.default.Component);

exports.default = Thumbnail;


Thumbnail.defaultProps = {
  format: 'image',
  height: MAX_THUMBNAIL_DIMENSION,
  origin: 'https://thumbnails.zooniverse.org',
  src: '',
  width: MAX_THUMBNAIL_DIMENSION
};

Thumbnail.propTypes = {
  format: _propTypes2.default.string,
  height: _propTypes2.default.number,
  origin: _propTypes2.default.string,
  src: _propTypes2.default.string,
  width: _propTypes2.default.number
};