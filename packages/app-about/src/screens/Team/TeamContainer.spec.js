import { shallow } from 'enzyme'
import React from 'react'

import TeamContainer from './TeamContainer'
import Team from './Team'

let wrapper
let componentWrapper

const TEAM = {
  activeFilter: '',
  currentView: [],
  filters: [''],
  setActiveFilter: () => {}
}

describe('Component > TeamContainer', function () {
  before(function () {
    wrapper = shallow(<TeamContainer.wrappedComponent team={TEAM} />)
    componentWrapper = wrapper.find(Team)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `Team` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })
})
