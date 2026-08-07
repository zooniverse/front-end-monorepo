import { getSnapshot } from 'mobx-state-tree'
import sinon from 'sinon'

import mockStore from '@test/mockStore'

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
    expect(model).to.exist
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
      expect(snapshot.unknownKey).to.equal(undefined)
    })
  })

  describe('map context (geoDrawing)', function () {
    it('accepts featureProjection and mapContext via update', function () {
      const geoModel = ClassificationMetadata.create({
        classifier_version: '2.0',
        source: 'api',
        userLanguage: 'en',
        workflowVersion: '1.0'
      })
      geoModel.update({
        featureProjection: 'EPSG:4326',
        mapContext: {
          activeLayerIndex: 1,
          tileLayers: [{ type: 'osm', label: 'Base' }],
          viewportBbox: [2.1, 48.7, 2.5, 49.0]
        }
      })
      const geoSnapshot = getSnapshot(geoModel)
      expect(geoSnapshot.featureProjection).to.equal('EPSG:4326')
      expect(geoSnapshot.mapContext.activeLayerIndex).to.equal(1)
      expect(geoSnapshot.mapContext.tileLayers).to.have.length(1)
      expect(geoSnapshot.mapContext.viewportBbox).to.deep.equal([2.1, 48.7, 2.5, 49.0])
    })

    it('omits featureProjection and mapContext by default', function () {
      const plainModel = ClassificationMetadata.create({
        classifier_version: '2.0',
        source: 'api',
        userLanguage: 'en',
        workflowVersion: '1.0'
      })
      const plainSnapshot = getSnapshot(plainModel)
      expect(plainSnapshot.featureProjection).to.equal(undefined)
      expect(plainSnapshot.mapContext).to.equal(undefined)
    })
  })

  describe('user language', function () {
    it('should match the locale', function () {
      const store = mockStore()
      expect(store.classifications.active.metadata.userLanguage).to.equal('en')
      store.setLocale('de')
      expect(store.classifications.active.metadata.userLanguage).to.equal('de')
    })
  })
})
