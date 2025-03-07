import { render, screen, waitFor } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default, mockTasks } from './MaxWidth.stories.js'

describe('Component > Layouts > MaxWidth', function () {

  it('should render a subject and a task', async function () {
    const DefaultStory = composeStory(Default, Meta)
    render(<DefaultStory />)

    // Mock the loading state transition
    Default.store.subjectViewer.onSubjectReady()

    await waitFor(() => expect(screen.getByLabelText('Subject 1')).exists()) // img aria-label from SVGImage
    await waitFor(() => expect(screen.getByText(mockTasks.init.strings.question)).exists()) // task question paragraph
  })
})
