import { shallow } from 'enzyme'
import React from 'react'
import { VariableStarViewer } from './VariableStarViewer'
import { SingleImageViewer } from '../SingleImageViewer'

describe('Component > VariableStarViewer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<VariableStarViewer />)
    expect(wrapper).to.be.ok()
  })

  describe('HR diagram', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<VariableStarViewer imageSrc='example.png' />)
    })
    it('should render a SingleImageViewer', function () {
      expect(wrapper.find(SingleImageViewer)).to.have.lengthOf(1)
    })

    it('should render a child SVG image', function () {
      const image = wrapper.find('image')
      expect(image).to.have.lengthOf(1)
      expect(image.props().xlinkHref).to.equal('example.png')
    })

    it('should render an figcaption', function () {
      const caption = wrapper.find('figcaption')
      expect(caption).to.have.lengthOf(1)
    })
  })
})
