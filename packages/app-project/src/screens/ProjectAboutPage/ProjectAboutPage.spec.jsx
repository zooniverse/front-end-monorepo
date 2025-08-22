import { Provider } from 'mobx-react'
import { within } from '@testing-library/dom'
import {
  fireEvent,
  getAllByRole,
  render,
	waitFor,
  screen
} from '@testing-library/react'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import ProjectAboutPageConnector from './ProjectAboutPageConnector'
import { ProjectAboutPage } from './ProjectAboutPage'

describe('Component > ProjectAboutPage & Connector', function () {
  const mockStore = {
    organization: {},
    project: {
      about_pages: [
        {
          id: '1234',
          title: 'Research Case',
          url_key: 'science_case',
          strings: {
            title: 'Research Case',
            content: 'This is content of a science_case page.'
          }
        },
        {
          id: '1234',
          title: 'Results',
          url_key: 'results',
          strings: {
            title: 'Results',
            content: 'This is content of a results page.'
          }
        }
      ],
      avatar: {
        src:
          'https://panoptes-uploads.zooniverse.org/production/project_background/260e68fd-d3ec-4a94-bb32-43ff91d5579a.jpeg'
      },
      background: {
        src:
          'https://panoptes-uploads.zooniverse.org/production/project_background/260e68fd-d3ec-4a94-bb32-43ff91d5579a.jpeg'
      },
      configuration: {
        announcement: ''
      },
      description: 'This is a description',
      inBeta: false,
      strings: {
        display_name: 'Display Name'
      }
    },
    ui: {
      mode: 'light'
    },
    user: {
      isLoggedIn: false,
      personalization: {
        sessionCount: 5
      }
    }
  }

  let routerMock

  before(function () {
    routerMock = {
      asPath: 'projects/foo/bar',
      push: () => {},
      prefetch: () => new Promise((resolve, reject) => {}),
      query: { owner: 'foo', project: 'bar' }
    }
  })


  describe('ProjectAboutPageConnector', function () {
    it('should render without crashing', function () {
      const output = render(
        <RouterContext.Provider value={routerMock}>
          <Provider store={mockStore}>
            <Grommet theme={zooTheme} themeMode='light'>
              <ProjectAboutPageConnector pageType='science_case' />
            </Grommet>
          </Provider>
        </RouterContext.Provider>
      )
      expect(output).to.be.ok()
    })

    it('should pass correct data to ProjectAboutPage depending on pageType', function () {
      render(
        <RouterContext.Provider value={routerMock}>
          <Provider store={mockStore}>
            <Grommet theme={zooTheme} themeMode='light'>
              <ProjectAboutPageConnector pageType='science_case' />
            </Grommet>
          </Provider>
        </RouterContext.Provider>
      )
      const content = screen.getByText(mockStore.project.about_pages[0].strings.content)
      expect(content).to.exist()
      const heading = screen.getByRole('heading', { name: 'About.PageHeading.title.research' })
      expect(heading).to.exist()
    })

    it('should pass default content if a page doesnt exist yet', function () {
      render(
        <RouterContext.Provider value={routerMock}>
          <Provider store={mockStore}>
            <Grommet theme={zooTheme} themeMode='light'>
              <ProjectAboutPageConnector pageType='team' />
            </Grommet>
          </Provider>
        </RouterContext.Provider>
      )
      const heading = screen.getByRole('heading', { name: 'About.PageHeading.title.team' })
      expect(heading).to.exist()
      expect(screen.getByText('No content yet.')).to.exist()
    })

    it('should pass a navLinks array for pages with content', async function () {
      render(
        <RouterContext.Provider value={routerMock}>
          <Provider store={mockStore}>
            <Grommet theme={zooTheme} themeMode='light'>
              <ProjectAboutPageConnector pageType='results' />
            </Grommet>
          </Provider>
        </RouterContext.Provider>
      )
      // AboutDropdown exists because default screen size is smaller than mobile breakpoint
      const dropdown = screen.getByRole('button', { name: 'About.SidebarHeading' })
      expect(dropdown).to.exist()
      fireEvent.click(dropdown)

			await waitFor(() => {
				const navContainer = screen.getAllByRole('navigation', { name: "About.PageNav.title"})
				const links = getAllByRole(navContainer[0], 'link')
				expect(links).to.have.lengthOf(3)
			})
    })
  })

  describe('ProjectAboutPage', function () {
    describe('Team page specific components', function () {
      const aboutTeamPageData = {
        title: 'team',
        strings: {
          title: 'The Team',
          content: 'This is some content.'
        }
      }

      const mockTeamArray = [
        {
          id: 0,
          display_name: 'Mock Name',
          login: 'mock_login1',
          role: 'scientist'
        },
        {
          id: 1,
          display_name: 'Mock Name',
          login: 'mock_login2',
          role: 'owner'
        }
      ]

      it('should render a list of Team Members', function () {
        render(
          <RouterContext.Provider value={routerMock}>
            <Provider store={mockStore}>
              <ProjectAboutPage
                aboutNavLinks={['research', 'team']}
                aboutPageData={aboutTeamPageData}
                teamArray={mockTeamArray}
                theme={{ ...zooTheme, dark: false }}
              />
            </Provider>
          </RouterContext.Provider>
        )
        const teamList = screen.getAllByRole('list', { name: 'List of team members' })
        expect(teamList[0]).to.exist()
        const teamMembers = within(teamList[0]).getAllByText('Mock Name')
        expect(teamMembers).to.have.lengthOf(2)
      })
    })
  })
})
