import { shallow } from 'enzyme'
import React from 'react'

import AboutProject from './AboutProject'

describe('Component > AboutProject', function() {
  let wrapper

  before(function() {
    wrapper = shallow(<AboutProject projectName="A test project" />)
  })

  it('should render without crashing', function() {
    expect(wrapper).to.be.ok()
  })
})
