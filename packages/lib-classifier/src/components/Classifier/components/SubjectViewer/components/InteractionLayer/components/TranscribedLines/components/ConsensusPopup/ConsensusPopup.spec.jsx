import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import ConsensusPopup from './ConsensusPopup'
import setupMock from './helpers/setupMock'
import Meta, { Default, MissingLines } from './ConsensusPopup.stories'

describe('TranscribedLines > Component > ConsensusPopup', function () {
  const completedLines = setupMock()
  const DefaultStory = composeStory(Default, Meta)

  it('should render empty if not active', function () {
    render(<ConsensusPopup />) // active prop defaults to false
    expect(document.querySelector('div.react-draggable')).to.equal(null)
  })

  describe('when active', function () {
    beforeEach(function () {
      render(<DefaultStory />)
    })

    it('should render a draggable layer', function () {
      expect(document.querySelector('div.react-draggable')).to.exist
    })

    it('should have a title bar', function () {
      const heading = screen.getByRole(
        'heading',
        { name: 'Previous Transcriptions' }
      )
      expect(heading).to.exist
    })

    it('should render an explanatory text with the number of textOptions from the line data', function () {
      const firstParagraph = screen.getByText(
        'These 3 transcriptions have been submitted by previous volunteers and cannot be modified.',
        { selector: 'p' }
      )
      expect(firstParagraph).to.exist
    })

    it('should render the consensus text with explanation', function () {
      const consensusText = screen.getByText(
        completedLines[0].consensusText,
        { selector: 'p' }
      )
      expect(consensusText).to.exist
    })

    it('should a List of transcriptions that contributed to the consensus text', function () {
      const list = document.querySelector('ul')
      expect(list).to.exist
      const items = list.querySelectorAll('li')
      expect(items.length).to.equal(completedLines[0].textOptions.length)
    })
  })

  describe('when there there is missing line data', function () {
    const MissingLinesStory = composeStory(MissingLines, Meta)

    beforeEach(function () {
      render(<MissingLinesStory />)
    })

    it('should render an explanation when there is no consensus text', function () {
      const explanation = screen.getByText(
        'No aggregation available.',
        { selector: 'p' }
      )
      expect(explanation).to.exist
    })

    it('should render an explanation when there are no contributing transcriptions', function () {
      const explanation = screen.getByText(
        'Transcriptions unavailable.',
        { selector: 'p' }
      )
      expect(explanation).to.exist
      expect(document.querySelector('ul')).to.equal(null)
    })
  })
})
