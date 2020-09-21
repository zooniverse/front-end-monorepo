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

import HeroContainer from './'

const mockStore = {
  project: {
    background: {
      src: 'https://panoptes-uploads.zooniverse.org/production/project_background/260e68fd-d3ec-4a94-bb32-43ff91d5579a.jpeg'
    },
    description: 'Learn about and help document the wonders of nesting Western Bluebirds.',
    display_name: 'Nest Quest Go: Western Bluebirds',
    slug: 'brbcornell/nest-quest-go-western-bluebirds',
    workflow_description: `Choose your own adventure! There are many ways to engage with this project:  
      1) "Nest Site": Smartphone-friendly, helps us understand where Western Bluebirds build their nests.  
      2) "Location": Smartphone-friendly, series of questions on the geographic location of the nest.  
      3) "Nest Attempt: Smartphone-friendly, for data-entry lovers to record nest attempt data on cards.  
      4) "Comments": For transcription lovers, we ask you to transcribe all the written comments on the cards.`
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
        <Grommet
          background={{
            dark: 'dark-1',
            light: 'light-1'
          }}
          theme={theme}
          themeMode={(theme.dark) ? 'dark' : 'light'}
        >
          <StorybookRouterFix>
            {children}
          </StorybookRouterFix>
        </Grommet>
      </Provider>
    </MediaContextProvider>
  )
}
const WORKFLOWS = [
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

storiesOf('Project App / Screens / Project Home / Hero', module)
  .addDecorator(withKnobs)
  .addParameters({ viewport: { defaultViewport: 'responsive' }})
  .add('default', () => (
    <MockProjectContext theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
      <HeroContainer
        isWide
        workflows={WORKFLOWS}
      />
    </MockProjectContext>
  ))
  .add('small screen', () => (
    <MockProjectContext theme={{ ...zooTheme, dark: boolean('Dark theme', false) }}>
      <HeroContainer
        workflows={WORKFLOWS}
      />
    </MockProjectContext>
  ), { viewport: { defaultViewport: 'iphone5' }})
