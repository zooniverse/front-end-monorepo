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

    it('should have transcribed lines', function () {
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

    it('should not have any transcribed lines', function () {
      reductionsModel.reductions.forEach(reduction => expect(reduction.data.transcribed_lines).to.equal(0))
      expect(reductionsModel.transcribedLines).to.be.empty()
    })
  })

  describe('without a configured reducer', function () {
    let reductionsModel

    before(async function () {
      sinon.stub(console, 'error')
      const error = new Error('Error: GraphQL Error (Code: 404)')
      error.response = {
        error: '',
        status: 404
      }
      error.request = {
        query: '{ workflow(id: 3389) { subject_reductions(subjectId: 13971170, reducerKey:"ext") { data } } }',
        variables: undefined
      }
      sinon.stub(caesarClient, 'request').callsFake(() => Promise.reject(error))
      reductionsModel = TranscriptionReductions.create({
        caesarReducerKey: 'ext',
        subjectId: '13971170',
        workflowId: '3389'
      })
      await reductionsModel.fetchCaesarReductions()
    })

    after(function () {
      caesarClient.request.restore()
      console.error.restore()
    })

    it('should exist', function () {
      expect(reductionsModel).to.be.ok()
    })

    it('should record the error message', function () {
      const { message } = reductionsModel.error
      expect(message).to.equal('Error: GraphQL Error (Code: 404)')
    })

    it('should record the error response', function () {
      const { response } = reductionsModel.error
      expect(response.error).to.equal('')
      expect(response.status).to.equal(404)
    })

    it('should record the error request', function () {
      const { request } = reductionsModel.error
      expect(request.query).to.equal('{ workflow(id: 3389) { subject_reductions(subjectId: 13971170, reducerKey:"ext") { data } } }')
      expect(request.variables).to.be.undefined()
    })

    it('should not have any reductions', function () {
      expect(reductionsModel.reductions).to.be.empty()
    })

    it('should not have any transcribed lines', function () {
      expect(reductionsModel.transcribedLines).to.be.empty()
    })
  })
})
