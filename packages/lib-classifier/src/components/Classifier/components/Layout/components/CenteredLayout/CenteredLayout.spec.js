import { render, screen } from '@testing-library/react'
import SpecStory from '@storybook_config/specStory'
import { Default, mockTask } from './CenteredLayout.stories.js'

describe('Component > Layouts > Centered', function () {
  it('should render a subject and a task', function () {
    const DefaultStory = SpecStory(Default)
    render(<DefaultStory />)
    expect(screen.getByLabelText('Subject 1')).exists() // img aria-label from SVGImage
    expect(screen.getByText(mockTask.init.strings.question)).exists() // task question paragraph
  })
})
