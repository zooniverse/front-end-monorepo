import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/testing-react'

import Meta, { Default, mockTask } from './MaxWidth.stories.js'

describe('Component > Layouts > MaxWidth', function () {

  it('should render a subject and a task', function () {
    const DefaultStory = composeStory(Default, Meta)
    render(<DefaultStory />)
    expect(screen.getByLabelText('Subject 1')).exists() // img aria-label from SVGImage
    expect(screen.getByText(mockTask.init.strings.question)).exists() // task question paragraph
  })
})
