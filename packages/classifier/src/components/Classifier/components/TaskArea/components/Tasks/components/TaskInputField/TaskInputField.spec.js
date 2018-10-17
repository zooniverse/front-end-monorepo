import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { TaskInputField, StyledTaskInputField } from './TaskInputField'

const radioTypeAnnotation = {
  _key: 1,
  task: 'T0',
  value: null
}

describe('TaskInputField', function () {
  describe('render', function () {
    let wrapper
    before(function () {
      wrapper = mount(<TaskInputField annotation={radioTypeAnnotation} index={0} type='radio' />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok
    })

    it('should renders a ThemeProvider', function () {
      expect(wrapper.find('ThemeProvider')).to.have.lengthOf(1)
    })

    it('should render a StyledTaskInputField', function () {
      expect(wrapper.find(StyledTaskInputField)).to.have.lengthOf(1)
    })

    it('should render a TaskInputLabel', function () {
      expect(wrapper.find('TaskInputLabel')).to.have.lengthOf(1)
    })

    it('should use props.className in its classlist', function () {
      wrapper.setProps({ className: 'active' })
      expect(wrapper.props().className).to.include('active')
    })
  })

  describe('onChange method', function () {
    let onChangeSpy
    let unFocusSpy
    let onChangePropsSpy
    let wrapper
    before(function () {
      onChangeSpy = sinon.spy(TaskInputField.prototype, 'onChange')
      unFocusSpy = sinon.spy(TaskInputField.prototype, 'unFocus')
      onChangePropsSpy = sinon.spy()
      wrapper = mount(<TaskInputField annotation={radioTypeAnnotation} onChange={onChangePropsSpy} index={0} type='radio' />)
    })

    afterEach(function () {
      onChangeSpy.resetHistory()
      unFocusSpy.resetHistory()
      onChangePropsSpy.resetHistory()
    })

    after(function () {
      onChangeSpy.restore()
      unFocusSpy.restore()
    })

    it('should call onChange when the on change event is fired', function () {
      wrapper.find('input').simulate('change')
      expect(onChangeSpy.calledOnce).to.be.true
    })

    it('should call onFocus in the onChange method', function () {
      wrapper.find('input').simulate('change')
      expect(unFocusSpy.calledOnce).to.be.true
    })

    it('should call props.onChange in the onChange method', function () {
      wrapper.find('input').simulate('change')
      expect(onChangePropsSpy.calledOnce).to.be.true
    })
  })

  describe('onFocus method', function () {
    let wrapper
    let onFocusSpy
    before(function () {
      onFocusSpy = sinon.spy(TaskInputField.prototype, 'onFocus')
      wrapper = mount(<TaskInputField annotation={radioTypeAnnotation} index={0} type='radio' />)
    })

    afterEach(function () {
      onFocusSpy.resetHistory()
    })

    after(function () {
      onFocusSpy.restore()
    })

    it('should call onFocus when the on focus event fires', function () {
      wrapper.find('input').simulate('focus')
      expect(onFocusSpy.calledOnce).to.be.true
    })

    // This isn't working. Can data attributes update in tests?
    // it('should set the data-focus attribute to true if this.field is defined', function() {
    //   wrapper.find('input').simulate('focus');
    //   wrapper.update();
    //   expect(wrapper.instance().field).to.exist;
    //   expect(wrapper.find(StyledTaskInputField).props()['data-focus']).to.be.true;
    // });

    // it('should not set the data-focus attribute to true if this.field is not defined', function() {
    //   wrapper.instance().field = null;
    //   wrapper.find('input').simulate('focus');
    //   expect(wrapper.instance().field).to.not.exist;
    //   expect(wrapper.find(StyledTaskInputField).props()['data-focus']).to.be.false;
    // });
  })

  describe('onBlur method', function () {
    let wrapper
    let unFocusSpy
    let onBlurSpy
    before(function () {
      onBlurSpy = sinon.spy(TaskInputField.prototype, 'onBlur')
      unFocusSpy = sinon.spy(TaskInputField.prototype, 'unFocus')
      wrapper = mount(<TaskInputField annotation={radioTypeAnnotation} index={0} type='radio' />)
    })

    afterEach(function () {
      onBlurSpy.resetHistory()
      unFocusSpy.resetHistory()
    })

    afterEach(function () {
      onBlurSpy.restore()
      unFocusSpy.restore()
    })

    it('should call onBlur when the on blur event fires', function () {
      wrapper.find('input').simulate('blur')
      expect(onBlurSpy.calledOnce).to.be.true
    })

    it('should call unFocus in the onBlur method', function () {
      wrapper.find('input').simulate('blur')
      expect(unFocusSpy.calledOnce).to.be.true
    })
  })

  // describe.only('unFocus method', function() {
  //   let wrapper;
  //   let unFocusSpy;
  //   before(function () {
  //     unFocusSpy = sinon.spy(TaskInputField.prototype, 'unFocus');
  //     wrapper = mount(<TaskInputField annotation={radioTypeAnnotation} index={0} type="radio" />);
  //   });

  //   afterEach(function () {
  //     unFocusSpy.resetHistory();
  //   });

  //   afterEach(function () {
  //     unFocusSpy.restore();
  //   });

  //   it('should set the data-focus attribute to true if this.field is defined', function() {
  //     wrapper.instance().onFocus(); // set data-field focus to true
  //     wrapper.update();
  //     wrapper.instance().unFocus();
  //     wrapper.update();
  //     expect(wrapper.instance().field).to.exist;
  //     expect(wrapper.find(StyledTaskInputField).props()['data-focus']).to.be.false;
  //   });

  //   it('should not set the data-focus attribute to true if this.field is not defined', function() {
  //     wrapper.instance().onFocus(); // set data-field focus to true
  //     wrapper.update();
  //     console.log(wrapper.debug())
  //     wrapper.instance().field = null;
  //     expect(wrapper.instance().field).to.not.exist;
  //     wrapper.instance().unFocus();
  //     wrapper.update();
  //     expect(wrapper.find(StyledTaskInputField).props()['data-focus']).to.be.true;
  //   });
  // });
})
