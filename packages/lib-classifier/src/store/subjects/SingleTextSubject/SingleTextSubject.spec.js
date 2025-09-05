import { getSnapshot } from 'mobx-state-tree'
import sinon from 'sinon'

import subjectViewers from '@helpers/subjectViewers'
import RootStore from '@store/'
import { SubjectFactory, WorkflowFactory } from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'

import SingleTextSubject from './SingleTextSubject'

describe('Model > SingleTextSubject', function () {
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

  const multipleLocationsSubjectSnapshot = SubjectFactory.build({
    locations: [
      { 'text/plain': 'https://foo.bar/subjectText1.txt' },
      { 'text/plain': 'https://foo.bar/subjectText2.txt' }
    ]
  })

  const workflowSnapshot = WorkflowFactory.build()
  let singleTextSubject

  before(function () {
    singleTextSubject = SingleTextSubject.create(singleTextSubjectSnapshot)
  })

  it('should exist', function () {
    expect(SingleTextSubject).to.exist
    expect(SingleTextSubject).to.be.an('object')
  })

  it('should have a `locations` property', function () {
    expect(getSnapshot(singleTextSubject.locations)).to.deep.equal(singleTextSubjectSnapshot.locations)
  })

  it('should have one location', function () {
    expect(singleTextSubject.locations).to.have.lengthOf(1)
  })

  describe('with an invalid subject location', function () {
    it('of invalid location type, should throw an error', function () {
      expect(() => SingleTextSubject.create(invalidLocationsSubjectSnapshot)).to.throw()
    })

    it('of multiple locations, should throw an error', function () {
      expect(() => SingleTextSubject.create(multipleLocationsSubjectSnapshot)).to.throw()
    })
  })

  describe('Views > viewer', function () {
    before(function () {
      const { panoptes } = stubPanoptesJs({
        subjects: [ singleTextSubject ],
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
      rootStore.subjects.setResources([singleTextSubject])
      rootStore.subjects.setActive(singleTextSubject.id)
    })

    it('should use the single text viewer', function () {
      expect(singleTextSubject.viewer).to.equal(subjectViewers.singleText)
    })
  })
})
