import React, { Component } from 'react'
import { Provider } from 'mobx-react'
import { render, screen } from '@testing-library/react'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import Router from 'next/router'
import PropTypes from 'prop-types'

import ProjectAboutPageConnector from './ProjectAboutPageConnector'
import { ProjectAboutPage } from './ProjectAboutPage'

describe.only('Component > ProjectAboutPageConnector', () => {
  const mockedRouter = {
    asPath: '/projects/zooniverse/snapshot-serengeti',
    push: () => {},
    prefetch: () => {},
    query: {
      owner: 'zooniverse',
      project: 'snapshot-serengeti'
    }
  }

  Router.router = mockedRouter

  const withMockRouterContext = mockRouter => {
    class MockRouterContext extends Component {
      getChildContext () {
        return {
          router: { ...mockedRouter, ...mockRouter }
        }
      }
      render() {
        return this.props.children
      }
    }

    MockRouterContext.childContextTypes = {
      router: PropTypes.object
    }

    return MockRouterContext
  }

  const WithRouter = withMockRouterContext(mockedRouter)

  const mockStore = {
    project: {
      about_pages: [
        {
          id: '1234',
          title: 'Research Case',
          url_key: 'science_case',
          content: 'This is some content.'
        }
      ],
      inBeta: false
    },
    ui: {
      mode: 'light'
    }
  }

  describe('About pages with content', () => {
    it('should render without crashing', () => {
      const { getByText } = render(
        <Provider store={mockStore}>
          <Grommet theme={zooTheme} themeMode="light">
            <WithRouter>
              <ProjectAboutPageConnector pageType="science_case">
                {/* <ProjectAboutPage /> */}
              </ProjectAboutPageConnector>
            </WithRouter>
          </Grommet>
        </Provider>
      )
    })

    it('should pass correct data to ProjectAboutPage depending on pageType', () => {})

    it('should correct the Research Case page title to Research', () => {})
  })

  describe('About pages without content', () => {
    const mockStore = {
      project: {
        about_pages: [
          {
            id: '1234',
            title: 'Research',
            url_key: 'science_case',
            content: 'This is some content'
          },
          {
            id: '1234',
            title: 'Results',
            url_key: 'results',
            content: 'Some results.'
          }
        ],
        inBeta: false
      }
    }

    // it('should pass default content if a page doesnt exist yet', () => {
    //   const aboutPage = wrapper.find(ProjectAboutPage)
    //   const aboutProps = aboutPage.prop('aboutPageData')
    //   expect(aboutProps.title).to.equal('team')
    //   expect(aboutProps.content).to.equal('No content yet.')
    // })

    // it('should pass a default navLinks array that always includes Research and Team pages', () => {
    //   const aboutPage = wrapper.find(ProjectAboutPage)
    //   const aboutNavLinks = aboutPage.prop('aboutNavLinks')
    //   expect(aboutNavLinks).to.include('research')
    //   expect(aboutNavLinks).to.include('team')
    // })

    // it('should pass a navLink if an about page has content', () => {
    //   const aboutPage = wrapper.find(ProjectAboutPage)
    //   const aboutNavLinks = aboutPage.prop('aboutNavLinks')
    //   expect(aboutNavLinks).to.include('results')
    // })

    // it('should not pass a navLink for a page without content (excluding Research & Team)', () => {
    //   const aboutPage = wrapper.find(ProjectAboutPage)
    //   const aboutNavLinks = aboutPage.prop('aboutNavLinks')
    //   expect(aboutNavLinks).not.to.include('education')
    //   expect(aboutNavLinks).not.to.include('faq')
    // })
  })
})
