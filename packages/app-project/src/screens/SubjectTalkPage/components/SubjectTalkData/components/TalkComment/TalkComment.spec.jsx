import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Meta, { Default, WithoutAvatar } from './TalkComment.stories'

const DefaultStory = composeStory(Default, Meta)
const WithoutAvatarStory = composeStory(WithoutAvatar, Meta)

describe('Component > SubjectTalkPage > SubjectTalkData > TalkComment', function () {
  it('should render the comment body', function () {
    render(<WithoutAvatarStory />)
    const commentBody = screen.getByText('This is a test comment without an avatar.')
    expect(commentBody).toBeDefined()
  })

  it('should render an avatar with alt text', function () {
    render(<DefaultStory />)
    const avatar = screen.getByRole('img', { name: 'Talk.avatarAlt' })
    expect(avatar).toBeDefined()
  })

  it('should render a link to the user project profile', function () {
    render(<DefaultStory />)
    const profileLink = screen.getByRole('link', { name: 'ZooTester 1' })
    expect(profileLink).toBeDefined()
  })

  describe('on hover', function () {
    it('should show the comment link', async function () {
      render(<WithoutAvatarStory />)
      const commentBody = screen.getByText('This is a test comment without an avatar.')

      const user = userEvent.setup()
      await user.hover(commentBody)

      const commentLink = screen.getByRole('link', { name: 'Talk.goToComment'})
      expect(commentLink).toBeDefined()
    })
  })
})
