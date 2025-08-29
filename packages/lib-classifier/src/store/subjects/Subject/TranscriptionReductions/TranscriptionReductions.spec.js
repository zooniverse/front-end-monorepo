import { reducedEmptySubject, reducedSubject } from './mocks'

import TranscriptionReductions from './TranscriptionReductions'

describe('Models > TranscriptionReductions', function () {

  describe('with reductions', function () {
    let reductionsModel

    before(function () {
      const response = {
        workflow: {
          subject_reductions: [{ data: reducedSubject }]
        }
      }
      reductionsModel = TranscriptionReductions.create({
        reducer: 'alice',
        subjectId: '13971150',
        workflowId: '5339',
        reductions: [{ data: reducedSubject }]
      })
    })

    it('should exist', function () {
      expect(reductionsModel).toBeDefined()
    })

    it('should have transcribed lines', function () {
      reductionsModel.reductions.forEach(reduction => expect(reduction.data.transcribed_lines).to.equal(10))
      expect(reductionsModel.consensusLines(0).length).toBeGreaterThan(0)
    })

    it('should have points', function () {
      reductionsModel.consensusLines(0).forEach(function (consensusLine) {
        expect(Array.isArray(consensusLine.points)).to.equal(true)
        expect(Object.keys(consensusLine.points[0]).length).toBeGreaterThan(0)
      })
    })

    it('should have text options', function () {
      reductionsModel.consensusLines(0).forEach(function (consensusLine) {
        expect(Array.isArray(consensusLine.textOptions)).to.equal(true)
        expect(Object.keys(consensusLine.textOptions[0]).length).toBeGreaterThan(0)
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
    let reductionsModel

    before(function () {
      reductionsModel = TranscriptionReductions.create({
        reducer: 'alice',
        subjectId: '13971170',
        workflowId: '5339',
        reductions: [{ data: reducedEmptySubject }]
      })
    })

    it('should exist', function () {
      expect(reductionsModel).toBeDefined()
    })

    it('should not have any transcribed lines', function () {
      reductionsModel.reductions.forEach(reduction => expect(reduction.data.transcribed_lines).to.equal(0))
      expect(reductionsModel.consensusLines(0).length).to.equal(0)
      expect(reductionsModel.consensusLines(1).length).to.equal(0)
      expect(reductionsModel.consensusLines(2).length).to.equal(0)
      expect(reductionsModel.consensusLines(3).length).to.equal(0)
    })
  })
})
