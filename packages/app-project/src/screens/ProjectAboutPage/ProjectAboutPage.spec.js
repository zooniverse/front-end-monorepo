import { Provider } from 'mobx-react'
import {
  fireEvent,
  getAllByRole,
  getAllByText,
  getByText,
  render
} from '@testing-library/react'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import * as Router from 'next/router'
import sinon from 'sinon'
import ProjectAboutPageConnector from './ProjectAboutPageConnector'
import { ProjectAboutPage } from './ProjectAboutPage'

describe('Component > ProjectAboutPage & Connector', function () {
  const mockStore = {
    project: {
      about_pages: [
        {
          id: '1234',
          title: 'Research Case',
          url_key: 'science_case',
          content: 'This is content of a science_case page.'
        },
        {
          id: '1234',
          title: 'Results',
          url_key: 'results',
          content: 'This is content of a results page.'
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
      display_name: 'Display Name',
      inBeta: false
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
  let scrollMock

  before(function () {
    routerMock = sinon.stub(Router, 'useRouter').callsFake(() => {
      return {
        asPath: 'projects/foo/bar',
        push: () => {},
        prefetch: () => new Promise((resolve, reject) => {}),
        query: { owner: 'foo', project: 'bar' }
      }
    })
    // Calling window.scrollTo is a side effect of clicking a Grommet Dropbutton
    scrollMock = sinon.stub(window, 'scrollTo').callsFake(() => {})
  })

  after(function () {
    routerMock.restore()
    scrollMock.restore()
  })

  describe('ProjectAboutPageConnector', function () {
    it('should render without crashing', function () {
      const output = render(
        <Provider store={mockStore}>
          <Grommet theme={zooTheme} themeMode='light'>
            <ProjectAboutPageConnector pageType='science_case' />
          </Grommet>
        </Provider>
      )
      expect(output).to.be.ok()
    })

    it('should pass correct data to ProjectAboutPage depending on pageType', function () {
      const { getByText, getByRole, queryByRole } = render(
        <Provider store={mockStore}>
          <Grommet theme={zooTheme} themeMode='light'>
            <ProjectAboutPageConnector pageType='science_case' />
          </Grommet>
        </Provider>
      )
      const content = getByText(mockStore.project.about_pages[0].content)
      expect(content).to.exist()

      expect(getByRole('heading', { name: 'Research' })).to.exist()
      expect(queryByRole('heading', { name: 'Research Case' })).to.not.exist()
    })

    it('should pass default content if a page doesnt exist yet', function () {
      const { getByText, getByRole } = render(
        <Provider store={mockStore}>
          <Grommet theme={zooTheme} themeMode='light'>
            <ProjectAboutPageConnector pageType='team' />
          </Grommet>
        </Provider>
      )
      expect(getByRole('heading', { name: 'The Team' })).to.exist()
      expect(getByText('No content yet.')).to.exist()
    })

    it('should pass a navLinks array for pages with content (always Research and Team)', function () {
      const { getByTestId } = render(
        <Provider store={mockStore}>
          <Grommet theme={zooTheme} themeMode='light'>
            <ProjectAboutPageConnector pageType='team' />
          </Grommet>
        </Provider>
      )
      // AboutDropdown exists because default screen size is small
      const dropdown = getByTestId('about-pages-dropdown')
      expect(dropdown).to.exist()
      fireEvent.click(dropdown)
      const navContainer = getByTestId('mobile-about-pages-nav')
      const links = getAllByRole(navContainer, 'link')
      expect(links).to.have.lengthOf(3)
      expect(getByText(navContainer, 'research')).to.exist()
      expect(getByText(navContainer, 'the team')).to.exist()
      expect(getByText(navContainer, 'results')).to.exist()
    })
  })

  describe('ProjectAboutPage', function () {
    const aboutPageData = {
      title: 'Title',
      content: 'This is some content.'
    }

    it('should render the dropdown nav on mobile screen sizes', function () {
      const { getByTestId, queryByTestId } = render(
        <Provider store={mockStore}>
          <ProjectAboutPage
            aboutNavLinks={[]}
            aboutPageData={aboutPageData}
            screenSize='small'
            theme={{ ...zooTheme, dark: false }}
          />
        </Provider>
      )
      expect(getByTestId('about-pages-dropdown')).to.exist()
      expect(queryByTestId('about-sidebar')).to.not.exist()
    })

    it('should render the sidebar nav on desktop screen sizes', function () {
      const { getByTestId, queryByTestId } = render(
        <Provider store={mockStore}>
          <ProjectAboutPage
            aboutNavLinks={[]}
            aboutPageData={aboutPageData}
            screenSize='medium'
            theme={{ ...zooTheme, dark: false }}
          />
        </Provider>
      )
      expect(queryByTestId('about-pages-dropdown')).to.not.exist()
      expect(getByTestId('about-sidebar')).to.exist()
    })

    describe('Team page specific components', function () {
      const aboutTeamPageData = {
        title: 'team',
        content: 'This is some content.'
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
        const { getByTestId } = render(
          <Provider store={mockStore}>
            <ProjectAboutPage
              aboutNavLinks={[]}
              aboutPageData={aboutTeamPageData}
              screenSize='medium'
              teamArray={mockTeamArray}
              theme={{ ...zooTheme, dark: false }}
            />
          </Provider>
        )
        const teamList = getByTestId('about-team-members-list')
        expect(teamList).to.exist()
        const teamMembers = getAllByText(teamList, 'Mock Name')
        expect(teamMembers).to.have.lengthOf(2)
      })
    })
  })
})
