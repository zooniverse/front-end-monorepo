import sinon from 'sinon'

import cache from '../../api/team/teamCache'
import getServerSideProps from './getServerSideProps'
import mockData from './TeamContainer.mock'

const DATA = mockData

describe('Component > TeamContainer > getServerSideProps', function () {

  describe('populates the "teamData" props from contentful API', function () {
    let getTeamDataStub

    afterEach(function () {
      getTeamDataStub.restore()
    })

    it('should handle valid API data', async () => {
      getTeamDataStub = sinon.stub(cache, 'get').returns(DATA)
      const { props } = await getServerSideProps({})
      expect(props).to.deep.equal({
        error: null,
        teamData: DATA
      })
    })

    it('should handle empty API reponse', async () => {
      getTeamDataStub = sinon.stub(cache, 'get').returns([])
      const { props } = await getServerSideProps({})
      expect(props).to.deep.equal({
        error: null,
        teamData: []
      })
    })

    it('should handle API errors', async () => {
      var errorMsg = 'failed to connect to API'
      var errorPromise = Promise.reject(new Error(errorMsg))
      getTeamDataStub = sinon.stub(cache, 'get').returns(errorPromise)
      const { props } = await getServerSideProps({})
      expect(props).to.deep.equal({
        error: errorMsg,
        teamData: []
      })
    })
  })
})
