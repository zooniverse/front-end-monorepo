import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { TaskInputField, StyledTaskInputField, StyledTaskLabel } from './TaskInputField'
import TaskInputLabel from './components/TaskInputLabel'

const radioTypeAnnotation = {
  _key: 1,
  task: 'T0',
  value: null
}

describe('TaskInputField', function () {
  describe('render', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<TaskInputField annotation={radioTypeAnnotation} index={0} type='radio' />)
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

    it('should render a StyledTaskLabel', function () {
      expect(wrapper.find(StyledTaskLabel)).to.have.lengthOf(1)
    })

    it('should render a TaskInputLabel', function () {
      expect(wrapper.find(TaskInputLabel)).to.have.lengthOf(1)
    })

    it('should use props.className in its classlist', function () {
      wrapper.setProps({ className: 'active' })
      expect(wrapper.find(StyledTaskInputField).props().className).to.include('active')
    })
  })

  describe('onChange method', function () {
    let onChangeSpy
    let wrapper
    before(function () {
      onChangeSpy = sinon.spy()
      wrapper = shallow(<TaskInputField annotation={radioTypeAnnotation} onChange={onChangeSpy} index={0} type='radio' />)
    })

    afterEach(function () {
      onChangeSpy.resetHistory()
    })

    it('should call onChange when the on change event is fired', function () {
      wrapper.find('input').simulate('change')
      expect(onChangeSpy.calledOnce).to.be.true
    })
  })
})
