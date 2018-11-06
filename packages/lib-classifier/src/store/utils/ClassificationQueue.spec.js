import { expect } from 'chai'
import sinon from 'sinon'
import ClassificationQueue from './ClassificationQueue'

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
      expect(postSpy.called).to.be.true
      postSpy.returnValues[0].then((response) => {
        expect(response.ok).to.be.true
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
    let postSpy
    beforeEach(function () {
      apiClient = { post: () =>
        Promise.reject('Stubbing error response')
          .catch(() => { return { body: {}, ok: false, status: 504 } })
      }
      postSpy = sinon.spy(apiClient, 'post')
      classificationData = { annotations: [], metadata: {} }
      classificationQueue = new ClassificationQueue(apiClient)
      sinon.stub(global, 'setTimeout').callsFake(() => 100)
      sinon.stub(global, 'clearTimeout')
    })
    afterEach(function () {
      global.setTimeout.restore()
      global.clearTimeout.restore()
    })
    it('should not save failed classifications', async function () {
      try {
        await classificationQueue.add(classificationData)
        expect(postSpy.called).to.be.true
        postSpy.returnValues[0].then((response) => {
          expect(response.ok).to.be.false
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
      sinon.stub(classificationQueue.flushToBackend, 'bind').callsFake(() => classificationQueue.flushToBackend)
      try {
        await classificationQueue.add(classificationData)
        expect(global.setTimeout.calledWith(classificationQueue.flushToBackend)).to.be.true
        expect(classificationQueue.flushTimeout).to.equal(100)
      } catch (e) {}
      classificationQueue.flushToBackend.bind.restore()
    })
    it('should cancel any existing timer before flushing the queue', function () {
      classificationQueue.flushTimeout = 100
      classificationQueue.add(classificationData)
      expect(global.clearTimeout.calledWith(100)).to.be.true
      expect(classificationQueue.flushTimeout).to.be.null
    })
  })
  describe('with a slow network connection', function () {
    let apiClient
    let postSpy
    before(function () {
      apiClient = { post: () => {} }
      postSpy = sinon.stub(apiClient, 'post').callsFake(() => new Promise(function (resolve, reject) { }))
      classificationQueue = new ClassificationQueue(apiClient)
      classificationQueue.add({annotations: [], metadata: {}})
      classificationQueue.add({annotations: [], metadata: {}})
    })
    after(function () {
      postSpy.restore()
    })
    it('saves each classification once', function () {
      expect(postSpy.callCount).to.equal(2)
    })
  })
})
