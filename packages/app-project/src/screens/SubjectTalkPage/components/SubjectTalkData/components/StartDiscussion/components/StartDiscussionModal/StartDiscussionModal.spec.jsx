import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Meta, { Default, WithCommentMessage } from './StartDiscussionModal.stories'

const DefaultStory = composeStory(Default, Meta)
const WithCommentMessageStory = composeStory(WithCommentMessage, Meta)

describe('Component > SubjectTalkPage > SubjectTalkData > StartDiscussionModal', function () {
  it('should show the board radio buttons', function () {
    render(<DefaultStory />)
    const boardsRadios = screen.getAllByRole('radio')
    expect(boardsRadios.length).to.equal(4)
  })

  it('should show the discussion title input', function () {
    render(<DefaultStory />)
    const discussionTitleInput = screen.getByRole('textbox', { name: 'Talk.Discussions.discussionTitle' })
    expect(discussionTitleInput).toBeDefined()
  })

  it('should show the new comment textarea', function () {
    render(<DefaultStory />)
    const newCommentTextarea = screen.getByRole('textbox', { name: 'Talk.Discussions.newComment' })
    expect(newCommentTextarea).toBeDefined()
  })

  it('should show the submit button', function () {
    render(<DefaultStory />)
    const submitButton = screen.getByRole('button', { name: 'Talk.Discussions.addComment' })
    expect(submitButton).toBeDefined()
  })

  describe('when showCommentMessage is true', function () {
    it('should show the comment message', function () {
      render(<WithCommentMessageStory />)
      const commentMessage = screen.getByText('Talk.Discussions.commentMessage')
      expect(commentMessage).toBeDefined()
    })
  })

  describe('when the subject default board is selected', function () {
    it('should disable the discussion title input', function () {
      // the subject default board is selected by default
      render(<DefaultStory />)
      const discussionTitleInput = screen.getByRole('textbox', { name: 'Talk.Discussions.discussionTitle' })

      expect(discussionTitleInput).toBeDefined()
      expect(discussionTitleInput.disabled).to.equal(true)
    })
  })

  describe('when a non-subject default board is selected', function () {
    it('should enable the discussion title input', async function () {
      render(<DefaultStory />)
      const nonSubjectDefaultBoardRadio = screen.getByRole('radio', { name: 'Research Team' })
      const user = userEvent.setup()
      await user.click(nonSubjectDefaultBoardRadio)

      const discussionTitleInput = screen.getByRole('textbox', { name: 'Talk.Discussions.discussionTitle' })

      expect(discussionTitleInput).toBeDefined()
      expect(discussionTitleInput.disabled).to.equal(false)
    })
  })
})
