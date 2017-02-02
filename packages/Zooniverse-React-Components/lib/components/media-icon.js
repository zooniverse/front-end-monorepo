'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _triggered = require('modal-form/triggered');

var _triggered2 = _interopRequireDefault(_triggered);

var _thumbnail = require('./thumbnail');

var _thumbnail2 = _interopRequireDefault(_thumbnail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MediaIcon = function (_React$Component) {
  _inherits(MediaIcon, _React$Component);

  function MediaIcon(props) {
    _classCallCheck(this, MediaIcon);

    var _this = _possibleConstructorReturn(this, (MediaIcon.__proto__ || Object.getPrototypeOf(MediaIcon)).call(this, props));

    _this.state = {
      deleting: false
    };

    _this.handleDelete = _this.handleDelete.bind(_this);
    return _this;
  }

  _createClass(MediaIcon, [{
    key: 'handleDelete',
    value: function handleDelete() {
      var _this2 = this;

      this.setState({ deleting: true });
      this.props.resource.delete().then(function () {
        _this2.setState({ deleting: false });
        _this2.props.onDelete(_this2.props.resource);
      });
    }

    /* eslint-disable max-len */

  }, {
    key: 'render',
    value: function render() {
      var mediaIconStyle = this.state.deleting ? { opacity: 0.5 } : null;

      return _react2.default.createElement(
        'div',
        { className: 'media-icon', style: mediaIconStyle },
        _react2.default.createElement(
          'div',
          { className: 'media-icon-thumbnail-container' },
          _react2.default.createElement(
            _triggered2.default,
            {
              trigger: _react2.default.createElement(_thumbnail2.default, { className: 'media-icon-thumbnail', src: this.props.resource.src, height: this.props.height, style: { position: 'relative' } })
            },
            _react2.default.createElement(
              'div',
              { className: 'content-container' },
              _react2.default.createElement('img', { alt: '', src: this.props.resource.src, style: { maxHeight: '80vh', maxWidth: '60vw' } })
            )
          ),
          _react2.default.createElement(
            'button',
            { type: 'button', className: 'media-icon-delete-button', disabled: this.state.deleting, onClick: this.handleDelete },
            '\xD7'
          )
        ),
        this.props.resource.metadata && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'span',
            { className: 'media-icon-label', style: { position: 'relative' } },
            this.props.resource.metadata.filename
          ),
          _react2.default.createElement('textarea', {
            className: 'media-icon-markdown',
            value: '![' + this.props.resource.metadata.filename + '(' + this.props.resource.src + ')',
            readOnly: true,
            style: { position: 'relative' },
            onFocus: function onFocus(e) {
              return e.target.setSelectionRange(0, e.target.value.length);
            }
          })
        )
      );
    }
    /* eslint-enable */

  }]);

  return MediaIcon;
}(_react2.default.Component);

exports.default = MediaIcon;


MediaIcon.defaultProps = {
  height: 80,
  onDelete: function onDelete() {},
  resource: {}
};

MediaIcon.propTypes = {
  height: _react2.default.PropTypes.number,
  onDelete: _react2.default.PropTypes.func,
  resource: _react2.default.PropTypes.shape({
    delete: _react2.default.PropTypes.func,
    id: _react2.default.PropTypes.string,
    metadata: _react2.default.PropTypes.object,
    src: _react2.default.PropTypes.string
  }).isRequired
};