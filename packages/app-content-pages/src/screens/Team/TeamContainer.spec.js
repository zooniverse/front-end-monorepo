import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import request from 'superagent'

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

  describe('with no team data', function () {
    it('should render without crashing', function () {
      const noDataWrapper = shallow(<TeamContainer teamData={undefined} />)
      expect(noDataWrapper).to.be.ok()
    })
  })

  describe('populates the "teamData" props from contentful API', function () {
    let getTeamDataStub

    afterEach(function () {
      getTeamDataStub.restore()
    })

    it('should handle valid API data', async () => {
      getTeamDataStub = sinon.stub(request, 'get').returns({ body: DATA })
      const props = await TeamContainer.getInitialProps({})
      expect(props).to.deep.equal({
        error: undefined,
        teamData: DATA
      })
    })

    it('should handle empty API reponse', async () => {
      getTeamDataStub = sinon.stub(request, 'get').returns({ body: [] })
      const props = await TeamContainer.getInitialProps({})
      expect(props).to.deep.equal({
        error: undefined,
        teamData: []
      })
    })

    it('should handle API errors', async () => {
      var errorMsg = 'failed to connect to API'
      var errorPromise = Promise.reject(new Error(errorMsg))
      getTeamDataStub = sinon.stub(request, 'get').returns(errorPromise)
      const props = await TeamContainer.getInitialProps({})
      expect(props).to.deep.equal({
        error: errorMsg,
        teamData: []
      })
    })
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
