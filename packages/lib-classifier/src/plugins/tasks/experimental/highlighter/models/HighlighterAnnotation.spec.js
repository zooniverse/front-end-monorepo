import HighlighterAnnotation from './HighlighterAnnotation'

describe('Model > HighlighterAnnotation', function () {
  describe('with highlighted text', function () {
    let highlighterAnnotation

    before(function () {
      const highlightValue = {
        start: 0,
        end: 14,
        text: 'This is a test',
      }
      highlighterAnnotation = HighlighterAnnotation.create({ id: 'highlighter1', task: 'T0', taskType: 'highlighter', value: [highlightValue] })
    })

    it('should exist', function () {
      expect(highlighterAnnotation).to.be.ok()
      expect(highlighterAnnotation).to.be.an('object')
    })

    it('should be complete', function () {
      expect(highlighterAnnotation.isComplete).to.be.true()
    })
  })

  describe('without a selected answer', function () {
    let highlighterAnnotation

    before(function () {
      highlighterAnnotation = HighlighterAnnotation.create({ id: 'highlighter2', task: 'T0', taskType: 'highlighter' })
    })

    it('should exist', function () {
      expect(highlighterAnnotation).to.be.ok()
      expect(highlighterAnnotation).to.be.an('object')
    })

    it('should be incomplete', function () {
      expect(highlighterAnnotation.isComplete).to.be.false()
    })
  })
})
