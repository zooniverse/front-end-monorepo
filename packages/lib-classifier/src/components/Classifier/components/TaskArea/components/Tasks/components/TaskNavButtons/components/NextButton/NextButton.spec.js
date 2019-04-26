import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import { NextButton } from './NextButton'

describe('NextButton', function () {
  describe('rendering', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<NextButton onClick={() => {}} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok
    })

    it('should render a `button` element', function () {
      expect(wrapper.render().is('button')).to.be.true
    })
  })

  describe('onClick event', function () {
    let wrapper
    const onClickSpy = sinon.spy()
    before(function () {
      wrapper = shallow(<NextButton onClick={onClickSpy} />)
    })

    it('should call props.onClick for the onClick event', function () {
      wrapper.find('WithTheme(Button)').simulate('click')
      expect(onClickSpy.calledOnce).to.be.true
    })
  })

  describe('props.disabled', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<NextButton onClick={() => { }} />)
    })

    it('should not be disabled if props.disabled is false', function () {
      expect(wrapper.find('WithTheme(Button)').props().disabled).to.be.false
    })

    it('should be disabled if props.disabled is true', function () {
      wrapper.setProps({ disabled: true })
      expect(wrapper.find('WithTheme(Button)').props().disabled).to.be.true
    })
  })

  describe('props.autoFocus', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<NextButton onClick={() => { }} />)
    })

    it('should not be auto-focused if props.autoFocus is false', function () {
      expect(wrapper.find('WithTheme(Button)').props().autoFocus).to.be.false
    })

    it('should be auto-focused if props.autoFocus is true', function () {
      wrapper.setProps({ autoFocus: true })
      expect(wrapper.find('WithTheme(Button)').props().autoFocus).to.be.true
    })
  })
})
