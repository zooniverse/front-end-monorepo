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
    it('should should pass through the `title` prop if it\'s a component', function () {
      const ComplexTitle = () => (
        <div>
          <Key size='small' />
          &nbsp;
          <b data-testid="b-tag">Special</b>
        </div>
      )

      render(
        <Grommet theme={zooTheme} >
          <Tabs>
            <Tab title={<ComplexTitle />}>A tab with a rather complex title (tab header)</Tab>
            <Tab title='bananas'>A banana is a long fruit.</Tab>
          </Tabs>
        </Grommet>
      )

      const keySvg = screen.getByLabelText('Key')
      const bTag = screen.getByTestId('b-tag')
      expect(keySvg).to.exist()
      expect(bTag).to.exist()
    })
  })
})
