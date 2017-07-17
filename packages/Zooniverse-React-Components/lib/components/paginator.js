'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _updateQueryParams = require('../lib/update-query-params');

var _updateQueryParams2 = _interopRequireDefault(_updateQueryParams);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var pageOption = function pageOption(n) {
  return _react2.default.createElement(
    'option',
    { key: n, value: n },
    n
  );
};

var Paginator = function Paginator(_ref) {
  var className = _ref.className,
      firstAndLast = _ref.firstAndLast,
      firstLabel = _ref.firstLabel,
      itemCount = _ref.itemCount,
      lastLabel = _ref.lastLabel,
      nextLabel = _ref.nextLabel,
      onClickNext = _ref.onClickNext,
      onClickPrev = _ref.onClickPrev,
      onPageChange = _ref.onPageChange,
      page = _ref.page,
      pageCount = _ref.pageCount,
      pageKey = _ref.pageKey,
      pageSelector = _ref.pageSelector,
      previousLabel = _ref.previousLabel,
      router = _ref.router,
      totalItems = _ref.totalItems;

  var pageChange = void 0;
  if (router && !onPageChange) {
    pageChange = function pageChange(activePage) {
      var queryChange = {};
      queryChange[pageKey] = activePage;
      (0, _updateQueryParams2.default)(router, queryChange);
    };
  } else {
    pageChange = onPageChange;
  }

  var clickPrev = void 0;
  if (onClickPrev) {
    clickPrev = function clickPrev() {
      onClickPrev(page);
    };
  } else {
    clickPrev = function clickPrev() {
      pageChange(page - 1);
    };
  }

  var clickNext = void 0;
  if (onClickNext) {
    clickNext = function clickNext() {
      onClickNext(page);
    };
  } else {
    clickNext = function clickNext() {
      pageChange(page + 1);
    };
  }

  var paginatorClassName = ('paginator ' + className).trim();

  return _react2.default.createElement(
    'div',
    { className: paginatorClassName },
    firstAndLast && _react2.default.createElement(
      'button',
      {
        type: 'button',
        id: 'first',
        className: 'paginator-button',
        onClick: function onClick() {
          return pageChange(1);
        },
        disabled: page === 1
      },
      firstLabel
    ),
    _react2.default.createElement(
      'button',
      {
        type: 'button',
        id: 'previous',
        className: 'paginator-button',
        disabled: page === 1,
        onClick: function onClick() {
          return clickPrev();
        }
      },
      previousLabel
    ),
    pageSelector && _react2.default.createElement(
      'div',
      { className: 'paginator-page-selector' },
      'PAGE',
      _react2.default.createElement(
        'select',
        {
          value: page,
          onChange: function onChange(e) {
            pageChange(e.target.value);
          }
        },
        [].concat(_toConsumableArray(Array(pageCount).keys())).map(function (i) {
          return pageOption(i + 1);
        })
      ),
      ' OF ',
      pageCount
    ),
    itemCount && totalItems && _react2.default.createElement(
      'div',
      { className: 'paginator-page-selector' },
      totalItems
    ),
    _react2.default.createElement(
      'button',
      {
        type: 'button',
        id: 'next',
        className: 'paginator-button',
        disabled: page === pageCount,
        onClick: function onClick() {
          return clickNext();
        }
      },
      nextLabel
    ),
    firstAndLast && _react2.default.createElement(
      'button',
      {
        type: 'button',
        id: 'last',
        className: 'paginator-button',
        onClick: function onClick() {
          return pageChange(pageCount);
        },
        disabled: page === pageCount
      },
      lastLabel
    )
  );
};

Paginator.defaultProps = {
  className: '',
  firstAndLast: true,
  firstLabel: _react2.default.createElement(
    'span',
    { className: 'paginator-label' },
    _react2.default.createElement(
      'span',
      { className: 'paginator-icon' },
      '\xAB'
    ),
    ' first'
  ),
  itemCount: false,
  lastLabel: _react2.default.createElement(
    'span',
    { className: 'paginator-label' },
    'last ',
    _react2.default.createElement(
      'span',
      { className: 'paginator-icon' },
      '\xBB'
    )
  ),
  nextLabel: _react2.default.createElement(
    'span',
    { className: 'paginator-label' },
    'next ',
    _react2.default.createElement(
      'span',
      { className: 'paginator-icon' },
      '\u203A'
    )
  ),
  page: 1,
  pageKey: 'page',
  pageSelector: true,
  previousLabel: _react2.default.createElement(
    'span',
    { className: 'paginator-label' },
    _react2.default.createElement(
      'span',
      { className: 'paginator-icon' },
      '\u2039'
    ),
    ' previous'
  )
};

Paginator.propTypes = {
  className: _react2.default.PropTypes.string,
  firstAndLast: _react2.default.PropTypes.bool,
  firstLabel: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.node, _react2.default.PropTypes.string]),
  itemCount: _react2.default.PropTypes.bool,
  lastLabel: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.node, _react2.default.PropTypes.string]),
  nextLabel: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.node, _react2.default.PropTypes.string]),
  onClickNext: _react2.default.PropTypes.func,
  onClickPrev: _react2.default.PropTypes.func,
  onPageChange: _react2.default.PropTypes.func,
  page: _react2.default.PropTypes.number,
  pageCount: _react2.default.PropTypes.number,
  pageKey: _react2.default.PropTypes.string,
  pageSelector: _react2.default.PropTypes.bool,
  previousLabel: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.node, _react2.default.PropTypes.string]),
  router: _react2.default.PropTypes.shape({
    push: _react2.default.PropTypes.func
  }),
  totalItems: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.node, _react2.default.PropTypes.string])
};

exports.default = Paginator;