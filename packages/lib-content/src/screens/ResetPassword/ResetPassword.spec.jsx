import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default, WithResetPasswordToken, UserIsLoggedIn } from './ResetPassword.stories'

describe('Component > Reset Password Page', function () {
  describe('when user is logged in', function () {
    const ComposedStory = composeStory(UserIsLoggedIn, Meta)

    beforeEach(function () {
      render(
        <ComposedStory />
      )
    })

    it('should prevent access', function () {
      const mainText = screen.getByText('You are currently logged in. Please log out if you would like to reset your password.')
      expect(mainText).to.exist
    })
  })

  describe('when user wants to request a password reset', function () {
    const ComposedStory = composeStory(Default, Meta)

    beforeEach(function () {
      render(
        <ComposedStory />
      )
    })

    it('should show the Request Reset Form', function () {
      const mainText = screen.getByText("Enter your email address and we'll send you a link to reset your password.")
      const inputElement = screen.getByLabelText('Email address')
      expect(mainText).to.exist
      expect(inputElement).to.exist
    })
  })

  describe('when user wants to commit a password reset', function () {
    const ComposedStory = composeStory(WithResetPasswordToken, Meta)

    beforeEach(function () {
      render(
        <ComposedStory />
      )
    })

    it('should show the Commit Password Form', function () {
      const mainText = screen.getByText("Enter your password twice to confirm it, then you'll be ready to get back to helping with real research.")
      const inputElement1 = screen.getByLabelText('New password')
      const inputElement2 = screen.getByLabelText('Confirm new password')
      expect(mainText).to.exist
      expect(inputElement1).to.exist
      expect(inputElement2).to.exist
    })
  })
})
