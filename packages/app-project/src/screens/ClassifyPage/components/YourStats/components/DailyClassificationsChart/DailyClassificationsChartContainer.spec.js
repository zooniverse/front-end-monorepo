import { shallow } from 'enzyme'
import React from 'react'

import DailyClassificationsChartContainer from './DailyClassificationsChartContainer'
import DailyClassificationsChart from './DailyClassificationsChart'

let wrapper
let componentWrapper

describe('Component > DailyClassificationsChartContainer', function () {
  before(function () {
    wrapper = shallow(<DailyClassificationsChartContainer.wrappedComponent />)
    componentWrapper = wrapper.find(DailyClassificationsChart)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `DailyClassificationsChart` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })
})
