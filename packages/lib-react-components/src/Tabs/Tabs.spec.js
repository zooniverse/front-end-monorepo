import React from 'react'
import { render, screen } from '@testing-library/react'
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
})
