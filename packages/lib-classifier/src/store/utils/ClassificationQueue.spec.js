import * as Sentry from '@sentry/browser'
import { auth } from '@zooniverse/panoptes-js'
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

    before(function () {
      sinon.stub(auth, 'verify').resolves({
        data: { id: 1, login: 'testUser', dname: 'Test User', admin: false }
      })
    })

    after(function () {
      auth.verify.restore()
    })

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

  describe('with an invalid auth token', function () {
    const tokenError = new Error('JWT expired')

    before(function () {
      sinon.stub(auth, 'verify').resolves({
        error: tokenError
      })
      sinon.stub(Sentry, 'captureException')
    })

    after(function () {
      auth.verify.restore()
      Sentry.captureException.restore()
    })

    beforeEach(function () {
      nock('https://panoptes-staging.zooniverse.org/api')
      .post('/classifications')
      .query(true)
      .reply(201, {
        classifications: [{ id: '1' }]
      })

      const authClient = {
        checkBearerToken: sinon.stub().resolves('fakeToken')
      }
      const callback = sinon.stub()
      classificationQueue = new ClassificationQueue(undefined, callback, authClient)
    })

    afterEach(function () {
      Sentry.captureException.resetHistory()
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

    it('logs invalid tokens to Sentry', async function () {
      await classificationQueue.add(classificationData)
      expect(Sentry.captureException.withArgs(tokenError)).to.have.been.calledOnce()
    })
  })

  describe('keeps classifications in localStorage if backend fails', function () {
    let clock

    before(function () {
      clock = sinon.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout']})
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
      clock = sinon.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout']})
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
    this.timeout(5000)
    let firstRequest, secondRequest, thirdRequest

    before(async function () {
      firstRequest = nock('https://panoptes-staging.zooniverse.org/api')
      .post('/classifications')
      .delayBody(3000)
      .query(true)
      .reply(201, {
        classifications: [{ id: '1' }]
      })

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

      classificationQueue = new ClassificationQueue()
      await Promise.all([
        classificationQueue.add({ id: '1', annotations: [], metadata: {} }),
        classificationQueue.add({ id: '2', annotations: [], metadata: {} })
      ])
    })

    it('saves each classification once', function () {
      expect(firstRequest.isDone()).to.be.true()
      expect(secondRequest.isDone()).to.be.true()
      expect(thirdRequest.isDone()).to.be.false()
    })
  })
})
