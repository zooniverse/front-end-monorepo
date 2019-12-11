import getUniqueProjectIds from './getUniqueProjectIds'
import mockData from './mocks/contentfulResponse.mock'
import resultData from './mocks/uniqueProjectIds.mock'

describe('API > Publications > getUniqueProjectIds', function () {
  it('should exist', function () {
    expect(getUniqueProjectIds).to.be.a('function')
  })

  it('should return an array of unique project ids from the input data', function () {
    expect(getUniqueProjectIds(mockData)).to.have.members(resultData)
  })
})
