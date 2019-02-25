import { shallow } from 'enzyme'
import React from 'react'

import SubtitleContainer from './SubtitleContainer'
import Subtitle from './Subtitle'

let wrapper
let componentWrapper

describe('Component > SubtitleContainer', function () {
  before(function () {
    wrapper = shallow(<SubtitleContainer.wrappedComponent />)
    componentWrapper = wrapper.find(Subtitle)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `Subtitle` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })
})
