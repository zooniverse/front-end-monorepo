import { shallow } from 'enzyme'
import React from 'react'

import ProjectStatistics from './ProjectStatistics'
import CompletionBar from './components/CompletionBar'
import Stat from './components/Stat'

describe('Component > ProjectStatistics', function () {
  let wrapper

  before(function () {
    wrapper = shallow(
      <ProjectStatistics
        projectName='A test project'
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the Completion Bar', function () {
    expect(wrapper.find(CompletionBar)).to.have.lengthOf(1)
  })

  it('should render four Stat boxes', function () {
    expect(wrapper.find(Stat)).to.have.lengthOf(4)
  })
})
