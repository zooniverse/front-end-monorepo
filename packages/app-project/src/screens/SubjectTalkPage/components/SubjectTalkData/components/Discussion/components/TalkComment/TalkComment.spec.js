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
    expect(commentBody).to.exist()
  })

  it('should render an avatar with alt text', function () {
    render(<DefaultStory />)
    const avatar = screen.getByRole('img', { name: 'zootester1 avatar' })
    expect(avatar).to.exist()
  })

  describe('on hover', function () {
    it('should show the comment link', async function () {
      render(<WithoutAvatarStory />)
      const commentBody = screen.getByText('This is a test comment without an avatar.')

      const user = userEvent.setup()
      await user.hover(commentBody)

      const commentLink = screen.getByRole('link', { name: 'Talk.goToComment'})
      expect(commentLink).to.exist()
    })
  })
})
