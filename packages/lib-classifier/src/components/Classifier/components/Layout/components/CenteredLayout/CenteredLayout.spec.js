import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { Default, mockTasks } from './CenteredLayout.stories.js'

describe('Component > Layouts > Centered', function () {
  it('should render a subject and a task', async function () {
    const DefaultStory = composeStory(Default, Meta)
    render(<DefaultStory />)
    await screen.findByTestId('subject-viewer')
    expect(await screen.getByLabelText('Subject 1')).exists() // img aria-label from SVGImage
    expect(screen.getByText(mockTasks.init.strings.question)).exists() // task question paragraph
  })
})
