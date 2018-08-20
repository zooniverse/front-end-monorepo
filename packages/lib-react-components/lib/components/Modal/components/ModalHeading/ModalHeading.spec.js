'use strict';

var _enzyme = require('enzyme');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ModalHeading = require('./ModalHeading');

var _ModalHeading2 = _interopRequireDefault(_ModalHeading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var title = 'Modal Heading';

describe('Modal > ModalHeading', function () {
  it('should render without crashing', function () {
    (0, _enzyme.shallow)(_react2.default.createElement(_ModalHeading2.default, { title: title }));
  });

  it('should render the title prop', function () {
    var wrapper = (0, _enzyme.render)(_react2.default.createElement(_ModalHeading2.default, { title: title }));
    expect(wrapper.text()).to.equal(title);
  });
});