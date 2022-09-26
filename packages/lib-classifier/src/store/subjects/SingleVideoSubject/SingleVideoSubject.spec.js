import sinon from 'sinon'
import SingleVideoSubject from './SingleVideoSubject'
import RootStore from '@store/'
import { SubjectFactory, WorkflowFactory } from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'
import subjectViewers from '@helpers/subjectViewers'

describe('Model > SingleVideoSubject', function () {
  const subjectSnapshot = SubjectFactory.build({ locations: [{ 'video/mp4': 'https://foo.bar/example.mp4' }] })
  const workflowSnapshot = WorkflowFactory.build()
  let subject

  before(function () {
    subject = SingleVideoSubject.create(subjectSnapshot)
  })

  it('should exist', function () {
    expect(SingleVideoSubject).to.be.ok()
    expect(SingleVideoSubject).to.be.an('object')
  })

  it('should have a `locations` property', function () {
    expect(subject.locations).to.deep.equal(subjectSnapshot.locations)
  })

  it('should have one location', function () {
    expect(subject.locations).to.have.lengthOf(1)
  })

  describe('with an invalid subject', function () {
    const subjectSnapshot = SubjectFactory.build({
      locations: [
        { 'video/mp4': 'https://foo.bar/example.mp4' },
        { 'audio/mpeg': 'https://foo.bar/example.mp3' }
      ]
    })

    it('should throw an error', function () {
      expect(() => SingleVideoSubject.create(subjectSnapshot)).to.throw()
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

    it('should return the single video viewer', function () {
      expect(subject.viewer).to.equal(subjectViewers.singleVideo)
    })
  })
})
