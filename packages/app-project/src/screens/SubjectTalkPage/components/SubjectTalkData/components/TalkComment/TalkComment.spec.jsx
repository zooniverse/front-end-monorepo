import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Meta, { Default, WithRoles, Reply } from './TalkComment.stories'

const DefaultStory = composeStory(Default, Meta)
const WithRolesStory = composeStory(WithRoles, Meta)
const ReplyStory = composeStory(Reply, Meta)

describe('Component > SubjectTalkPage > SubjectTalkData > TalkComment', function () {
  it('should render the comment body', function () {
    render(<DefaultStory />)
    const commentBody = screen.getByText('This is a test comment for the TalkComment component.')
    expect(commentBody).toBeDefined()
  })

  it('should render an avatar with alt text', function () {
    render(<DefaultStory />)
    const avatar = screen.getByRole('img', { name: 'Talk.Comment.avatarAlt' })
    expect(avatar).toBeDefined()
  })

  it('should render a link to the user project profile', function () {
    render(<DefaultStory />)
    const profileLink = screen.getByRole('link', { name: 'ZooTester 1' })
    expect(profileLink).toBeDefined()
  })

  describe('with roles', function () {
    it('should render the user roles', function () {
      render(<WithRolesStory />)
      const adminRole = screen.getByText('About.TeamMember.admin')
      const scientistRole = screen.getByText('About.TeamMember.researcher')
      expect(adminRole).toBeDefined()
      expect(scientistRole).toBeDefined()
    })
  })

  describe('with a reply comment', function () {
    it('should render a link to the original user project profile', function () {
      render(<ReplyStory />)
      const originalProfileLink = screen.getByRole('link', { name: 'Talk.Comment.userDisplayNamePossessive' })
      expect(originalProfileLink).toBeDefined()
    })

    it('should render a link to the original comment', function () {
      render(<ReplyStory />)
      const originalCommentLink = screen.getByRole('link', { name: 'Talk.Comment.comment' })
      expect(originalCommentLink).toBeDefined()
    })
  })

  describe('on hover', function () {
    it('should show the comment link', async function () {
      render(<DefaultStory />)
      const commentBody = screen.getByText('This is a test comment for the TalkComment component.')

      const user = userEvent.setup()
      await user.hover(commentBody)

      const commentLink = screen.getByRole('link', { name: 'Talk.Comment.goToComment'})
      expect(commentLink).toBeDefined()
    })
  })
})
