import React from 'react'
import { shallow } from 'enzyme'

import { SubjectFactory } from '@test/factories'
import FrameCarousel from './FrameCarousel'

import {
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

  beforeEach(function () {
    wrapper = shallow(<FrameCarousel subject={multiFrameSubject} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('props should contain all locations', function () {
    expect(wrapper.instance().props.subject.locations.length).to.equal(numberOfFrames)
  })

  it('should render an input and an img for each location', function () {
    const inputs = wrapper.find(StyledInput)
    const images = wrapper.find(StyledImage)
    expect(images).to.have.lengthOf(numberOfFrames)
    expect(inputs).to.have.lengthOf(numberOfFrames)
  })
})
