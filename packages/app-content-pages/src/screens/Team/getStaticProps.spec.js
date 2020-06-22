import sinon from 'sinon'

import getStaticProps from './getStaticProps'
import TeamAPI  from '../../api/team'
import mockData from './TeamContainer.mock'

const DATA = mockData

describe('Component > TeamContainer > getStaticProps', function () {

  describe('populates the "teamData" props from contentful API', function () {
    let getTeamDataStub

    afterEach(function () {
      getTeamDataStub.restore()
    })

    it('should handle valid API data', async () => {
      getTeamDataStub = sinon.stub(TeamAPI, 'createTeamResponse').returns(Promise.resolve(DATA))
      const { props } = await getStaticProps({})
      expect(props).to.deep.equal({
        error: null,
        teamData: DATA
      })
    })

    it('should handle empty API reponse', async () => {
      getTeamDataStub = sinon.stub(TeamAPI, 'createTeamResponse').returns(Promise.resolve([]))
      const { props } = await getStaticProps({})
      expect(props).to.deep.equal({
        error: null,
        teamData: []
      })
    })

    it('should handle API errors', async () => {
      var errorMsg = 'failed to connect to API'
      var errorPromise = Promise.reject(new Error(errorMsg))
      getTeamDataStub = sinon.stub(TeamAPI, 'createTeamResponse').returns(errorPromise)
      const { props } = await getStaticProps({})
      expect(props).to.deep.equal({
        error: errorMsg,
        teamData: []
      })
    })
  })
})
