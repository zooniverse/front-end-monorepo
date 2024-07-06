import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { 
  getDateRangeSelectOptions
} from '@utils'

import Meta, { DateRanges } from './Select.stories'

describe('components > shared > Select', function() {
  const user = userEvent.setup()
  const DefaultStory = composeStory(DateRanges, Meta)
  const selectOptions = getDateRangeSelectOptions()

  it('should show the selected option', function() {
    render(<DefaultStory />)

    expect(screen.getByRole('textbox')).to.have.property('value').to.equal('LAST 7 DAYS')
  })

  it('should show the options', async function() {
    render(<DefaultStory />)

    const inputEl = screen.getByRole('textbox')
    await user.click(inputEl)

    const options = screen.getAllByRole('option')

    expect(options.length).to.equal(selectOptions.length)
  })
})
