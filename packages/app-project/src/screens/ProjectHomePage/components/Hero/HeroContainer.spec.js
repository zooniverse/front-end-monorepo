import { shallow } from 'enzyme'
import React from 'react'

import HeroContainer from './HeroContainer'
import Hero from './Hero'

let wrapper
let componentWrapper

describe('Component > HeroContainer', function () {
  before(function () {
    wrapper = shallow(<HeroContainer.wrappedComponent />)
    componentWrapper = wrapper.find(Hero)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `Hero` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })
})
