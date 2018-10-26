import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import TaskHelpButton, { StyledTaskHelpButton } from './TaskHelpButton'

describe('TaskHelpButton', function () {
  const onClickSpy = sinon.spy()
  it('should render without crashing', function () {
    const wrapper = mount(<TaskHelpButton />)
    expect(wrapper).to.be.ok
  })

  it('should render a StyledTaskHelpButton', function () {
    const wrapper = mount(<TaskHelpButton />)
    expect(wrapper.find(StyledTaskHelpButton)).to.have.lengthOf(1)
  })

  xit('should render a Translate component', function () {
    const wrapper = mount(<TaskHelpButton />)
    expect(wrapper.find('Translate')).to.have.lengthOf(1)
  })

  it('should call props.onClick when button is clicked', function () {
    const wrapper = mount(<TaskHelpButton onClick={onClickSpy} />)
    wrapper.find('button').simulate('click')
    expect(onClickSpy.calledOnce).to.be.true
  })
})
