import sinon from 'sinon'

import cache from '../../api/publications/publicationsCache'
import getServerSideProps from './getServerSideProps'
import mockData from './PublicationsContainer.mock'

const DATA = mockData

describe('Component > PublicationsContainer > getServerSideProps', function () {

  describe('populates the "publicationsData" props from contentful API', function () {
    let getpublicationsDataStub

    afterEach(function () {
      getpublicationsDataStub.restore()
    })

    it('should handle valid API data', async () => {
      getpublicationsDataStub = sinon.stub(cache, 'get').returns(DATA)
      const { props } = await getServerSideProps({})
      expect(props).to.deep.equal({
        error: null,
        publicationsData: DATA
      })
    })

    it('should handle empty API reponse', async () => {
      getpublicationsDataStub = sinon.stub(cache, 'get').returns([])
      const { props } = await getServerSideProps({})
      expect(props).to.deep.equal({
        error: null,
        publicationsData: []
      })
    })

    it('should handle API errors', async () => {
      var errorMsg = 'failed to connect to API'
      var errorPromise = Promise.reject(new Error(errorMsg))
      getpublicationsDataStub = sinon.stub(cache, 'get').returns(errorPromise)
      const { props } = await getServerSideProps({})
      expect(props).to.deep.equal({
        error: errorMsg,
        publicationsData: []
      })
    })
  })
})
