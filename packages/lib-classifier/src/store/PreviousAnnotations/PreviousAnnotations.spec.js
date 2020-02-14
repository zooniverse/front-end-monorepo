import sinon from 'sinon'

import PreviousAnnotations, { caesarClient } from './PreviousAnnotations'

describe.only('Models > PreviousAnnotations', function () {
  let previousAnnotations

  before(function () {
    // sinon.stub(console, 'error')
    previousAnnotations = PreviousAnnotations.create({
      caesarReducerKey: 'ext',
      subjectId: '13971150',
      workflowId: '5339'
    })
  })

  after(function () {
    // console.error.restore()
  })

  it('should exist', function () {
    expect(previousAnnotations).to.be.ok()
  })

  describe('with previous annotations', function () {
    before(async function () {
      previousAnnotations = PreviousAnnotations.create({
        caesarReducerKey: 'ext',
        subjectId: '13971150',
        workflowId: '5339'
      })
      await previousAnnotations.fetchCaesarReductions()
    })

    it('should default to frame 1', function () {
      previousAnnotations.annotations.forEach(function (annotation) {
        expect(annotation.frame).to.equal(1)
      })
    })

    it('should have points', function () {
      previousAnnotations.annotations.forEach(function (annotation) {
        expect(annotation.points).to.be.a('array')
        expect(annotation.points).not.to.be.empty
      })
    })

    it('should have text options', function () {
      previousAnnotations.annotations.forEach(function (annotation) {
        expect(annotation.textOptions).to.be.a('array')
        expect(annotation.textOptions).not.to.be.empty
      })
    })

    it('should update on frame change', function () {
      previousAnnotations.changeFrame(2)
      previousAnnotations.annotations.forEach(function (annotation) {
        expect(annotation.frame).to.equal(2)
      })
    })
  })

  describe('without previous annotations', function () {
    before(async function () {
      previousAnnotations = PreviousAnnotations.create({
        caesarReducerKey: 'ext',
        subjectId: '13971170',
        workflowId: '5339'
      })
      await previousAnnotations.fetchCaesarReductions()
    })

    it('should not have any annotations', function () {
      expect(previousAnnotations.annotations).to.be.empty()
    })
  })
})
