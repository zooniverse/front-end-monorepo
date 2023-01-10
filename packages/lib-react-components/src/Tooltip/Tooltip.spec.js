import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Tooltip from './Tooltip'
import { Button } from 'grommet'

describe('Component > Tooltip', function () {
  beforeEach(function () {
    render(
      <Tooltip label='Click this button to open the help menu'>
        <Button label='Help Menu' onClick={() => { console.log('BEEP BOOP') }} />
      </Tooltip>
    )
  })

  it('should render without crashing', function () {
    expect(screen).to.be.ok()
  })

  it('should show the element without a tooltip by default', function () {
    expect(screen.queryByText('Help Menu')).to.exist()
    expect(screen.queryByText('Click this button to open the help menu')).to.not.exist()
  })

  it('should show the tooltip when the pointer hovers over the element', async function () {
    const user = userEvent.setup({ delay: null })

    await user.hover(screen.queryByText('Help Menu'))
    expect(screen.queryByText('Click this button to open the help menu')).to.exist()
  })

  it('should show the tooltip when the user tab-navigates to the element', async function () {
    const user = userEvent.setup({ delay: null })

    await user.tab()
    expect(screen.queryByText('Click this button to open the help menu')).to.exist()
  })

  it('should show the tooltip when the the element has focus', function () {
    screen.queryByText('Help Menu').focus()
    expect(screen.queryByText('Click this button to open the help menu')).to.exist()
  })
})
