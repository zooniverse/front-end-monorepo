import * as stories from './AboutSidebar.stories'
import { render } from '@testing-library/react'

describe('Component > AboutSidebar', function () {
  const { Default, MoreLinks } = stories

  it('should always render at least two links: Research and The Team', function () {
    const { getAllByRole, getByText } = render(<Default />)
    const links = getAllByRole('link')
    expect(links).to.have.lengthOf(2)
    expect(getByText('About.PageHeading.title.research')).exists()
    expect(getByText('About.PageHeading.title.team')).exists()
  })

  it('should render other links passed in the aboutNavLinks array', function () {
    const { getAllByRole, getByText } = render(<MoreLinks />)
    const links = getAllByRole('link')
    expect(links).to.have.lengthOf(4)
    expect(getByText('About.PageHeading.title.education')).exists()
    expect(getByText('About.PageHeading.title.faq')).exists()
  })
})
