import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { expect } from 'chai'
import * as stories from './FlipbookViewer.stories'
import { composeStories } from '@storybook/testing-react'

describe.only('Component > FlipbookViewer', function () {
  const { Default } = composeStories(stories)

  describe('with a valid subject', function () {
    it('should render the controls', function () {
      const { getAllByLabelText } = render(<Default />)

      const thumbnailLabels = getAllByLabelText(
        'SubjectViewer.MultiFrameViewer.FrameCarousel.thumbnailAltText'
      )
      expect(thumbnailLabels).to.have.length(4)
    })

    it('should call onReady with dimensions', function () {
      const { getAllByLabelText } = render(<Default />)
    })
  })
})
