import React from 'react'
import { render, screen } from '@testing-library/react'
import { expect } from 'chai'
import Meta, { Default, NoSubject } from './FlipbookViewer.stories'
import { composeStory } from '@storybook/testing-react'

describe.only('Component > FlipbookViewer', function () {
  describe('with a valid subject', function () {
    const DefaultStory = composeStory(Default, Meta)

    it('should render the controls', function () {
      const { getAllByLabelText } = render(<DefaultStory />)

      const thumbnailLabels = getAllByLabelText(
        'SubjectViewer.MultiFrameViewer.FrameCarousel.thumbnailAltText'
      )
      expect(thumbnailLabels).to.have.length(4)
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
