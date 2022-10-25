import React from 'react'
import { render, screen } from '@testing-library/react'
import { expect } from 'chai'
import Meta, { Default, NoSubject } from './FlipbookViewer.stories'
import { composeStory } from '@storybook/testing-react'
import userEvent from '@testing-library/user-event'

describe('Component > FlipbookViewer', function () {
  describe('with a valid subject', function () {
    const DefaultStory = composeStory(Default, Meta)

    it('should render the correct number of thumbnnails', function () {
      const { getAllByRole } = render(<DefaultStory />)
      const thumbnailButtons = getAllByRole('tab')
      expect(thumbnailButtons).to.have.length(4)
    })

    it('should highlight the active frame thumbnail with a border', function () {
      const { getAllByRole } = render(<DefaultStory />)
      const thumbnailButtons = getAllByRole('tab')
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

      const { getAllByRole } = render(<DefaultStory />)
      const thumbnailButtons = getAllByRole('tab')
      const buttonStyle = window.getComputedStyle(thumbnailButtons[0])
      expect(buttonStyle.border).to.equal('2px solid #f0b200') // neutral-2 in theme

      await user.pointer({
        keys: '[MouseLeft]',
        target: thumbnailButtons[1]
      })

      const newButtonStyle = window.getComputedStyle(thumbnailButtons[1])
      expect(newButtonStyle.border).to.equal('2px solid #f0b200')
    })

    it('should handle using arrow keys on the tablist', async function () {
      const user = userEvent.setup({ delay: null })

      const { getAllByRole } = render(<DefaultStory />)
      const thumbnailButtons = getAllByRole('tab')
      expect(thumbnailButtons[0].tabIndex).to.equal(0)

      thumbnailButtons[0].focus()
      await user.keyboard('{ArrowRight}')

      expect(thumbnailButtons[0].tabIndex).to.equal(-1)
      expect(thumbnailButtons[1].tabIndex).to.equal(0)
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
