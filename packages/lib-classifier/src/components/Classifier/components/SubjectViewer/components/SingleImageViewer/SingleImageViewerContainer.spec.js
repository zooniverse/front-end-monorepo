import { shallow } from 'enzyme'
import React from 'react'
import SingleImageViewerContainer from './SingleImageViewerContainer'
import subjects from 'test/fixtures/subjects'

const subject = subjects.body.subjects[0]

function MockImageObject () {
  this.height = 100
  this.width = 100
  this.dispatchEvent(new Event('onload'))
}

describe('Component > SingleImageViewerContainer', function () {
  it('should render without crashing', function () {
    shallow(<SingleImageViewerContainer />)
  })

  it('should render null if there is no subject prop', function () {
    const wrapper = shallow(<SingleImageViewerContainer />)
    expect(wrapper.type()).to.equal(null)
  })

  it('should render an svg image based on the subject prop', function () {
    const url = 'http://placekitten.com/200/300'
    const subject = { locations: [{ 'image/jpg': 'http://placekitten.com/200/300' }] }
    const wrapper = shallow(<SingleImageViewerContainer subject={subject} />)
    expect(wrapper.find('image')).to.have.lengthOf(1)
  })
})
