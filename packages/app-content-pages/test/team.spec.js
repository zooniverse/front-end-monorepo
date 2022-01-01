import sinon from 'sinon'
import { getStaticProps } from '../pages/team'
import TeamAPI from '../src/api/team'
import mockData from '../src/screens/Team/TeamContainer.mock'

const DATA = mockData

describe('pages > team > getStaticProps', function () {

  describe('populates the "teamData" props from contentful API', function () {
    let getTeamDataStub

    afterEach(function () {
      getTeamDataStub.restore()
    })

    it('should handle valid API data', async () => {
      getTeamDataStub = sinon.stub(TeamAPI, 'createTeamResponse').callsFake(() => {
        return Promise.resolve(DATA)
      })
      const { props } = await getStaticProps({})
      expect(props).to.deep.equal({
        teamData: DATA
      })
    })

    it('should handle empty API reponse', async () => {
      getTeamDataStub = sinon.stub(TeamAPI, 'createTeamResponse').callsFake(() => {
        return Promise.resolve([])
      })
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
