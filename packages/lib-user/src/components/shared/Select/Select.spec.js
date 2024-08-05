import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Meta, { Default } from './Select.stories'

describe('components > shared > Select', function() {
  const user = userEvent.setup()
  const DefaultStory = composeStory(Default, Meta)

  it('should show the selected option', function() {
    render(<DefaultStory />)

    expect(screen.getByRole('textbox')).to.have.property('value').to.equal('ALL PROJECTS')
  })

  it('should show the options', async function() {
    render(<DefaultStory />)

    const inputEl = screen.getByRole('textbox')
    await user.click(inputEl)

    const options = screen.getAllByRole('option')

    expect(options.length).to.equal(4)
  })
})
