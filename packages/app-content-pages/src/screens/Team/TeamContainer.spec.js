import { shallow } from 'enzyme'
import React from 'react'

import TeamContainer from './TeamContainer'
import mockData from './TeamContainer.mock'
import TeamComponent from './Team'

let wrapper
let componentWrapper
const DATA = mockData

describe('Component > TeamContainer', function () {
  before(function () {
    wrapper = shallow(<TeamContainer teamData={DATA} />)
    componentWrapper = wrapper.find(TeamComponent)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `Team` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  describe('with no active filters', function () {
    it('should pass down the expected props', function () {
      const expectedResult = DATA.filter(t => t.name !== 'Alumni')
      expect(componentWrapper.prop('data')).to.deep.equal(expectedResult)
    })
  })

  describe('with an active filter', function () {
    it('should pass down the expected props', function () {
      const filters = componentWrapper.prop('filters')
      const targetFilter = filters[2]
      targetFilter.setActive()
      componentWrapper = wrapper.find(TeamComponent)
      const expectedResult = DATA.filter(t => t.name === targetFilter.name)
      expect(componentWrapper.prop('data')).to.deep.equal(expectedResult)
      expect(componentWrapper.prop('filters')[2].active).to.be.true()
    })
  })
})
