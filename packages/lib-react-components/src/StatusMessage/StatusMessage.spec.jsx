import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default } from './StatusMessage.stories'

describe('Component > Status Message', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should render the message and icon in an accessible manner', function () {
    render(<DefaultStory text="Oh no something went wrong" type="error" />)

    const icon = screen.getByLabelText('Error')
    const text = screen.getByText('Oh no something went wrong')

    expect(icon).to.exist
    expect(text).to.exist
  })
})
