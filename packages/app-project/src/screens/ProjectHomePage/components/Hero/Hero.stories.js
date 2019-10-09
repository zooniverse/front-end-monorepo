import { MediaContextProvider } from '@shared/components/Media'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'
import counterpart from 'counterpart'
import { Grommet } from 'grommet'
import { Provider } from "mobx-react";
import Router from 'next/router'
import PropTypes from 'prop-types'
import React from 'react'
import sinon from 'sinon'

import Hero from './Hero'

const mockStore = {
  project: {
    background: {
      src: 'https://panoptes-uploads.zooniverse.org/production/project_background/260e68fd-d3ec-4a94-bb32-43ff91d5579a.jpeg'
    },
    description: 'Learn about and help document the wonders of nesting Western Bluebirds.',
    display_name: 'Nest Quest Go: Western Bluebirds'
  }
}

/*
Mock NextJS router adapted from
https://github.com/zeit/next.js/issues/1827#issuecomment-470155709
*/
const mockedRouter = {
  asPath: '/projects/zooniverse/snapshot-serengeti',
  push: () => {},
  prefetch: () => {},
  query: {
    owner: 'zooniverse',
    project: 'snapshot-serengeti'
  }
}

const withMockRouterContext = mockRouter => {
  class MockRouterContext extends React.Component {
    getChildContext () {
      return {
        router: { ...mockedRouter, ...mockRouter }
      }
    }
    render () {
      return this.props.children
    }
  }

  MockRouterContext.childContextTypes = {
    router: PropTypes.object
  }

  return MockRouterContext
}

Router.router = mockedRouter

const StorybookRouterFix = withMockRouterContext(mockedRouter)

function MockProjectContext({ children, theme }) {
  return (
    <MediaContextProvider>
      <Provider store={mockStore}>
        <Grommet theme={theme}>
          <StorybookRouterFix>
            {children}
          </StorybookRouterFix>
        </Grommet>
      </Provider>
    </MediaContextProvider>
  )
}
const WORKFLOWS = {
  loading: asyncStates.success,
  data: [
    {
      completeness: 0.65,
      default: false,
      displayName: 'The Family and the Fishing Net',
      id: '12345'
    },
    {
      completeness: 0,
      default: false,
      displayName: 'Games Without Frontiers',
      id: '7890'
    },
    {
      completeness: 0.99,
      default: false,
      displayName: 'Shock The Monkey',
      id: '5678'
    }
  ]
}
const WORKFLOWS_LOADING = {
  loading: asyncStates.loading,
  data: null
}
const WORKFLOWS_ERROR = {
  loading: asyncStates.error,
  data: null
}
storiesOf('Project App / Screens / Project Home / Hero', module)
  .addDecorator(withKnobs)
  .addParameters({ viewport: { defaultViewport: 'responsive' }})
  .add('plain', () => (
    <MockProjectContext theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
      <Hero
        screenSize='default'
        workflows={WORKFLOWS}
      />
    </MockProjectContext>
  ))
  .add('small screen', () => (
    <MockProjectContext theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
      <Hero
        screenSize='small'
        workflows={WORKFLOWS}
      />
    </MockProjectContext>
  ), { viewport: { defaultViewport: 'iphone5' }})
  .add('loading', () => (
    <MockProjectContext theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
      <Hero
        screenSize='default'
        workflows={WORKFLOWS_LOADING}
      />
    </MockProjectContext>
  ))
  .add('error', () => (
    <MockProjectContext theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
      <Hero
        screenSize='default'
        workflows={WORKFLOWS_ERROR}
      />
    </MockProjectContext>
  ))
