import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { MultiImage } from '../../../../stories/interactive/multiMedia/SubjectCard.multiMedia.stories'

describe('MultiMedia', function () {
  it('should render the media link', function () {
    const Story = composeStory(MultiImage, Meta)
    render(<Story />)
    const link = screen.getByRole('link')
    expect(link).toBeDefined()
    expect(link.href).to.contain('/talk/subjects/121787506')
  })

  it('should render the flipbook controls', function () {
    const Story = composeStory(MultiImage, Meta)
    render(<Story />)
    const controls = screen.getByTestId('flipbook-controls')
    expect(controls).toBeDefined()
  })
})
