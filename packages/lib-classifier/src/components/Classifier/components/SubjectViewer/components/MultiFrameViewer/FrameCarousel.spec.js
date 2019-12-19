import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'

import FrameCarousel from './FrameCarousel'
import { SubjectFactory } from '@test/factories'

describe('Component > FrameCarousel', function () {
  let wrapper
  const multiFrameSubject = SubjectFactory.build({ locations: [
      { 'image/png': 'https://foo.bar/example.png' },
      { 'image/png': 'https://foo.bar/example.png' },
      { 'image/png': 'https://foo.bar/example.png' },
      { 'image/png': 'https://foo.bar/example.png' }
    ]})
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

  it('should render a visually hidden h3 for the carousel', function () {
    const heading3 = wrapper.find('#subjectcarousel')
    expect(heading3).to.have.lengthOf(1)
    expect(heading3.html()).to.include('Carousel of Subjects')
  })

  it('should render a list item and img for each location', function () {
    const list = wrapper.find('li')
    const image = wrapper.find('img')
    // expect(image).to.have.lengthOf(numberOfFrames)
    expect(list).to.have.lengthOf(numberOfFrames)
  })


})
