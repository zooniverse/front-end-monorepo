import { shallow } from 'enzyme'
import React from 'react'

import RecentSubjectsContainer from './RecentSubjectsContainer'

let wrapper

describe('Component > RecentSubjectsContainer', function () {
  before(function () {
    wrapper = shallow(<RecentSubjectsContainer.wrappedComponent />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
