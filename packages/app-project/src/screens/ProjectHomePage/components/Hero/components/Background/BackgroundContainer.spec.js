import { shallow } from 'enzyme'
import React from 'react'

import { BackgroundContainer } from './BackgroundContainer'
import Background from './Background'

const BACKGROUND_SRC = '/foo/bar/baz.jpg'

let wrapper
let componentWrapper

describe('Component > BackgroundContainer', function () {
  before(function () {
    wrapper = shallow(<BackgroundContainer backgroundSrc={BACKGROUND_SRC} />)
    componentWrapper = wrapper.find(Background)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `Background` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass down the `backgroundSrc` prop', function () {
    expect(componentWrapper.prop('backgroundSrc')).to.equal(BACKGROUND_SRC)
  })
})
