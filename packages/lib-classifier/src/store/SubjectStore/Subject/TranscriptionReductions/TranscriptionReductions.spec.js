import { expect } from 'chai'
import { GraphQLClient } from 'graphql-request'
import sinon from 'sinon'
import { reducedEmptySubject, reducedSubject } from './mocks'

import TranscriptionReductions from './TranscriptionReductions'

describe('Models > TranscriptionReductions', function () {

  describe('with reductions', function () {
    const caesarClient = new GraphQLClient('https://caesar-staging.zooniverse.org/graphql')
    let reductionsModel

    before(async function () {
      const response = {
        workflow: {
          subject_reductions: [{ data: reducedSubject }]
        }
      }
      sinon.stub(caesarClient, 'request').callsFake(() => Promise.resolve(response))
      reductionsModel = TranscriptionReductions.create({
        subjectId: '13971150',
        workflowId: '5339'
      }, {
        client: {
          caesar: caesarClient
        }
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
      expect(reductionsModel.consensusLines(0)).not.to.be.empty()
    })

    it('should have points', function () {
      reductionsModel.consensusLines(0).forEach(function (consensusLine) {
        expect(consensusLine.points).to.be.a('array')
        expect(consensusLine.points).not.to.be.empty
      })
    })

    it('should have text options', function () {
      reductionsModel.consensusLines(0).forEach(function (consensusLine) {
        expect(consensusLine.textOptions).to.be.a('array')
        expect(consensusLine.textOptions).not.to.be.empty
      })
    })

    describe('transcribed lines', function () {
      let consensusLine

      before(async function () {
        consensusLine = reductionsModel.consensusLines(0)[0]
      })

      it('should have consensus text', function () {
        expect(consensusLine.consensusText).to.equal('Here are some test')
      })

      it('should have text options', function () {
        expect(consensusLine.textOptions).to.deep.equal([
          'Here are some test',
          'Here are some test',
          'Here are some test'
        ])
      })

      it('should have two points', function () {
        expect(consensusLine.points).to.have.lengthOf(2)
      })

      it('should have a start point', function () {
        const x = 32.550689697265625
        const y = 297.0990905761719
        expect(consensusLine.points[0]).to.deep.equal({ x, y })
      })

      it('should have an end point', function () {
        const x = 989.6483154296875
        const y = 280.3498840332031
        expect(consensusLine.points[1]).to.deep.equal({ x, y })
      })

      it('should filter by frame', function () {
        expect(consensusLine.frame).to.equal(0)
        const frameOneLines = reductionsModel.consensusLines(1)
        expect(frameOneLines[0].frame).to.equal(1)
      })
    })
  })

  describe('without reductions', function () {
    const caesarClient = new GraphQLClient('https://caesar-staging.zooniverse.org/graphql')
    let reductionsModel

    before(async function () {
      const response = {
        workflow: {
          subject_reductions: [{ data: reducedEmptySubject }]
        }
      }
      sinon.stub(caesarClient, 'request').callsFake(() => Promise.resolve(response))
      reductionsModel = TranscriptionReductions.create({
        subjectId: '13971170',
        workflowId: '5339'
      }, {
        client: {
          caesar: caesarClient
        }
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
      expect(reductionsModel.consensusLines(0)).to.be.empty()
      expect(reductionsModel.consensusLines(1)).to.be.empty()
      expect(reductionsModel.consensusLines(2)).to.be.empty()
      expect(reductionsModel.consensusLines(3)).to.be.empty()
    })
  })

  describe('without a configured reducer', function () {
    const caesarClient = new GraphQLClient('https://caesar-staging.zooniverse.org/graphql')
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
        subjectId: '13971170',
        workflowId: '3389'
      }, {
        client: {
          caesar: caesarClient
        }
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
      expect(reductionsModel.consensusLines(0)).to.be.empty()
      expect(reductionsModel.consensusLines(1)).to.be.empty()
      expect(reductionsModel.consensusLines(2)).to.be.empty()
      expect(reductionsModel.consensusLines(3)).to.be.empty()
    })
  })
})
