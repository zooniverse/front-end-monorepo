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

var DragAndDropTarget = function (_React$Component) {
  _inherits(DragAndDropTarget, _React$Component);

  function DragAndDropTarget(props) {
    _classCallCheck(this, DragAndDropTarget);

    var _this = _possibleConstructorReturn(this, (DragAndDropTarget.__proto__ || Object.getPrototypeOf(DragAndDropTarget)).call(this, props));

    _this.state = {
      canDrop: false
    };

    _this.handleDragEnter = _this.handleDragEnter.bind(_this);
    _this.handleDragOver = _this.handleDragOver.bind(_this);
    _this.handleDragLeave = _this.handleDragLeave.bind(_this);
    _this.handleDrop = _this.handleDrop.bind(_this);
    return _this;
  }

  _createClass(DragAndDropTarget, [{
    key: 'handleDragEnter',
    value: function handleDragEnter(e) {
      e.preventDefault();
      this.setState({ canDrop: true });

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this.props.onDragEnter(args);
    }
  }, {
    key: 'handleDragOver',
    value: function handleDragOver(e) {
      e.preventDefault();

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      this.props.onDragOver(args);
    }
  }, {
    key: 'handleDragLeave',
    value: function handleDragLeave(e) {
      e.preventDefault();

      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      this.props.onDragLeave(args);
    }
  }, {
    key: 'handleDrop',
    value: function handleDrop(e) {
      e.preventDefault();
      this.setState({ canDrop: false });

      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      this.props.onDrop(args);
    }
  }, {
    key: 'render',
    value: function render() {
      var className = ('file-drop-target ' + this.props.className).trim();
      return _react2.default.createElement(
        'div',
        _extends({}, this.props, {
          className: className,
          onDragEnter: this.handleDragEnter,
          onDragOver: this.handleDragOver,
          onDragLeave: this.handleDragLeave,
          onDrop: this.handleDrop,
          'data-can-drop': this.state.canDrop || null
        }),
        this.props.children
      );
    }
  }]);

  return DragAndDropTarget;
}(_react2.default.Component);

exports.default = DragAndDropTarget;


DragAndDropTarget.defaultProps = {
  children: null,
  className: '',
  onDragEnter: function onDragEnter() {},
  onDragOver: function onDragOver() {},
  onDragLeave: function onDragLeave() {},
  onDrop: function onDrop() {}
};

DragAndDropTarget.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  onDragEnter: _propTypes2.default.func,
  onDragOver: _propTypes2.default.func,
  onDragLeave: _propTypes2.default.func,
  onDrop: _propTypes2.default.func
};
//# sourceMappingURL=drag-and-drop-target.js.map