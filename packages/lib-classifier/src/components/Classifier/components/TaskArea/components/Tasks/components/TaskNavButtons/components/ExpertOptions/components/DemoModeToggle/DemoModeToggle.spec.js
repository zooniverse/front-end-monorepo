import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import DemoModeToggle from './DemoModeToggle'
import { expect } from 'chai'

describe('ExpertOptions > Component > DemoModeToggle', function () {
  let wrapper, setDemoModeSpy

  beforeEach(function () {
    setDemoModeSpy = sinon.spy()
    wrapper = shallow(
      <DemoModeToggle setDemoMode={setDemoModeSpy} />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should set the checked state using the demoMode prop', function () {
    expect(wrapper.props().checked).to.be.false()
    wrapper.setProps({ demoMode: true })
    expect(wrapper.props().checked).to.be.true()
  })

  it('should use setDemoMode prop for onChange', function () {
    wrapper.simulate('change', { target: { checked: true }})
    expect(setDemoModeSpy).to.have.been.calledWith(true)
  })

  it('should render as a toggle', function () {
    expect(wrapper.props().toggle).to.be.true()
  })

  it('should have a label', function () {
    expect(wrapper.props().label).to.exist()
  })
})
