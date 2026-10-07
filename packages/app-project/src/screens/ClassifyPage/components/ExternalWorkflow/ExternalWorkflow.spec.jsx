import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import * as Stories from './ExternalWorkflow.stories'
const { Default, WithoutDescription } = composeStories(Stories)

describe('Component > ClassifyPage > ExternalWorkflow', function () {
  const DEPARTURE_LINK = { name: 'Classify.ExternalWorkflow.button' }

  describe('with a description', function () {
    beforeEach(function () {
      render(<Default />)
    })

    it('should render the description as markdown', function () {
      expect(screen.getByText('partner site').tagName).to.equal('STRONG')
      expect(screen.getByRole('link', { name: 'Learn more' }).href).to.equal('https://www.zooniverse.org/about')
    })

    it('should link to the external url in the same tab', function () {
      const link = screen.getByRole('link', DEPARTURE_LINK)
      expect(link.href).to.equal('https://example.org/my-workflow')
      expect(link.target).to.equal('')
      expect(link.rel).to.equal('')
    })

    it('should hide the external link icon from assistive technology', function () {
      expect(document.querySelector('svg').getAttribute('aria-hidden')).to.equal('true')
      expect(screen.queryByRole('link', { name: /ShareRounded/ })).to.equal(null)
    })
  })

  describe('without a description', function () {
    it('should fall back to the default text', function () {
      render(<WithoutDescription />)
      expect(screen.getByText('Classify.ExternalWorkflow.fallback')).toBeDefined()
      expect(screen.getByRole('link', DEPARTURE_LINK)).toBeDefined()
    })
  })
})
