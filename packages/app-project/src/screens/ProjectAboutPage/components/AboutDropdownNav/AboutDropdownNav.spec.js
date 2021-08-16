import { render, fireEvent } from '@testing-library/react'
import * as stories from './AboutDropdownNav.stories'
import sinon from 'sinon'

describe('Component > AboutDropdownNav', function () {
  const { Default, MoreLinks } = stories

  let scrollMock

  before(function () {
    // Calling window.scrollTo is a side effect of clicking a Grommet Dropbutton
    scrollMock = sinon.stub(window, 'scrollTo').callsFake(() => {})
  })

  after(function () {
    scrollMock.restore()
  })

  it('should always render at least two links: Research and The Team', function () {
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
