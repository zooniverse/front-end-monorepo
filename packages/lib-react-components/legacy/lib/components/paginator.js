'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
      selectionText = _ref.selectionText,
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
      selectionText,
      ' ',
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
  ),
  selectionText: 'OF'
};

Paginator.propTypes = {
  className: _propTypes2.default.string,
  firstAndLast: _propTypes2.default.bool,
  firstLabel: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
  itemCount: _propTypes2.default.bool,
  lastLabel: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
  nextLabel: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
  onClickNext: _propTypes2.default.func,
  onClickPrev: _propTypes2.default.func,
  onPageChange: _propTypes2.default.func,
  page: _propTypes2.default.number,
  pageCount: _propTypes2.default.number,
  pageKey: _propTypes2.default.string,
  pageSelector: _propTypes2.default.bool,
  previousLabel: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
  router: _propTypes2.default.shape({
    push: _propTypes2.default.func
  }),
  selectionText: _propTypes2.default.string,
  totalItems: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string])
};

exports.default = Paginator;
//# sourceMappingURL=paginator.js.map