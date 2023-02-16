import { expect } from 'chai'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import asyncStates from '@zooniverse/async-states'
import { composeStory } from '@storybook/testing-react'

import Meta, { Default, TextLocationFirst } from './ImageAndTextViewer.stories'

describe('ImageAndTextViewer', function () {
  const DefaultStory = composeStory(Default, Meta)
  const TextLocationFirstStory = composeStory(TextLocationFirst, Meta)
  
  describe('with loading state of error', function () {
    it('should render "Something went wrong."', function () {
      render(<DefaultStory loadingState={asyncStates.error} />)

      expect(screen.getByText('Something went wrong.')).to.exist()
    })
  })

  describe('with loading state of initialized', function () {
    it('should render null', function () {
      render(<DefaultStory loadingState={asyncStates.initialized} />)

      expect(screen.queryByText('Something went wrong.')).to.be.null()
      const image = document.querySelector('image')
      expect(image).to.be.null()
      const pre = document.querySelector('pre')
      expect(pre).to.be.null()
    })
  })

  describe('with a valid subject, image type location first', function () {
    it('should render the image viewer', function () {
      render(<DefaultStory />)

      const image = document.querySelector('image')
      expect(image).to.exist()
    })

    it('should render the frame change buttons', function () {
      render(<DefaultStory />)

      expect(screen.getByRole('button', { name: 'StepNavigation.previous' })).to.exist()
      expect(screen.getAllByRole('radio', { name: 'StepNavigation.go' })).to.have.lengthOf(2)
      expect(screen.getByRole('button', { name: 'StepNavigation.next' })).to.exist()
    })

    describe('when the frame is changed', function () {
      it('should render the text viewer', async function () {
        const user = userEvent.setup({ delay: null })
        render(<DefaultStory />)

        await user.click(screen.getByRole('button', { name: 'StepNavigation.next' }))
        expect(screen.getByLabelText('Subject 1234 text')).to.exist()
      })
    })
  })

  describe('with a valid subject, text type location first', function () {
    it('should render the text viewer', function () {
      render(<TextLocationFirstStory />)

      expect(screen.getByLabelText('Subject 5678 text')).to.exist()
    })

    it('should render the frame change buttons', function () {
      render(<TextLocationFirstStory />)

      expect(screen.getByRole('button', { name: 'StepNavigation.previous' })).to.exist()
      expect(screen.getAllByRole('radio', { name: 'StepNavigation.go' })).to.have.lengthOf(2)
      expect(screen.getByRole('button', { name: 'StepNavigation.next' })).to.exist()
    })

    describe('when the frame is changed', function () {
      it('should render the image viewer', async function () {
        const user = userEvent.setup({ delay: null })
        render(<TextLocationFirstStory />)

        await user.click(screen.getByRole('button', { name: 'StepNavigation.next' }))
        const image = document.querySelector('image')
        expect(image).to.exist()
      })
    })
  })
})
