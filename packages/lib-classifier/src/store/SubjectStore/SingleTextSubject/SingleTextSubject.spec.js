import { expect } from 'chai'
import sinon from 'sinon'

import RootStore from '@store/'
import { SubjectFactory, WorkflowFactory } from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'
import subjectViewers from '@helpers/subjectViewers'

import SingleTextSubject from './SingleTextSubject'

describe('Model > SingleTextSubject', function () {
  const subjectSnapshot = SubjectFactory.build({ locations: [{ 'text/plain': 'https://foo.bar/example.txt' }] })
  const workflowSnapshot = WorkflowFactory.build()
  let subject

  before(function () {
    subject = SingleTextSubject.create(subjectSnapshot)
  })

  it('should exist', function () {
    expect(SingleTextSubject).to.be.ok()
    expect(SingleTextSubject).to.be.an('object')
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
        { 'text/plain': 'https://foo.bar/example.txt' },
        { 'audio/mpeg': 'https://foo.bar/example.mp3' }
      ]
    })

    it('should throw an error', function () {
      expect(() => SingleTextSubject.create(subjectSnapshot)).to.throw()
    })
  })

  describe('Views > viewer', function () {
    before(function () {
      const { panoptes } = stubPanoptesJs({
        subjects: [subject],
        workflows: [workflowSnapshot]
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

    it('should return the single text viewer', function () {
      expect(subject.viewer).to.equal(subjectViewers.singleText)
    })
  })
})
