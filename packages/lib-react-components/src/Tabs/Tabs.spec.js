import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

import Tabs from './Tabs'
import Tab from '../Tab'

describe('Component > Tabs', function () {
  beforeEach(function () {
    render(
      <Grommet theme={zooTheme} >
        <Tabs>
        <Tab title='apples'>An apple is a red fruit.</Tab>
        <Tab title='bananas'>A banana is a long fruit.</Tab>
        <Tab title='cherries'>A cherry is a stone fruit.</Tab>
        </Tabs>
      </Grommet>
    )
  })

  it('should render without crashing', function () {
    const tabsContainer = screen.getByRole('tablist')
    expect(tabsContainer).to.exist()
  })

  it('should render the correct number of tabs', function () {
    const arrayOfTabs = screen.getAllByRole('tab')
    expect(arrayOfTabs).to.have.length(3)
  })

  it('should have exactly one active panel', function () {
    const tabPanel = screen.getAllByRole('tabpanel')
    expect(tabPanel).to.have.length(1)
  })

  it('should change the active tab panel when a tab button is clicked', async function () {
    const user = userEvent.setup({ delay: null })
    const tabPanel = screen.getByRole('tabpanel')  // You only need to query the panel once, even if the content changes.
    const tabButton1 = screen.getByRole('tab', { name: 'bananas' })
    const tabButton2 = screen.getByRole('tab', { name: 'cherries' })

    expect(within(tabPanel).getByText('An apple is a red fruit.')).to.exist()

    await user.click(tabButton1)
    expect(within(tabPanel).getByText('A banana is a long fruit.')).to.exist()

    await user.click(tabButton2)
    expect(within(tabPanel).getByText('A cherry is a stone fruit.')).to.exist()
  })
})
