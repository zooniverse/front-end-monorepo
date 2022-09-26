import asyncStates from '@zooniverse/async-states'
import { getType } from 'mobx-state-tree'
import { Factory } from 'rosie'

import { SubjectFactory } from '@test/factories'
import * as subjectModels from '@store/subjects'
import SubjectType from './SubjectType.js'

describe('Models > SubjectType', function () {

  describe('single image subjects', function () {
    let subject
    let snapshot = SubjectFactory.build({
      locations: [{ 'image/png': 'https://foo.bar/example.png' }]
    })

    before(function () {
      subject = SubjectType.create(snapshot)
    })

    it('should be valid subjects', function () {
      const expectedSubject = subjectModels.SingleImageSubject.create(snapshot)
      expect(subject).to.deep.equal(expectedSubject)
    })

    it('should be of the correct subject type', function () {
      expect(getType(subject).name).to.equal('SubjectResource')
    })
  })

  describe('single video subjects', function () {
    let subject
    let snapshot = SubjectFactory.build({
      locations: [{ 'video/mp4': 'https://foo.bar/example.mp4' }]
    })

    before(function () {
      subject = SubjectType.create(snapshot)
    })

    it('should be valid subjects', function () {
      const expectedSubject = subjectModels.SingleVideoSubject.create(snapshot)
      expect(subject).to.deep.equal(expectedSubject)
    })

    it('should be of the correct subject type', function () {
      expect(getType(subject).name).to.equal('SubjectResource')
    })
  })

  describe('single text subjects', function () {
    let subject
    let snapshot = SubjectFactory.build({
      content: 'This is test subject content',
      contentLoadingState: asyncStates.success,
      locations: [{ 'text/plain': 'https://foo.bar/example.txt' }]
    })

    before(function () {
      subject = SubjectType.create(snapshot)
    })

    it('should be valid subjects', function () {
      const expectedSubject = subjectModels.SingleTextSubject.create(snapshot)
      expect(subject).to.deep.equal(expectedSubject)
    })

    it('should be of the correct subject type', function () {
      expect(getType(subject).name).to.equal('SingleTextSubject')
    })
  })

  describe('image and text subjects', function () {
    let subject
    let snapshot = SubjectFactory.build({
      content: 'This is test subject content',
      contentLoadingState: asyncStates.success,
      locations: [
        { 'image/png': 'https://foo.bar/example.png' },
        { 'text/plain': 'https://foo.bar/example.txt' }
      ]
    })

    before(function () {
      subject = SubjectType.create(snapshot)
    })

    it('should be valid subjects', function () {
      const expectedSubject = subjectModels.ImageAndTextSubject.create(snapshot)
      expect(subject).to.deep.equal(expectedSubject)
    })

    it('should be of the correct subject type', function () {
      expect(getType(subject).name).to.equal('ImageAndTextSubject')
    })
  })

  describe('subject groups', function () {
    let subject
    let snapshot = SubjectFactory.build({
      locations: [
        { 'image/png': 'https://foo.bar/example.png' },
        { 'image/png': 'https://foo.bar/example.png' },
        { 'image/png': 'https://foo.bar/example.png' },
        { 'image/png': 'https://foo.bar/example.png' },
      ],
      metadata: {
        '#group_subject_ids': '1111-1112-1113-1114',
        '#subject_group_id': 101,
      }
    })

    before(function () {
      subject = SubjectType.create(snapshot)
    })

    it('should be valid subjects', function () {
      const expectedSubject = subjectModels.SubjectGroup.create(snapshot)
      expect(subject).to.deep.equal(expectedSubject)
    })
    
    it('should be of the correct "subject group" type', function () {
      expect(getType(subject).name).to.equal('SubjectGroup')
    })
  })
})
