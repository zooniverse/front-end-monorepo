import React from 'react'
import { render, screen, within } from '@testing-library/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Key } from 'grommet-icons'

import Tabs from '../Tabs'
import Tab from './Tab'
import SpacedText from '../SpacedText'

describe('Component > Tab', function () {
  describe('with standard props', function () {
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
      const arrayOfTabs = screen.getAllByRole('tab')
      const tabPanel = screen.getByRole('tabpanel')
      expect(tabsContainer).to.exist()
      expect(arrayOfTabs).to.have.length(3)
      expect(tabPanel).to.exist()
    })

    it('should render the `title` prop as standard text if it\'s a string', function () {
      const arrayOfTabs = screen.getAllByRole('tab')

      const tab0 = within(arrayOfTabs[0])
      const tab1 = within(arrayOfTabs[1])
      const tab2 = within(arrayOfTabs[2])

      expect(tab0.getByText('apples')).to.exist()
      expect(tab1.getByText('bananas')).to.exist()
      expect(tab2.getByText('cherries')).to.exist()
    })
  })

  describe('with complex props', function () {
    beforeEach(function () {
      const ComplexTitle = () => (
        <span>
          <Key data-testid='icon' size='small' a11yTitle={'Restricted Section:'} />
          &nbsp;
          <span data-testid='text'>Members Only</span>
        </span>
      )

      render(
        <Grommet theme={zooTheme} >
          <Tabs>
            <Tab title={<ComplexTitle />}>A tab with a rather complex title (tab header)</Tab>
            <Tab title='bananas'>A banana is a long fruit.</Tab>
          </Tabs>
        </Grommet>
      )
    })

    it('should pass through the `title` prop if it\'s a component', function () {
      const icon = screen.getByTestId('icon')
      const text = screen.getByTestId('text')
      expect(icon).to.exist()
      expect(text).to.exist()
    })

    it('should render the complex title in a way accessible to screen readers', function () {
      const title = screen.getByRole('tab', { name: 'Restricted Section: Members Only' })
      expect(title).to.exist()
    })
  })
})
