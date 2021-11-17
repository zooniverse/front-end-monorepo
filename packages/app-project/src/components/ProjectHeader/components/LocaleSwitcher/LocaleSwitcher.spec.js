import { render, fireEvent } from '@testing-library/react'
import * as stories from './LocaleSwitcher.stories'
import * as Router from 'next/router'
import sinon from 'sinon'

describe('Component > LocaleSwitcher', function () {
  const { Default } = stories

  let scrollMock
  let routerMock

  before(function () {
    // Calling window.scrollTo is a side effect of clicking a Grommet Dropbutton
    scrollMock = sinon.stub(window, 'scrollTo').callsFake(() => {})
    routerMock = sinon.stub(Router, 'useRouter').callsFake(() => {
      return {
        asPath: 'projects/foo/bar',
        locale: 'en',
        push: () => {},
        prefetch: () => new Promise((resolve, reject) => {}),
        query: { owner: 'foo', project: 'bar' }
      }
    })
  })

  after(function () {
    scrollMock.restore()
    routerMock.restore()
  })

  it('should render available locales as a dropdown', function () {
    const { getByRole, getByText, getAllByText } = render(<Default />)
    fireEvent.click(getByRole('button'))
    expect(getAllByText('English')).to.exist()
    expect(getByText('Français')).to.exist()
  })
})