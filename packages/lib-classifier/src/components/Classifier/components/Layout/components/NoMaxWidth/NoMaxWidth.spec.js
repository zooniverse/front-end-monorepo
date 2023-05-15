import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import projectAnnotations from '../../../../../../../.storybook/preview'

import Meta, { Default, mockTask } from './NoMaxWidth.stories.js'

describe('Component > Layouts > NoMaxWidth', function () {
  it('should render a subject and a task', function () {
    const DefaultStory = composeStory(Default, Meta, projectAnnotations)
    render(<DefaultStory />)
    expect(screen.getByLabelText('Subject 1')).exists() // img aria-label from SVGImage
    expect(screen.getByText(mockTask.init.strings.question)).exists() // task question paragraph
  })
})
