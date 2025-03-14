import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

const SUBJECT_IMAGE_URL = 'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg'

import Meta, { Default, Error, Loading, PanAndZoom } from './SingleImageViewer.stories'

describe('Component > SingleImageViewer', function () {
  describe('with a successful subject location request', function () {
    const DefaultStory = composeStory(Default, Meta)

    it('should render the image', function () {
      render(<DefaultStory />)
      const image = screen.getByRole('img')
      expect(image).to.exist()
    })

    describe('with title', function () {
      it('should render the title', function () {
        render(<DefaultStory />)
        const title = screen.getByText('Subject 1234')
        expect(title).to.exist()
      })
    })
  })

  describe('with an error from the subject location request', function () {
    const ErrorStory = composeStory(Error, Meta)

    it('should render an error message', function () {
      render(<ErrorStory />)
      const error = screen.getByText('Something went wrong.')
      expect(error).to.exist()
    })
  })

  describe('while loading the subject location', function () {
    const LoadingStory = composeStory(Loading, Meta)

    it('should render a placeholder', function () {
      render(<LoadingStory />)
      const placeholder = screen.getByTestId('placeholder-svg')
      expect(placeholder).to.exist()
    })
  })
})
