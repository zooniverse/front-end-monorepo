import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { expect } from 'chai'
import * as stories from './SingleVideoViewerContainer.stories'
import { composeStories } from '@storybook/testing-react'

describe('Component > SingleVideoViewerContainer', function () {
  const { Default, WithDrawingEnabled, NoSubject } = composeStories(stories)

  describe('with a video subject src and drawing tools disabled', function () {
    it('should render a video html element and no custom controls', async function () {
      const { container, queryByTestId } = render(<Default />)
      // We need to wait for React Player to be ready
      await waitFor(() => {
        const videoElement = container.querySelector('video')
        expect(videoElement).exists()
        const customControls = queryByTestId('video subject viewer custom controls')
        expect(customControls).to.be.null()
      })
    })
  })

  describe('without a video subject src', function () {
    it('should display an error message and no video html element ', function () {
      const { container } = render(<NoSubject />)

      const videoElement = container.querySelector('video')
      const errorMessage = screen.getByText(
        'SubjectViewer.SingleVideoViewerContainer.error'
      )
      expect(videoElement).to.be.null()
      expect(errorMessage).exists()
    })
  })

  describe('with drawing tools enabled', function () {
    it('should display custom video controls', function () {
      const { getByTestId } = render(<WithDrawingEnabled />)
      const customControls = getByTestId('video subject viewer custom controls')
      expect(customControls).exists()
    })
  })
})
