import { shallow } from 'enzyme'
import React from 'react'
import SingleImageViewer from './SingleImageViewer'
import subjects from 'test/fixtures/subjects'

const subject = subjects.body.subjects[0]

function MockImageObject() {
  this.height = 100
  this.width = 100
  this.dispatchEvent(new Event('onload'))
}

describe.only('Component > SingleImageViewer', function () {
  it('should render without crashing', function () {
    shallow(<SingleImageViewer />)
  })

  it('should render null if there is no subject prop', function () {
    const wrapper = shallow(<SingleImageViewer />)
    expect(wrapper.type()).to.equal(null)
  })

  it('should render an svg image based on the subject prop', function () {
    const url = 'http://placekitten.com/200/300'
    const subject = { locations: [{ 'image/jpg': 'http://placekitten.com/200/300' }] }
    const wrapper = shallow(<SingleImageViewer subject={subject} />)
    expect(wrapper.find('svg').length).to.equal(1)
    expect(wrapper.find('image').length).to.equal(1)
  })
})
