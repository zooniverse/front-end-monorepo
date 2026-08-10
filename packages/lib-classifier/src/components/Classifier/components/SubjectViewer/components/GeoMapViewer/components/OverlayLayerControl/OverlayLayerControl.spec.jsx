import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Meta, {
  TwoOverlays,
  PartiallyHidden,
  SingleOverlay,
  NoOverlays
} from './OverlayLayerControl.stories'

const TwoStory = composeStory(TwoOverlays, Meta)
const PartiallyHiddenStory = composeStory(PartiallyHidden, Meta)
const SingleStory = composeStory(SingleOverlay, Meta)
const NoneStory = composeStory(NoOverlays, Meta)

describe('Component > OverlayLayerControl', function () {
  describe('with 0 overlays', function () {
    it('renders nothing when overlays is empty', function () {
      const { container } = render(<NoneStory />)
      expect(container.querySelector('[role="group"]')).to.equal(null)
      expect(container.querySelectorAll('input[type="checkbox"]').length).to.equal(0)
    })
  })

  describe('with one or more overlays', function () {
    it('renders one checkbox per overlay descriptor', function () {
      render(<TwoStory />)
      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes.length).to.equal(2)
    })

    it('renders even a single overlay (unlike LayerControl which hides for <2)', function () {
      render(<SingleStory />)
      expect(screen.getAllByRole('checkbox').length).to.equal(1)
    })

    it('labels each checkbox with the descriptor label', function () {
      render(<TwoStory />)
      expect(screen.getByRole('checkbox', { name: /NHD Hydrography/i })).to.exist
      expect(screen.getByRole('checkbox', { name: /County boundaries/i })).to.exist
    })

    it('reflects the supplied visibility array on each checkbox', function () {
      render(<PartiallyHiddenStory />)
      const nhd = screen.getByRole('checkbox', { name: /NHD Hydrography/i })
      const counties = screen.getByRole('checkbox', { name: /County boundaries/i })
      const huc = screen.getByRole('checkbox', { name: /Watersheds/i })
      expect(nhd.checked).to.equal(true)
      expect(counties.checked).to.equal(false)
      expect(huc.checked).to.equal(true)
    })

    it('calls onToggle(index, false) when a checked overlay is unchecked', async function () {
      const calls = []
      const args = {
        ...TwoOverlays.args,
        onToggle: (idx, visible) => { calls.push({ idx, visible }) }
      }
      const Story = composeStory({ ...TwoOverlays, args }, Meta)
      const user = userEvent.setup()
      render(<Story />)
      await user.click(screen.getByRole('checkbox', { name: /County boundaries/i }))
      expect(calls).to.deep.equal([{ idx: 1, visible: false }])
    })

    it('calls onToggle(index, true) when an unchecked overlay is checked', async function () {
      const calls = []
      const args = {
        ...PartiallyHidden.args,
        onToggle: (idx, visible) => { calls.push({ idx, visible }) }
      }
      const Story = composeStory({ ...PartiallyHidden, args }, Meta)
      const user = userEvent.setup()
      render(<Story />)
      await user.click(screen.getByRole('checkbox', { name: /County boundaries/i }))
      expect(calls).to.deep.equal([{ idx: 1, visible: true }])
    })

    it('renders an accessible group label', function () {
      render(<TwoStory />)
      const group = screen.getByRole('group', { name: /overlay/i })
      expect(group).to.exist
    })
  })
})
