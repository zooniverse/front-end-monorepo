import { getSnapshot } from 'mobx-state-tree'
import Classification, { ClassificationMetadata } from './Classification'

describe('Model > Classification', function () {
  let model
  before(function () {
    model = Classification.create({
      links: {
        project: '1234',
        subjects: ['4567'],
        workflow: '5678'
      },
      metadata: ClassificationMetadata.create({
        classifier_version: '2.0',
        source: 'api',
        userLanguage: 'en',
        workflowVersion: '1.0'
      })
    })
  })

  it('should exist', function () {
    expect(model).to.be.ok()
    expect(model).to.be.an('object')
  })

  it('should have an ID', function () {
    expect(model.id).to.exist()
    expect(model.id).to.be.a('string')
  })

  describe('snapshots', function () {
    let snapshot

    before(function () {
      snapshot = getSnapshot(model)
    })

    it('should not have an ID', function () {
      expect(snapshot.id).to.be.undefined()
    })

    it('should have an annotations array', function () {
      expect(snapshot.annotations).to.be.a('array')
    })
  })
})
