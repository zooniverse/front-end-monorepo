import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import MetadataButton from './MetadataButton'

describe('MetadataButton', function () {
  const onClickSpy = sinon.spy()
  it('should render without crashing', function () {
    const wrapper = shallow(<MetadataButton />)
    expect(wrapper).to.be.ok
  })

  it('should call props.onClick when button is clicked', function () {
    const wrapper = mount(<MetadataButton onClick={onClickSpy} />)
    wrapper.find('button').simulate('click')
    expect(onClickSpy.calledOnce).to.be.true
  })
})
