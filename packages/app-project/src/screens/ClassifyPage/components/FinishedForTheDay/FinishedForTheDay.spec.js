import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import Meta, { Default } from './FinishedForTheDay.stories.js'

describe('Component > FinishedForTheDay', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should contain a title and link to stats page', function () {
    render(<DefaultStory />)
    expect(screen.getByText('Classify.FinishedForTheDay.title')).exists()
    expect(screen.getByText('Classify.FinishedForTheDay.buttons.stats')).exists()
  })
})
