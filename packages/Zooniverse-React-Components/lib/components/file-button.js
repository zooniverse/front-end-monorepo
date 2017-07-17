'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileButton = function (_React$Component) {
  _inherits(FileButton, _React$Component);

  function FileButton(props) {
    _classCallCheck(this, FileButton);

    var _this = _possibleConstructorReturn(this, (FileButton.__proto__ || Object.getPrototypeOf(FileButton)).call(this, props));

    _this.state = {
      resetting: false
    };

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(FileButton, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.resetting) {
        this.setState({ resetting: false }); // eslint-disable-line react/no-did-update-set-state
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.props.onSelect(args);
      this.setState({ resetting: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var input = void 0;
      if (this.state.resetting) {
        input = null;
      } else {
        var _props = this.props,
            accept = _props.accept,
            multiple = _props.multiple,
            disabled = _props.disabled;

        var passedProps = { accept: accept, multiple: multiple, disabled: disabled };
        input = _react2.default.createElement('input', _extends({ type: 'file' }, passedProps, { style: this.props.inputStyle, onChange: this.handleChange }));
      }

      var styles = Object.assign({}, this.props.rootStyle, this.props.style);

      var props = {
        'data-accept': this.props.accept,
        'data-disabled': this.props.disabled || null,
        'data-multiple': this.props.multiple || null,
        className: ('file-button ' + this.props.className).trim(),
        style: styles
      };

      return _react2.default.createElement(this.props.tag, props, _react2.default.createElement(
        'span',
        { style: this.props.containerStyle },
        input
      ), this.props.children);
    }
  }]);

  return FileButton;
}(_react2.default.Component);

exports.default = FileButton;


FileButton.defaultProps = {
  accept: '*/*',
  children: null,
  className: '',
  containerStyle: {
    height: '100%',
    left: 0,
    opacity: 0.01,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    width: '100%'
  },
  disabled: false,
  inputStyle: {
    cursor: 'pointer',
    height: '300%',
    left: '-100%',
    opacity: 0.01,
    position: 'absolute',
    top: '-100%',
    width: '300%'
  },
  multiple: false,
  onSelect: function onSelect() {},
  rootStyle: { position: 'relative' },
  style: {},
  tag: 'label'
};

FileButton.propTypes = {
  accept: _react2.default.PropTypes.string,
  children: _react2.default.PropTypes.node,
  className: _react2.default.PropTypes.string,
  containerStyle: _react2.default.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  disabled: _react2.default.PropTypes.bool,
  inputStyle: _react2.default.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  multiple: _react2.default.PropTypes.bool,
  onSelect: _react2.default.PropTypes.func,
  rootStyle: _react2.default.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  style: _react2.default.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  tag: _react2.default.PropTypes.string
};