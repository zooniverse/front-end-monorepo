import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Meta, { TwoLayers, FiveLayers, SingleLayer, NoLayers } from './LayerControl.stories'

const TwoLayersStory = composeStory(TwoLayers, Meta)
const FiveLayersStory = composeStory(FiveLayers, Meta)
const SingleLayerStory = composeStory(SingleLayer, Meta)
const NoLayersStory = composeStory(NoLayers, Meta)

describe('Component > LayerControl', function () {
  describe('with 0 or 1 layers', function () {
    it('renders nothing for an empty layers array', function () {
      const { container } = render(<NoLayersStory />)
      expect(container.querySelector('[role="tablist"]')).to.equal(null)
    })

    it('renders nothing for a single layer (no switching needed)', function () {
      const { container } = render(<SingleLayerStory />)
      expect(container.querySelector('[role="tablist"]')).to.equal(null)
    })
  })

  describe('with multiple layers', function () {
    it('renders one tab per layer inside a role="tablist"', function () {
      render(<TwoLayersStory />)
      const tablist = screen.getByRole('tablist')
      const tabs = tablist.querySelectorAll('[role="tab"]')
      expect(tabs.length).to.equal(2)
    })

    it('shows each layer label as the tab text', function () {
      render(<TwoLayersStory />)
      expect(screen.getByRole('tab', { name: 'OpenStreetMap' })).to.exist
      expect(screen.getByRole('tab', { name: '2023 imagery' })).to.exist
    })

    it('marks the active tab with aria-selected="true" and the rest with "false"', function () {
      render(<TwoLayersStory />)
      const active = screen.getByRole('tab', { name: 'OpenStreetMap' })
      const inactive = screen.getByRole('tab', { name: '2023 imagery' })
      expect(active.getAttribute('aria-selected')).to.equal('true')
      expect(inactive.getAttribute('aria-selected')).to.equal('false')
    })

    it('calls onChange with the new index when a tab is clicked', async function () {
      let captured = null
      const args = {
        ...TwoLayers.args,
        onChange: (idx) => { captured = idx }
      }
      const Story = composeStory({ ...TwoLayers, args }, Meta)
      const user = userEvent.setup()
      render(<Story />)
      await user.click(screen.getByRole('tab', { name: '2023 imagery' }))
      expect(captured).to.equal(1)
    })

    it('marks the tablist as vertically oriented', function () {
      render(<TwoLayersStory />)
      expect(screen.getByRole('tablist').getAttribute('aria-orientation')).to.equal('vertical')
    })

    it('cycles activeIndex with ArrowDown on the tablist', async function () {
      let captured = null
      const args = {
        ...TwoLayers.args,
        onChange: (idx) => { captured = idx }
      }
      const Story = composeStory({ ...TwoLayers, args }, Meta)
      const user = userEvent.setup()
      render(<Story />)
      const activeTab = screen.getByRole('tab', { name: 'OpenStreetMap' })
      activeTab.focus()
      await user.keyboard('{ArrowDown}')
      expect(captured).to.equal(1)
    })

    it('cycles activeIndex with ArrowUp on the tablist (wraps to end)', async function () {
      let captured = null
      const args = {
        ...TwoLayers.args,
        onChange: (idx) => { captured = idx }
      }
      const Story = composeStory({ ...TwoLayers, args }, Meta)
      const user = userEvent.setup()
      render(<Story />)
      const activeTab = screen.getByRole('tab', { name: 'OpenStreetMap' })
      activeTab.focus()
      await user.keyboard('{ArrowUp}')
      expect(captured).to.equal(1) // wraps to last index
    })

    it('cycles activeIndex with ArrowRight on the tablist', async function () {
      let captured = null
      const args = {
        ...TwoLayers.args,
        onChange: (idx) => { captured = idx }
      }
      const Story = composeStory({ ...TwoLayers, args }, Meta)
      const user = userEvent.setup()
      render(<Story />)
      const activeTab = screen.getByRole('tab', { name: 'OpenStreetMap' })
      activeTab.focus()
      await user.keyboard('{ArrowRight}')
      expect(captured).to.equal(1)
    })

    it('cycles activeIndex with ArrowLeft on the tablist (wraps to end)', async function () {
      let captured = null
      const args = {
        ...TwoLayers.args,
        onChange: (idx) => { captured = idx }
      }
      const Story = composeStory({ ...TwoLayers, args }, Meta)
      const user = userEvent.setup()
      render(<Story />)
      const activeTab = screen.getByRole('tab', { name: 'OpenStreetMap' })
      activeTab.focus()
      await user.keyboard('{ArrowLeft}')
      expect(captured).to.equal(1) // wraps to last index
    })

    it('renders many layers as tabs', function () {
      render(<FiveLayersStory />)
      const tablist = screen.getByRole('tablist')
      expect(tablist.querySelectorAll('[role="tab"]').length).to.equal(5)
      const active = tablist.querySelector('[aria-selected="true"]')
      expect(active.textContent).to.equal('2021')
    })
  })
})
