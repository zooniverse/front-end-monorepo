import * as stories from './AboutSidebar.stories'
import { render } from '@testing-library/react'

describe('Component > AboutSidebar', function () {
  const { Default, MoreLinks } = stories

  it('should always render at least two links: Research and The Team', () => {
    const { getAllByRole } = render(<Default />)
    const links = getAllByRole('link')
    expect(links).to.have.lengthOf(2)
  })

  it('should render other links passed in the aboutNavLinks array', () => {
    const { getAllByRole } = render(<MoreLinks />)
    const links = getAllByRole('link')
    expect(links).to.have.lengthOf(4)
  })
})
