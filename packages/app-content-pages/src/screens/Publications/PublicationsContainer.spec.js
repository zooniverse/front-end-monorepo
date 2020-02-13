import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import request from 'superagent'

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

  describe('with no publications data', function () {
    it('should render without crashing', function () {
      const noDataWrapper = shallow(<PublicationsContainer publicationsData={undefined} />)
      expect(noDataWrapper).to.be.ok()
    })
  })

  describe('populates the "publicationsData" props from contentful API', function () {
    let getpublicationsDataStub

    afterEach(function () {
      getpublicationsDataStub.restore()
    })

    it('should handle valid API data', async () => {
      getpublicationsDataStub = sinon.stub(request, 'get').returns({ body: DATA })
      const props = await PublicationsContainer.getInitialProps({})
      expect(props).to.deep.equal({
        error: undefined,
        publicationsData: DATA
      })
    })

    it('should handle empty API reponse', async () => {
      getpublicationsDataStub = sinon.stub(request, 'get').returns({ body: [] })
      const props = await PublicationsContainer.getInitialProps({})
      expect(props).to.deep.equal({
        error: undefined,
        publicationsData: []
      })
    })

    it('should handle API errors', async () => {
      var errorMsg = 'failed to connect to API'
      var errorPromise = Promise.reject(new Error(errorMsg))
      getpublicationsDataStub = sinon.stub(request, 'get').returns(errorPromise)
      const props = await PublicationsContainer.getInitialProps({})
      expect(props).to.deep.equal({
        error: errorMsg,
        publicationsData: []
      })
    })
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
