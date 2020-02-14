import sinon from 'sinon'
import { reducedEmptySubject, reducedSubject } from './mocks'

import TranscriptionReductions, { caesarClient } from './TranscriptionReductions'

describe('Models > TranscriptionReductions', function () {
  let reductions

  before(function () {
    // sinon.stub(console, 'error')
    reductions = TranscriptionReductions.create({
      caesarReducerKey: 'ext',
      subjectId: '13971150',
      workflowId: '5339'
    })
  })

  after(function () {
    // console.error.restore()
  })

  it('should exist', function () {
    expect(reductions).to.be.ok()
  })

  describe('with transcribed lines', function () {
    before(async function () {
      sinon.stub(caesarClient, 'request').callsFake(() => Promise.resolve(reducedSubject))
      reductions = TranscriptionReductions.create({
        caesarReducerKey: 'ext',
        subjectId: '13971150',
        workflowId: '5339'
      })
      await reductions.fetchCaesarReductions()
    })

    after(function () {
      caesarClient.request.restore()
    })

    it('should default to frame 1', function () {
      reductions.transcribedLines.forEach(function (annotation) {
        expect(annotation.frame).to.equal(1)
      })
    })

    it('should have points', function () {
      reductions.transcribedLines.forEach(function (annotation) {
        expect(annotation.points).to.be.a('array')
        expect(annotation.points).not.to.be.empty
      })
    })

    it('should have text options', function () {
      reductions.transcribedLines.forEach(function (annotation) {
        expect(annotation.textOptions).to.be.a('array')
        expect(annotation.textOptions).not.to.be.empty
      })
    })

    it('should update on frame change', function () {
      reductions.changeFrame(2)
      reductions.transcribedLines.forEach(function (annotation) {
        expect(annotation.frame).to.equal(2)
      })
    })
  })

  describe('without transcribed lines', function () {
    before(async function () {
      sinon.stub(caesarClient, 'request').callsFake(() => Promise.resolve(reducedEmptySubject))
      reductions = TranscriptionReductions.create({
        caesarReducerKey: 'ext',
        subjectId: '13971170',
        workflowId: '5339'
      })
      await reductions.fetchCaesarReductions()
    })

    after(function () {
      caesarClient.request.restore()
    })

    it('should not have any annotations', function () {
      expect(reductions.transcribedLines).to.be.empty()
    })
  })
})
