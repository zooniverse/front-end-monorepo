import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default } from './Project.stories.jsx'

describe('Publications > Project', function () {
  const DefaultStory = composeStory(Default, Meta)
  it('should render the project name and project count', function () {
    render(<DefaultStory />)
    const text = screen.getByText(`${Default.args.title} (${Default.args.publications.length})`)
    expect(text).toBeTruthy()
  })
})
