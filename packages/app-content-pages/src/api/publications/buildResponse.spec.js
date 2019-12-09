import buildResponse from './buildResponse'
import publications from './mocks/contentfulResponse.mock'
import projectAvatarsMap from './mocks/projectAvatarsMap.mock'
import mockResponse from './mocks/response.mock.json'

describe('API > Publications > buildResponse', function () {
  it('should exist', function () {
    expect(buildResponse).to.be.a('function')
  })

  it('should construct a response object from the list of publications and avatars', function () {
    const response = buildResponse(publications, projectAvatarsMap)
    expect(response).to.deep.equal(mockResponse)
  })
})
