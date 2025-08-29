import HighlighterAnnotation from './HighlighterAnnotation'

describe('Model > HighlighterAnnotation', function () {
  describe('without highlighted text', function () {
    let highlighterAnnotation

    before(function () {
      highlighterAnnotation = HighlighterAnnotation.create({ id: 'highlighter1', task: 'T0', taskType: 'highlighter' })
    })

    it('should exist', function () {
      expect(highlighterAnnotation).toBeDefined()
      expect(highlighterAnnotation).to.be.an('object')
    })

    it('should be incomplete', function () {
      expect(highlighterAnnotation.isComplete).to.equal(false)
    })
  })

  describe('with highlighted text', function () {
    let highlighterAnnotation

    before(function () {
      const highlight = {
        start: 0,
        end: 14,
        text: 'This is a test',
        labelInformation: {
          color: '#00979d',
          label: 'test'
        }
      }
      highlighterAnnotation = HighlighterAnnotation.create({ id: 'highlighter2', task: 'T0', taskType: 'highlighter', value: [highlight] })
    })

    it('should exist', function () {
      expect(highlighterAnnotation).toBeDefined()
      expect(highlighterAnnotation).to.be.an('object')
    })

    it('should be complete', function () {
      expect(highlighterAnnotation.isComplete).to.equal(true)
    })
  })

  describe('Actions > deleteHighlight', function () {
    it('should delete the highlight', function () {
      const highlight1 = {
        start: 0,
        end: 14,
        text: 'This is a test',
        labelInformation: {
          color: '#00979d',
          label: 'test1'
        }
      }
      const highlight2 = {
        start: 20,
        end: 41,
        text: 'This is another test',
        labelInformation: {
          color: '#FFB6AA	',
          label: 'test2'
        }
      }
      const highlighterAnnotation = HighlighterAnnotation.create({ id: 'highlighter3', task: 'T0', taskType: 'highlighter', value: [ highlight1, highlight2 ] })

      expect(highlighterAnnotation.value.length).to.equal(2)

      highlighterAnnotation.deleteHighlight(0)

      expect(highlighterAnnotation.value.length).to.equal(1)
      expect(highlighterAnnotation.value[0].text).to.equal('This is another test')
    })
  })
})
