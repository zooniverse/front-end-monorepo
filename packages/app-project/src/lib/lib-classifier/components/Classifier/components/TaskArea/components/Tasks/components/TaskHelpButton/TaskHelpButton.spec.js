import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import TaskHelpButton from './TaskHelpButton'

describe('TaskHelpButton', function () {
  const onClickSpy = sinon.spy()
  it('should render without crashing', function () {
    const wrapper = shallow(<TaskHelpButton />)
    expect(wrapper).to.be.ok
  })

  it('should call props.onClick when button is clicked', function () {
    const wrapper = mount(<TaskHelpButton onClick={onClickSpy} />)
    wrapper.find('button').simulate('click')
    expect(onClickSpy.calledOnce).to.be.true
  })
})
