import { shallow } from 'enzyme'
import React from 'react'

import DailyClassificationsChart from './DailyClassificationsChart'

let wrapper

describe('Component > DailyClassificationsChart', function () {
  before(function () {
    wrapper = shallow(<DailyClassificationsChart />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
