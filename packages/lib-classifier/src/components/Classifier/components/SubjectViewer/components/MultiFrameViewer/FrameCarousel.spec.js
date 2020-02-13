import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import { SubjectFactory } from '@test/factories'
import FrameCarousel, {
  StyledControlButton,
  StyledInput,
  StyledImage
} from './FrameCarousel'

describe('Component > FrameCarousel', function () {
  let wrapper
  const multiFrameSubject = SubjectFactory.build({
    metadata: {
      default_frame: 2
    },
    locations: [
      { 'image/png': 'https://foo.bar/example.png' },
      { 'image/png': 'https://foo.bar/example.png' },
      { 'image/png': 'https://foo.bar/example.png' },
      { 'image/png': 'https://foo.bar/example.png' }
    ] })
  const numberOfFrames = multiFrameSubject.locations.length
  const onFrameChangeSpy = sinon.spy()

  beforeEach(function () {
    wrapper = shallow(
      <FrameCarousel
        frame={2}
        onFrameChange={onFrameChangeSpy}
        subject={multiFrameSubject}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should contain subject property with all locations', function () {
    expect(wrapper.instance().props.subject.locations.length).to.equal(numberOfFrames)
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
    const lastInput = wrapper.find(StyledInput).last()
    lastInput.simulate('change')
    expect(onFrameChangeSpy.calledOnceWith(3)).to.be.true()
  })
})
