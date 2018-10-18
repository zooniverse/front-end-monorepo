import cuid from 'cuid'
import Classification from './Classification'

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
      metadata: {
        session: 'asdf1324',
        source: 'api',
        subjectDimensions: {
          clientHeight: 768,
          clientWidth: 1024,
          naturalHeight: 768,
          naturalWidth: 1024
        },
        userLanguage: 'en',
        viewport: {
          height: 1536,
          width: 2048
        },
        workflowVersion: '1.0'
      }
    })
  })

  it('should exist', function () {
    expect(Classification).to.exist
  })
})
