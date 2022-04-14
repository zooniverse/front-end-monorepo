import { expect } from 'chai'
import { when } from 'mobx'
import nock from 'nock'
import asyncStates from '@zooniverse/async-states'

import { SubjectFactory, WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'

import TextSubject from './TextSubject'
import ImageAndTextSubject from '../ImageAndTextSubject'
import SingleTextSubject from '../SingleTextSubject'

describe('Model > TextSubject', function () {
  const textSubjectSnapshot = SubjectFactory.build({
    content: 'This is test subject content',
    contentLoadingState: asyncStates.success,
    locations: [
      { 'text/plain': 'http://localhost:8080/subjectText.txt' }
    ]
  })

  const imageAndTextSubjectSnapshot = SubjectFactory.build({
    locations: [
      { 'image/jpeg': 'http://localhost:8080/subjectImage.jpg' },
      { 'text/plain': 'http://localhost:8080/success.txt' }
    ]
  })

  const invalidLocationsSubjectSnapshot = SubjectFactory.build({
    locations: [
      { 'audio/mpeg': 'http://localhost:8080/example.mp3' }
    ]
  })

  const failureSubjectSnapshot = SubjectFactory.build({
    locations: [
      { 'image/png': 'http://localhost:8080/subjectImage.png' },
      { 'text/plain': 'http://localhost:8080/failure.txt' }
    ]
  })

  const workflowSnapshot = WorkflowFactory.build()
  let subject

  before(function () {
    subject = SingleTextSubject.create(textSubjectSnapshot)
  })

  it('should exist', function () {
    expect(TextSubject).to.be.ok()
    expect(TextSubject).to.be.an('object')
  })

  it('should have a `locations` property', function () {
    expect(subject.locations).to.deep.equal(textSubjectSnapshot.locations)
  })

  it('should have one location', function () {
    expect(subject.locations).to.have.lengthOf(1)
  })

  it('should have content as expected', function () {
    expect(subject.content).to.equal(textSubjectSnapshot.content)
  })

  it('should have contentLoadingState as expected', function () {
    expect(subject.contentLoadingState).to.equal(textSubjectSnapshot.contentLoadingState)
  })

  describe('with an invalid subject location', function () {
    it('should throw an error', function () {
      expect(() => SingleTextSubject.create(invalidLocationsSubjectSnapshot)).to.throw()
    })
  })

  describe('with location request response that fails', function () {
    let subject

    before(async function () {
      nock('http://localhost:8080')
        .get('/failure.txt')
        .reply(404)

      subject = ImageAndTextSubject.create(failureSubjectSnapshot)

      const store = mockStore()
      store.workflows.setResources([workflowSnapshot])
      store.workflows.setActive(workflowSnapshot.id)
      store.subjects.setResources([subject])
      store.subjects.setActive(subject.id)

      await when(() => subject.contentLoadingState === asyncStates.error)
    })

    after(function () {
      nock.cleanAll()
    })

    it('should have contentLoadingState as expected', function () {
      expect(subject.contentLoadingState).to.equal(asyncStates.error)
    })

    it('should have error as expected', function () {
      expect(subject.error.message).to.equal('Not Found')
    })
  })

  describe('with location request response that succeeds', function () {
    let subject

    before(async function () {
      nock('http://localhost:8080')
        .get('/success.txt')
        .reply(200, 'This is test subject content')

      subject = ImageAndTextSubject.create(imageAndTextSubjectSnapshot)

      const store = mockStore()
      store.workflows.setResources([workflowSnapshot])
      store.workflows.setActive(workflowSnapshot.id)
      store.subjects.setResources([subject])
      store.subjects.setActive(subject.id)

      await when(() => subject.contentLoadingState === asyncStates.success)
    })

    after(function () {
      nock.cleanAll()
    })

    it('should have contentLoadingState as expected', function () {
      expect(subject.contentLoadingState).to.equal(asyncStates.success)
    })

    it('should have content as expected', function () {
      expect(subject.content).to.equal('This is test subject content')
    })
  })
})
