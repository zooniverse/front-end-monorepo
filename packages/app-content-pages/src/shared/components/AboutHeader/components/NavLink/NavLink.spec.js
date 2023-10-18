import { render } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import Router from 'next/router'

import NavLink from './NavLink'

const HREF = '/baz'
const LABEL = 'Foobar'

function RouterMock({ children }) {
  const mockRouter = {
    locale: 'en',
    push: () => {},
    prefetch: () => new Promise((resolve, reject) => {}),
    query: {}
  }

  Router.router = mockRouter

  return (
    <RouterContext.Provider value={mockRouter}>
      {children}
    </RouterContext.Provider>
  )
}

describe('Component > NavLink', function () {
  before(function () {
    render(
      <RouterMock>
        <NavLink href={HREF} label={LABEL} />
      </RouterMock>
    )
  })

  it('should correctly set the label and href', function () {
    expect(document.querySelector('a').firstChild.textContent).to.equal(LABEL)
    expect(document.querySelector('a').href).to.include(HREF)
  })
})
