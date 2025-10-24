import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default } from './Mentions.stories'

const DefaultStory = composeStory(Default, Meta)

describe('Component > SubjectTalkPage > SubjectTalkData > Mentions', function () {
  it('should show the mentions heading', function () {
    render(<DefaultStory />)
    const heading = screen.getByRole('heading', { name: 'Talk.mentions' })
    expect(heading).toBeDefined()
  })

  it('should show the expected mentions', function () {
    render(<DefaultStory />)
    const mentions = screen.getAllByRole('listitem')
    expect(mentions.length).to.equal(2)
  })
})
