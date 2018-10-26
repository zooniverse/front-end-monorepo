import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import NextButton, { StyledNextButton } from './NextButton'

describe('NextButton', function () {
  describe('rendering', function () {
    let wrapper
    before(function () {
      wrapper = mount(<NextButton />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok
    })

    it('should render a ThemeProvider component', function () {
      expect(wrapper.find('ThemeProvider')).to.have.lengthOf(1)
    })

    it('should render a StyledNextButton component', function () {
      expect(wrapper.find(StyledNextButton)).to.have.lengthOf(1)
    })
  })

  describe('onClick event', function () {
    let wrapper
    const onClickSpy = sinon.spy()
    before(function () {
      wrapper = mount(<NextButton onClick={onClickSpy} />)
    })

    it('should call props.onClick for the onClick event', function () {
      wrapper.find('button').simulate('click')
      expect(onClickSpy.calledOnce).to.be.true
    })
  })

  xdescribe('props.disabled', function () {
    let wrapper
    before(function () {
      wrapper = mount(<NextButton />)
    })

    it('should not be disabled if props.disabled is false', function () {
      expect(wrapper.find('button').props().disabled).to.be.false
    })

    it('should be disabled if props.disabled is true', function () {
      wrapper.setProps({ disabled: true })
      expect(wrapper.find('button').props().disabled).to.be.true
    })
  })

  describe('props.autoFocus', function () {
    let wrapper
    before(function () {
      wrapper = mount(<NextButton />)
    })

    it('should not be auto-focused if props.autoFocus is false', function () {
      expect(wrapper.find('button').props().autoFocus).to.be.false
    })

    it('should be auto-focused if props.autoFocus is true', function () {
      wrapper.setProps({ autoFocus: true })
      expect(wrapper.find('button').props().autoFocus).to.be.true
    })
  })
})
