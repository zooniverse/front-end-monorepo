import { getSnapshot } from 'mobx-state-tree'
import ClassificationMetadata from './ClassificationMetadata'

describe('Model > ClassificationMetadata', function () {
  let model

  before(function () {
    model = ClassificationMetadata.create({
      classifier_version: '2.0',
      source: 'api',
      userLanguage: 'en',
      workflowVersion: '1.0'
    })
  })

  it('should exist', function () {
    expect(model).to.be.ok()
    expect(model).to.be.an('object')
  })

  it('should have a classifier version', function () {
    expect(model.classifier_version).to.equal('2.0')
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
