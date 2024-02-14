import { composeStory } from '@storybook/react'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Meta, { Default } from './Tabs.stories'

describe('components > shared > Tabs', function () {
  const user = userEvent.setup()
  const DefaultStory = composeStory(Default, Meta)
  let arrayOfTabs
  let tabPanel

  before(function () {
    render(<DefaultStory />)
    arrayOfTabs = screen.getAllByRole('tab')
    tabPanel = screen.getAllByRole('tabpanel')
  })

  it('should render the correct number of tabs', function () {
    expect(arrayOfTabs).to.have.lengthOf(2)
  })

  it('should have exactly one active panel', function () {
    expect(tabPanel).to.have.lengthOf(1)
  })

  it('should change the active tab panel when a tab button is clicked', async function () {
    render(<DefaultStory />)

    const tabPanel = screen.getByRole('tabpanel')
    const tabButtonHours = screen.getByRole('tab', { name: 'hours' })

    expect(within(tabPanel).getByText('Classification bar chart goes here.')).to.be.ok()

    user.click(tabButtonHours)
    await waitFor(() => expect(within(tabPanel).getByText('Hours bar chart goes here.')).to.be.ok())
  })
})
