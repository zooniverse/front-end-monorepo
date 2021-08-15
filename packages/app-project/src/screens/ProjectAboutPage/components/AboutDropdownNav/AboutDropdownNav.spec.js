import { render, fireEvent } from '@testing-library/react'
import * as stories from './AboutDropdownNav.stories'

describe('Component > AboutDropdownNav', function () {
  const { Default, MoreLinks } = stories

  it('should always render at least two links: Research and The Team', function () {
    window.scrollTo = () => {} // this a side effect behavior of clicking a Grommet DropButton
    const { getByRole, getByText } = render(<Default />)
    fireEvent.click(getByRole('button'))
    expect(getByText('research')).to.exist()
    expect(getByText('the team')).to.exist()
  })

  it('should render other links passed in the aboutNavLinks array', function () {
    const { getByRole, getByText } = render(<MoreLinks />)
    fireEvent.click(getByRole('button'))
    expect(getByText('research')).to.exist()
    expect(getByText('the team')).to.exist()
    expect(getByText('education')).to.exist()
    expect(getByText('faq')).to.exist()
  })
})
