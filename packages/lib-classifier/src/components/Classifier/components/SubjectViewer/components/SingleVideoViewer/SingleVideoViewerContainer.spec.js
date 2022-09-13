import React from 'react'
import * as stories from './SingleVideoViewerContainer.stories'
import { render } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'

describe.only('Component > SingleVideoViewerContainer', function () {
  
  describe('with a video subject src', function () {
    
    it('should render a video html element with subject url as src', function () {
      const { Default } = composeStories(stories)
      const { getByRole } = render(<Default />)
      // const videoElement = getByRole('video')
      // expect(videoElement).exists()
    })
  })

  describe('without a video subject src', function () {
    it('should not render a video html element ', function () {
      
    })
  })
})
