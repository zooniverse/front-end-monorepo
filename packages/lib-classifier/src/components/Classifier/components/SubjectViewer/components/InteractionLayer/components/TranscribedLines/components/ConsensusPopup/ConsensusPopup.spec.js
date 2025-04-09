import { render, screen } from '@testing-library/react'
import ConsensusPopup from './ConsensusPopup'
import setupMock from './helpers/setupMock'

describe('TranscribedLines > Component > ConsensusPopup', function () {
  const completedLines = setupMock()

  it('should render empty if not active', function () {
    render(<ConsensusPopup />)
    expect(document.querySelector('div.react-draggable')).to.be.null()
  })

  describe('when active', function () {
    beforeEach(function () {
      render(<ConsensusPopup active line={completedLines[0] }/>)
    })

    it('should render a draggable layer', function () {
      expect(document.querySelector('div.react-draggable')).to.exist()
    })

    it('should have a title bar', function () {
      const heading = screen.getByRole(
        'heading',
        { name: 'SubjectViewer.InteractionLayer.TranscribedLines.ConsensusPopup.title' }
      )
      expect(heading).to.exist()
    })

    it('should render an explanatory text with the number of textOptions from the line data', function () {
      const firstParagraph = screen.getByText(
        'SubjectViewer.InteractionLayer.TranscribedLines.ConsensusPopup.explanation',
        { selector: 'p' }
      )
      expect(firstParagraph).to.exist()
      /** The translation function will simply return keys in a testing env */
    })

    it('should render the consensus text with explanation', function () {
      const consensusText = screen.getByText(
        completedLines[0].consensusText,
        { selector: 'p' }
      )
      expect(consensusText).to.exist()
    })

    it('should a List of transcriptions that contributed to the consensus text', function () {
      const list = document.querySelector('ul')
      expect(list).to.exist(1)
      const items = list.querySelectorAll('li')
      expect(items.length).to.equal(completedLines[0].textOptions.length)
    })
  })

  describe('when there there is missing line data', function () {
    beforeEach(function () {
      render(<ConsensusPopup active />)
    })

    it('should render an explanation when there is no consensus text', function () {
      const explanation = screen.getByText(
        'SubjectViewer.InteractionLayer.TranscribedLines.ConsensusPopup.noAggregation',
        { selector: 'p' }
      )
      expect(explanation).to.exist()
    })

    it('should render an explanation when there are no contributing transcriptions', function () {
      const explanation = screen.getByText(
        'SubjectViewer.InteractionLayer.TranscribedLines.ConsensusPopup.transcriptionsUnavailable',
        { selector: 'p' }
      )
      expect(explanation).to.exist()
      expect(document.querySelector('ul')).to.be.null()
    })
  })
})
