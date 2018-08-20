'use strict';

var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ModalBody = require('./ModalBody');

var _ModalBody2 = _interopRequireDefault(_ModalBody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var content = _react2.default.createElement(
  'div',
  null,
  'Leo mollis dictum id dis maecenas consectetur metus elementum vivamus nisl, suscipit tristique lectus nulla mus etiam nisi facilisis magnis, scelerisque ligula montes luctus cursus nibh vulputate parturient risus.'
);

describe('Modal > ModalBody', function () {
  it('should render without crashing', function () {
    (0, _enzyme.shallow)(_react2.default.createElement(
      _ModalBody2.default,
      null,
      content
    ));
  });

  it('should render its children', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _ModalBody2.default,
      null,
      content
    ));
    var contentWrapper = (0, _enzyme.shallow)(content);
    expect(wrapper.text()).to.equal(contentWrapper.text());
  });
});