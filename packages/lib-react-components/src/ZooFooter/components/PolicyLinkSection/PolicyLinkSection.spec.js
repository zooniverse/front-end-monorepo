import { shallow } from 'enzyme'
import React from 'react'

import PolicyLinkSection from './PolicyLinkSection'

let wrapper

describe('Component > PolicyLinkSection', function () {
  before(function () {
    wrapper = shallow(<PolicyLinkSection />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })
})
