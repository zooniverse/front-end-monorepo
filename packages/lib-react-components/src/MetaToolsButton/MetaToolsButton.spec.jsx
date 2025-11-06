import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { Button, Link } from './MetaToolsButton.stories'
import {
  MetaToolsButtonMock,
  MetaToolsButtonLinkMock
} from './MetaToolsButton.mock'

describe('MetaToolsButton', function () {
  describe('Plain Button', function () {
    beforeEach(function () {
      const MetaToolsButtonStory = composeStory(Button, Meta)
      render(<MetaToolsButtonStory />)
    })

    it('should render the text', function () {
      expect(screen.getByText(MetaToolsButtonMock.text)).toBeDefined()
    })

    it('should render the aria label', function () {
      expect(screen.getByLabelText(MetaToolsButtonMock.text)).toBeDefined()
    })

    it('should not have a link', function () {
      expect(screen.getByTestId('test-meta-tools-button').getAttribute('href'))
        .to.equal('')
    })
  })

  describe('Link Button', function () {
    beforeEach(function () {
      const MetaToolsButtonLinkStory = composeStory(Link, Meta)
      render(<MetaToolsButtonLinkStory />)
    })

    it('should render the text', function () {
      expect(screen.getByText(MetaToolsButtonMock.text)).toBeDefined()
    })

    it('should render the aria label', function () {
      expect(screen.getByLabelText(MetaToolsButtonMock.text)).toBeDefined()
    })

    it('should have a link', function () {
      expect(screen.getByTestId('test-meta-tools-button').getAttribute('href'))
        .to.equal(MetaToolsButtonLinkMock.href)
    })
  })
})
