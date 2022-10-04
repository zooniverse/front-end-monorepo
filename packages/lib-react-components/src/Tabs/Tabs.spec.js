import React from 'react'
import { render, screen } from '@testing-library/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

import Tabs from './Tabs'
import Tab from '../Tab'

describe('Component > Tabs', function () {
  beforeEach(function () {
    render(
      <Grommet
        background={{
          dark: 'dark-1',
          light: 'light-1',
        }}
        theme={zooTheme}
        themeMode="light"
      >
        <Tabs>
          <Tab title="apples">An apple is an edible fruit produced by an apple tree (Malus domestica).</Tab>
          <Tab title="bananas">A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa.</Tab>
          <Tab title="cherries">A cherry is the fruit of many plants of the genus Prunus, and is a fleshy drupe (stone fruit).</Tab>
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
})
