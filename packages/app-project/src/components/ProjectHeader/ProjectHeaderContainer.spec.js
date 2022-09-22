import zooTheme from '@zooniverse/grommet-theme'
import { within } from '@testing-library/dom'
import { render, screen } from '@testing-library/react'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { applySnapshot } from 'mobx-state-tree'

import initStore from '@stores'
import { ProjectHeaderContainer } from './ProjectHeaderContainer.js'

describe('Component > ProjectHeaderContainer', function () {
  let projectHeader

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

  const PROJECT_DISPLAY_NAME = 'Foobar'

  before(function () {
    const snapshot = {
      project: {
        configuration: {
          languages: ['en']
        },
        slug: 'Foo/Bar',
        strings: {
          display_name: PROJECT_DISPLAY_NAME
        },
        links: {
          active_workflows: ['1']
        }
      }
    }
    render(<ProjectHeaderContainer />, { wrapper: withStore(snapshot)})
    projectHeader = screen.getByRole('banner')
  })

  it('should render the `ProjectHeader` component', function () {
    expect(projectHeader).to.be.ok()
  })

  it('should display the project title', function () {
    const title = within(projectHeader).getByRole('heading', { level: 1, name: PROJECT_DISPLAY_NAME })
    expect(title).to.be.ok()
  })

  describe('when not logged in', function () {
    it('should pass down the default nav links', function () {
      const navMenu = within(projectHeader).getByRole('navigation', { name: 'ProjectHeader.ProjectNav.ariaLabel' })
      const navLinks = within(navMenu).getAllByRole('link')
      expect(navLinks.length).to.be.above(0)
      expect(navLinks[0].href).to.equal('https://localhost/Foo/Bar/about/research')
      expect(navLinks[navLinks.length - 1].href).to.equal(
        'https://localhost/Foo/Bar/collections'
      )
    })
  })

  describe('when logged in', function () {
    it('should pass nav links including recents', function () {
      const snapshot = {
        project: {
          configuration: {
            languages: ['en']
          },
          slug: 'Foo/Bar',
          strings: {
            display_name: PROJECT_DISPLAY_NAME
          },
          links: {
            active_workflows: ['1']
          }
        },
        user: {
          id: '1',
          login: 'zooVolunteer'
        }
      }
      render(<ProjectHeaderContainer />, { wrapper: withStore(snapshot)})
      const projectHeader = screen.getByRole('banner')
      const navMenu = within(projectHeader).getByRole('navigation', { name: 'ProjectHeader.ProjectNav.ariaLabel' })
      const navLinks = within(navMenu).getAllByRole('link')

      expect(navLinks.length).to.be.above(0)
      expect(navLinks[navLinks.length - 1].href).to.equal('https://localhost/Foo/Bar/recents')
    })
  })

  describe('in admin mode', function () {
    it('should show the admin page link', function () {
      const snapshot = {
        project: {
          configuration: {
            languages: ['en']
          },
          slug: 'Foo/Bar',
          strings: {
            display_name: PROJECT_DISPLAY_NAME
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
      render(<ProjectHeaderContainer adminMode />, { wrapper: withStore(snapshot)})
      const projectHeader = screen.getByRole('banner')
      const navMenu = within(projectHeader).getByRole('navigation', { name: 'ProjectHeader.ProjectNav.ariaLabel' })
      const navLinks = within(navMenu).getAllByRole('link')

      expect(navLinks.length).to.be.above(0)
      expect(navLinks[navLinks.length - 1].href).to.equal('https://localhost/admin/project_status/Foo/Bar')
    })
  })

  describe('with a default workflow', function () {
    it('should pass a workflow-specific classify link', function () {
      const snapshot = {
        project: {
          configuration: {
            languages: ['en']
          },
          slug: 'Foo/Bar',
          strings: {
            display_name: PROJECT_DISPLAY_NAME
          },
          links: {
            active_workflows: ['1234']
          }
        },
        user: {
          id: '1',
          login: 'zooVolunteer'
        }
      }
      render(<ProjectHeaderContainer />, { wrapper: withStore(snapshot)})
      const projectHeader = screen.getByRole('banner')
      const navMenu = within(projectHeader).getByRole('navigation', { name: 'ProjectHeader.ProjectNav.ariaLabel' })
      const navLinks = within(navMenu).getAllByRole('link')

      expect(navLinks.length).to.be.above(0)
      expect(navLinks[1].href).to.equal('https://localhost/Foo/Bar/classify/workflow/1234')
    })
  })
})
