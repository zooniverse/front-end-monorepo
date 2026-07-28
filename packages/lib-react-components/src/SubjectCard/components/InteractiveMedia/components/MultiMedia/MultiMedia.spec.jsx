import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import ImageMeta, { LoggedInMultiImage } from '../../../../stories/interactive/SubjectCard.image.stories'

describe('MultiMedia', function () {
  it('should render the media link', function () {
    const Story = composeStory(LoggedInMultiImage, ImageMeta)
    render(<Story />)
    const link = screen.getByRole('link')
    expect(link).toBeDefined()
    expect(link.href).to.contain('/talk/subjects/121787506')
  })

  it('should render the flipbook controls', function () {
    const Story = composeStory(LoggedInMultiImage, ImageMeta)
    render(<Story />)
    const controls = screen.getByTestId('flipbook-controls')
    expect(controls).toBeDefined()
  })
})
