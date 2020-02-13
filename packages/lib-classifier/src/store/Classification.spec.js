import cuid from 'cuid'
import Classification, { ClassificationMetadata } from './Classification'

describe('Model > Classification', function () {
  let model
  before(function () {
    model = Classification.create({
      id: cuid(),
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
})
