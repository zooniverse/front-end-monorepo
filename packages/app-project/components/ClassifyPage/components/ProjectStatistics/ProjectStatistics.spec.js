import { shallow } from 'enzyme'
import React from 'react'

import ProjectStatistics from './ProjectStatistics'
import CompletionBar from './components/CompletionBar'
import Stat from './components/Stat'

let wrapper

describe('Component > ProjectStatistics', function () {
  it('should render without crashing', function () {
    wrapper = shallow(<ProjectStatistics />)
  })

  it('should render the Completion Bar', function () {
    expect(wrapper.find(CompletionBar)).to.have.lengthOf(1)
  })

  it('should render four Stat boxes', function () {
    expect(wrapper.find(Stat)).to.have.lengthOf(4)
  })
})
