import { shallow } from 'enzyme'
import React from 'react'

import RefreshComponent from './RefreshComponent'

let wrapper

describe('Component > RefreshComponent', function () {
  before(function () {
    wrapper = shallow(<RefreshComponent />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
