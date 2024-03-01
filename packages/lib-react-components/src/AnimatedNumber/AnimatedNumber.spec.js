import Meta, { Default } from './AnimatedNumber.stories.js'
import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

describe('Component > AnimatedNumber', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should display the value as text', async function () {
    render(<DefaultStory />)
    const text = screen.getByText('123,456')
    expect(text).exists()
  })
})
