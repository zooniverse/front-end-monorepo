import sinon from 'sinon'

import getStaticProps from './getStaticProps'
import PublicationsAPI  from '../../api/publications'
import mockData from './PublicationsContainer.mock'

const DATA = mockData

describe('Component > PublicationsContainer > getStaticProps', function () {

  describe('populates the "publicationsData" props from contentful API', function () {
    let getpublicationsDataStub

    afterEach(function () {
      getpublicationsDataStub.restore()
    })

    it('should handle valid API data', async () => {
      getpublicationsDataStub = sinon.stub(PublicationsAPI, 'createPublicationsResponse').returns(Promise.resolve(DATA))
      const { props } = await getStaticProps({})
      expect(props).to.deep.equal({
        error: null,
        publicationsData: DATA
      })
    })

    it('should handle empty API reponse', async () => {
      getpublicationsDataStub = sinon.stub(PublicationsAPI, 'createPublicationsResponse').returns(Promise.resolve([]))
      const { props } = await getStaticProps({})
      expect(props).to.deep.equal({
        error: null,
        publicationsData: []
      })
    })

    it('should handle API errors', async () => {
      var errorMsg = 'failed to connect to API'
      var errorPromise = Promise.reject(new Error(errorMsg))
      getpublicationsDataStub = sinon.stub(PublicationsAPI, 'createPublicationsResponse').returns(errorPromise)
      const { props } = await getStaticProps({})
      expect(props).to.deep.equal({
        error: errorMsg,
        publicationsData: []
      })
    })
  })
})
