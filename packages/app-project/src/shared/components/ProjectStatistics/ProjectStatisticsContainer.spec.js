import { shallow } from 'enzyme'
import React from 'react'

import ProjectStatistics from './ProjectStatistics'
import ProjectStatisticsContainer from './ProjectStatisticsContainer'

let wrapper
let projectStatisticsWrapper

const CLASSIFICATIONS = 1
const COMPLETEDSUBJECTS = 2
const SUBJECTS = 3
const VOLUNTEERS = 4

describe('Component > CompletionBarContainer', function () {
  before(function () {
    wrapper = shallow(<ProjectStatisticsContainer.wrappedComponent
      classifications={CLASSIFICATIONS}
      completedSubjects={COMPLETEDSUBJECTS}
      subjects={SUBJECTS}
      volunteers={VOLUNTEERS}
    />)
    projectStatisticsWrapper = wrapper.find(ProjectStatistics)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `ProjectStatistics` component', function () {
    expect(projectStatisticsWrapper).to.have.lengthOf(1)
  })

  it('should pass through a `classifications` prop', function () {
    expect(projectStatisticsWrapper.prop('classifications')).to.equal(CLASSIFICATIONS)
  })

  it('should pass through a `completedSubjects` prop', function () {
    expect(projectStatisticsWrapper.prop('completedSubjects')).to.equal(COMPLETEDSUBJECTS)
  })

  it('should pass through a `subjects` prop', function () {
    expect(projectStatisticsWrapper.prop('subjects')).to.equal(SUBJECTS)
  })

  it('should pass through a `volunteers` prop', function () {
    expect(projectStatisticsWrapper.prop('volunteers')).to.equal(VOLUNTEERS)
  })
})
