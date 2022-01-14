import { getSnapshot } from 'mobx-state-tree'
import sinon from 'sinon'
import ClassificationMetadata from './ClassificationMetadata'

describe('Model > ClassificationMetadata', function () {
  let clock, model

  before(function () {
    clock = sinon.useFakeTimers({ now: new Date(2022, 1, 10, 12), toFake: ['Date'] })
    model = ClassificationMetadata.create({
      classifier_version: '2.0',
      source: 'api',
      userLanguage: 'en',
      workflowVersion: '1.0'
    })
  })

  after(function () {
    clock.restore()
  })

  it('should exist', function () {
    expect(model).to.be.ok()
    expect(model).to.be.an('object')
  })

  it('should have a classifier version', function () {
    expect(model.classifier_version).to.equal('2.0')
  })

  describe('startedAt', function () {
    it('should be the current time', function () {
      const now = new Date(2022, 1, 10, 12)
      expect(model.startedAt).to.equal(now.toISOString())
    })
  })

  describe('update', function() {
    let snapshot

    before(function() {
      model.update({
        userLanguage: 'fr',
        session: 'test session',
        unknownKey: 5
      })
      snapshot = getSnapshot(model)
    })

    it('should preserve unchanged keys', function () {
      expect(snapshot.classifier_version).to.equal('2.0')
    })

    it('should update existing keys', function () {
      expect(snapshot.userLanguage).to.equal('fr')
    })

    it('should add new values for known keys', function () {
      expect(snapshot.session).to.equal('test session')
    })

    it('should ignore unknown keys', function () {
      expect(snapshot.unknownKey).to.be.undefined()
    })
  })
})
