import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'
import { within } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { applySnapshot } from 'mobx-state-tree'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import nock from 'nock'

import initStore from '@stores'
import StandardLayout, { adminBorderImage } from './StandardLayout'

describe('Component > StandardLayout', function () {
  const mockRouter = {
    asPath: '/zooniverse/snapshot-serengeti/about/team',
    basePath: '/projects',
    locale: 'en',
    push() {},
    prefetch: () => new Promise((resolve, reject) => {}),
    query: {
      owner: 'zooniverse',
      project: 'snapshot-serengeti'
    }
  }

  let adminToggle
  let projectPage
  let zooHeader
  let zooFooter

  function withStore(snapshot) {
    const store = initStore(true)
    applySnapshot(store, snapshot)

    return function Wrapper({ children }) {
      return (
        <RouterContext.Provider value={mockRouter}>
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
    render(<StandardLayout />, { wrapper: withStore(snapshot)})
    zooHeader = screen.getByRole('banner')
    zooFooter = screen.getByRole('contentinfo')
    adminToggle = within(zooFooter).queryByRole('checkbox', { name: 'Admin Mode' })
  })

  after(function () {
    nock.cleanAll()
  })

  it('should show the Zooniverse header', function () {
    expect(zooHeader).toBeDefined()
  })

  it('should show the Zooniverse footer', function () {
    expect(zooFooter).toBeDefined()
  })

  it('should not show the admin toggle', function () {
    expect(adminToggle).to.equal(null)
  })

  describe('in beta', function () {
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
      render(<StandardLayout />, { wrapper: withStore(snapshot)})
      projectPage = screen.getByTestId('project-page')
    })

    it('should have a teal border', function () {
      expect(projectPage).toBeDefined()
      const { border } = window.getComputedStyle(projectPage)
      expect(border).to.equal('4px solid rgb(0, 151, 157)') // jsdom returns rbg even though the component uses hex
    })
  })

  describe('launch approved', function () {
    before(function () {
      const snapshot = {
        project: {
          beta_approved: true,
          configuration: {
            languages: ['en']
          },
          launch_approved: true,
          slug: 'Foo/Bar',
          strings: {
            display_name: 'Foobar'
          },
          links: {
            active_workflows: ['1']
          }
        }
      }
      render(<StandardLayout />, { wrapper: withStore(snapshot)})
      projectPage = screen.getByTestId('project-page')
    })

    it('should not have a teal border', function () {
      expect(projectPage).toBeDefined()
      const { border } = window.getComputedStyle(projectPage)
      expect(border).to.equal('')
    })
  })

  describe('with a logged-in admin', function () {
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
      render(<StandardLayout />, { wrapper: withStore(snapshot)})
      zooHeader = screen.getByRole('banner')
      zooFooter = screen.getByRole('contentinfo')
      adminToggle = within(zooFooter).getByRole('checkbox', { name: 'Admin Mode' })
    })

    it('should show the admin toggle', function () {
      expect(adminToggle).toBeDefined()
      expect(adminToggle.checked).to.equal(false)
    })
  })

  describe('in admin mode', function () {
    describe('when the user is loading', function () {
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
            loadingState: asyncStates.loading
          }
        }
        window.localStorage.setItem('adminFlag', true)
        render(<StandardLayout />, { wrapper: withStore(snapshot)})
        projectPage = screen.getByTestId('project-page')
        zooHeader = screen.getByRole('banner')
        zooFooter = screen.getByRole('contentinfo')
        adminToggle = within(zooFooter).queryByRole('checkbox', { name: 'Admin Mode' })
      })

      after(function () {
        window.localStorage.removeItem('adminFlag')
      })

      it('should not have a striped border', function () {
        expect(projectPage).toBeDefined()
        const borderImage = window.getComputedStyle(projectPage)['border-image']
        expect(borderImage).to.equal('')
      })

      it('should not show the admin toggle in the footer', function () {
        expect(adminToggle).toBeNull()
      })

      it('should preserve the stored adminFlag', function () {
        expect(window.localStorage.getItem('adminFlag')).to.equal('true')
      })
    })

    describe('when the user has loaded', function () {
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
            login: 'zooVolunteer',
            loadingState: asyncStates.success
          }
        }
        window.localStorage.setItem('adminFlag', true)
        render(<StandardLayout />, { wrapper: withStore(snapshot)})
        projectPage = screen.getByTestId('project-page')
        zooHeader = screen.getByRole('banner')
        zooFooter = screen.getByRole('contentinfo')
        adminToggle = within(zooFooter).getByRole('checkbox', { name: 'Admin Mode' })
      })

      after(function () {
        window.localStorage.removeItem('adminFlag')
      })

      it('should have a striped border', function () {
        expect(projectPage).toBeDefined()
        const borderImage = window.getComputedStyle(projectPage)['border-image']
        expect(borderImage).to.equal(adminBorderImage)
      })

      it('should show the admin toggle in the footer', function () {
        expect(adminToggle).toBeDefined()
        expect(adminToggle.checked).to.equal(true)
      })
    })
  })

  describe('use in project homepage', function () {
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
        user: {}
      }
      render(<StandardLayout page='home' />, { wrapper: withStore(snapshot)})
      projectPage = screen.getByTestId('project-page')
      zooHeader = screen.queryByRole('banner') // banner role is the <header> element
    })

    it('should not render the header components', function () {
      expect(zooHeader).to.equal(null)
    })
  })
})
