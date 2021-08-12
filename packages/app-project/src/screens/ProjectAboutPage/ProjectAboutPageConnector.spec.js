import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import * as Router from 'next/router'
import sinon from 'sinon'
import ProjectAboutPageConnector from './ProjectAboutPageConnector'
import { ProjectAboutPage } from './ProjectAboutPage'

describe.only('Component > ProjectAboutPageConnector', () => {
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

  before(function () {
    routerMock = sinon.stub(Router, 'useRouter').callsFake(() => {
      return {
        asPath: 'projects/foo/bar',
        push: () => {},
        prefetch: () => new Promise((resolve, reject) => {}),
        query: { owner: 'foo', project: 'bar' }
      }
    })
  })

  after(function () {
    routerMock.restore()
  })

  it('should render without crashing', () => {
    const output = render(
      <Provider store={mockStore}>
        <Grommet theme={zooTheme} themeMode='light'>
          <ProjectAboutPageConnector pageType='science_case' />
        </Grommet>
      </Provider>
    )
    expect(output).to.be.ok()
  })

  describe('About pages with content', () => {
    it('should pass correct data to ProjectAboutPage depending on pageType', () => {
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
  })

  describe('About pages without content', () => {
    it('should pass default content if a page doesnt exist yet', () => {
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
  })

  describe('filtering of aboutNavLinks', function () {
    it('should pass a default navLinks array that always includes Research and Team pages', () => {
      // get heading named "About", get its sibling
      // query sibling for links
      const { getAllByText, getByTestId } = render(
        <Provider store={mockStore}>
          <Grommet theme={zooTheme} themeMode='light'>
            <ProjectAboutPageConnector pageType='team' />
          </Grommet>
        </Provider>
      )
      expect(getByTestId('about-dropdown')).to.exist()
    })

    it('should pass a navLink if an about page has content', () => {

    })

    it('should not pass a navLink for a page without content (excluding Research & Team)', () => {

    })
  })
})
