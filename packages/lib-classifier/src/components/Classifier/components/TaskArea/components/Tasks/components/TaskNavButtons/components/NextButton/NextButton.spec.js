import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { GoldButton } from '@zooniverse/react-components'
import { NextButton } from './NextButton'

describe('NextButton', function () {
  describe('rendering', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<NextButton onClick={() => {}} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should render a GoldButton component', function () {
      expect(wrapper.find(GoldButton)).to.have.lengthOf(1)
    })
  })

  describe('onClick event', function () {
    let wrapper
    const onClickSpy = sinon.spy()
    before(function () {
      wrapper = shallow(<NextButton onClick={onClickSpy} />)
    })

    it('should call props.onClick for the onClick event', function () {
      wrapper.simulate('click')
      expect(onClickSpy).to.have.been.calledOnce()
    })
  })

  describe('props.disabled', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<NextButton onClick={() => { }} />)
    })

    it('should not be disabled if props.disabled is false', function () {
      expect(wrapper.props().disabled).to.be.false()
    })

    it('should be disabled if props.disabled is true', function () {
      wrapper.setProps({ disabled: true })
      expect(wrapper.props().disabled).to.be.true()
    })
  })

  describe('props.autoFocus', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<NextButton onClick={() => { }} />)
    })

    it('should not be auto-focused if props.autoFocus is false', function () {
      expect(wrapper.props().autoFocus).to.be.false()
    })

    it('should be auto-focused if props.autoFocus is true', function () {
      wrapper.setProps({ autoFocus: true })
      expect(wrapper.props().autoFocus).to.be.true()
    })
  })
})
