import zooTheme from '@zooniverse/grommet-theme'
import { within } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { applySnapshot } from 'mobx-state-tree'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import initStore from '@stores'
import ProjectHomePage from './ProjectHomePage.js'

describe('Component > ProjectHomePage', function () {
  this.timeout(5000)

  let homePage
  let adminToggle

  const routerMock = {
    asPath: 'projects/foo/bar',
    push: () => {},
    prefetch: () => new Promise((resolve, reject) => {}),
    query: { owner: 'foo', project: 'bar' }
  }

  function withStore(snapshot) {
    const store = initStore(false)
    applySnapshot(store, snapshot)

    return function Wrapper({ children }) {
      return (
        <RouterContext.Provider value={routerMock}>
          <Grommet theme={zooTheme}>
            <Provider store={store}>
              {children}
            </Provider>
          </Grommet>
        </RouterContext.Provider>
      )
    }
  }

  before(function () {
    const snapshot = {
      project: {
        configuration: {
          languages: ['en']
        },
        slug: 'Foo/Bar',
        strings: {
          display_name: 'Foobar'
        },
        links: {
          active_workflows: ['1']
        }
      }
    }
    render(<ProjectHomePage />, { wrapper: withStore(snapshot) })
    homePage = screen.getByTestId('project-home-page')
    const zooFooter = within(homePage).getByRole('contentinfo')
    adminToggle = within(zooFooter).queryByRole('checkbox', { name: 'Admin Mode' })
  })

  it('should not render a border for the wrapping Box container', function () {
    expect(homePage).to.be.ok()
    const { border } = window.getComputedStyle(homePage)
    expect(border).to.be.empty()
  })

  it('should not show the admin toggle', function () {
    expect(adminToggle).to.be.null()
  })

  describe('with a project in beta', function () {
    before(function () {
      const snapshot = {
        project: {
          configuration: {
            languages: ['en']
          },
          slug: 'Foo/Bar',
          strings: {
            display_name: 'Foobar'
          },
          links: {
            active_workflows: ['1']
          }
        }
      }
      render(<ProjectHomePage inBeta />, { wrapper: withStore(snapshot) })
      homePage = screen.getByTestId('project-home-page')
    })

    it('should render a border for the wrapping Box container', function () {
      expect(homePage).to.be.ok()
      const { border } = window.getComputedStyle(homePage)
      expect(border).to.equal('4px solid #00979d')
    })
  })

  describe('with a logged-in admin user', function () {
    before(function () {
      const snapshot = {
        project: {
          configuration: {
            languages: ['en']
          },
          slug: 'Foo/Bar',
          strings: {
            display_name: 'Foobar'
          },
          links: {
            active_workflows: ['1']
          }
        },
        user: {
          id: '1',
          admin: true,
          login: 'zooVolunteer'
        }
      }
      render(<ProjectHomePage />, { wrapper: withStore(snapshot) })
      homePage = screen.getByTestId('project-home-page')
      const zooFooter = within(homePage).getByRole('contentinfo')
      adminToggle = within(zooFooter).getByRole('checkbox', { name: 'Admin Mode' })
    })

    // TODO: add a border to pages in admin mode.
    it('should not have a border', function () {
      expect(homePage).to.be.ok()
      const { border } = window.getComputedStyle(homePage)
      expect(border).to.be.empty()
    })

    it('should show the admin toggle in the footer', function () {
      expect(adminToggle).to.be.ok()
    })
  })
})