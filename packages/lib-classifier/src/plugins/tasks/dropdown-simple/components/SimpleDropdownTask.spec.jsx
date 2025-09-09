import { render, screen } from '@testing-library/react'
import { within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { composeStory } from '@storybook/react'
import Meta, { ShortOptions } from './SimpleDropdownTask.stories'
import { SimpleDropdownTaskMockShort } from './SimpleDropdownTask.mock.js'

describe('Tasks / Simple Dropdown', function () {
  const user = userEvent.setup()

  describe('Short list of options', function () {
    const ShortOptionsStory = composeStory(ShortOptions, Meta)

    beforeEach(function () {
      render(<ShortOptionsStory />)
    })

    it('should render without any option selected', async function () {
      const inputEl = screen.getByPlaceholderText('Choose an answer')
      expect(inputEl.value).to.equal('')
    })

    it('should render the options on click', async function () {
      const inputEl = screen.getByPlaceholderText('Choose an answer')
      await user.click(inputEl)

      const options = screen.getAllByRole('option')

      expect(options.length).to.equal(SimpleDropdownTaskMockShort.options.length)
      expect(within(options[0]).getByText(SimpleDropdownTaskMockShort.options[0])).to.exist
    })
  })
})
