import { shallow } from 'enzyme'
import React from 'react'

import PublicationsContainer from './PublicationsContainer'
import mockData from './PublicationsContainer.mock'
import PublicationsComponent from './Publications'

let wrapper
let componentWrapper
const DATA = mockData

describe('Component > PublicationsContainer', function () {
  before(function () {
    wrapper = shallow(<PublicationsContainer publicationsData={DATA} />)
    componentWrapper = wrapper.find(PublicationsComponent)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `Publications` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  describe('with no active filters', function () {
    it('should pass down the expected props', function () {
      expect(componentWrapper.prop('data')).to.deep.equal(DATA)
    })
  })

  describe('with an active filter', function () {
    it('should pass down the expected props', function () {
      const filters = componentWrapper.prop('filters')
      const targetFilter = filters[2]
      targetFilter.setActive()
      componentWrapper = wrapper.find(PublicationsComponent)
      const expectedResult = DATA.filter(t => t.title === targetFilter.name)
      expect(componentWrapper.prop('data')).to.deep.equal(expectedResult)
      expect(componentWrapper.prop('filters')[2].active).to.be.true()
    })
  })
})
