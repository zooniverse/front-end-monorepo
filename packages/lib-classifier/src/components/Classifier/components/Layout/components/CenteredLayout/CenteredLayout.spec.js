import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import * as projectAnnotations from '../../../../../../../.storybook/preview'

import Meta, { Default, mockTask } from './CenteredLayout.stories.js'

describe('Component > Layouts > Centered', function () {
  it('should render a subject and a task', function () {
    const DefaultStory = composeStory(Default, Meta, projectAnnotations.default)
    render(<DefaultStory />)
    expect(screen.getByLabelText('Subject 1')).exists() // img aria-label from SVGImage
    expect(screen.getByText(mockTask.init.strings.question)).exists() // task question paragraph
  })
})
