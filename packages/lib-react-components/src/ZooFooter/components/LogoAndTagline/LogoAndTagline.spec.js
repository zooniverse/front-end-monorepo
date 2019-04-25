import { shallow } from 'enzyme'
import React from 'react'

import LogoAndTagline from './LogoAndTagline'

let wrapper

describe('Component > LogoAndTagline', function () {
  before(function () {
    wrapper = shallow(<LogoAndTagline tagLine='foobar' />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok
  })
})
