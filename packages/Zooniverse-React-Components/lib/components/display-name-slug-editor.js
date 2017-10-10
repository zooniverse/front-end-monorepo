'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DisplayNameSlugEditor = function (_Component) {
  _inherits(DisplayNameSlugEditor, _Component);

  function DisplayNameSlugEditor(props) {
    _classCallCheck(this, DisplayNameSlugEditor);

    var _this = _possibleConstructorReturn(this, (DisplayNameSlugEditor.__proto__ || Object.getPrototypeOf(DisplayNameSlugEditor)).call(this, props));

    _this.getResourceUrl = _this.getResourceUrl.bind(_this);
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    _this.undoNameChange = _this.undoNameChange.bind(_this);
    _this.warnURLChange = _this.warnURLChange.bind(_this);
    _this.state = {
      value: '',
      url: null,
      warn: false
    };
    return _this;
  }

  _createClass(DisplayNameSlugEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getResourceUrl(this.props.resource);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.resource !== nextProps.resource) {
        this.getResourceUrl(nextProps.resource);
      }
    }
  }, {
    key: 'getResourceUrl',
    value: function getResourceUrl(resource) {
      var resourceType = this.props.resourceType;

      this.setState({ value: resource.display_name, url: '/' + resourceType + 's/' + resource.slug });
    }
  }, {
    key: 'value',
    value: function value() {
      return this.state.value;
    }
  }, {
    key: 'handleInputChange',
    value: function handleInputChange(event) {
      var value = event.target.value;
      this.setState({ value: value });
      this.warnURLChange(this.props.resource, value);
    }
  }, {
    key: 'undoNameChange',
    value: function undoNameChange() {
      this.setState({ value: this.props.resource.display_name, warn: false });
    }
  }, {
    key: 'warnURLChange',
    value: function warnURLChange(resource, displayNameInputValue) {
      var warn = resource.display_name !== displayNameInputValue && (resource.slug.match(/(untitled-project)/i) === null || resource.slug.match(/(untitled-organization)/i) === null);

      if (warn) {
        this.setState({ warn: warn });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var state = this.state,
          undoNameChange = this.undoNameChange;
      var _props = this.props,
          resource = _props.resource,
          resourceType = _props.resourceType;

      return _react2.default.createElement(
        'p',
        { className: '' + this.props.className },
        _react2.default.createElement(
          'label',
          { htmlFor: 'display_name' },
          _react2.default.createElement(
            'span',
            { className: this.props.className + '__form-label' },
            'Name'
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement('input', {
            type: 'text',
            className: this.props.className + '__form-input',
            disabled: resource.live || !!resource.listed_at,
            id: 'display_name',
            name: 'display_name',
            onChange: this.handleInputChange,
            ref: function ref(node) {
              _this2.input = node;
            },
            value: this.state.value
          })
        ),
        state.warn ? _react2.default.createElement(
          'small',
          { className: this.props.className + '__form-help' },
          'You\u2019re changing the url of your ',
          resourceType,
          '. Users with bookmarks and links in Talk will no longer work.',
          ' ',
          _react2.default.createElement(
            'button',
            { type: 'button', onClick: undoNameChange },
            'Cancel'
          ),
          ' '
        ) : null,
        state.url ? _react2.default.createElement(
          'small',
          { className: this.props.className + '__form-help' },
          resource.live || !!resource.listed_at ? 'You cannot change a live ' + resourceType + '\'s name.' : 'The ' + resourceType + ' name is the first thing people will see about the ' + resourceType + ', and it will show up in the ' + resourceType + ' URL. Try to keep it short and sweet.',
          ' ',
          'Your ',
          resourceType,
          '\u2019s URL is',
          ' ',
          _react2.default.createElement(
            'a',
            { href: this.props.origin + state.url },
            this.props.origin + state.url
          )
        ) : null
      );
    }
  }]);

  return DisplayNameSlugEditor;
}(_react.Component);

DisplayNameSlugEditor.propTypes = {
  className: _propTypes2.default.string,
  origin: _propTypes2.default.string,
  resource: _propTypes2.default.shape({
    display_name: _propTypes2.default.string,
    listed_at: _propTypes2.default.string,
    live: _propTypes2.default.bool
  }),
  resourceType: _propTypes2.default.string
};

DisplayNameSlugEditor.defaultProps = {
  className: 'slug-editor',
  origin: window.location.origin,
  resource: {},
  resourceType: ''
};

exports.default = DisplayNameSlugEditor;