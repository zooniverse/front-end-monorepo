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

  const mockMediaLocation = {
    id: '324546',
    href: '/subjects/252638/location',
    src: 'https://panoptes-uploads-staging.zooniverse.org/subject_location/89cdf135-3349-4149-8255-57bc7875323f.png',
    content_type: 'image/png',
    media_type: 'subject_location',
    external_link: false,
    created_at: '2020-01-01T00:00:00.000Z',
    metadata: { index: 0 },
    updated_at: '2020-01-01T00:00:00.000Z'
  }
  
  const mockMediaAttachedImage = {
    id: '67890',
    src: 'https://panoptes-uploads-staging.zooniverse.org/subject_attached_image/b06c48fb-844f-447a-872d-94d244d5b02e.png',
    content_type: 'image/png',
    media_type: 'subject_attached_image',
    external_link: false,
    created_at: '2020-01-01T00:00:00.000Z',
    metadata: {
      size: 446153,
      filename: '609780764988425780_gri_17.8096.png'
    },
    updated_at: '2020-01-01T00:00:00.000Z'
  }

  const mockResponse = {
    subjects: [mockSubject],
    linked: {
      media: [mockMediaLocation, mockMediaAttachedImage]
    }
  }

  const expectedSubject = {
    ...mockSubject,
    attached_media: [mockMediaAttachedImage]
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
      expect(subject).to.deep.equal(expectedSubject)
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
      sinon.assert.calledWith(consoleErrorStub, 'Error loading subject:')
    })
  })
})
