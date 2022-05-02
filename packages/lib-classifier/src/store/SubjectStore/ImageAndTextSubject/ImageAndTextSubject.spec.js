import { expect } from 'chai'
import { when } from 'mobx'
import nock from 'nock'
import asyncStates from '@zooniverse/async-states'

import { SubjectFactory, WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'
import subjectViewers from '@helpers/subjectViewers'

import ImageAndTextSubject from './ImageAndTextSubject'

describe('Model > ImageAndTextSubject', function () {
  const subjectSnapshot = SubjectFactory.build({
    content: 'This is test subject content',
    contentLoadingState: asyncStates.success,
    locations: [
      { 'image/png': 'http://localhost:8080/subjectImage.png' },
      { 'text/plain': 'http://localhost:8080/subjectContent.txt' }
    ]
  })

  const successSubjectSnapshot = SubjectFactory.build({
    locations: [
      { 'image/png': 'http://localhost:8080/subjectImage.png' },
      { 'text/plain': 'http://localhost:8080/success.txt' }
    ]
  })

  const invalidLocationsSubjectSnapshot = SubjectFactory.build({
    locations: [
      { 'text/plain': 'http://localhost:8080/success.txt' },
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
  let imageAndTextSubject

  before(function () {
    imageAndTextSubject = ImageAndTextSubject.create(subjectSnapshot)
  })

  it('should exist', function () {
    expect(ImageAndTextSubject).to.be.ok()
    expect(ImageAndTextSubject).to.be.an('object')
  })

  it('should have a `locations` property', function () {
    expect(imageAndTextSubject.locations).to.deep.equal(subjectSnapshot.locations)
  })

  it('should have two locations', function () {
    expect(imageAndTextSubject.locations).to.have.lengthOf(2)
  })

  it('should have content as expected', function () {
    expect(imageAndTextSubject.content).to.equal(subjectSnapshot.content)
  })

  it('should have contentLoadingState as expected', function () {
    expect(imageAndTextSubject.contentLoadingState).to.equal(subjectSnapshot.contentLoadingState)
  })

  describe('with invalid subject locations', function () {
    it('should throw an error', function () {
      expect(() => ImageAndTextSubject.create(invalidLocationsSubjectSnapshot)).to.throw()
    })
  })

  describe('with location request response that fails', function () {
    let subjectWithRequestFailure

    before(async function () {
      nock('http://localhost:8080')
        .get('/failure.txt')
        .reply(404)

      const store = mockStore({
        subject: failureSubjectSnapshot,
        workflow: workflowSnapshot
      })

      subjectWithRequestFailure = store.subjects.active

      await when(() => subjectWithRequestFailure.contentLoadingState === asyncStates.error)
    })

    it('should have contentLoadingState as expected', function () {
      expect(subjectWithRequestFailure.contentLoadingState).to.equal(asyncStates.error)
    })

    it('should have error as expected', function () {
      expect(subjectWithRequestFailure.error.message).to.equal('Not Found')
    })
  })

  describe('with location request response that succeeds', function () {
    let subjectWithRequestSuccess

    before(async function () {
      nock('http://localhost:8080')
        .get('/success.txt')
        .reply(200, 'This is test subject content')

      const store = mockStore({
        subject: successSubjectSnapshot,
        workflow: workflowSnapshot
      })

      subjectWithRequestSuccess = store.subjects.active

      await when(() => subjectWithRequestSuccess.contentLoadingState === asyncStates.success)
    })

    it('should have contentLoadingState as expected', function () {
      expect(subjectWithRequestSuccess.contentLoadingState).to.equal(asyncStates.success)
    })

    it('should have content as expected', function () {
      expect(subjectWithRequestSuccess.content).to.equal('This is test subject content')
    })
  })

  describe('Views > viewer', function () {
    let subjectWithImageAndTextViewer

    before(function () {
      const store = mockStore({
        subject: subjectSnapshot,
        workflow: workflowSnapshot
      })

      subjectWithImageAndTextViewer = store.subjects.active
    })

    it('should return the single text viewer', function () {
      expect(subjectWithImageAndTextViewer.viewer).to.equal(subjectViewers.imageAndText)
    })
  })
})
