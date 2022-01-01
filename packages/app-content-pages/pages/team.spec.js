import sinon from 'sinon'
import getStaticProps from './team'
import TeamAPI from '@api/team'
import mockData from '@screens/TeamContainer.mock'

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
        teamData: DATA
      })
    })

    it('should handle empty API reponse', async () => {
      getTeamDataStub = sinon.stub(TeamAPI, 'createTeamResponse').returns(Promise.resolve([]))
      const { props } = await getStaticProps({})
      expect(props).to.deep.equal({
        teamData: []
      })
    })

    it('should throw on API errors', async () => {
      const errorMsg = 'failed to connect to API'
      const mockError = new Error(errorMsg)
      const errorPromise = Promise.reject(mockError)
      getTeamDataStub = sinon.stub(TeamAPI, 'createTeamResponse').returns(errorPromise)
      let actualError
      try {
        const { props } = await getStaticProps({})
      } catch (error) {
        actualError = error
      }
      expect(actualError).to.equal(mockError)
    })
  })
})
