import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './Tooltip.stories'

describe('Component > Tooltip', function () {
  const user = userEvent.setup({ delay: null })
  const { Default } = composeStories(stories)

  beforeEach(function () {
    render(<Default />)
  })

  it('should show the element without a tooltip by default', function () {
    expect(screen.queryByText(Default.args.btnLabel)).toBeDefined()
    expect(screen.queryByText(Default.args.label)).to.equal(null)
  })

  it('should show the tooltip when the pointer hovers over the element', async function () {
    await user.hover(screen.queryByText(Default.args.btnLabel))
    expect(screen.queryByText(Default.args.label)).toBeDefined()
  })

  it('should show the tooltip when the user tab-navigates to the element', async function () {
    await user.tab()
    expect(screen.queryByText(Default.args.label)).toBeDefined()
  })

  it('should show the tooltip when the the element has focus for whatever reason', function () {
    screen.queryByText(Default.args.btnLabel).focus()
    expect(screen.queryByText(Default.args.label)).toBeDefined()
  })

  it('should hide the tooltip when the user clicks the element', async function () {
    await user.hover(screen.queryByText(Default.args.btnLabel))
    expect(screen.queryByText(Default.args.label)).toBeDefined()

    await user.click(screen.queryByText(Default.args.btnLabel))
    expect(screen.queryByText(Default.args.label)).to.equal(null)
  })
})
