import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { expect } from 'chai'
import { Factory } from 'rosie'
import { Provider } from 'mobx-react'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

import mockStore from '@test/mockStore'
import SingleVideoViewerContainer from './SingleVideoViewerContainer'

describe('Component > SingleVideoViewerContainer', function () {
  describe('with a video subject src', function () {
    const mockSubject = Factory.build('subject', {
      locations: [
        {
          'video/mp4':
            'https://panoptes-uploads.zooniverse.org/subject_location/239f17f7-acf9-49f1-9873-266a80d29c33.mp4'
        }
      ]
    })

    const store = mockStore({
      subject: mockSubject
    })

    it('should render a video html element with subject url as src', async function () {
      const { container } = render(
        <Provider classifierStore={store}>
          <Grommet theme={zooTheme}>
            <SingleVideoViewerContainer subject={mockSubject} />
          </Grommet>
        </Provider>
      )
      // We need to wait for React Player to be ready
      await waitFor(() => {
        const videoElement = container.querySelector('video')
        expect(videoElement).exists()
      })
    })
  })

  describe('without a video subject src', function () {
    const emptySubject = Factory.build('subject', {
      locations: []
    })

    const store = mockStore({
      subject: emptySubject
    })

    it('should display an error message and no video html element ', function () {
      const { container } = render(
        <Provider classifierStore={store}>
          <Grommet theme={zooTheme}>
            <SingleVideoViewerContainer />
          </Grommet>
        </Provider>
      )
      const videoElement = container.querySelector('video')
      const errorMessage = screen.getByText(
        'SubjectViewer.SingleVideoViewerContainer.error'
      )
      expect(videoElement).to.be.null()
      expect(errorMessage).exists()
    })
  })
})
