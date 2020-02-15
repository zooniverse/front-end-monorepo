import sinon from 'sinon'
import { reducedEmptySubject, reducedSubject } from './mocks'

import TranscriptionReductions, { caesarClient } from './TranscriptionReductions'

describe('Models > TranscriptionReductions', function () {

  describe('with transcribed lines', function () {
    let reductionsModel

    before(async function () {
      const response = {
        workflow: {
          subject_reductions: [{ data: reducedSubject }]
        }
      }
      sinon.stub(caesarClient, 'request').callsFake(() => Promise.resolve(response))
      reductionsModel = TranscriptionReductions.create({
        caesarReducerKey: 'ext',
        subjectId: '13971150',
        workflowId: '5339'
      })
      await reductionsModel.fetchCaesarReductions()
    })

    after(function () {
      caesarClient.request.restore()
    })

    it('should exist', function () {
      expect(reductionsModel).to.be.ok()
    })

    it('should have annotations', function () {
      reductionsModel.reductions.forEach(reduction => expect(reduction.data.transcribed_lines).to.equal(10))
      expect(reductionsModel.transcribedLines).not.to.be.empty()
    })

    it('should default to frame 0', function () {
      reductionsModel.transcribedLines.forEach(function (annotation) {
        expect(annotation.frame).to.equal(0)
      })
    })

    it('should have points', function () {
      reductionsModel.transcribedLines.forEach(function (annotation) {
        expect(annotation.points).to.be.a('array')
        expect(annotation.points).not.to.be.empty
      })
    })

    it('should have text options', function () {
      reductionsModel.transcribedLines.forEach(function (annotation) {
        expect(annotation.textOptions).to.be.a('array')
        expect(annotation.textOptions).not.to.be.empty
      })
    })

    it('should update on frame change', function () {
      reductionsModel.changeFrame(2)
      reductionsModel.transcribedLines.forEach(function (annotation) {
        expect(annotation.frame).to.equal(2)
      })
    })
  })

  describe('without transcribed lines', function () {
    let reductionsModel

    before(async function () {
      const response = {
        workflow: {
          subject_reductions: [{ data: reducedEmptySubject }]
        }
      }
      sinon.stub(caesarClient, 'request').callsFake(() => Promise.resolve(response))
      reductionsModel = TranscriptionReductions.create({
        caesarReducerKey: 'ext',
        subjectId: '13971170',
        workflowId: '5339'
      })
      await reductionsModel.fetchCaesarReductions()
    })

    after(function () {
      caesarClient.request.restore()
    })

    it('should exist', function () {
      expect(reductionsModel).to.be.ok()
    })

    it('should not have any annotations', function () {
      reductionsModel.reductions.forEach(reduction => expect(reduction.data.transcribed_lines).to.equal(0))
      expect(reductionsModel.transcribedLines).to.be.empty()
    })
  })
})
