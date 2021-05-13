import { shallow } from 'enzyme'
import React from 'react'

import ClearFilters from './ClearFilters'

describe('Component > ClearFilters', function () {
  let wrapper
  before(function () {
    wrapper = shallow(
      <ClearFilters />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
