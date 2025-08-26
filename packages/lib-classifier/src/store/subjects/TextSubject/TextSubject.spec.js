import { getSnapshot } from 'mobx-state-tree'
import sinon from 'sinon'

import subjectViewers from '@helpers/subjectViewers'
import RootStore from '@store/'
import { SubjectFactory, WorkflowFactory } from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'

import TextSubject from './TextSubject'

describe('Model > TextSubject', function () {
  const textSubjectSnapshot = SubjectFactory.build({
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
  let textSubject

  before(function () {
    textSubject = TextSubject.create(textSubjectSnapshot)
  })

  it('should exist', function () {
    expect(TextSubject).to.be.ok()
    expect(TextSubject).to.be.an('object')
  })

  it('should have a `locations` property', function () {
    expect(getSnapshot(textSubject.locations)).to.deep.equal(textSubjectSnapshot.locations)
  })

  describe('with an invalid subject location', function () {
    it('should throw an error', function () {
      expect(() => TextSubject.create(invalidLocationsSubjectSnapshot)).to.throw()
    })
  })

  describe('Views > viewer', function () {
    before(function () {
      const { panoptes } = stubPanoptesJs({
        subjects: [ textSubject ],
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
      rootStore.subjects.setResources([textSubject])
      rootStore.subjects.setActive(textSubject.id)
    })

    it('should use the single text viewer', function () {
      expect(textSubject.viewer).to.equal(subjectViewers.singleText)
    })
  })
})
