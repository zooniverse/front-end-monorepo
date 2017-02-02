'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _apiClient = require('panoptes-client/lib/api-client');

var _apiClient2 = _interopRequireDefault(_apiClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var delayBy = function delayBy(timeout, fn) {
  return setTimeout(fn, timeout);
};

var UserSearch = function (_React$Component) {
  _inherits(UserSearch, _React$Component);

  function UserSearch(props) {
    _classCallCheck(this, UserSearch);

    var _this = _possibleConstructorReturn(this, (UserSearch.__proto__ || Object.getPrototypeOf(UserSearch)).call(this, props));

    _this.queryTimeout = NaN;

    _this.state = {
      users: []
    };

    _this.clear = _this.clear.bind(_this);
    _this.value = _this.value.bind(_this);
    _this.searchUsers = _this.searchUsers.bind(_this);
    return _this;
  }

  _createClass(UserSearch, [{
    key: 'onChange',
    value: function onChange(users) {
      console.log('heyo');
      this.setState({ users: users });
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.setState({ users: [] });
    }
  }, {
    key: 'value',
    value: function value() {
      return this.state.users;
    }
  }, {
    key: 'searchUsers',
    value: function searchUsers(value) {
      var _this2 = this;

      clearTimeout(this.queryTimeout);
      var onSearch = this.props.onSearch;

      if (value === '') {
        return Promise.resolve({ options: [] });
      }

      return new Promise(function (resolve) {
        _this2.queryTimeout = delayBy(_this2.props.debounce, function () {
          console.log('hey');
          if (onSearch) {
            onSearch();
          }

          return _apiClient2.default.type('users').get({ search: value, page_size: 10 }).then(function (users) {
            users.map(function (user) {
              return {
                value: user.id,
                label: '@' + user.login + ': ' + user.display_name
              };
            });
          }).then(function (options) {
            return resolve({ options: options });
          }).catch(function (err) {
            console.error(err);
          });
        });

        return _this2.queryTimeout;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_reactSelect2.default.Async, {
        multi: this.props.multi,
        name: 'userids',
        value: this.state.users,
        onChange: this.onChange,
        placeholder: this.props.placeholder,
        searchPromptText: this.props.searchPromptText,
        className: this.props.className,
        closeAfterClick: true,
        matchProp: 'label',
        loadOptions: this.searchUsers
      });
    }
  }]);

  return UserSearch;
}(_react2.default.Component);

exports.default = UserSearch;


UserSearch.propTypes = {
  className: _react2.default.PropTypes.string,
  debounce: _react2.default.PropTypes.number,
  multi: _react2.default.PropTypes.bool,
  onSearch: _react2.default.PropTypes.func,
  placeholder: _react2.default.PropTypes.string,
  searchPromptText: _react2.default.PropTypes.string
};

UserSearch.defaultProps = {
  className: 'search',
  debounce: 200,
  multi: true,
  onSearch: null,
  placeholder: 'Username:',
  searchPromptText: 'Type to search Users'
};