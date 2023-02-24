import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/testing-react'

import Meta, { Default, mockTask } from './NoMaxWidth.stories.js'

describe('Component > Layouts > NoMaxWidth', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should render a subject and a task', function () {
    render(<DefaultStory />)
    expect(screen.getByLabelText('Subject 1')).exists() // img aria-label from SVGImage
    expect(screen.getByText(mockTask.init.strings.question)).exists() // task question paragraph
  })
})
