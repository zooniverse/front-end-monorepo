import sinon from 'sinon'
import ImageSubject from './ImageSubject.js'
import RootStore from '@store/'
import WorkflowStore from '@store/WorkflowStore'
import { SubjectFactory, WorkflowFactory } from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'
import subjectViewers from '@helpers/subjectViewers'

describe('Model > ImageSubject', function () {
  const subjectSnapshot = SubjectFactory.build({
    locations: [
      { 'image/png': 'https://foo.bar/example-1.png' },
      { 'image/png': 'https://foo.bar/example-2.png' },
      { 'image/png': 'https://foo.bar/example-3.png' }
    ]
  })
  const workflowSnapshot = WorkflowFactory.build()
  let subject

  before(function () {
    subject = ImageSubject.create(subjectSnapshot)
  })

  it('should exist', function () {
    expect(ImageSubject).to.be.ok()
    expect(ImageSubject).to.be.an('object')
  })

  it('should have a `locations` property', function () {
    expect(subject.locations).to.deep.equal(subjectSnapshot.locations)
  })

  it('should have three locations', function () {
    expect(subject.locations).to.have.lengthOf(3)
  })

  describe('with an invalid subject', function () {
    const subjectSnapshot = SubjectFactory.build({ 
      locations: [
        { 'image/png': 'https://foo.bar/example.png' },
        { 'audio/mpeg': 'https://foo.bar/example.mp3' }
      ]
    })

    it('should throw an error', function () {
      expect(() => ImageSubject.create(subjectSnapshot)).to.throw()
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

    it('should use the flipbook viewer', function () {
      expect(subject.viewer).to.equal(subjectViewers.flipbook)
    })
  })
})
