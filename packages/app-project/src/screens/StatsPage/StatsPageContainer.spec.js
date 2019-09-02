import { shallow } from 'enzyme'
import React from 'react'

import StatsPageContainer from './StatsPageContainer'
import StatsPage from './StatsPage'

let wrapper
let componentWrapper

describe('Component > StatsPageContainer', function () {
  before(function () {
    wrapper = shallow(<StatsPageContainer.wrappedComponent />)
    componentWrapper = wrapper.find(StatsPage)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `StatsPage` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })
})
