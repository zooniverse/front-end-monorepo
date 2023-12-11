import processTeamData from './processTeamData'
import mockData from './processTeamData.mock'
import resultData from './processTeamData.result'

describe('API > Team > processTeamData', function () {
  it('should correctly format the Contentful response', async function () {
    expect(processTeamData(mockData)).to.deep.equal(resultData)
  })
})
