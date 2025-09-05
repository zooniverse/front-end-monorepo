import { getSnapshot } from 'mobx-state-tree'
import sinon from 'sinon'

// import SingleJSONSubject from './SingleJSONSubject.js'
import RootStore from '@store/'
import { SubjectFactory, WorkflowFactory } from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'

// Must be skipped due to unexpect behavior of the above import in Vitest env
// Might be caused by use of barrel imports in the classifier
// import Subject from '../Subject' errors in ImageSubject.js
// https://github.com/zooniverse/front-end-monorepo/issues/7018

describe.skip('Model > SingleJSONSubject', function () {
  const subjectSnapshot = SubjectFactory.build({
    locations: [
      { 'image/png': 'https://foo.bar/example.png' },
      { 'application/json': 'https://foo.bar/example.json' }
    ]
  })
  const workflowSnapshot = WorkflowFactory.build()
  let subject

  before(function () {
    subject = SingleJSONSubject.create(subjectSnapshot)
  })

  it('should exist', function () {
    expect(SingleJSONSubject).to.exist
    expect(SingleJSONSubject).to.be.an('object')
  })

  it('should have a `locations` property', function () {
    expect(getSnapshot(subject.locations)).to.deep.equal(subjectSnapshot.locations)
  })

  it('should have two locations', function () {
    expect(subject.locations).to.have.lengthOf(2)
  })

  describe('with an invalid subject', function () {
    const subjectSnapshot = SubjectFactory.build({
      locations: [
        { 'image/png': 'https://foo.bar/example.png' },
        { 'audio/mpeg': 'https://foo.bar/example.mp3' }
      ]
    })

    it('should throw an error', function () {
      expect(() => SingleJSONSubject.create(subjectSnapshot)).to.throw()
    })
  })

  describe('Views > viewer', function () {
    before(function () {
      const { panoptes } = stubPanoptesJs({
        subjects: [ subject ],
        workflows: [ workflowSnapshot ]
      })
      const client = {
        caesar: {
          request: sinon.stub().callsFake(() => Promise.resolve({}))
        },
        panoptes,
        tutorials: {
          get: sinon.stub().callsFake(() => Promise.resolve({ body: { tutorials: [] } }))
        }
      }
      const rootStore = RootStore.create({}, { client })
      rootStore.workflows.setResources([workflowSnapshot])
      rootStore.workflows.setActive(workflowSnapshot.id)
      rootStore.subjects.setResources([subject])
      rootStore.subjects.setActive(subject.id)
    })

    it('should not have a default subject viewer', function () {
      expect(subject.viewer).to.equal(null)
    })
  })
})
