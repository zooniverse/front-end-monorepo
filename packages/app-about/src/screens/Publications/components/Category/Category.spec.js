import { shallow } from 'enzyme'
import React from 'react'

import Category from './Category'

let wrapper

describe('Component > Category', function () {
  before(function () {
    wrapper = shallow(<Category />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
