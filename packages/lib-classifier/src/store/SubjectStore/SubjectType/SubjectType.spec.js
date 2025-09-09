import { getSnapshot, getType } from 'mobx-state-tree'

import { SubjectFactory } from '@test/factories'
// import * as subjectModels from '@store/subjects'
// import SubjectType from './SubjectType.js'

// Must be skipped due to Vitest unable to resolve "import * as subjects from '@store/subjects'"
// The same import statement can be found in SubjectType.js
// https://github.com/zooniverse/front-end-monorepo/issues/7018

describe.skip('Models > SubjectType', function () {

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
      expect(getSnapshot(subject)).to.deep.equal(getSnapshot(expectedSubject))
    })

    it('should be of the correct subject type', function () {
      expect(getType(subject).name).to.equal('SingleImageSubject')
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
      expect(getSnapshot(subject)).to.deep.equal(getSnapshot(expectedSubject))
    })

    it('should be of the correct subject type', function () {
      expect(getType(subject).name).to.equal('SingleVideoSubject')
    })
  })

  describe('single text subjects', function () {
    let subject
    let snapshot = SubjectFactory.build({
      locations: [{ 'text/plain': 'https://foo.bar/example.txt' }]
    })

    before(function () {
      subject = SubjectType.create(snapshot)
    })

    it('should be valid subjects', function () {
      const expectedSubject = subjectModels.SingleTextSubject.create(snapshot)
      expect(getSnapshot(subject)).to.deep.equal(getSnapshot(expectedSubject))
    })

    it('should be of the correct subject type', function () {
      expect(getType(subject).name).to.equal('SingleTextSubject')
    })
  })

  describe('multi-image subjects', function () {
    let subject
    let snapshot = SubjectFactory.build({
      locations: [
        { 'image/png': 'https://foo.bar/example-1.png' },
        { 'image/png': 'https://foo.bar/example-2.png' },
        { 'image/png': 'https://foo.bar/example-3.png' },
        { 'image/png': 'https://foo.bar/example-4.png' },
      ]
    })

    before(function () {
      subject = SubjectType.create(snapshot)
    })

    it('should be valid subjects', function () {
      const expectedSubject = subjectModels.ImageSubject.create(snapshot)
      expect(getSnapshot(subject)).to.deep.equal(getSnapshot(expectedSubject))
    })

    it('should be of the correct type', function () {
      expect(getType(subject).name).to.equal('ImageSubject')
    })
  })

  describe('image and text subjects', function () {
    let subject
    let snapshot = SubjectFactory.build({
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
      expect(getSnapshot(subject)).to.deep.equal(getSnapshot(expectedSubject))
    })

    it('should be of the correct subject type', function () {
      expect(getType(subject).name).to.equal('ImageAndTextSubject')
    })
  })

  describe('JSON data subjects', function () {
    let subject
    let snapshot = SubjectFactory.build({
      locations: [
        { 'image/png': 'https://foo.bar/example-1.png' },
        { 'image/png': 'https://foo.bar/example-2.png' },
        { 'application/json': 'https://foo.bar/example.json' }
      ]
    })

    before(function () {
      subject = SubjectType.create(snapshot)
    })

    it('should be valid subjects', function () {
      const expectedSubject = subjectModels.SingleJSONSubject.create(snapshot)
      expect(getSnapshot(subject)).to.deep.equal(getSnapshot(expectedSubject))
    })

    it('should be of the correct subject type', function () {
      expect(getType(subject).name).to.equal('SingleJSONSubject')
    })
  })

  describe('subject groups', function () {
    let subject
    let snapshot = SubjectFactory.build({
      locations: [
        { 'image/png': 'https://foo.bar/example-1.png' },
        { 'image/png': 'https://foo.bar/example-2.png' },
        { 'image/png': 'https://foo.bar/example-3.png' },
        { 'image/png': 'https://foo.bar/example-4.png' },
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
      expect(getSnapshot(subject)).to.deep.equal(getSnapshot(expectedSubject))
    })

    it('should be of the correct "subject group" type', function () {
      expect(getType(subject).name).to.equal('SubjectGroup')
    })
  })

  describe('PH-TESS subjects', function () {
    let subject
    let snapshot = SubjectFactory.build({
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
      expect(getSnapshot(subject)).to.deep.equal(getSnapshot(expectedSubject))
    })

    it('should be image and text subjects', function () {
      expect(getType(subject).name).to.equal('ImageAndTextSubject')
    })
  })
})
