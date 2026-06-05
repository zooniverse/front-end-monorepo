import { render, screen } from '@testing-library/react'
import Meta, { Drawing } from './FreehandLine.stories'
import { composeStory } from '@storybook/react'

describe('Drawing tools > FreehandLine', () => {
  const DrawingStory = composeStory(Drawing, Meta)

  it('should render without crashing', function () {
    render(<DrawingStory />)
  })
})
