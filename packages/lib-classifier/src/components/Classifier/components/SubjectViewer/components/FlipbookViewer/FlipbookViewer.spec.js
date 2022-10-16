import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { expect } from 'chai'
import Meta, { Default, NoSubject } from './FlipbookViewer.stories'
import { composeStory } from '@storybook/testing-react'

describe('Component > FlipbookViewer', function () {
  describe('with a valid subject', function () {
    const DefaultStory = composeStory(Default, Meta)

    it('should render the correct number of thumbnnails', function () {
      const { getAllByLabelText } = render(<DefaultStory />)
      const thumbnailLabels = getAllByLabelText('SubjectViewer.MultiFrameViewer.FrameCarousel.thumbnailAltText')
      expect(thumbnailLabels).to.have.length(4)
    })

    it('should highlight the active frame thumbnail with a border', function () {
      const { getAllByLabelText } = render(<DefaultStory />)
      const thumbnailLabels = getAllByLabelText('SubjectViewer.MultiFrameViewer.FrameCarousel.thumbnailAltText')
      const activeFrame = thumbnailLabels[1]
      const { border } = window.getComputedStyle(activeFrame)
      expect(border).to.equal('2px solid #f0b200') // neutral-2 in theme
    })

    it('should have previous and next buttons', function () {
      const { getByText } = render(<DefaultStory />)
      const nextButton = getByText('SubjectViewer.MultiFrameViewer.FrameCarousel.nextFrameLabel')
      const prevButton = getByText('SubjectViewer.MultiFrameViewer.FrameCarousel.previousFrameLabel')
      expect(nextButton).exists()
      expect(prevButton).exists()
    })

    it('should handle changing the current frame via thumbnail', function () {
      const { getAllByRole } = render(<DefaultStory />)
      const radioInputs = getAllByRole('radio')
      expect(radioInputs[1].checked).to.be.true()
      fireEvent.click(radioInputs[0])
      expect(radioInputs[0].checked).to.be.true()
      expect(radioInputs[1].checked).to.be.false()
    })
  })

  describe('without a subject', function () {
    const NoSubjectStory = composeStory(NoSubject, Meta)

    it('should display an error message and no image element ', function () {
      const { container } = render(<NoSubjectStory />)

      const imageElement = container.querySelector('image')
      const errorMessage = screen.getByText('Something went wrong.')
      expect(imageElement).to.be.null()
      expect(errorMessage).exists()
    })
  })
})
