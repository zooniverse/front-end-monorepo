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

var IMAGE_EXTENSIONS = ['gif', 'jpeg', 'jpg', 'png', 'svg'];

var VIDEO_EXTENSIONS = ['mp4'];

var MediaCard = function (_React$Component) {
  _inherits(MediaCard, _React$Component);

  function MediaCard() {
    _classCallCheck(this, MediaCard);

    return _possibleConstructorReturn(this, (MediaCard.__proto__ || Object.getPrototypeOf(MediaCard)).apply(this, arguments));
  }

  _createClass(MediaCard, [{
    key: 'render',
    value: function render() {
      var srcExtension = this.props.src.split('.').pop().toLowerCase();
      var mediaRender = void 0;
      if (IMAGE_EXTENSIONS.indexOf(srcExtension) >= 0) {
        mediaRender = _react2.default.createElement('img', { className: 'media-card-media', src: this.props.src });
      } else if (VIDEO_EXTENSIONS.indexOf(srcExtension) >= 0) {
        mediaRender = _react2.default.createElement(
          'video',
          { className: 'media-card-media', src: this.props.src },
          _react2.default.createElement(
            'p',
            null,
            'Your browser does not support this video format.'
          )
        );
      } else {
        console.warn('Not sure how to render ' + this.props.src);
        return null;
      }

      return _react2.default.createElement(
        'div',
        _extends({}, this.props, { className: ('media-card ' + this.props.className).trim() }),
        this.props.src && _react2.default.createElement(
          'div',
          { className: 'media-card-header' },
          mediaRender
        ),
        this.props.children && _react2.default.createElement(
          'div',
          { className: 'media-card-content' },
          this.props.children
        )
      );
    }
  }]);

  return MediaCard;
}(_react2.default.Component);

exports.default = MediaCard;


MediaCard.propTypes = {
  src: _propTypes2.default.string
};

MediaCard.defaultProps = {
  src: ''
};