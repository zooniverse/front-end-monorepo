import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { SingleImageSubject, MultiImageSubject } from './SubjectTalkViewer.stories'

const SingleImageSubjectStory = composeStory(SingleImageSubject, Meta)
const MultiImageSubjectStory = composeStory(MultiImageSubject, Meta)

describe('Component > SubjectTalkPage > SubjectTalkViewer', function () {
  describe('with a single image subject', function () {
    it('should render without crashing', function () {
      const output = render(<SingleImageSubjectStory />)
      expect(output).to.be.ok()
    })
    
    it('should not render flipbook controls with location thumbnails', function () {
      render(<SingleImageSubjectStory />)
      
      const imageThumbnails = screen.queryByLabelText('Image thumbnails')
      expect(imageThumbnails).to.not.exist()
    })
  })

  describe('with a multi image subject', function () {
    it('should render without crashing', function () {
      const output = render(<MultiImageSubjectStory />)
      expect(output).to.be.ok()
    })

    it('should render flipbook controls with location thumbnails', function () {
      render(<MultiImageSubjectStory />)
      
      const imageThumbnails = screen.getByLabelText('Image thumbnails')
      expect(imageThumbnails).to.exist()
    })
  })
})
