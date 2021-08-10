import * as stories from './AboutSidebar.stories'
import { render } from '@testing-library/react'
import { expect } from 'chai'

describe('Component > AboutSidebar', function () {
  const { Default, MoreLinks } = stories

  it('should always render at least two links: Research and The Team', () => {
    const { getByText } = render(<Default />)
    expect(getByText('research')).to.exist()
    expect(getByText('the team')).to.exist()
  })

  it('should render other links passed in the aboutNavLinks array', () => {
    const { getByText } = render(<MoreLinks />)
    expect(getByText('research')).to.exist()
    expect(getByText('the team')).to.exist()
    expect(getByText('education')).to.exist()
    expect(getByText('faq')).to.exist()
  })
})
