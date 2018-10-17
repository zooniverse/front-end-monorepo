import { shallow } from 'enzyme'
import React from 'react'

import SingleImageViewer from './SingleImageViewer'

const IMAGE_URL = 'http://placekitten.com/200/300'
let wrapper

describe('Component > SingleImageViewer', function () {
  beforeEach(function () {
    wrapper = shallow(<SingleImageViewer url={IMAGE_URL} />)
  })

  it('should render without crashing', function () {})

  it('should render an svg image based on the subject prop', function () {
    const image = wrapper.find('image')
    expect(image).to.have.lengthOf(1)
    expect(image.prop('xlinkHref')).to.equal(IMAGE_URL)
  })
})
