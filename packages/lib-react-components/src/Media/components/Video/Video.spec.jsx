import { render, screen } from '@testing-library/react'

import Video from './Video'

const video = 'https://static.zooniverse.org/fem-assets/home-video.mp4'

describe('Video', function () {
  it('should show a video element', function () {
    render(<Video src={video} />)
    const videoElement = document.querySelector('video')
    expect(videoElement).to.be.ok()
  })

  it('should show the video controls', function () {
    render(<Video src={video} />)
    const videoPlayButton = screen.getByRole('button', { name: 'play' })
    expect(videoPlayButton).to.be.ok()
  })

  describe('height and width', function () {
    it('should be set if specified', function () {
      render(<Video height={200} width={270} src={video} />)
      const video = screen.getByTestId('video-viewer')
      const { maxHeight, maxWidth } = window.getComputedStyle(video)
      expect(maxHeight).to.equal('200px')
      expect(maxWidth).to.equal('270px')
    })

    it('should fill the container by default', function () {
      render(<Video src={video} />)
      const video = screen.getByTestId('video-viewer')
      const { maxHeight, maxWidth } = window.getComputedStyle(video)
      expect(maxHeight).to.be.empty()
      expect(maxWidth).to.equal('100%')
    })
  })
})
