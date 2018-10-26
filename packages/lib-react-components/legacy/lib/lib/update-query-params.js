'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = function (router, queryChange) {
  var nextQuery = Object.assign({}, parseQuery(), queryChange);
  return router.push({
    pathname: window.location.pathname,
    query: nextQuery
  });
};

function parseQuery() {
  var query = window.location.search.replace('?', '').split('&');
  var params = {};

  query.forEach(function (string) {
    var _string$split = string.split('='),
        _string$split2 = _slicedToArray(_string$split, 2),
        key = _string$split2[0],
        value = _string$split2[1];

    if (key) {
      params[key] = value;
    }
  });

  return params;
}
//# sourceMappingURL=update-query-params.js.map