import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default, WithResetPasswordToken } from './ResetPassword.stories'

describe('Component > Reset Password Page', function () {
  describe('when user wants to request a password reset', function () {
    const ComposedStory = composeStory(Default, Meta)

    beforeEach(function () {
      render(
        <ComposedStory />
      )
    })

    it('should show the Reset Password Form', function () {
      // TODO
      expect(true).to.equal(true)
    })
  })

  describe('when user wants to commit a password reset', function () {
    const ComposedStory = composeStory(AfterRedirectFromPanoptes, Meta)

    beforeEach(function () {
      render(
        <ComposedStory />
      )
    })

    it('should show Commit Password Form', function () {
      // TODO
      expect(true).to.equal(true)
    })
  })
})
