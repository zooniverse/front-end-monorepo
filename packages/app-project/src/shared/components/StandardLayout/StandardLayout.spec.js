import zooTheme from '@zooniverse/grommet-theme'
import { within } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { applySnapshot } from 'mobx-state-tree'

import initStore from '@stores'
import StandardLayout, { adminBorderImage } from './StandardLayout.js'

describe('Component > StandardLayout', function () {
  let adminToggle
  let projectPage
  let zooHeader
  let zooFooter

  function withStore(snapshot) {
    const store = initStore(false)
    applySnapshot(store, snapshot)

    return function Wrapper({ children }) {
      return (
        <Grommet theme={zooTheme}>
          <Provider store={store}>
            {children}
          </Provider>
        </Grommet>
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
    render(<StandardLayout />, { wrapper: withStore(snapshot)})
    zooHeader = screen.getByRole('banner')
    zooFooter = screen.getByRole('contentinfo')
    adminToggle = within(zooFooter).queryByRole('checkbox', { name: 'Admin Mode' })
  })

  it('should show the Zooniverse header', function () {
    expect(zooHeader).to.be.ok()
  })

  it('should show the Zooniverse footer', function () {
    expect(zooFooter).to.be.ok()
  })

  it('should not show the admin toggle', function () {
    expect(adminToggle).to.be.null()
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
      expect(projectPage).to.be.ok()
      const borderImage = window.getComputedStyle(projectPage)['border-image']
      expect(borderImage).to.equal(adminBorderImage)
    })

    it('should show the admin toggle in the footer', function () {
      expect(adminToggle).to.be.ok()
      expect(adminToggle.checked).to.be.true()
    })
  })
})
