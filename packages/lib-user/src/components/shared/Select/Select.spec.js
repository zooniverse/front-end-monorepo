import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStory } from '@storybook/react'

import { 
  dateRanges
} from '@utils'

import Meta, { DateRanges } from './Select.stories'

describe('components > shared > Select', function() {
  const user = userEvent.setup()
  const DefaultStory = composeStory(DateRanges, Meta)

  it('should show the selected option', function() {
    render(<DefaultStory />)

    expect(screen.getByRole('textbox', { value: 'LAST 7 DAYS' })).to.be.ok()
  })

  it('should show the options', async function() {
    render(<DefaultStory />)

    const inputEl = screen.getByRole('textbox', { value: 'LAST 7 DAYS' })
    await user.click(inputEl)

    const options = screen.getAllByRole('option')

    expect(options.length).to.equal(dateRanges.values.length)
  })
})
