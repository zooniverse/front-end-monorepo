import { withKnobs, boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'
import counterpart from 'counterpart'
import { Grommet } from 'grommet'
import Router from 'next/router'
import PropTypes from 'prop-types'
import React from 'react'
import sinon from 'sinon'

import WorkflowSelector from './'

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

  // @ts-ignore
  MockRouterContext.childContextTypes = {
    router: PropTypes.object
  }

  return MockRouterContext
}

Router.router = mockedRouter

const StorybookRouterFix = withMockRouterContext(mockedRouter)

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
storiesOf('Project App / Screens / Project Home / Workflow Selector', module)
  .addDecorator(withKnobs)
  .add('plain', () => (
    <Grommet theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
      <StorybookRouterFix>
        <WorkflowSelector
          workflows={WORKFLOWS}
        />
      </StorybookRouterFix>
    </Grommet>
  ))
  .add('loading', () => (
    <Grommet theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
      <WorkflowSelector
        workflows={WORKFLOWS_LOADING}
      />
    </Grommet>
  ))
  .add('error', () => (
    <Grommet theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
      <WorkflowSelector
        workflows={WORKFLOWS_ERROR}
      />
    </Grommet>
  ))
