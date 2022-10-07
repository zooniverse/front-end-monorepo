import zooTheme from '@zooniverse/grommet-theme'
import { within } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { applySnapshot } from 'mobx-state-tree'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import nock from 'nock'

import initStore from '@stores'
import ProjectHomePage, { adminBorderImage } from './ProjectHomePage.js'

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
    nock('https://talk-staging.zooniverse.org')
    .persist()
    .get('/notifications')
    .query(true)
    .reply(200, {})
    .get('/conversations')
    .query(true)
    .reply(200, {})
    // TODO: Recent Talk subjects are using the Panoptes client instead of the Talk API client.
    nock('https://panoptes-staging.zooniverse.org/api')
    .persist()
    .get('/comments')
    .query(true)
    .reply(200, { comments: [] })
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

  after(function () {
    nock.cleanAll()
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
          beta_approved: true,
          configuration: {
            languages: ['en']
          },
          launch_approved: false,
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

    it('should not have a border', function () {
      expect(homePage).to.be.ok()
      const { border } = window.getComputedStyle(homePage)
      expect(border).to.be.empty()
    })

    it('should show the admin toggle in the footer', function () {
      expect(adminToggle).to.be.ok()
      expect(adminToggle.checked).to.be.false()
    })
  })

  describe('in admin mode', function () {
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
      window.localStorage.setItem('adminFlag', true)
      render(<ProjectHomePage />, { wrapper: withStore(snapshot) })
      homePage = screen.getByTestId('project-home-page')
      const zooFooter = within(homePage).getByRole('contentinfo')
      adminToggle = within(zooFooter).getByRole('checkbox', { name: 'Admin Mode' })
    })

    after(function () {
      window.localStorage.removeItem('adminFlag')
    })

    it('should have a striped border', function () {
      expect(homePage).to.be.ok()
      const borderImage = window.getComputedStyle(homePage)['border-image']
      expect(borderImage).to.equal(adminBorderImage)
    })

    it('should show the admin toggle in the footer', function () {
      expect(adminToggle).to.be.ok()
      expect(adminToggle.checked).to.be.true()
    })
  })
})