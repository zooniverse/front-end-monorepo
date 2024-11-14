import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

const SUBJECT_IMAGE_URL = 'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg'

import Meta, { Default, Error, Loading, PanAndZoom } from './SingleImageViewer.stories'
import SingleImageCanvas from './SingleImageCanvas'

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

  describe('with SingleImageCanvas', function () {
    const props = {
      naturalHeight: 600,
      naturalWidth: 800,
      src: SUBJECT_IMAGE_URL,
      subject: {
        id: '1',
        locations: [{
          url: SUBJECT_IMAGE_URL
        }] 
      },
      transformMatrix: {
        scaleX: 1,
        translateX: 0,
        translateY: 0
      }
    }

    describe('before rotation or transformMatrix', function () {
      it('should render the image without rotation', function () {
        render(<SingleImageCanvas {...props} />)
        const imageCanvasRotationGroup = screen.getByTestId('single-image-canvas-rotation-group')
        
        expect(imageCanvasRotationGroup).to.have.attribute('transform', undefined)
      })

      it('should render the image with expected transformMatrix', function () {
        render(<SingleImageCanvas {...props} />)
        const svgElement = screen.getByRole('img').closest('svg')
        
        expect(svgElement).to.have.attribute('viewBox', '0 0 800 600')
      })
    })

    describe('with rotation', function () {
      it('should apply rotation correctly', function () {
        const rotationProps = { ...props, rotation: -90 }
        
        render(<SingleImageCanvas {...rotationProps} />)
        const imageCanvasRotationGroup = screen.getByTestId('single-image-canvas-rotation-group')
        
        expect(imageCanvasRotationGroup).to.have.attribute('transform', 'rotate(-90 400 300)')
      })
    })

    describe('with transformMatrix', function () {
      it('should apply transformMatrix correctly', function () {
        const transformProps = { ...props, transformMatrix: { scaleX: 2, translateX: 100, translateY: 50 } }
        
        render(<SingleImageCanvas {...transformProps} />)
        const svgElement = screen.getByRole('img').closest('svg')
        
        expect(svgElement).to.have.attribute('viewBox', '-50 -25 400 300')
      })
    })
  })
})
