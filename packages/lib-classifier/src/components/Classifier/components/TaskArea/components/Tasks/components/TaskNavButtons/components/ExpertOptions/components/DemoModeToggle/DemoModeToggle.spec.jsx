import { render, screen } from '@testing-library/react'

import DemoModeToggle from './DemoModeToggle'

describe('ExpertOptions > Component > DemoModeToggle', function () {
  before(function () {
    render(<DemoModeToggle />)
  })

  it('should render as a labeled checkbox', function () {
    expect(
      screen.getByRole('checkbox', {
        name: 'TaskArea.Tasks.ExpertOptions.demoToggle'
      })
    ).to.be.ok()
  })
})
