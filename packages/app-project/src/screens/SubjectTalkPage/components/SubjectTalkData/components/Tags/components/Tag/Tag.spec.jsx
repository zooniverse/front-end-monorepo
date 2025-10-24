import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default, WithVoteCount, Disabled } from './Tag.stories'

const DefaultStory = composeStory(Default, Meta)

describe('Component > SubjectTalkPage > SubjectTalkData > Tags > Tag', function () {
  it('should show the tag name', function () {
    render(<DefaultStory />)
    const tagName = screen.getByText('blue_jay')
    expect(tagName).toBeDefined()
  })

  it('should not be disabled', function () {
    render(<DefaultStory />)
    const button = screen.getByRole('button')
    expect(button.disabled).toBe(false)
  })

  it('should show the vote count', function () {
    const WithVoteCountStory = composeStory(WithVoteCount, Meta)
    render(<WithVoteCountStory />)
    const voteCount = screen.getByText('3')
    expect(voteCount).toBeDefined()
  })

  describe('when disabled', function () {
    it('should be disabled', function () {
      const DisabledStory = composeStory(Disabled, Meta)
      render(<DisabledStory />)
      const button = screen.getByRole('button')
      expect(button.disabled).toBe(true)
    })
  })
})
