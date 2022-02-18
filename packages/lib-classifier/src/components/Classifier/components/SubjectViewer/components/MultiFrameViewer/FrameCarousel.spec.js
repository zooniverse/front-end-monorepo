import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import {
  FrameCarousel,
  StyledControlButton,
  StyledMedia,
  StyledFrame
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
        t={(key) => key}
      />
    )
  })

  afterEach(function () {
    onFrameChangeSpy.resetHistory()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should contain location property with all subject locations', function () {
    expect(wrapper.instance().props.locations).to.have.lengthOf(numberOfFrames)
  })

  it('should render a label, input and an img for each location', function () {
    const labels = wrapper.find(StyledFrame)
    const inputs = wrapper.find('input')
    const images = wrapper.find(StyledMedia)
    expect(labels).to.have.lengthOf(numberOfFrames)
    expect(inputs).to.have.lengthOf(numberOfFrames)
    expect(images).to.have.lengthOf(numberOfFrames)
  })

  it('should show the active location as checked', function () {
    const inputs = wrapper.find('input')
    expect(inputs.at(2).props().checked).to.be.true()
  })

  it('should show inactive locations as unchecked', function () {
    const inputs = wrapper.find('input')
    expect(inputs.at(0).props().checked).to.be.false()
    expect(inputs.at(1).props().checked).to.be.false()
    expect(inputs.at(3).props().checked).to.be.false()
  })

  it('should call onFrameChange with location index on input change', function () {
    expect(wrapper.find('input').at(2).props().checked).to.be.true()
    const lastInput = wrapper.find('input').last()
    lastInput.simulate('change')
    expect(onFrameChangeSpy.calledOnceWith(3)).to.be.true()
    expect(wrapper.find('input').at(2).props().checked).to.be.false()
    expect(wrapper.find('input').last().props().checked).to.be.true()
  })

  it('should call onFrameChange with appropriate index on previous button click', function () {
    const inputs = wrapper.find('input')
    expect(inputs.at(2).props().checked).to.be.true()
    const previousButton = wrapper.find(StyledControlButton).first()
    previousButton.simulate('click')
    expect(onFrameChangeSpy.calledOnceWith(1)).to.be.true()
  })

  it('should call onFrameChange with appropriate index on next button click', function () {
    const inputs = wrapper.find('input')
    expect(inputs.at(2).props().checked).to.be.true()
    const nextButton = wrapper.find(StyledControlButton).last()
    nextButton.simulate('click')
    expect(onFrameChangeSpy.calledOnceWith(3)).to.be.true()
  })

  it('should disable the previous button if first img input selected', function () {
    let previousButton = wrapper.find(StyledControlButton).first()
    expect(previousButton.props().disabled).to.be.false()
    wrapper.setProps({ frame: 0 })
    previousButton = wrapper.find(StyledControlButton).first()
    expect(previousButton.props().disabled).to.be.true()
  })

  it('should disable the next button if last img input selected', function () {
    let nextButton = wrapper.find(StyledControlButton).last()
    expect(nextButton.props().disabled).to.be.false()
    wrapper.setProps({ frame: 3 })
    nextButton = wrapper.find(StyledControlButton).last()
    expect(nextButton.props().disabled).to.be.true()
  })
})
