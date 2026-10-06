import { render, screen, waitFor, within } from '@testing-library/react'
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
    expect(tabsContainer).toBeDefined()
  })

  it('should be a focusgroup', function () {
    const tabsContainer = screen.getByRole('tablist')
    expect(tabsContainer.getAttribute('focusgroup')).to.equal('tablist')
  })

  it('should render the correct number of tabs', function () {
    const arrayOfTabs = screen.getAllByRole('tab')
    expect(arrayOfTabs).to.have.length(3)
  })

  it('should have exactly one active panel', function () {
    const tabPanel = screen.getAllByRole('tabpanel')
    expect(tabPanel).to.have.length(1)
  })

  it('should have a focusable tab panel', function () {
    const tabPanel = screen.getByRole('tabpanel')
    expect(tabPanel.getAttribute('tabindex')).to.equal('0')
  })

  it('should make the selected tab the only tab stop', function () {
    const tabIndexes = screen.getAllByRole('tab').map(tab => tab.getAttribute('tabindex'))
    expect(tabIndexes).to.deep.equal(['0', '-1', '-1'])
  })

  it('should move focus between tabs with the arrow keys without changing the active panel', async function () {
    const user = userEvent.setup({ delay: null })
    const [apples, bananas, cherries] = screen.getAllByRole('tab')

    apples.focus()
    await user.keyboard('{ArrowRight}')
    expect(document.activeElement).to.equal(bananas)
    await user.keyboard('{ArrowRight}')
    expect(document.activeElement).to.equal(cherries)
    await user.keyboard('{ArrowRight}')
    expect(document.activeElement).to.equal(apples)
    await user.keyboard('{ArrowLeft}')
    expect(document.activeElement).to.equal(cherries)
    await user.keyboard('{Home}')
    expect(document.activeElement).to.equal(apples)
    await user.keyboard('{End}')
    expect(document.activeElement).to.equal(cherries)
    expect(apples.getAttribute('aria-selected')).to.equal('true')
    expect(within(screen.getByRole('tabpanel')).getByText('An apple is a red fruit.')).toBeDefined()
  })

  it('should move the tab stop to the newly selected tab', async function () {
    const user = userEvent.setup({ delay: null })
    await user.click(screen.getByRole('tab', { name: 'cherries' }))
    await waitFor(() => {
      const tabIndexes = screen.getAllByRole('tab').map(tab => tab.getAttribute('tabindex'))
      expect(tabIndexes).to.deep.equal(['-1', '-1', '0'])
    })
  })

  it('should change the active tab panel when a tab button is clicked', async function () {
    const user = userEvent.setup({ delay: null })
    const tabPanel = screen.getByRole('tabpanel')  // You only need to query the panel once, even if the content changes.
    const tabButton1 = screen.getByRole('tab', { name: 'bananas' })
    const tabButton2 = screen.getByRole('tab', { name: 'cherries' })

    expect(within(tabPanel).getByText('An apple is a red fruit.')).toBeDefined()

    await user.click(tabButton1)
    await waitFor(() => expect(within(tabPanel).getByText('A banana is a long fruit.')).toBeDefined())

    await user.click(tabButton2)
    await waitFor(() => expect(within(tabPanel).getByText('A cherry is a stone fruit.')).toBeDefined())
  })
})
