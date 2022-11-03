import { render, fireEvent } from '@testing-library/react'
import * as stories from './AboutDropdownNav.stories'

describe('Component > AboutDropdownNav', function () {
  const { Default, MoreLinks } = stories

  it('should always render at least two links: Research and The Team', function () {
    const { getByRole, getAllByRole, getByText } = render(<Default />)
    fireEvent.click(getByRole('button'))
    const links = getAllByRole('link')
    expect(links).to.have.lengthOf(2)
    expect(getByText('About.PageHeading.title.research')).exists()
    expect(getByText('About.PageHeading.title.team')).exists()
  })

  it('should render other links passed in the aboutNavLinks array', function () {
    const { getByRole, getAllByRole, getByText } = render(<MoreLinks />)
    fireEvent.click(getByRole('button'))
    const links = getAllByRole('link')
    expect(links).to.have.lengthOf(4)
    expect(getByText('About.PageHeading.title.education')).exists()
    expect(getByText('About.PageHeading.title.faq')).exists()
  })
})
