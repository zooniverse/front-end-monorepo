import sinon from 'sinon'
import SingleJSONSubject from './SingleJSONSubject.js'
import RootStore from '@store/'
import WorkflowStore from '@store/WorkflowStore'
import { SubjectFactory, WorkflowFactory } from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'
import subjectViewers from '@helpers/subjectViewers'

describe('Model > SingleJSONSubject', function () {
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
    expect(SingleJSONSubject).to.be.ok()
    expect(SingleJSONSubject).to.be.an('object')
  })

  it('should have a `locations` property', function () {
    expect(subject.locations).to.deep.equal(subjectSnapshot.locations)
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
      expect(subject.viewer).to.be.null()
    })
  })
})
