import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default } from './StatusMessage.stories'

describe('Component > Status Message', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should be able to render a success message', function () {
    render(<DefaultStory text="Things went well!" type="success" />)

    const statusRegion = screen.queryByRole('status')
    const icon = screen.queryByLabelText('Success')
    const text = screen.queryByText('Things went well!')

    expect(statusRegion).to.exist
    expect(icon).to.exist
    expect(text).to.exist
  })

  it('should be able to render an error message', function () {
    render(<DefaultStory text="Oh no something went wrong" type="error" />)

    const statusRegion = screen.queryByRole('status')
    const icon = screen.queryByLabelText('Error')
    const text = screen.queryByText('Oh no something went wrong')

    expect(statusRegion).to.exist
    expect(icon).to.exist
    expect(text).to.exist
  })

  it('should be able to render a warning message', function () {
    render(<DefaultStory text="This does not seem right" type="warning" />)

    const statusRegion = screen.queryByRole('status')
    const icon = screen.queryByLabelText('Warning')
    const text = screen.queryByText('This does not seem right')

    expect(statusRegion).to.exist
    expect(icon).to.exist
    expect(text).to.exist
  })

  it('should render an empty (but still existent) region when there\'s no text or type', function () {
    render(<DefaultStory text="" type="" />)

    const statusRegion = screen.queryByRole('status')
    const iconA = screen.queryByLabelText('Success')
    const iconB = screen.queryByLabelText('Error')
    const iconC = screen.queryByLabelText('Warning')

    expect(statusRegion).to.exist
    expect(iconA).to.be.null
    expect(iconB).to.be.null
    expect(iconC).to.be.null
  })
})
