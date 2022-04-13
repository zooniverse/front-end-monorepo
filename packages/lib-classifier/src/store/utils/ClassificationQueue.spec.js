import { expect } from 'chai'
import sinon from 'sinon'
import ClassificationQueue, { RETRY_INTERVAL } from './ClassificationQueue'

// TODO: migrate this to use panoptes js stub and factories
describe('ClassificationQueue', function () {
  let apiClient
  let classificationQueue
  let classificationData = { annotations: [], metadata: {} }

  afterEach(function () {
    classificationQueue._saveQueue([])
  })

  describe('sends classifications to the backend', function () {
    let postSpy

    beforeEach(function () {
      apiClient = {
        post: () => Promise.resolve({ body: { classifications: [{ id: '1' }] }, status: 201, ok: true })
      }
      postSpy = sinon.spy(apiClient, 'post')
      classificationQueue = new ClassificationQueue(apiClient)
    })

    it('saves classifications to the API', async function () {
      await classificationQueue.add(classificationData)
      expect(postSpy).to.have.been.called()
      postSpy.returnValues[0].then((response) => {
        expect(response.ok).to.be.true()
      })
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
    let postSpy

    before(function () {
      clock = sinon.useFakeTimers({ global })
    })

    after(function () {
      clock.restore()
    })

    beforeEach(function () {
      apiClient = { 
        post: () => {
          const error = new Error('Stubbing error response')
          error.status = 504
          return Promise.reject(error)
        }
      }
      postSpy = sinon.spy(apiClient, 'post')
      classificationData = { annotations: [], metadata: {} }
      classificationQueue = new ClassificationQueue(apiClient)
    })

    it('should not save failed classifications', async function () {
      try {
        await classificationQueue.add(classificationData)
        expect(postSpy).to.have.been.called()
        postSpy.returnValues[0].then((response) => {
          expect(response.ok).to.be.false()
        })
      } catch (error) {}
    })

    it('should queue failed classifications to retry', async function () {
      try {
        await classificationQueue.add(classificationData)
        expect(classificationQueue.length()).to.equal(1)
      } catch (e) {}
    })

    it('should not add failed classifications to recents', async function () {
      try {
        await classificationQueue.add(classificationData)
        expect(classificationQueue.recents).to.have.lengthOf(0)
      } catch (e) {}
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
    let postSpy

    before(function () {
      clock = sinon.useFakeTimers({ global })
    })

    after(function () {
      clock.restore()
    })

    beforeEach(function () {
      apiClient = { 
        post: () => {
          const error = new Error('Stubbing error response')
          error.status = 422
          return Promise.reject(error)
        }
      }
      postSpy = sinon.spy(apiClient, 'post')
      classificationData = { annotations: [], metadata: {} }
      classificationQueue = new ClassificationQueue(apiClient)
    })

    it('should not save failed classifications', async function () {
      try {
        await classificationQueue.add(classificationData)
        expect(postSpy).to.have.been.called()
        postSpy.returnValues[0].then((response) => {
          expect(response.ok).to.be.false()
        })
      } catch (error) {}
    })

    it('should not queue failed classifications to retry', async function () {
      try {
        await classificationQueue.add(classificationData)
        expect(classificationQueue.length()).to.equal(0)
      } catch (e) {}
    })

    it('should not add failed classifications to recents', async function () {
      try {
        await classificationQueue.add(classificationData)
        expect(classificationQueue.recents).to.have.lengthOf(0)
      } catch (e) {}
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
    let apiClient
    let postSpy
    before(function () {
      apiClient = { post: () => {} }
      postSpy = sinon.stub(apiClient, 'post').callsFake(() => new Promise(function (resolve, reject) { }))
      classificationQueue = new ClassificationQueue(apiClient)
      classificationQueue.add({ annotations: [], metadata: {} })
      classificationQueue.add({ annotations: [], metadata: {} })
    })
    after(function () {
      postSpy.restore()
    })
    it('saves each classification once', function () {
      expect(postSpy.callCount).to.equal(2)
    })
  })
})
