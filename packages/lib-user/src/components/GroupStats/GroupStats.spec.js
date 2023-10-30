import { render, screen } from '@testing-library/react'

import GroupStats from './GroupStats.js'

describe('GroupStats', () => {
  it('shows a GroupStats component', () => {
    render(<GroupStats groupID='1234' />)
    expect(screen.getByText('Hi group with ID 1234! 🙌')).to.be.ok()
  })
})
