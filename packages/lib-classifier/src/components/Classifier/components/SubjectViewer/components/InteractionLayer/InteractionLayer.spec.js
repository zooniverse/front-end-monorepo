import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import InteractionLayer from './InteractionLayer'

const onMouseMove = sinon.stub()
const onMouseUp = sinon.stub()
const onMouseDown = sinon.stub()

let wrapper

describe.only('Component > InteractionLayer', function () {
  beforeEach(function () {
    wrapper = shallow(<InteractionLayer onMouseMove={onMouseMove}
      onMouseUp={onMouseUp} onMouseDown={onMouseDown} />)
  })

  it('should render without crashing', function () {})

  it('should return a transparent rect', function () {
    const rect = wrapper.find('rect')
    expect(rect.exists()).to.be.true
    expect(rect.prop('id')).to.equal('InteractionLayer')
    expect(rect.prop('fill')).to.equal('transparent')
  })

  it('should bind the onMouseMove prop', function () {
    wrapper.simulate('mousemove')
    expect(onMouseMove.called).to.be.true
  })

  it('should bind the onMouseUp prop', function () {
    wrapper.simulate('mouseup')
    expect(onMouseUp.called).to.be.true
  })

  it('should bind the onMouseDown prop', function () {
    wrapper.simulate('mousedown')
    expect(onMouseDown.called).to.be.true
  })

})
