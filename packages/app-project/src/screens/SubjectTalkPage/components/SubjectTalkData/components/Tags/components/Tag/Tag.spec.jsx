import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default, WithVoteCount } from './Tag.stories'

const DefaultStory = composeStory(Default, Meta)

describe('Component > SubjectTalkPage > SubjectTalkData > Tags > Tag', function () {
  it('should show the tag name', function () {
    render(<DefaultStory />)
    const tagName = screen.getByText('blue_jay')
    expect(tagName).toBeDefined()
  })

  it('should show the vote count', function () {
    const WithVoteCountStory = composeStory(WithVoteCount, Meta)
    render(<WithVoteCountStory />)
    const voteCount = screen.getByText('3')
    expect(voteCount).toBeDefined()
  })
})
