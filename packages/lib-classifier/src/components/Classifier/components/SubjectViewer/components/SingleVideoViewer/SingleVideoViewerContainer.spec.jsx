import { render, screen, waitFor } from '@testing-library/react'
import * as stories from './SingleVideoViewerContainer.stories'
import { composeStories } from '@storybook/react'

describe('Component > SingleVideoViewerContainer', function () {
  const { Default, WithDrawing, NoSubject, Loop, LoopWithDrawing } = composeStories(stories)

  describe('with a video subject src and drawing tools disabled', function () {
    it('should render a video html element and no custom controls', async function () {
      const { container, queryByTestId } = render(<Default />)
      // We need to wait for React Player to be ready
      await waitFor(() => {
        const videoElement = container.querySelector('video')
        expect(videoElement).to.exist
        const customControls = queryByTestId('video subject viewer custom controls')
        expect(customControls).to.equal(null)
      })
    })

    it('should not loop the video', async function () {
      const { container } = render(<Default />)
      await waitFor(() => {
        expect(container.querySelector('video').loop).to.equal(false)
      })
    })
  })

  describe('with video_loop enabled', function () {
    it('should loop the video', async function () {
      const { container } = render(<Loop />)
      await waitFor(() => {
        expect(container.querySelector('video').loop).to.equal(true)
      })
    })

    it('should loop the video with drawing tools enabled', async function () {
      const { container } = render(<LoopWithDrawing />)
      await waitFor(() => {
        expect(container.querySelector('video').loop).to.equal(true)
      })
    })
  })

  describe('without a video subject src', function () {
    it('should display an error message and no video html element ', function () {
      const { container } = render(<NoSubject />)

      const videoElement = container.querySelector('video')
      const errorMessage = screen.getByText('There was an error loading the subject.')
      expect(videoElement).to.equal(null)
      expect(errorMessage).to.exist
    })
  })

  describe('with drawing tools enabled', function () {
    it('should display custom video controls', function () {
      const { getByTestId } = render(<WithDrawing />)
      const customControls = getByTestId('video subject viewer custom controls')
      expect(customControls).to.exist
    })
  })
})
