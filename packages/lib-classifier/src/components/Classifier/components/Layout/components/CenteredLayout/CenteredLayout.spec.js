import { render, screen } from '@testing-library/react'
import specStory from '@storybook_config/specStory'
import Meta, { Default, mockTask } from './CenteredLayout.stories.js'

describe('Component > Layouts > Centered', function () {
  it('should render a subject and a task', function () {
    const DefaultStory = specStory(Default, Meta)
    render(<DefaultStory />)
    expect(screen.getByLabelText('Subject 1')).exists() // img aria-label from SVGImage
    expect(screen.getByText(mockTask.init.strings.question)).exists() // task question paragraph
  })
})
