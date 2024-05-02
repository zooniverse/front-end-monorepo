import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import { USER } from '../../../../../test/mocks/panoptes'

import Meta, { Default, NoAvatar } from './MemberCard.stories.js'

describe('components > GroupStats > MemberCard', function () {
  describe('with an avatar', function () {
    const DefaultStory = composeStory(Default, Meta)

    it('should show the user\'s avatar', function () {
      render(<DefaultStory />)
      const avatar = screen.getByAltText(`${USER.login} avatar`)
      expect(avatar).to.be.ok()
    })

    it('should show the user\'s display name', function () {
      render(<DefaultStory />)
      const displayName = screen.getByText(USER.display_name)
      expect(displayName).to.be.ok()
    })

    it('should show the user\'s classifications', function () {
      render(<DefaultStory />)
      const classifications = screen.getByText('1,234 Classifications')
      expect(classifications).to.be.ok()
    })
  })

  describe('without an avatar', function () {
    const NoAvatarStory = composeStory(NoAvatar, Meta)

    it('should show the default avatar', function () {
      render(<NoAvatarStory />)
      const avatar = screen.getByAltText(`${USER.login} avatar`)
      expect(avatar).to.be.ok()
    })
  })
})
