import { shallow } from 'enzyme'
import React from 'react'

import StatsPage from './StatsPage'
import ByTheNumbers from './components/ByTheNumbers'

describe('Component > StatsPage', function () {
  let wrapper

  before(function () {
    wrapper = shallow(<StatsPage />).dive().shallow()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the ByTheNumbers component', function () {
    expect(wrapper.find(ByTheNumbers)).to.have.lengthOf(1)
  })
})
