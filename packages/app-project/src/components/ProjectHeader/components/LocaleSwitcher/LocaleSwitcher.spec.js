import { render, fireEvent } from '@testing-library/react'
import * as stories from './LocaleSwitcher.stories'
import sinon from 'sinon'

describe('Component > LocaleSwitcher', function () {
  const { Default } = stories

  let scrollMock

  before(function () {
    // Calling window.scrollTo is a side effect of clicking a Grommet Dropbutton
    scrollMock = sinon.stub(window, 'scrollTo').callsFake(() => {})
  })

  after(function () {
    scrollMock.restore()
  })

  it('should render available locales as a dropdown', function () {
    const { getByRole, getByText, getAllByText } = render(<Default />)
    fireEvent.click(getByRole('button'))
    expect(getAllByText('English')).to.exist()
    expect(getByText('Français')).to.exist()
  })
})