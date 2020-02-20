import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import FrameCarousel, {
  StyledControlButton,
  StyledInput,
  StyledImage
} from './FrameCarousel'

describe('Component > FrameCarousel', function () {
  let wrapper
  let onFrameChangeSpy
  const multiFrameSubjectLocations = [
    { 'image/png': 'https://foo.bar/example.png' },
    { 'image/png': 'https://foo.bar/example.png' },
    { 'image/png': 'https://foo.bar/example.png' },
    { 'image/png': 'https://foo.bar/example.png' }
  ]
  const numberOfFrames = multiFrameSubjectLocations.length

  beforeEach(function () {
    onFrameChangeSpy = sinon.spy((frame) => {
      wrapper.setProps({ frame })
    })
    wrapper = shallow(
      <FrameCarousel
        frame={2}
        onFrameChange={onFrameChangeSpy}
        locations={multiFrameSubjectLocations}
      />
    )
  })

  afterEach(function () {
    onFrameChangeSpy.resetHistory()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should contain subject property with all locations', function () {
    expect(wrapper.instance().props.locations).to.have.lengthOf(numberOfFrames)
  })

  it('should render an input and an img for each location', function () {
    const inputs = wrapper.find(StyledInput)
    const images = wrapper.find(StyledImage)
    expect(images).to.have.lengthOf(numberOfFrames)
    expect(inputs).to.have.lengthOf(numberOfFrames)
  })

  it('should show the active location as checked', function () {
    const inputs = wrapper.find(StyledInput)
    expect(inputs.at(2).props().checked).to.be.true()
  })

  it('should show inactive locations as unchecked', function () {
    const inputs = wrapper.find(StyledInput)
    expect(inputs.at(0).props().checked).to.be.false()
    expect(inputs.at(1).props().checked).to.be.false()
    expect(inputs.at(3).props().checked).to.be.false()
  })

  it('should call onFrameChange with location index on input change', function () {
    expect(wrapper.find(StyledInput).at(2).props().checked).to.be.true()
    const lastInput = wrapper.find(StyledInput).last()
    lastInput.simulate('change')
    expect(onFrameChangeSpy.calledOnceWith(3)).to.be.true()
    expect(wrapper.find(StyledInput).at(2).props().checked).to.be.false()
    expect(wrapper.find(StyledInput).last().props().checked).to.be.true()
  })
})
