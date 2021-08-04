import { render, fireEvent } from '@testing-library/react'
import * as stories from './AboutDropdownNav.stories'

describe('Component > AboutDropdownNav', () => {
  const { Default, MoreLinks } = stories

  it('should always render at least two links: Research and The Team', () => {
    window.scrollTo = () => {} // this a side effect behavior of clicking a Grommet DropButton
    const { getByRole, getAllByRole } = render(<Default />)
    fireEvent.click(getByRole('button'))
    const links = getAllByRole('link')
    expect(links).to.have.lengthOf(2)
  })

  it('should render other links passed in the aboutNavLinks array', () => {
    const { getByRole, getAllByRole } = render(<MoreLinks />)
    fireEvent.click(getByRole('button'))
    const links = getAllByRole('link')
    expect(links).to.have.lengthOf(4)
  })
})
