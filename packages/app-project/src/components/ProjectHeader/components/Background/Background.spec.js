import { shallow, render } from 'enzyme'
import React from 'react'

import Background from './Background'

let wrapper
const BACKGROUND_SRC = 'http://www.foobar.com/image.jpg'

describe('Component > Background', function () {
  before(function () {
    wrapper = shallow(<Background />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render an image if the `backgroundSrc` prop has been passed', function () {
    const wrapperWithImage = render(<Background backgroundSrc={BACKGROUND_SRC} />)
    const imageWrapper = wrapperWithImage.find('img')
    expect(imageWrapper).to.have.lengthOf(1)
    expect(imageWrapper.prop('src')).to.equal(BACKGROUND_SRC)
  })
})
