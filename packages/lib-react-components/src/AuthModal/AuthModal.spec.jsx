import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, * as Stories from './AuthModal.stories'

describe('AuthModal', function () {
  describe('Sign in', function () {
    it('should render a modal dialog', function () {
      const Story = composeStory(Stories.SignIn, Meta)
      render(<Story />)
      const dialog = screen.getByRole('dialog', { name: 'Sign in or create a new account.' })
      expect(dialog).to.exist()
    })

    it('should show username and password fields', function () {
      const Story = composeStory(Stories.SignIn, Meta)
      render(<Story />)
      const username = screen.getByRole('textbox', { name: 'Username or email address' })
      const password = document.querySelector('input[type=password]')
      expect(username).to.exist()
      expect(password).to.exist()
    })
  })

  describe('Register', function () {
    it('should render a modal dialog', function () {
      const Story = composeStory(Stories.Register, Meta)
      render(<Story />)
      const dialog = screen.getByRole('dialog', { name: 'Sign in or create a new account.' })
      expect(dialog).to.exist()
    })

    it('should collect username, password, email, and real name', function () {
      const Story = composeStory(Stories.Register, Meta)
      render(<Story />)
      const username = screen.getByRole('textbox', { name: 'Username (Required)' })
      const email = screen.getByRole('textbox', { name: 'Email Address (Required)' })
      const emailConfirm = screen.getByRole('textbox', { name: 'Confirm Email Address (Required)' })
      const realName = screen.getByRole('textbox', { name: 'Real Name (Optional)' })
      const password = document.querySelector('input[type=password][name=password]')
      const passwordConfirm = document.querySelector('input[type=password][name=passwordConfirm]')
      expect(username).to.exist()
      expect(email).to.exist()
      expect(emailConfirm).to.exist()
      expect(realName).to.exist()
      expect(password).to.exist()
      expect(passwordConfirm).to.exist()
    })

    it('should show checkboxes for privacy, email preferences and age.', function () {
      const Story = composeStory(Stories.Register, Meta)
      render(<Story />)
      const privacy = screen.getByRole('checkbox', { name: 'You agree to our privacy policy (required)' })
      const emailPrefs = screen.getByRole('checkbox', { name: 'It\'s ok to send me an email every once in a while (optional)' })
      const betaPrefs = screen.getByRole('checkbox', { name: 'I\'d like to help test new projects and be emailed when they\'re available (optional)' })
      const underAge = screen.getByRole('checkbox', { name: 'If you are under 16 years old, tick this box to confirm that you\'ve completed the form with your parent or guardian' })
      expect(privacy).to.exist()
      expect(emailPrefs).to.exist()
      expect(betaPrefs).to.exist()
      expect(underAge).to.exist()
    })
  })
})
