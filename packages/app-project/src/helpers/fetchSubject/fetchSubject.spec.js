import nock from 'nock'
import sinon from 'sinon'

import fetchSubject from './fetchSubject.js'

describe('Helpers > fetchSubject', function () {
  const mockSubject = {
    id: '12345',
    created_at: '2020-01-01T00:00:00.000Z',
    updated_at: '2020-01-01T00:00:00.000Z',
    locations: [
      { 'image/jpeg': 'https://www.zooniverse.org/mock-subjects/file-1.jpg' }
    ],
    metadata: {
      filename: 'subject12345.jpg',
      '#name': 'Test Subject 12345'
    }
  }

  const mockResponse = {
    subjects: [mockSubject]
  }

  describe('when panoptes returns a subject resource', function () {
    let subject

    before(function () {
      nock('https://panoptes-staging.zooniverse.org/api')
        .get('/subjects')
        .query(true)
        .reply(200, mockResponse)
    })

    after(function () {
      nock.cleanAll()
    })

    it('should return the subject data', async function () {
      subject = await fetchSubject('12345', 'staging')
      expect(subject).to.deep.equal(mockSubject)
    })
  })

  describe('when panoptes returns an empty subjects array', function () {
    let subject

    before(function () {
      nock('https://panoptes-staging.zooniverse.org/api')
        .get('/subjects')
        .query(true)
        .reply(200, { subjects: [] })
    })

    after(function () {
      nock.cleanAll()
    })

    it('should return null', async function () {
      subject = await fetchSubject('12345', 'staging')
      expect(subject).to.equal(null)
    })
  })

  describe('when the panoptes call errors', function () {
    let subject
    let consoleErrorStub

    before(function () {
      nock('https://panoptes-staging.zooniverse.org/api')
        .get('/subjects')
        .query(true)
        .replyWithError(new Error('API is down'))

      consoleErrorStub = sinon.stub(console, 'error')
    })

    after(function () {
      nock.cleanAll()
      consoleErrorStub.restore()
    })

    it('should return null', async function () {
      subject = await fetchSubject('12345', 'staging')
      expect(subject).to.equal(null)
    })

    it('should log the error to the console', function () {
      expect(consoleErrorStub).to.have.been.calledWith('Error loading subject:')
    })
  })
})
