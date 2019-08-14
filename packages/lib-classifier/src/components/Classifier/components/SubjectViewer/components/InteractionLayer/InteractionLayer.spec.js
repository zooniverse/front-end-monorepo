import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import InteractionLayer from './InteractionLayer'

const onPointerMove = sinon.stub()
const onPointerUp = sinon.stub()
const onPointerDown = sinon.stub()

let wrapper

describe('Component > InteractionLayer', function () {
  beforeEach(function () {
    wrapper = shallow(<InteractionLayer onPointerMove={onPointerMove}
      onPointerUp={onPointerUp} onPointerDown={onPointerDown} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should return a transparent rect', function () {
    const rect = wrapper.find('rect')
    expect(rect.exists()).to.be.true()
    expect(rect.prop('id')).to.equal('InteractionLayer')
    expect(rect.prop('fill')).to.equal('transparent')
  })

  it('should bind the onPointerMove prop', function () {
    wrapper.simulate('pointermove')
    expect(onPointerMove).to.have.been.called()
  })

  it('should bind the onPointerUp prop', function () {
    wrapper.simulate('pointerup')
    expect(onPointerUp).to.have.been.called()
  })

  it('should bind the onPointerDown prop', function () {
    wrapper.simulate('pointerdown')
    expect(onPointerDown).to.have.been.called()
  })
})
