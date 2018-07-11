const { expect } = require('chai')
const superagent = require('superagent')
const mockSuperagent = require('superagent-mock')
const { JSDOM } = require('jsdom')

const tutorials = require('./index')
const { endpoint } = require('./helpers')
const { config } = require('../../config')
const { resources, responses } = require('./mocks')

describe('Tutorials resource common requests', function () {
  describe('getAttachedImages', function () {
    let superagentMock
    let actualMatch
    const expectedGetResponse = responses.get.attachedImage

    before(function () {
      superagentMock = mockSuperagent(superagent, [{
        pattern: `${config.host}${endpoint}`,
        fixtures: (match, params) => {
          actualMatch = match
          return expectedGetResponse
        },
        get: (match, data) => ({ body: data })
      }])
    })

    after(function () {
      superagentMock.unset()
    })

    it('should return an error if there is no tutorial id', function () {
      return tutorials.getAttachedImages().catch((error) => {
        expect(error.message).to.equal('Tutorials: getAttachedImages request requires a tutorial id.')
      })
    })

    it('should return the expected response', function () {
      return tutorials.getAttachedImages({ id: '1' }).then((response) => {
        expect(response.body).to.eql(expectedGetResponse)
      })
    })

    it('should use query params if defined', function () {
      return tutorials.getAttachedImages({ id: '1', query: { page: '2' }}).then((response) => {
        expect(actualMatch.input.includes('page=2')).to.be.true
      })
    })
  })

  describe('getWithImages', function () {
    describe('a single tutorial', function () {
      let superagentMock
      let actualMatch
      const expectedGetResponse = responses.get.tutorialWithImages
      before(function () {
        superagentMock = mockSuperagent(superagent, [{
          pattern: `${config.host}${endpoint}`,
          fixtures: (match, params) => {
            actualMatch = match
            if (match.input.includes(resources.tutorialOne.id)) return expectedGetResponse

            return { status: 404 }
          },
          get: (match, data) => ({ body: data })
        }])
      })

      after(function () {
        superagentMock.unset()
      })

      it('should use a default include query param', function () {
        return tutorials.getWithImages({ id: '1' }).then((response) => { 
          expect(actualMatch.input.include('include=attached_images')).to.be.true
        })
      })

      it('should include any other query params if defined', function () {
        return tutorials.getWithImages({ id: '1', query: { page: '2' }}).then((response) => {
          expect(actualMatch.input.includes('page=2')).to.be.true
        })
      })

      it('should return the expected response', function() {
        return tutorials.getWithImages({ id: '1' }).then((response) => {
          expect(response.body).to.eql(expectedGetResponse)
        })
      })
    })
  })
})