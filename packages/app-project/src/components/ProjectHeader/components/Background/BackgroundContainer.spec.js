import { shallow } from 'enzyme'
import React from 'react'

import BackgroundContainer from './BackgroundContainer'
import Background from './Background'

let wrapper
let componentWrapper
const BACKGROUND_SRC = 'http://www.foobar.com/image.jpg'

describe('Component > BackgroundContainer', function () {
  before(function () {
    wrapper = shallow(<BackgroundContainer.wrappedComponent backgroundSrc={BACKGROUND_SRC} />)
    componentWrapper = wrapper.find(Background)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `Background` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass through the `backgroundSrc` prop', function () {
    expect(componentWrapper.prop('backgroundSrc')).to.equal(BACKGROUND_SRC)
  })
})
