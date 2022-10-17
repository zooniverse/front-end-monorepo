import React from 'react'
import { render, screen } from '@testing-library/react'
import { within } from '@testing-library/dom'
import { expect } from 'chai'
import Meta, { Default, NoSubject } from './FlipbookViewer.stories'
import { composeStory } from '@storybook/testing-react'
import userEvent from '@testing-library/user-event'

describe('Component > FlipbookViewer', function () {
  describe('with a valid subject', function () {
    const DefaultStory = composeStory(Default, Meta)

    it('should render the correct number of thumbnnails', function () {
      const { getByLabelText } = render(<DefaultStory />)
      const thumbnailContainer = getByLabelText('Image thumbnails')
      const thumbnailButtons = within(thumbnailContainer).getAllByRole('button')
      expect(thumbnailButtons).to.have.length(4)
    })

    it('should highlight the active frame thumbnail with a border', function () {
      const { getByLabelText } = render(<DefaultStory />)
      const thumbnailContainer = getByLabelText('Image thumbnails')
      const thumbnailButtons = within(thumbnailContainer).getAllByRole('button')
      const { border } = window.getComputedStyle(thumbnailButtons[0])
      expect(border).to.equal('2px solid #f0b200') // neutral-2 in theme
    })

    it('should have previous and next buttons', function () {
      const { getByText } = render(<DefaultStory />)
      const nextButton = getByText('SubjectViewer.MultiFrameViewer.FrameCarousel.nextFrameLabel')
      const prevButton = getByText('SubjectViewer.MultiFrameViewer.FrameCarousel.previousFrameLabel')
      expect(nextButton).exists()
      expect(prevButton).exists()
    })

    it('should handle changing the current frame via thumbnail', async function () {
      const user = userEvent.setup({ delay: null })

      const { getByLabelText, rerender } = render(<DefaultStory />)
      const thumbnailContainer = getByLabelText('Image thumbnails')
      const thumbnailButtons = within(thumbnailContainer).getAllByRole('button')
      const buttonStyle = window.getComputedStyle(thumbnailButtons[0])
      expect(buttonStyle.border).to.equal('2px solid #f0b200') // neutral-2 in theme

      await user.pointer({
        keys: '[MouseLeft]',
        target: thumbnailButtons[1]
      })

      rerender(<DefaultStory />)
      const newThumbnailButtons = within(thumbnailContainer).getAllByRole('button')
      const newButtonStyle = window.getComputedStyle(newThumbnailButtons[1])
      expect(newButtonStyle.border).to.equal('2px solid #f0b200')
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
