import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { expect } from 'chai'
import SingleVideoViewer from './SingleVideoViewer'

describe('Component > SingleVideoViewer', function () {
  const mockUrl = 'https://zooniverse.org/test1234.mp4'

  it('render a video element with a src', async function () {
    const { container } = render(<SingleVideoViewer url={mockUrl} />)
    await waitFor(() => {
      const videoElement = container.querySelector('video')
      expect(videoElement).exists()
      expect(videoElement.src).to.equal(mockUrl)
    })
  })
})
