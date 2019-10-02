import { shallow } from 'enzyme'
import React from 'react'

import { RecentSubjectsContainer } from './RecentSubjectsContainer'
import RecentSubjects from './RecentSubjects'

let wrapper
let componentWrapper
const RECENTS = []
const PROJECT_NAME = 'Foobar'

describe('Component > RecentSubjectsContainer', function () {
  before(function () {
    wrapper = shallow(<RecentSubjectsContainer recents={RECENTS} projectName={PROJECT_NAME} />)
    componentWrapper = wrapper.find(RecentSubjects)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `RecentSubjects` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass down the `projectName` prop', function () {
    expect(componentWrapper.prop('projectName')).to.equal(PROJECT_NAME)
  })

  it('should pass down the `recents` prop', function () {
    expect(componentWrapper.prop('recents')).to.deep.equal(RECENTS)
  })
})
