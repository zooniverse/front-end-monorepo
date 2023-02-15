import { expect } from 'chai'
import { composeStory } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import asyncStates from '@zooniverse/async-states'

import Meta, { Default, TextLocationFirst } from './ImageAndTextViewer.stories'

describe('ImageAndTextViewer', function () {
  const DefaultStory = composeStory(Default, Meta)
  const TextLocationFirstStory = composeStory(TextLocationFirst, Meta)

  describe('with loading state of error', function () {
    it('should render something went wrong', function () {
      render(<DefaultStory loadingState={asyncStates.error}/>)

      expect(screen.getByText('Something went wrong.')).to.exist()
    })
  })

  describe('with loading state of initialized', function () {
    it('should render null', function () {
      render(<DefaultStory loadingState={asyncStates.initialized}/>)
      const image = document.querySelector('image')
      const pre = document.querySelector('pre')
      
      expect(screen.queryByText('Something went wrong.')).to.be.null()
      expect(image).to.be.null()
      expect(pre).to.be.null()
    })
  })

  describe('with a valid subject, image type location first', function () {
    it('should render the image viewer', function () {
      render(<DefaultStory />)
      const image = document.querySelector('image')
      
      expect(image).to.exist()
    })

    it('should highlight the active frame image thumbnail with a border', function () {
      render(<DefaultStory />)
      const thumbnailButtons = document.querySelectorAll('[role=tab]')
      const { border } = window.getComputedStyle(thumbnailButtons[0])
      
      expect(border).to.equal('2px solid #f0b200') // neutral-2 in theme
    })

    it('should have previous and next buttons', function () {
      render(<DefaultStory />)
      const nextButton = screen.getByText('SubjectViewer.MultiFrameViewer.FrameCarousel.nextFrameLabel')
      const prevButton = screen.getByText('SubjectViewer.MultiFrameViewer.FrameCarousel.previousFrameLabel')
      
      expect(nextButton).exists()
      expect(prevButton).exists()
    })
  })

  describe('with a valid subject, text type location first', function () {
    it('should render the text viewer', function () {
      render(<TextLocationFirstStory />)
      const pre = document.querySelector('pre')
      
      expect(pre).to.exist()
    })
  })

  describe('on frame change', function () {
    it('should handle changing the current frame via thumbnail', async function () {
      const user = userEvent.setup({ delay: null })
      render(<DefaultStory />)
      const thumbnailButtons = document.querySelectorAll('[role=tab]')
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
      render(<TextLocationFirstStory />)
      const thumbnailButtons = document.querySelectorAll('[role=tab]')
      
      expect(thumbnailButtons[0].tabIndex).to.equal(0)

      thumbnailButtons[0].focus()
      await user.keyboard('{ArrowRight}')

      expect(thumbnailButtons[0].tabIndex).to.equal(-1)
      expect(thumbnailButtons[1].tabIndex).to.equal(0)
    })
  })
})
