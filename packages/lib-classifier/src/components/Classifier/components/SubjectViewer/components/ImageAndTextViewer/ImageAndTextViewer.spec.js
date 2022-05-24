import { expect } from 'chai'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'

import { SubjectFactory } from '@test/factories'
import mockStore from '@test/mockStore'

import ImageAndTextViewerConnector from './ImageAndTextViewerConnector'

describe('ImageAndTextViewer', function () {
  function withStore (store) {
    return function Wrapper ({ children }) {
      return (
        <Grommet theme={zooTheme}>
          <Provider classifierStore={store}>
            {children}
          </Provider>
        </Grommet>
      )
    }
  }

  const imageAndTextSubjectSnapshot = SubjectFactory.build({
    content: 'This is test subject content.',
    contentLoadingState: asyncStates.success,
    locations: [
      {
        'image/jpeg': 'https://some.domain/image.jpg'
      },
      {
        'text/plain': 'https://some.domain/text.txt'
      }
    ]
  })

  const store = mockStore({
    subject: imageAndTextSubjectSnapshot
  })

  describe('with loading state of error', function () {
    it('should render something went wrong', function () {
      render(
        <ImageAndTextViewerConnector
          loadingState={asyncStates.error}
          subject={imageAndTextSubjectSnapshot}
        />, {
          wrapper: withStore(store)
        }
      )

      expect(screen.getByText('Something went wrong.')).to.exist()
    })
  })

  describe('with loading state of initialized', function () {
    it('should render null', function () {
      render(
        <ImageAndTextViewerConnector
          loadingState={asyncStates.initialized}
          subject={imageAndTextSubjectSnapshot}
        />, {
          wrapper: withStore(store)
        }
      )

      expect(screen.queryByText('Something went wrong.')).to.be.null()
      const image = document.querySelector('image')
      expect(image).to.be.null()
      const pre = document.querySelector('pre')
      expect(pre).to.be.null()
    })
  })

  describe('with a valid subject, image type location first', function () {
    const user = userEvent.setup({ delay: null })

    it('should render the image viewer', function () {
      render(
        <ImageAndTextViewerConnector
          loadingState={asyncStates.success}
          subject={imageAndTextSubjectSnapshot}
        />, {
          wrapper: withStore(store)
        }
      )

      const image = document.querySelector('image')
      expect(image).to.exist()

      // "https://static.zooniverse.org/www.zooniverse.org/assets/fe-project-subject-placeholder-800x600.png" is the placeholder image for the single image subject viewer
      expect(image.getAttribute('xlink:href')).to.equal('https://static.zooniverse.org/www.zooniverse.org/assets/fe-project-subject-placeholder-800x600.png')
    })

    it('should render the frame change buttons', function () {
      render(
        <ImageAndTextViewerConnector
          loadingState={asyncStates.success}
          subject={imageAndTextSubjectSnapshot}
        />, {
          wrapper: withStore(store)
        }
      )

      expect(screen.getByRole('button', { name: 'SlideTutorial.StepNavigation.previous' })).to.exist()
      expect(screen.getAllByRole('radio', { name: 'SlideTutorial.StepNavigation.go' })).to.have.lengthOf(2)
      expect(screen.getByRole('button', { name: 'SlideTutorial.StepNavigation.next' })).to.exist()
    })

    describe('when the frame is changed', function () {
      it('should render the text viewer', async function () {
        render(
          <ImageAndTextViewerConnector
            loadingState={asyncStates.success}
            subject={imageAndTextSubjectSnapshot}
          />, {
            wrapper: withStore(store)
          }
        )

        await user.click(screen.getByRole('button', { name: 'SlideTutorial.StepNavigation.next' }))
        expect(screen.getByText('This is test subject content.')).to.exist()
      })
    })
  })

  describe('with a valid subject, text type location first', function () {
    const user = userEvent.setup({ delay: null })
    const textAndImageSubjectSnapshot = SubjectFactory.build({
      content: 'This is test subject content.',
      contentLoadingState: asyncStates.success,
      locations: [
        {
          'text/plain': 'https://some.domain/text.txt'
        },
        {
          'image/jpeg': 'https://some.domain/image.jpg'
        }
      ]
    })
    const store = mockStore({
      subject: textAndImageSubjectSnapshot
    })

    it('should render the text viewer', function () {
      render(
        <ImageAndTextViewerConnector
          loadingState={asyncStates.success}
          subject={textAndImageSubjectSnapshot}
        />, {
          wrapper: withStore(store)
        }
      )

      expect(screen.getByText('This is test subject content.')).to.exist()
    })

    it('should render the frame change buttons', function () {
      render(
        <ImageAndTextViewerConnector
          loadingState={asyncStates.success}
          subject={textAndImageSubjectSnapshot}
        />, {
          wrapper: withStore(store)
        }
      )

      expect(screen.getByRole('button', { name: 'SlideTutorial.StepNavigation.previous' })).to.exist()
      expect(screen.getAllByRole('radio', { name: 'SlideTutorial.StepNavigation.go' })).to.have.lengthOf(2)
      expect(screen.getByRole('button', { name: 'SlideTutorial.StepNavigation.next' })).to.exist()
    })

    describe('when the frame is changed', function () {
      it('should render the image viewer', async function () {
        render(
          <ImageAndTextViewerConnector
            loadingState={asyncStates.success}
            subject={textAndImageSubjectSnapshot}
          />, {
            wrapper: withStore(store)
          }
        )

        await user.click(screen.getByRole('button', { name: 'SlideTutorial.StepNavigation.next' }))
        const image = document.querySelector('image')
        expect(image).to.exist()

        // "https://static.zooniverse.org/www.zooniverse.org/assets/fe-project-subject-placeholder-800x600.png" is the placeholder image for the single image subject viewer
        expect(image.getAttribute('xlink:href')).to.equal('https://static.zooniverse.org/www.zooniverse.org/assets/fe-project-subject-placeholder-800x600.png')
      })
    })
  })
})
