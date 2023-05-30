import { expect } from 'chai'
import nock from 'nock'
import sinon from 'sinon'
import ClassificationQueue, { RETRY_INTERVAL } from './ClassificationQueue'

describe('ClassificationQueue', function () {
  let classificationQueue
  let classificationData = { id: '1', annotations: [], metadata: {} }

  afterEach(function () {
    classificationQueue._saveQueue([])
  })

  describe('sends classifications to the backend', function () {

    beforeEach(function () {
      nock('https://panoptes-staging.zooniverse.org/api')
      .post('/classifications')
      .query(true)
      .reply(201, {
        classifications: [{ id: '1' }]
      })
      classificationQueue = new ClassificationQueue()
    })

    it('saves classifications to the API', async function () {
      expect(nock.isDone()).to.be.false()
      await classificationQueue.add(classificationData)
      expect(nock.isDone()).to.be.true()
    })

    it('does not store saved classifications', async function () {
      await classificationQueue.add(classificationData)
      expect(classificationQueue.length()).to.equal(0)
    })

    it('adds saved classifications to the recents queue', async function () {
      await classificationQueue.add(classificationData)
      expect(classificationQueue.recents).to.have.lengthOf(1)
    })
  })

  describe('keeps classifications in localStorage if backend fails', function () {
    let clock

    before(function () {
      clock = sinon.useFakeTimers({ global })
    })

    after(function () {
      clock.restore()
    })

    beforeEach(function () {
      nock('https://panoptes-staging.zooniverse.org/api')
      .persist()
      .post('/classifications')
      .query(true)
      .reply(504, {
        error: 'something went wrong on the server'
      })

      classificationQueue = new ClassificationQueue()
    })

    afterEach(function () {
      nock.cleanAll()
    })

    it('should not save failed classifications', async function () {
      expect(nock.isDone()).to.be.false()
      await classificationQueue.add(classificationData)
      expect(nock.isDone()).to.be.true()
    })

    it('should queue failed classifications to retry', async function () {
      await classificationQueue.add(classificationData)
      expect(classificationQueue.length()).to.equal(1)
    })

    it('should not add failed classifications to recents', async function () {
      await classificationQueue.add(classificationData)
      expect(classificationQueue.recents).to.have.lengthOf(0)
    })

    it('should set a timer to retry failed classifications', async function () {
      expect(classificationQueue.flushTimeout).to.be.null()
      await classificationQueue.add(classificationData)
      expect(classificationQueue.flushTimeout).to.exist()
    })

    it('should cancel any existing timer before flushing the queue', async function () {
      await classificationQueue.add(classificationData)
      expect(classificationQueue.flushTimeout).to.exist()
      classificationQueue.add(classificationData)
      expect(classificationQueue.flushTimeout).to.be.null()
    })
  })

  describe('with invalid classifications', function () {
    let clock

    before(function () {
      clock = sinon.useFakeTimers({ global })
    })

    after(function () {
      clock.restore()
    })

    beforeEach(function () {
      nock('https://panoptes-staging.zooniverse.org/api')
      .post('/classifications')
      .query(true)
      .reply(422, {
        error: 'invalid classification'
      })

      classificationQueue = new ClassificationQueue()
    })

    it('should not save failed classifications', async function () {
      expect(nock.isDone()).to.be.false()
      await classificationQueue.add(classificationData)
      expect(nock.isDone()).to.be.true()
    })

    it('should not queue failed classifications to retry', async function () {
      await classificationQueue.add(classificationData)
      expect(classificationQueue.length()).to.equal(0)
    })

    it('should not add failed classifications to recents', async function () {
      await classificationQueue.add(classificationData)
      expect(classificationQueue.recents).to.have.lengthOf(0)
    })

    it('should not set a timer to retry failed classifications', async function () {
      expect(classificationQueue.flushTimeout).to.be.null()
      await classificationQueue.add(classificationData)
      expect(classificationQueue.flushTimeout).to.be.null()
    })

    it('should cancel any existing timer before flushing the queue', async function () {
      classificationQueue.flushTimeout = setTimeout(classificationQueue.flushToBackend, RETRY_INTERVAL)
      expect(classificationQueue.flushTimeout).to.exist()
      classificationQueue.add(classificationData)
      expect(classificationQueue.flushTimeout).to.be.null()
    })
  })

  describe('with a slow network connection', function () {
    let firstRequest, secondRequest, thirdRequest

    before(function () {
      firstRequest = nock('https://panoptes-staging.zooniverse.org/api')
      .post('/classifications')
      .query(true)
      .reply(201, {
        classifications: [{ id: '1' }]
      })

      classificationQueue = new ClassificationQueue()
      classificationQueue.add({ id: '1', annotations: [], metadata: {} })

      secondRequest = nock('https://panoptes-staging.zooniverse.org/api')
      .post('/classifications')
      .query(true)
      .reply(201, {
        classifications: [{ id: '2' }]
      })
      thirdRequest = nock('https://panoptes-staging.zooniverse.org/api')
      .post('/classifications')
      .query(true)
      .reply(201, {
        classifications: [{ id: '3' }]
      })

      classificationQueue.add({ id: '2', annotations: [], metadata: {} })
    })

    it('saves each classification once', function () {
      expect(firstRequest.isDone()).to.be.true()
      expect(secondRequest.isDone()).to.be.true()
      expect(thirdRequest.isDone()).to.be.false()
    })
  })
})
