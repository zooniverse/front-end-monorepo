import { getSnapshot } from 'mobx-state-tree'
import sinon from 'sinon'

import subjectViewers from '@helpers/subjectViewers'
import RootStore from '@store/'
import { SubjectFactory, WorkflowFactory } from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'

import ImageAndTextSubject from './ImageAndTextSubject'

describe('Model > ImageAndTextSubject', function () {
  const imageAndTextSubjectSnapshot = SubjectFactory.build({
    locations: [
      { 'image/jpeg': 'https://foo.bar/example.jpg' },
      { 'text/plain': 'https://foo.bar/subjectText.txt' }
    ]
  })

  const singleTextSubjectSnapshot = SubjectFactory.build({
    locations: [
      { 'text/plain': 'https://foo.bar/subjectText.txt' }
    ]
  })

  const invalidLocationsSubjectSnapshot = SubjectFactory.build({
    locations: [
      { 'audio/mpeg': 'https://foo.bar/example.mp3' }
    ]
  })

  const workflowSnapshot = WorkflowFactory.build()
  let imageAndTextSubject

  before(function () {
    imageAndTextSubject = ImageAndTextSubject.create(imageAndTextSubjectSnapshot)
  })

  it('should exist', function () {
    expect(ImageAndTextSubject).toBeDefined()
    expect(ImageAndTextSubject).to.be.an('object')
  })

  it('should have a `locations` property', function () {
    expect(getSnapshot(imageAndTextSubject.locations)).to.deep.equal(imageAndTextSubjectSnapshot.locations)
  })

  it('should have two locations', function () {
    expect(imageAndTextSubject.locations).to.have.lengthOf(2)
  })

  describe('with an invalid subject location', function () {
    it('of invalid location type, should throw an error', function () {
      expect(() => ImageAndTextSubject.create(invalidLocationsSubjectSnapshot)).to.throw()
    })

    it('of single a location, should throw an error', function () {
      expect(() => ImageAndTextSubject.create(singleTextSubjectSnapshot)).to.throw()
    })
  })

  describe('Views > viewer', function () {
    before(function () {
      const { panoptes } = stubPanoptesJs({
        subjects: [ imageAndTextSubject ],
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
      rootStore.subjects.setResources([imageAndTextSubject])
      rootStore.subjects.setActive(imageAndTextSubject.id)
    })

    it('should use the single text viewer', function () {
      expect(imageAndTextSubject.viewer).to.equal(subjectViewers.imageAndText)
    })
  })
})
