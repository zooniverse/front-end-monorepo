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
      const unsubscribeText = screen.getByText('Unsubscribe from all Zooniverse emails, except Talk.')
      const emailInput = screen.getByLabelText('Email address')
      const submitButton = screen.getByText('Submit')

      expect(unsubscribeText).to.exist
      expect(emailInput).to.exist
      expect(submitButton).to.exist
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
