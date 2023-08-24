import { render, screen, waitFor } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { Plain, ContentWithTitle, ContentWithTitleAndALink } from './ContentBox.stories.js'
import { ContentBoxMock } from './ContentBox.mock'

describe('Component > ContentBox', function () {
  describe('content only', function () {
    beforeEach(function () {
      const PlainStory = composeStory(Plain, Meta)
      render(<PlainStory />)
    })

    it('should render the content', function () {
      waitFor(() => {
        expect(screen.getByText(ContentBoxMock.content)).to.exist()
      })
    })

    it('should not render the title', function () {
      waitFor(() => {
        expect(screen.getByText(ContentBoxMock.title)).not.to.exist()
      })
    })
    
    it('should not render the link', function () {
      expect(screen.queryByRole('link')).to.be.null()
    })
  })

  describe('content with title', function () {
    beforeEach(function () {
      const ContentWithTitleStory = composeStory(ContentWithTitle, Meta)
      render(<ContentWithTitleStory />)
    })

    it('should render the content', function () {
      waitFor(() => {
        expect(screen.getByText(ContentBoxMock.content)).to.exist()
      })
    })

    it('should render the title', function () {
      waitFor(() => {
        expect(screen.getByText(ContentBoxMock.title)).to.exist()
      })
    })
    
    it('should not render the link', function () {
      expect(screen.queryByRole('link')).to.be.null()
    })
  })

  describe('content with title and link', function () {
    beforeEach(function () {
      const ContentWithTitleAndALinkStory = composeStory(ContentWithTitleAndALink, Meta)
      render(<ContentWithTitleAndALinkStory />)
    })

    it('should render the content', function () {
      waitFor(() => {
        expect(screen.getByText(ContentBoxMock.content)).to.exist()
      })
    })

    it('should render the title', function () {
      waitFor(() => {
        expect(screen.getByText(ContentBoxMock.title)).to.exist()
      })
    })
    
    it('should render the link', function () {
      expect(screen.getByRole('link')).to.have.property('href')
        .to.equal(ContentBoxMock.linkProps.href)

      expect(screen.getByRole('link')).to.have.property('text')
        .to.equal(ContentBoxMock.linkLabel)
    })
  })
})
