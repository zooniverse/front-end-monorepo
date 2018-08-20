'use strict';

var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Modal = require('./Modal');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var title = 'Modal Heading';

var content = _react2.default.createElement(
  'div',
  null,
  'Leo mollis dictum id dis maecenas consectetur metus elementum vivamus nisl, suscipit tristique lectus nulla mus etiam nisi facilisis magnis, scelerisque ligula montes luctus cursus nibh vulputate parturient risus.'
);

describe('Modal', function () {
  it('should render without crashing', function () {
    (0, _enzyme.shallow)(_react2.default.createElement(
      _Modal.Modal,
      { title: title },
      content
    ));
  });
});