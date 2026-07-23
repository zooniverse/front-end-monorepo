import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default, AfterRedirectFromPanoptes } from './Unsubscribe.stories'

describe('Component > Unsubscribe Page', function () {
  describe('when page is accessed directly', function () {
    const ComposedStory = composeStory(Default, Meta)

    beforeEach(function () {
      render(
        <ComposedStory />
      )
    })

    it('should show the Unsubscribe Form', function () {
      const placeholder = screen.getByText('TODO: add form.')
      expect(placeholder).to.exist
    })
  })

  describe('when redirected from Panoptes', function () {
    const ComposedStory = composeStory(AfterRedirectFromPanoptes, Meta)

    beforeEach(function () {
      render(
        <ComposedStory />
      )
    })

    it('should show "Unsubscribe successful" message', function () {
      const heading = screen.getByRole('heading', {level: 1})
      expect(heading?.textContent).to.equal('Unsubscribe successful')
    })
  })
})
