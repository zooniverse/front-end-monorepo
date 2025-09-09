import { render, screen, waitFor } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { Default, mockTasks } from './NoMaxWidth.stories'

describe('Component > Layouts > NoMaxWidth', function () {
  it('should render a subject and a task', async function () {
    const DefaultStory = composeStory(Default, Meta)
    render(<DefaultStory />)

    // Mock the loading state transition
    Default.store.subjectViewer.onSubjectReady()

    await waitFor(() => expect(screen.getByTitle('Subject 1')).to.exist) // subject viewer title
    await waitFor(() => expect(screen.getByText(mockTasks.init.strings.question)).to.exist) // task question paragraph
  })
})
